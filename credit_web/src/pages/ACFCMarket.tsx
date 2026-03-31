import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ethers } from 'ethers';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import { acfcListings, ACFCListing } from '../data/mockTokens';

const TREASURY_ADDRESS = "0xeA97dF87E6c7F68C9f95A69dA79E19B834823F25";

const ACFCMarket: React.FC = () => {
  const [commodity, setCommodity] = useState('all');
  const [region, setRegion] = useState('all');
  const [riskTier, setRiskTier] = useState('all');
  const [selected, setSelected] = useState<ACFCListing | null>(null);
  const [txStatus, setTxStatus] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const investInContract = async (e: React.MouseEvent, item: ACFCListing) => {
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

      // Simulate a raw investment transfer directly to the Protocol Treasury
      const tx = await signer.sendTransaction({
        to: TREASURY_ADDRESS,
        value: ethers.parseEther("0.0001") // Lowered for Hackathon demo gas savings!
      });
      
      setTxStatus('Confirming Block...');
      await tx.wait();

      // HACKATHON DEMO TRICK: Store the TX dynamically so the Terminal page instantly shows REAL data
      const recentTxs = JSON.parse(localStorage.getItem('credit_txs') || '[]');
      recentTxs.unshift({
        timestamp: new Date().toLocaleTimeString(),
        event: 'LIQUIDITY_PROVIDED',
        project: `${item.commodity} - ${item.farmerId}`, // Real data from UI map
        value: `$${item.investmentAmount.toLocaleString()} (0.0001 BNB)`, // Real price
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

  const filtered = useMemo(() => {
    let items = [...acfcListings];
    if (commodity !== 'all') items = items.filter(i => i.commodity.toLowerCase().includes(commodity));
    if (region !== 'all') items = items.filter(i => i.region.toLowerCase().includes(region));
    if (riskTier !== 'all') items = items.filter(i => i.riskTier.toLowerCase() === riskTier);
    return items;
  }, [commodity, region, riskTier]);

  return (
    <Layout>
      <section className="section">
        <h1 className="section-title">Agricultural Forward Contracts</h1>
        <p className="section-subtitle">Invest in tokenised future harvests. Each CREDIT-ACFC is a unique, oracle-verified forward contract backed by real agricultural production.</p>
        <div className="micro-label micro-label--verified" style={{ marginBottom: 32 }}>ACTIVE CONTRACTS: 89 · TOTAL LIQUIDITY PROVIDED: $4.2M</div>

        <div className="filters-bar">
          <select className="filter-select" value={commodity} onChange={e => setCommodity(e.target.value)}>
            <option value="all">All Commodities</option>
            <option value="rice">Rice</option>
            <option value="wheat">Wheat</option>
            <option value="maize">Maize</option>
            <option value="coffee">Coffee</option>
            <option value="spices">Spices</option>
          </select>
          <select className="filter-select" value={region} onChange={e => setRegion(e.target.value)}>
            <option value="all">All Regions</option>
            <option value="tamil nadu">Tamil Nadu</option>
            <option value="kerala">Kerala</option>
            <option value="mekong">Mekong Delta</option>
            <option value="java">East Java</option>
          </select>
          {['all', 'low', 'medium', 'high'].map(r => (
            <button key={r} className={`filter-tab ${riskTier === r ? 'filter-tab--active' : ''}`} onClick={() => setRiskTier(r)}>
              {r === 'all' ? 'All Risk' : r}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 24 }}>
          {filtered.map((item, i) => (
            <BentoCard key={item.id} accent="emerald" delay={i * 80} onClick={() => setSelected(item)}>
              <div className="micro-label micro-label--verified" style={{ marginBottom: 8 }}>{item.id} · ERC-721 · UNIQUE</div>
              <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', marginBottom: 4 }}>{item.farmerId}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>{item.commodity}</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, marginBottom: 16 }}>
                <div><span style={{ color: 'var(--color-slate-60)' }}>Yield:</span> {item.expectedYield}</div>
                <div><span style={{ color: 'var(--color-slate-60)' }}>Discount:</span> {item.discount}%</div>
                <div><span style={{ color: 'var(--color-slate-60)' }}>Settlement:</span> {item.settlementDate}</div>
                <div>
                  <span style={{ color: 'var(--color-slate-60)' }}>Confidence:</span> {item.oracleConfidence}%
                  <div className="mini-gauge"><div className="mini-gauge__fill" style={{ width: `${item.oracleConfidence}%` }} /></div>
                </div>
              </div>

              <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 16 }}>${item.investmentAmount.toLocaleString()}</div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-protocol btn-sm" onClick={(e) => investInContract(e, item)} disabled={!!txStatus}>
                  {txStatus || 'Invest in Contract'}
                </button>
                <button className="btn-ghost" onClick={e => { e.stopPropagation(); setSelected(item); }}>View Terms</button>
              </div>
            </BentoCard>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="slide-panel__close" onClick={() => setSelected(null)}><X size={16} /></button>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 12 }}>{selected.id} · ERC-721</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{selected.commodity} — {selected.farmerId}</h2>
            <p style={{ fontSize: 14, color: 'var(--color-slate-60)', marginBottom: 24 }}>{selected.description}</p>

            {/* Lifecycle */}
            <h4 style={{ fontSize: 13, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>ACFC Lifecycle</h4>
            <div className="v-pipeline" style={{ marginBottom: 24 }}>
              {['Contract Created', 'Investor Funded', 'Growing Season', 'Oracle Verification', 'Settlement'].map((step, i) => (
                <React.Fragment key={i}>
                  <div className={`v-pipeline__stage ${i < 2 ? 'v-pipeline__stage--active' : ''}`}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{step}</div>
                  </div>
                  {i < 4 && <div className="v-pipeline__connector" />}
                </React.Fragment>
              ))}
            </div>

            <h4 style={{ fontSize: 13, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Historical Yields (TONS)</h4>
            <div style={{ height: 120, marginBottom: 24 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selected.historicalYields.map((y, i) => ({ season: `S${i + 1}`, yield: y }))}>
                  <XAxis dataKey="season" tick={{ fontSize: 10, fontFamily: 'var(--font-mono)' }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#0EDC7A" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13, marginBottom: 24 }}>
              <div><span style={{ color: 'var(--color-slate-60)' }}>Risk Tier:</span> <span className={`micro-label ${selected.riskTier === 'Low' ? 'micro-label--verified' : selected.riskTier === 'High' ? 'micro-label--rejected' : 'micro-label--pending'}`}>{selected.riskTier}</span></div>
              <div><span style={{ color: 'var(--color-slate-60)' }}>Insurance:</span> {selected.insuranceCovered ? <span className="micro-label micro-label--verified">COVERED</span> : <span className="micro-label micro-label--rejected">NOT COVERED</span>}</div>
              <div><span style={{ color: 'var(--color-slate-60)' }}>Settlement:</span> {selected.settlementDate}</div>
              <div><span style={{ color: 'var(--color-slate-60)' }}>Contract:</span> <ContractHash hash={selected.contractHash} /></div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-protocol" onClick={(e) => investInContract(e, selected as ACFCListing)} disabled={!!txStatus}>
                {txStatus || 'Invest in Contract'}
              </button>
              <button className="btn-secondary">Download Term Sheet</button>
            </div>
          </div>
        </div>
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
            <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>Liquidity Investment Secured</h2>
            <p style={{ color: 'var(--color-slate-60)', fontSize: 14, marginBottom: 24 }}>Your Forward Contract (CREDIT-ACFC) has been successfully recorded. The funds have been transferred to the Protocol Treasury on the BNB Smart Chain.</p>
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

export default ACFCMarket;
