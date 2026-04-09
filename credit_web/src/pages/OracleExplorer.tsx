import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import { useCountUp } from '../hooks/useCountUp';
import { oracleEvents, OracleEvent } from '../data/mockOracle';
import { Satellite, Radio, UserCheck } from 'lucide-react';
import { fetchOnChainFarms, OnChainFarm } from './FarmerPortal';

const typeIcons: Record<string, React.ReactNode> = { 
  satellite: <Satellite size={16} />, 
  sensor: <Radio size={16} />, 
  auditor: <UserCheck size={16} /> 
};

// Oracle Worker keys & contracts
const PRIVATE_KEY = "5387b0631976750573171d20806265aa6c806fd1d6e79f95c4921fb14d58daa1";
const BSC_RPC = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const VCC_ADDRESS = '0x53fa7BA2D2031EbD6Cc8E15FF927bE8D61ab5B85'; 
const VCC_ABI = ["function mint(address account, uint256 amount, string memory metadataURI) external returns (uint256)"];
const FARM_REGISTRY_ADDRESS = "0x64a7604c7616Dae234A1F85b060900F448CD12D1";
const FARM_REGISTRY_ABI = [
  "function setGreenfieldURI(uint256 _farmIndex, string _uri) external",
  "function getFarmCount() external view returns (uint256)",
];

const regions = [
  { name: 'Amazon Basin', density: 5 },
  { name: 'South Asia', density: 4 },
  { name: 'Southeast Asia', density: 4 },
  { name: 'East Africa', density: 3 },
  { name: 'Central Africa', density: 2 },
  { name: 'South America', density: 3 },
  { name: 'Oceania', density: 1 },
  { name: 'Europe', density: 1 },
];

