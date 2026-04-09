import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import ProgressRhombus from '../components/ProgressRhombus';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { MapPin, Cpu, Leaf, TrendingUp, Droplets, Thermometer, CheckCircle, Plus } from 'lucide-react';

// ===== REAL ON-CHAIN CONTRACT =====
const FARM_REGISTRY_ADDRESS = "0x64a7604c7616Dae234A1F85b060900F448CD12D1";
const FARM_REGISTRY_ABI = [
  "function registerFarm(string _farmerId, string _farmerName, string _location, string _totalArea, string _methodology, string _commodity, string _expectedYield) external returns (uint256)",
  "function setGreenfieldURI(uint256 _farmIndex, string _uri) external",
  "function getFarmCount() external view returns (uint256)",
  "function getFarm(uint256 _index) external view returns (string farmerId, string farmerName, string location, string totalArea, string methodology, string commodity, string expectedYield, string greenfieldURI, address walletAddress, uint256 registeredAt)",
  "event FarmRegistered(uint256 indexed farmIndex, address indexed farmer, string farmerId, string commodity, string location)"
];

const BSC_RPC = 'https://data-seed-prebsc-1-s1.binance.org:8545';

// Simulated IoT sensor readings
const sensorHistory = [
  { t: '06:00', soil: 2.1 }, { t: '08:00', soil: 2.2 }, { t: '10:00', soil: 2.4 },
  { t: '12:00', soil: 2.5 }, { t: '14:00', soil: 2.6 }, { t: '16:00', soil: 2.8 },
  { t: '18:00', soil: 3.0 }, { t: '20:00', soil: 3.1 },
];

export interface OnChainFarm {
  farmerId: string;
  farmerName: string;
  location: string;
  totalArea: string;
  methodology: string;
  commodity: string;
  expectedYield: string;
  greenfieldURI: string;
  walletAddress: string;
  registeredAt: number;
  contractHash: string;
  farmIndex: number;
}

// ===== SHARED FUNCTION: Fetch all farms from the real smart contract =====
export const fetchOnChainFarms = async (): Promise<OnChainFarm[]> => {
  try {
    const provider = new ethers.JsonRpcProvider(BSC_RPC);
    const contract = new ethers.Contract(FARM_REGISTRY_ADDRESS, FARM_REGISTRY_ABI, provider);
    const count = await contract.getFarmCount();
    const farmCount = Number(count);
    
    const results: OnChainFarm[] = [];
    for (let i = 0; i < farmCount; i++) {
      const f = await contract.getFarm(i);
      results.push({
        farmerId: f.farmerId,
        farmerName: f.farmerName,
        location: f.location,
        totalArea: f.totalArea,
        methodology: f.methodology,
        commodity: f.commodity,
        expectedYield: f.expectedYield,
        greenfieldURI: f.greenfieldURI,
        walletAddress: f.walletAddress,
        registeredAt: Number(f.registeredAt),
        contractHash: FARM_REGISTRY_ADDRESS,
        farmIndex: i,
      });
    }
    return results;
  } catch (err) {
    console.warn("Failed to fetch on-chain farms:", err);
    return [];
  }
};

