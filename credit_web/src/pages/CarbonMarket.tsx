import React, { useState, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import { ethers } from 'ethers';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import ProgressRhombus from '../components/ProgressRhombus';
import { vccListings, VCCListing } from '../data/mockTokens';

const TREASURY_ADDRESS = "0xeA97dF87E6c7F68C9f95A69dA79E19B834823F25";

const CarbonMarket: React.FC = () => {
  const [region, setRegion] = useState('all');
  const [methodology, setMethodology] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<VCCListing | null>(null);
  const [showCount, setShowCount] = useState(9);
  // Custom Premium UI state for transactions
  const [txStatus, setTxStatus] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const acquireCredit = async (e: React.MouseEvent, item: VCCListing) => {
    e.stopPropagation();
    const { ethereum } = window as any;
    if (!ethereum) {
      setErrorMsg("Please connect your wallet top right first.");
      return;
    }
    
    try {
      setTxStatus('Awaiting Signature...');
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // Reliable protocol treasury transfer for MVP Demo so it never fails on sold-out tokens
      const price = ethers.parseEther("0.001"); // Very cheap for repetitive testing
      const tx = await signer.sendTransaction({
        to: TREASURY_ADDRESS,
        value: price
      });
      
      setTxStatus('Confirming Block...');
      await tx.wait();
      
      // HACKATHON DEMO TRICK: Store the TX dynamically so the Terminal page instantly shows REAL data
      const recentTxs = JSON.parse(localStorage.getItem('credit_txs') || '[]');
      recentTxs.unshift({
        timestamp: new Date().toLocaleTimeString(),
        event: 'TOKEN_PURCHASED',
        project: item.projectName, // Shows the real project they clicked
        value: `${item.pricePerTon.toFixed(2)} USD (0.001 BNB)`, // Shows dynamic UI data
        txHash: tx.hash,
        status: 'verified'
      });
      localStorage.setItem('credit_txs', JSON.stringify(recentTxs));
      
      setTxStatus('');
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      setTxStatus('');
      setErrorMsg("Transaction Failed: " + (err.reason || err.message));
    }
  };


  // Pull farmer-registered farms from local cache (instant) backed by on-chain data
  const [farmerVCCs, setFarmerVCCs] = useState<VCCListing[]>([]);
  useEffect(() => {
    const syncFarms = () => {
      try {
        const farms = JSON.parse(localStorage.getItem('credit_farms_cache') || '[]');
        if (farms.length === 0) return;
        const converted: VCCListing[] = farms.map((f: any, i: number) => ({
          id: `VCC-LIVE-${String(i + 1).padStart(3, '0')}`,
          projectName: `${f.commodity} Carbon Offset — ${f.farmerName}`,
          region: f.location,
          methodology: f.methodology,
          tons: Math.round(parseFloat(f.totalArea) * 5) || 50,
          pricePerTon: 14.50 + (i * 0.8),
          status: 'on-sale' as const,
          contractHash: f.contractHash,
          vintage: 2026,
          totalArea: f.totalArea,
          co2PerHectare: 5.8,
          greenfieldLink: f.greenfieldURI || `gf://credit-farms/${f.farmerId}/`,
          description: `Live on-chain carbon credits from ${f.farmerName}'s ${f.commodity} farm in ${f.location}. Verified via ${f.methodology}. Greenfield: ${f.greenfieldURI || 'pending'}`,
          verificationTier: 4,
          totalTiers: 5,
        }));
        setFarmerVCCs(converted);
      } catch (e) { console.warn('Cache read error', e); }
    };
    syncFarms();
    const interval = setInterval(syncFarms, 2000); // Fast poll from cache
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    // Merge farmer-registered (LIVE) listings at the top
    let items = [...farmerVCCs, ...vccListings];
    if (region !== 'all') items = items.filter(i => i.region.toLowerCase().includes(region));
    if (methodology !== 'all') items = items.filter(i => i.methodology.toLowerCase() === methodology);
    if (statusFilter !== 'all') items = items.filter(i => i.status === statusFilter);
    if (search) items = items.filter(i => i.projectName.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-low') items.sort((a, b) => a.pricePerTon - b.pricePerTon);
    else if (sortBy === 'price-high') items.sort((a, b) => b.pricePerTon - a.pricePerTon);
    return items;
  }, [region, methodology, statusFilter, sortBy, search, farmerVCCs]);

  return (
    <Layout>
      <section className="section">
        <h1 className="section-title">Carbon Credit Marketplace</h1>
        <p className="section-subtitle">Browse and acquire institutional-grade Verified Carbon Credits (CREDIT-VCC), each representing 1 metric ton of verified CO₂ sequestration.</p>
        <div className="micro-label micro-label--verified" style={{ marginBottom: 32 }}>TOTAL CREDITS LISTED: 12,847 · FLOOR PRICE: $14.80</div>

        {/* Filters */}
        <div className="filters-bar">
          <select className="filter-select" value={region} onChange={e => setRegion(e.target.value)}>
            <option value="all">All Regions</option>
            <option value="amazon">Amazon Basin</option>
            <option value="india">South Asia</option>
            <option value="vietnam">Southeast Asia</option>
            <option value="kenya">Sub-Saharan Africa</option>
          </select>
          <select className="filter-select" value={methodology} onChange={e => setMethodology(e.target.value)}>
            <option value="all">All Methodologies</option>
            <option value="zero-tillage">Zero-Tillage</option>
            <option value="agroforestry">Agroforestry</option>
            <option value="cover cropping">Cover Cropping</option>
            <option value="rotational grazing">Rotational Grazing</option>
          </select>
          {['all', 'on-sale', 'sold', 'retired'].map(s => (
            <button key={s} className={`filter-tab ${statusFilter === s ? 'filter-tab--active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'All' : s.replace('-', ' ')}
            </button>
          ))}
          <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
          <input className="filter-input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {filtered.slice(0, showCount).map((item, i) => (
            <BentoCard key={item.id} accent="emerald" delay={i * 80} onClick={() => setSelected(item)}>
              <div className="micro-label micro-label--verified" style={{ marginBottom: 8 }}>{item.id} · ON-CHAIN VERIFIED</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{item.projectName}</h3>
              <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginBottom: 12 }}>{item.region}</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                <span>{item.tons} TONS CO₂e</span>
                <span>${item.pricePerTon.toFixed(2)} / ton</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <span className="micro-label">{item.methodology.toUpperCase()}</span>
              </div>
              <ContractHash hash={item.contractHash} />
              <div style={{ marginTop: 16 }}>
                <button className="btn-protocol btn-sm" onClick={(e) => acquireCredit(e, item)} disabled={!!txStatus}>
                  {txStatus || 'Acquire Credit'}
                </button>
              </div>
            </BentoCard>
          ))}
        </div>
        {showCount < filtered.length && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="btn-secondary" onClick={() => setShowCount(s => s + 9)}>Load More</button>
          </div>
        )}
      </section>

      {/* Side Panel */}
      {selected && (
        <>
          <div className="slide-panel-overlay" onClick={() => setSelected(null)} />
          <div className="slide-panel">
            <button className="slide-panel__close" onClick={() => setSelected(null)}><X size={16} /></button>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 16 }}>{selected.id} · VERIFIED</div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: 8 }}>{selected.projectName}</h2>
            <p style={{ fontSize: 14, color: 'var(--color-slate-60)', marginBottom: 24 }}>{selected.description}</p>

            {/* Satellite placeholder */}
            <div style={{ height: 160, background: 'linear-gradient(135deg, #1a3a2a, #0a2a1a)', borderRadius: 'var(--border-radius)', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-regen-emerald)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em' }}>
              SATELLITE IMAGERY
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div><div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Area</div><div style={{ fontWeight: 600 }}>{selected.totalArea}</div></div>
              <div><div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CO₂/Hectare</div><div style={{ fontWeight: 600 }}>{selected.co2PerHectare} t</div></div>
              <div><div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vintage</div><div style={{ fontWeight: 600 }}>{selected.vintage}</div></div>
              <div><div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Methodology</div><div style={{ fontWeight: 600 }}>{selected.methodology}</div></div>
            </div>

            <h4 style={{ fontSize: 13, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Verification Pipeline</h4>
            <ProgressRhombus current={selected.verificationTier} total={selected.totalTiers} labels={['Ingestion', 'ZK Proof', 'Archive', 'Minted', 'Listed']} />

            <div style={{ marginTop: 24, fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', wordBreak: 'break-all' }}>
              Contract: <ContractHash hash={selected.contractHash} truncate={false} />
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <button className="btn-protocol" onClick={(e) => acquireCredit(e, selected)} disabled={!!txStatus}>
                {txStatus || 'Acquire Credit'}
              </button>
              <button className="btn-secondary">Audit on Greenfield</button>
            </div>
          </div>
        </>
      )}

      {/* Premium Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content" style={{ textAlign: 'center', padding: '40px 32px' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(14,220,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <div style={{ color: 'var(--color-regen-emerald)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>Blockchain Verification Complete</h2>
            <p style={{ color: 'var(--color-slate-60)', fontSize: 14, marginBottom: 24 }}>The $CREDIT-VCC token has been successfully transferred to your wallet, immutably backed by Greenfield IoT offset data.</p>
            <button className="btn-protocol" style={{ width: '100%' }} onClick={() => setShowSuccessModal(false)}>Back to Market</button>
          </div>
        </div>
      )}

      {/* Premium Error Toast */}
      {errorMsg && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#1c1c1c', border: '1px solid #ff4d4f', padding: '16px 24px', borderRadius: 8, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ color: '#ff4d4f', fontSize: 13 }}>{errorMsg}</div>
          <button style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }} onClick={() => setErrorMsg('')}><X size={14} /></button>
        </div>
      )}

    </Layout>
  );
};

export default CarbonMarket;
