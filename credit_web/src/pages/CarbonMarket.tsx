import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import ProgressRhombus from '../components/ProgressRhombus';
import { vccListings, VCCListing } from '../data/mockTokens';

const CarbonMarket: React.FC = () => {
  const [region, setRegion] = useState('all');
  const [methodology, setMethodology] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<VCCListing | null>(null);
  const [showCount, setShowCount] = useState(9);

  const filtered = useMemo(() => {
    let items = [...vccListings];
    if (region !== 'all') items = items.filter(i => i.region.toLowerCase().includes(region));
    if (methodology !== 'all') items = items.filter(i => i.methodology.toLowerCase() === methodology);
    if (statusFilter !== 'all') items = items.filter(i => i.status === statusFilter);
    if (search) items = items.filter(i => i.projectName.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-low') items.sort((a, b) => a.pricePerTon - b.pricePerTon);
    else if (sortBy === 'price-high') items.sort((a, b) => b.pricePerTon - a.pricePerTon);
    return items;
  }, [region, methodology, statusFilter, sortBy, search]);

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
                <button className="btn-protocol btn-sm" onClick={e => { e.stopPropagation(); }}>Acquire Credit</button>
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
              <button className="btn-protocol">Acquire Credit</button>
              <button className="btn-secondary">Audit on Greenfield</button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CarbonMarket;