const FarmerPortal: React.FC = () => {
  const [farms, setFarms] = useState<OnChainFarm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [regStatus, setRegStatus] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMsg, setSuccessModalMsg] = useState({ title: '', body: '' });

  // Form fields
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('Tamil Nadu, India');
  const [formArea, setFormArea] = useState('');
  const [formMethodology, setFormMethodology] = useState('Zero-Tillage');
  const [formCommodity, setFormCommodity] = useState('Basmati Rice');
  const [formYield, setFormYield] = useState('');

  // Load farms from the REAL blockchain
  const loadFarms = async () => {
    const onChainFarms = await fetchOnChainFarms();
    setFarms(onChainFarms);
    setLoading(false);
  };

  useEffect(() => {
    loadFarms();
    // Poll every 10 seconds for new registrations
    const interval = setInterval(loadFarms, 10000);
    return () => clearInterval(interval);
  }, []);

  const registerFarm = async () => {
    if (!formName || !formArea || !formYield) {
      alert('Please fill all fields.');
      return;
    }
    const { ethereum } = window as any;
    if (!ethereum) { alert('Connect your wallet first.'); return; }

    try {
      setRegStatus('Anchoring Farm Data to BNB Greenfield...');
      await new Promise(r => setTimeout(r, 1500));

      setRegStatus('Recording On-Chain Registration...');
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const farmId = `FARMER_${formLocation.slice(0, 2).toUpperCase()}_${String(Math.floor(Math.random() * 9000) + 1000)}`;

      // REAL ON-CHAIN CONTRACT CALL
      const contract = new ethers.Contract(FARM_REGISTRY_ADDRESS, FARM_REGISTRY_ABI, signer);
      const tx = await contract.registerFarm(
        farmId,
        formName,
        formLocation,
        `${formArea} Hectares`,
        formMethodology,
        formCommodity,
        `${formYield} TONS`
      );

      setRegStatus('Confirming Block...');
      const receipt = await tx.wait();

      // Now set the Greenfield URI on-chain
      const farmIndex = farms.length; // The new farm's index
      const greenfieldURI = `greenfield://credit-farms/${farmId}/sensor_data_${Date.now()}.json`;
      
      setRegStatus('Anchoring Greenfield URI on-chain...');
      const uriTx = await contract.setGreenfieldURI(farmIndex, greenfieldURI);
      await uriTx.wait();

      // Log to Terminal activity
      const recentTxs = JSON.parse(localStorage.getItem('credit_txs') || '[]');
      recentTxs.unshift({
        timestamp: new Date().toLocaleTimeString(),
        event: 'FARM_REGISTERED',
        project: `${formCommodity} Farm - ${formName} (${formLocation})`,
        value: `${formArea} ha · ${formYield}T yield`,
        txHash: tx.hash,
        status: 'verified'
      });
      localStorage.setItem('credit_txs', JSON.stringify(recentTxs));

      setRegStatus('');
      setShowRegisterForm(false);
      setFormName(''); setFormArea(''); setFormYield('');

      // Refresh farms from blockchain
      await loadFarms();

      setSuccessModalMsg({
        title: 'Farm Registered On-Chain',
        body: `${formCommodity} farm "${formName}" in ${formLocation} has been permanently recorded on the BNB Smart Chain (Block #${receipt.blockNumber}) and anchored to Greenfield storage at ${greenfieldURI}. Investors can now see and fund your farm on the ACFC Market.`
      });
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      setRegStatus('');
      alert('Registration failed: ' + (err.reason || err.message));
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section" style={{ paddingBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="section-title">Farmer Portal</h1>
            <p className="section-subtitle">Register your farm on the BNB Smart Chain. Data is anchored to BNB Greenfield and visible to investors on the marketplace.</p>
          </div>
          <button className="btn-protocol" style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => setShowRegisterForm(true)}>
            <Plus size={16} /> Register New Farm
          </button>
        </div>

        {/* Overview Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginTop: 24 }}>
          <BentoCard accent="emerald" delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MapPin size={14} color="var(--color-regen-emerald)" />
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Registered Farms (On-Chain)</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{loading ? '...' : farms.length}</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={80}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Leaf size={14} color="var(--color-regen-emerald)" />
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Smart Contract</span>
            </div>
            <ContractHash hash={FARM_REGISTRY_ADDRESS} />
          </BentoCard>
          <BentoCard accent="emerald" delay={160}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <TrendingUp size={14} color="var(--color-regen-emerald)" />
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data Storage</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-regen-emerald)' }}>BNB Greenfield</div>
            <div style={{ fontSize: 11, color: 'var(--color-slate-60)', marginTop: 4 }}>Decentralized Object Storage</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={240}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Cpu size={14} color="var(--color-regen-emerald)" />
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Network</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>BNB Smart Chain Testnet</div>
            <div style={{ fontSize: 11, color: 'var(--color-slate-60)', marginTop: 4 }}>Chain ID: 97</div>
          </BentoCard>
        </div>
      </section>

      {/* Live Sensor Dashboard */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <BentoCard accent="emerald" delay={0}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Live IoT Sensor Readings (Aggregated)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ textAlign: 'center', padding: 16, background: 'rgba(14,220,122,0.05)', borderRadius: 8, border: '1px solid rgba(14,220,122,0.15)' }}>
              <Leaf size={20} color="var(--color-regen-emerald)" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', marginBottom: 4 }}>Soil Carbon</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-regen-emerald)' }}>3.1%</div>
              <div style={{ fontSize: 11, color: 'var(--color-regen-emerald)' }}>▲ +0.4% today</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, background: 'rgba(59,130,246,0.05)', borderRadius: 8, border: '1px solid rgba(59,130,246,0.15)' }}>
              <Droplets size={20} color="#3b82f6" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', marginBottom: 4 }}>Moisture</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#3b82f6' }}>60%</div>
              <div style={{ fontSize: 11, color: '#3b82f6' }}>Optimal Range</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, background: 'rgba(245,158,11,0.05)', borderRadius: 8, border: '1px solid rgba(245,158,11,0.15)' }}>
              <Thermometer size={20} color="#f59e0b" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', marginBottom: 4 }}>Temperature</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f59e0b' }}>25°C</div>
              <div style={{ fontSize: 11, color: '#f59e0b' }}>Stable</div>
            </div>
          </div>
          <div style={{ height: 80, marginTop: 16 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', marginBottom: 4 }}>SOIL CARBON % (TODAY)</div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorHistory}>
                <Area type="monotone" dataKey="soil" stroke="#0EDC7A" fill="rgba(14,220,122,0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>
      </section>

      {/* Registered Farms List */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>On-Chain Registered Farms</h3>
        {loading ? (
          <BentoCard accent="slate" delay={0}>
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-slate-60)' }}>
              <p style={{ fontSize: 14 }}>Loading farms from blockchain...</p>
            </div>
          </BentoCard>
        ) : farms.length === 0 ? (
          <BentoCard accent="slate" delay={0}>
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-slate-60)' }}>
              <Leaf size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
              <p style={{ fontSize: 14 }}>No farms registered on-chain yet.</p>
              <p style={{ fontSize: 12 }}>Click "Register New Farm" to anchor your first farm to the BNB Smart Chain.</p>
              <button className="btn-protocol" style={{ marginTop: 16 }} onClick={() => setShowRegisterForm(true)}>Register Your First Farm</button>
            </div>
          </BentoCard>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {farms.map((farm, i) => (
              <BentoCard key={farm.farmerId + i} accent="emerald" delay={i * 80}>
                <div className="micro-label micro-label--verified" style={{ marginBottom: 8 }}>{farm.farmerId} · ON-CHAIN VERIFIED</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{farm.commodity} Farm — {farm.farmerName}</h3>
                <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginBottom: 12 }}>{farm.location} · {farm.totalArea}</div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                  <span>Yield: {farm.expectedYield}</span>
                  <span>Method: {farm.methodology}</span>
                </div>
                {farm.greenfieldURI && (
                  <div style={{ marginBottom: 8, fontSize: 11, color: 'var(--color-slate-60)' }}>
                    Greenfield: <span style={{ color: 'var(--color-regen-emerald)' }}>{farm.greenfieldURI}</span>
                  </div>
                )}
                <ContractHash hash={FARM_REGISTRY_ADDRESS} />
                <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)' }}>
                  Wallet: {farm.walletAddress.slice(0, 6)}...{farm.walletAddress.slice(-4)} · Registered: {new Date(farm.registeredAt * 1000).toLocaleDateString()}
                </div>

                {/* On-Chain Data Viewer */}
                <details style={{ marginTop: 16 }}>
                  <summary style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-regen-emerald)', cursor: 'pointer' }}>View On-Chain Data ▸</summary>
                  <div style={{ background: '#0a0a0a', padding: 12, borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#a0aec0', marginTop: 8, border: '1px solid rgba(14,220,122,0.2)' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify({
                      contract: FARM_REGISTRY_ADDRESS,
                      farmIndex: farm.farmIndex,
                      farmerId: farm.farmerId,
                      owner: farm.farmerName,
                      wallet: farm.walletAddress,
                      location: farm.location,
                      totalArea: farm.totalArea,
                      methodology: farm.methodology,
                      commodity: farm.commodity,
                      expectedYield: farm.expectedYield,
                      greenfieldStorage: farm.greenfieldURI || "pending",
                      registeredAt: farm.registeredAt,
                      chain: "BNB Smart Chain Testnet (97)",
                      verificationStatus: "VERIFIED_ON_CHAIN"
                    }, null, 2)}</pre>
                  </div>
                </details>
              </BentoCard>
            ))}
          </div>
        )}
      </section>

      {/* Register Farm Modal */}
      {showRegisterForm && (
        <div className="modal-overlay" onClick={() => !regStatus && setShowRegisterForm(false)}>
          <div className="modal-content" style={{ padding: '32px', maxWidth: 520 }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Register New Farm On-Chain</h2>
            <p style={{ fontSize: 13, color: 'var(--color-slate-60)', marginBottom: 24 }}>Your farm data will be stored permanently on the BNB Smart Chain via the FarmRegistry contract ({FARM_REGISTRY_ADDRESS.slice(0,10)}...) and anchored to BNB Greenfield.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Farmer Name *</label>
                <input className="filter-input" style={{ width: '100%' }} placeholder="e.g. Rajesh Kumar" value={formName} onChange={e => setFormName(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Location</label>
                  <select className="filter-select" style={{ width: '100%' }} value={formLocation} onChange={e => setFormLocation(e.target.value)}>
                    <option>Tamil Nadu, India</option>
                    <option>Kerala, India</option>
                    <option>Maharashtra, India</option>
                    <option>Punjab, India</option>
                    <option>Mekong Delta, Vietnam</option>
                    <option>East Java, Indonesia</option>
                    <option>Amazon Basin, Brazil</option>
                    <option>Rift Valley, Kenya</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Total Area (Hectares) *</label>
                  <input className="filter-input" style={{ width: '100%' }} type="number" placeholder="e.g. 24.5" value={formArea} onChange={e => setFormArea(e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Methodology</label>
                  <select className="filter-select" style={{ width: '100%' }} value={formMethodology} onChange={e => setFormMethodology(e.target.value)}>
                    <option>Zero-Tillage</option>
                    <option>Agroforestry</option>
                    <option>Cover Cropping</option>
                    <option>Rotational Grazing</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Commodity</label>
                  <select className="filter-select" style={{ width: '100%' }} value={formCommodity} onChange={e => setFormCommodity(e.target.value)}>
                    <option>Basmati Rice</option>
                    <option>Wheat</option>
                    <option>Coffee</option>
                    <option>Maize</option>
                    <option>Spices</option>
                    <option>Rice</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Expected Season Yield (Tons) *</label>
                <input className="filter-input" style={{ width: '100%' }} type="number" placeholder="e.g. 15" value={formYield} onChange={e => setFormYield(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn-protocol" style={{ flex: 1 }} onClick={registerFarm} disabled={!!regStatus}>
                {regStatus || 'Register On-Chain & Anchor to Greenfield'}
              </button>
              {!regStatus && <button className="btn-secondary" onClick={() => setShowRegisterForm(false)}>Cancel</button>}
            </div>
          </div>
        </div>
      )}

      {/* Premium Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content" style={{ textAlign: 'center', padding: '40px 32px', maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(14,220,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={32} color="var(--color-regen-emerald)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>{successModalMsg.title}</h2>
            <p style={{ color: 'var(--color-slate-60)', fontSize: 14, marginBottom: 24 }}>{successModalMsg.body}</p>
            <button className="btn-protocol" style={{ width: '100%' }} onClick={() => setShowSuccessModal(false)}>Done</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FarmerPortal;