const OracleExplorer: React.FC = () => {
  const activeNodes = useCountUp(1204, 1200);
  const dataPoints = useCountUp(847291, 1500);
  const zkProofs = useCountUp(1847, 1200);
  const avgTime = useCountUp(4.2, 1200, 1);

  const [events, setEvents] = useState<OracleEvent[]>(oracleEvents.slice(0, 8));
  const [oracleStatus, setOracleStatus] = useState<string>('');
  const [targetFarm, setTargetFarm] = useState<OnChainFarm | null>(null);
  const [registeredFarms, setRegisteredFarms] = useState<OnChainFarm[]>([]);

  useEffect(() => {
    if (events.length >= oracleEvents.length) return;
    const timer = setInterval(() => {
      setEvents(prev => {
        if (prev.length >= oracleEvents.length) return prev;
        return [oracleEvents[prev.length], ...prev];
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [events.length]);

  // Load registered farms from blockchain so Oracle can target them
  useEffect(() => {
    const load = async () => {
      const farms = await fetchOnChainFarms();
      setRegisteredFarms(farms);
      if (farms.length > 0) setTargetFarm(farms[0]);
    };
    load();
  }, []);

  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const triggerOracleWorker = async () => {
    try {
      const farm = targetFarm;
      const farmLabel = farm ? `${farm.commodity} Farm — ${farm.farmerName} (${farm.location})` : 'Unlinked Sensor';

      setOracleStatus(`[1/5] Receiving IoT data from ${farmLabel}...`);
      const provider = new ethers.JsonRpcProvider(BSC_RPC);
      const oracleWallet = new ethers.Wallet(PRIVATE_KEY, provider);

      await new Promise(r => setTimeout(r, 1000));
      setOracleStatus(`[2/5] Anchoring sensor payload to BNB Greenfield...`);
      await new Promise(r => setTimeout(r, 1500));
      
      const greenfieldURI = farm 
        ? `greenfield://credit-farms/${farm.farmerId}/sensor_${Date.now()}.json`
        : `greenfield://credit-oracle-${oracleWallet.address.toLowerCase()}/sensor_${Date.now()}.json`;

      // Step 3: If we have a registered farm, update its Greenfield URI on-chain
      if (farm) {
        setOracleStatus(`[3/5] Linking Greenfield URI to FarmRegistry on-chain...`);
        const registryContract = new ethers.Contract(FARM_REGISTRY_ADDRESS, FARM_REGISTRY_ABI, oracleWallet);
        const uriTx = await registryContract.setGreenfieldURI(farm.farmIndex, greenfieldURI);
        await uriTx.wait();
      }
      
      // Step 4: Mint VCC token linked to the farmer
      setOracleStatus(`[4/5] Minting VCC token for ${farm ? farm.farmerName : 'Oracle Treasury'}...`);
      const vccContract = new ethers.Contract(VCC_ADDRESS, VCC_ABI, oracleWallet);
      const mintTo = farm ? farm.walletAddress : oracleWallet.address;
      const tx = await vccContract.mint(mintTo, 1, greenfieldURI);
      
      setOracleStatus(`[5/5] Confirming Block: ${tx.hash.slice(0,10)}...`);
      await tx.wait();

      // Log to Terminal with real farm data
      const recentTxs = JSON.parse(localStorage.getItem('credit_txs') || '[]');
      recentTxs.unshift({
        timestamp: new Date().toLocaleTimeString(),
        event: 'VCC_MINTED',
        project: farmLabel,
        value: `1 VCC → ${mintTo.slice(0,6)}...${mintTo.slice(-4)}`,
        txHash: tx.hash,
        status: 'verified'
      });
      localStorage.setItem('credit_txs', JSON.stringify(recentTxs));

      // Update marketplace cache so the farm/credit shows on Carbon Market & ACFC Market
      const farmsCache = JSON.parse(localStorage.getItem('credit_farms_cache') || '[]');
      if (farm) {
        // Update existing farm's Greenfield URI in cache
        const idx = farmsCache.findIndex((f: any) => f.farmerId === farm.farmerId);
        if (idx >= 0) {
          farmsCache[idx].greenfieldURI = greenfieldURI;
        }
      } else {
        // No farm was registered — create a cache entry from the Oracle sensor data
        const sensorFarmId = `SENSOR_${Date.now().toString().slice(-6)}`;
        farmsCache.push({
          farmerId: sensorFarmId,
          farmerName: 'Oracle Auto-Detect',
          location: 'Amazon Basin, Brazil',
          totalArea: '50 Hectares',
          methodology: 'Agroforestry',
          commodity: 'Carbon Sequestration',
          expectedYield: '25 TONS',
          greenfieldURI: greenfieldURI,
          walletAddress: mintTo,
          registeredAt: Math.floor(Date.now() / 1000),
          contractHash: FARM_REGISTRY_ADDRESS,
          farmIndex: farmsCache.length,
        });
      }
      localStorage.setItem('credit_farms_cache', JSON.stringify(farmsCache));

      setOracleStatus('');
      setSuccessMsg(
        `Oracle Pipeline Complete!\n\n` +
        `Farm: ${farmLabel}\n` +
        `Greenfield: ${greenfieldURI}\n` +
        `VCC minted to: ${mintTo}\n` +
        `Tx: ${tx.hash}\n\n` +
        `This credit is now live on the Carbon Market for investors to purchase.`
      );
    } catch (err: any) {
      console.error(err);
      setOracleStatus('');
      setErrorMsg("Oracle failed: " + (err.reason || err.message));
    }
  };

  const pipelineStages = [
    { name: 'Data Ingestion', count: '847K', status: 'ACTIVE' },
    { name: 'ZK Verification', count: '1,847', status: 'PROCESSING' },
    { name: 'Greenfield Archival', count: '1,842', status: 'SYNCING' },
    { name: 'Token Minting', count: '1,840', status: 'MINTED' },
  ];

  return (
    <Layout>
      {/* Stats */}
      <section className="section" style={{ paddingBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="section-title">Oracle Explorer</h1>
            <p className="section-subtitle">Autonomous dMRV pipeline: IoT sensors → BNB Greenfield → VCC Minting.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            {registeredFarms.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase' }}>Target Farm:</span>
                <select 
                  className="filter-select" 
                  value={targetFarm?.farmIndex ?? ''} 
                  onChange={e => {
                    const idx = Number(e.target.value);
                    setTargetFarm(registeredFarms.find(f => f.farmIndex === idx) || null);
                  }}
                  style={{ minWidth: 220 }}
                >
                  {registeredFarms.map(f => (
                    <option key={f.farmIndex} value={f.farmIndex}>
                      {f.commodity} — {f.farmerName} ({f.location})
                    </option>
                  ))}
                </select>
              </div>
            )}
            {registeredFarms.length === 0 && (
              <div style={{ fontSize: 11, color: '#f59e0b', fontFamily: 'var(--font-mono)', padding: '6px 12px', background: 'rgba(245,158,11,0.1)', borderRadius: 6, border: '1px solid rgba(245,158,11,0.3)' }}>
                ⚠ No farms registered. Register a farm first on the Farmer Portal.
              </div>
            )}
            <button 
              className="btn-protocol" 
              style={{ padding: '12px 24px', fontSize: '1rem' }} 
              onClick={triggerOracleWorker} 
              disabled={!!oracleStatus}
            >
              {oracleStatus || `Simulate IoT Data Injection${targetFarm ? ` → ${targetFarm.farmerName}` : ''} ⚡️`}
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          <BentoCard accent="emerald" delay={0}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Active Nodes</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{activeNodes.toLocaleString()}</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={80}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Data Points (24h)</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{dataPoints.toLocaleString()}</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={160}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>ZK Proofs (24h)</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{zkProofs.toLocaleString()}</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={240}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Avg Verification Time</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{avgTime}s</div>
          </BentoCard>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* Live Feed */}
          <BentoCard accent="emerald" delay={0}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Live Oracle Feed</h3>
            <div className="oracle-feed">
              {events.map((ev) => (
                <div className="oracle-event" key={ev.id}>
                  <div className="oracle-event__icon">{typeIcons[ev.type]}</div>
                  <div className="oracle-event__body">
                    <div className="oracle-event__time">{ev.timestamp}</div>
                    <div className="oracle-event__desc">{ev.description}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                      <ContractHash hash={ev.dataHash} />
                      <span className={`micro-label ${ev.status === 'PROOF GENERATED' ? 'micro-label--verified' : ev.status === 'INGESTED' ? 'micro-label--pending' : 'micro-label--verified'}`}>{ev.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Pipeline */}
          <BentoCard accent="slate" delay={80}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Verification Pipeline</h3>
            <div className="v-pipeline">
              {pipelineStages.map((stage, i) => (
                <React.Fragment key={i}>
                  <div className="v-pipeline__stage v-pipeline__stage--active">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{stage.name}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{stage.count}</div>
                    <span className="micro-label micro-label--verified" style={{ marginTop: 4 }}>{stage.status}</span>
                  </div>
                  {i < pipelineStages.length - 1 && <div className="v-pipeline__connector" />}
                </React.Fragment>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Raw Local Payload Database View */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Greenfield Payload Cache (Local Datastore)</h3>
        <p className="section-subtitle" style={{ fontSize: 13, marginBottom: 16 }}>Raw JSON offsets processed by the Oracle before anchoring to BNB Greenfield and generating the ZK-Proof Hash.</p>
        <BentoCard accent="slate" delay={160}>
          <div style={{ background: '#0a0a0a', padding: 16, borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: '#a0aec0', display: 'flex', gap: 24, overflowX: 'auto', border: '1px solid rgba(14,220,122,0.2)' }}>
            <div style={{ minWidth: 320 }}>
              <div style={{ color: '#0EDC7A', marginBottom: 8, fontWeight: 'bold' }}>✓ sensor_payload_842.json</div>
              <pre style={{ margin: 0, opacity: 0.8 }}>{`{
  "timestamp": "${new Date().toISOString()}",
  "sensorId": "SN-842",
  "location": "Amazon Basin - Sector 7",
  "soilCarbonIncrease": "2.4%",
  "verificationStatus": "VERIFIED_BY_ZKP",
  "dataHash": "0x3f2a...9b1"
}`}</pre>
            </div>
            <div style={{ minWidth: 320, paddingLeft: 24, borderLeft: '1px solid #2d3748' }}>
              <div style={{ color: '#0EDC7A', marginBottom: 8, fontWeight: 'bold' }}>✓ sensor_payload_843.json</div>
              <pre style={{ margin: 0, opacity: 0.8 }}>{`{
  "timestamp": "${new Date(Date.now() - 3600000).toISOString()}",
  "sensorId": "SN-843",
  "location": "Mato Grosso - Sector 2",
  "soilCarbonIncrease": "1.8%",
  "verificationStatus": "VERIFIED_BY_ZKP",
  "dataHash": "0x7a1b...2c4"
}`}</pre>
            </div>
            <div style={{ minWidth: 320, paddingLeft: 24, borderLeft: '1px solid #2d3748' }}>
              <div style={{ color: '#ecc94b', marginBottom: 8, fontWeight: 'bold' }}>◷ sensor_payload_844.json</div>
              <pre style={{ margin: 0, opacity: 0.8 }}>{`{
  "timestamp": "${new Date(Date.now() - 7200000).toISOString()}",
  "sensorId": "SN-844",
  "location": "Para State - Sector 9",
  "soilCarbonIncrease": "3.1%",
  "verificationStatus": "PENDING_ZKP",
  "dataHash": "0x9b8c...4d5"
}`}</pre>
            </div>
          </div>
        </BentoCard>
      </section>

      {/* Node Distribution */}
      <section className="section" style={{ paddingTop: 0 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Oracle Node Distribution</h3>
        <div className="node-map">
          {regions.map((r) =>
            Array.from({ length: 8 }).map((_, j) => (
              <div
                key={`${r.name}-${j}`}
                className={`node-dot ${j < r.density ? 'node-dot--active' : ''}`}
                title={r.name}
                style={{ width: j < r.density ? 12 + r.density * 3 : 8, height: j < r.density ? 12 + r.density * 3 : 8, margin: 'auto' }}
              />
            ))
          )}
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 16, justifyContent: 'center' }}>
          {regions.map(r => (
            <span key={r.name} className="micro-label">{r.name}</span>
          ))}
        </div>
      </section>

      {/* Premium Success Modal */}
      {successMsg && (
        <div className="modal-overlay" onClick={() => setSuccessMsg('')}>
          <div className="modal-content" style={{ textAlign: 'center', padding: '40px 32px', maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(14,220,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <div style={{ color: 'var(--color-regen-emerald)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>Token Minted Successfully</h2>
            <p style={{ color: 'var(--color-slate-60)', fontSize: 13, marginBottom: 24, wordBreak: 'break-all' }}>{successMsg}</p>
            <button className="btn-protocol" style={{ width: '100%' }} onClick={() => setSuccessMsg('')}>Close</button>
          </div>
        </div>
      )}

      {/* Premium Error Toast */}
      {errorMsg && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#1c1c1c', border: '1px solid #ff4d4f', padding: '16px 24px', borderRadius: 8, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ color: '#ff4d4f', fontSize: 13 }}>{errorMsg}</div>
          <button style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: 18 }} onClick={() => setErrorMsg('')}>×</button>
        </div>
      )}

    </Layout>
  );
};

export default OracleExplorer;
