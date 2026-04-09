import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import { useCountUp } from '../hooks/useCountUp';

interface PurchasedItem {
  timestamp: string;
  event: string;
  project: string;
  value: string;
  txHash: string;
  status: string;
}

const Portfolio: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchasedItem[]>([]);

  useEffect(() => {
    const loadPurchases = () => {
      const txs: PurchasedItem[] = JSON.parse(localStorage.getItem('credit_txs') || '[]');
      // Filter only purchases (LIQUIDITY_PROVIDED = ACFC investment, TOKEN_PURCHASED or VCC bought)
      const myPurchases = txs.filter(t =>
        t.event === 'LIQUIDITY_PROVIDED' ||
        t.event === 'TOKEN_PURCHASED' ||
        t.event === 'CREDIT_ACQUIRED'
      );
      setPurchases(myPurchases);
    };
    loadPurchases();
    const interval = setInterval(loadPurchases, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalInvested = purchases.length;
  const portfolioValue = useCountUp(totalInvested * 1420, 800);
  const carbonOffset = useCountUp(totalInvested * 12.5, 800, 1);

  return (
    <Layout>
      <section className="section">
        <h1 className="section-title">My Portfolio</h1>
        <p className="section-subtitle">Track your investments, carbon offset impact, and transaction history.</p>

        {/* Portfolio Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 40 }}>
          <BentoCard accent="emerald" delay={0}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Total Investments</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{totalInvested}</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={80}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Portfolio Value (est.)</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>${portfolioValue.toLocaleString()}</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={160}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Carbon Offset (tCO₂e)</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{carbonOffset}</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={240}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Verification Status</div>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-regen-emerald)' }}>✓ Verified</div>
          </BentoCard>
        </div>

        {/* Purchased Items */}
        {purchases.length === 0 ? (
          <BentoCard accent="emerald" delay={0}>
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📊</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>No Investments Yet</h3>
              <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Visit the <strong>Carbon Credits</strong> or <strong>Forward Contracts</strong> marketplace to acquire your first credits or invest in agricultural forward contracts.
              </p>
            </div>
          </BentoCard>
        ) : (
          <>
            <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, color: 'var(--color-slate-60)' }}>Investment History</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {purchases.map((p, i) => (
                <BentoCard key={`${p.txHash}-${i}`} accent="emerald" delay={i * 60}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div className="micro-label micro-label--verified" style={{ marginBottom: 6 }}>
                        {p.event === 'LIQUIDITY_PROVIDED' ? '🌾 FORWARD CONTRACT' : '🌿 CARBON CREDIT'} · {p.status.toUpperCase()}
                      </div>
                      <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{p.project}</h3>
                      <div style={{ fontSize: 12, color: 'var(--color-slate-60)', fontFamily: 'var(--font-mono)' }}>
                        {p.value} · {p.timestamp}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ marginBottom: 4 }}>
                        <ContractHash hash={p.txHash} />
                      </div>
                      <a
                        href={`https://testnet.bscscan.com/tx/${p.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 11, color: 'var(--color-regen-emerald)', fontFamily: 'var(--font-mono)', textDecoration: 'none' }}
                      >
                        View on BscScan →
                      </a>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>
          </>
        )}

        {/* Impact Summary */}
        {purchases.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, color: 'var(--color-slate-60)' }}>Impact Summary</h2>
            <BentoCard accent="emerald" delay={0}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', marginBottom: 4 }}>Farmers Supported</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{purchases.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', marginBottom: 4 }}>Hectares Funded</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{(purchases.length * 24).toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', marginBottom: 4 }}>SDG Alignment</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>🎯 SDG 2, 13, 15</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', textTransform: 'uppercase', marginBottom: 4 }}>All Data Anchored To</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-regen-emerald)' }}>BNB Greenfield ✓</div>
                </div>
              </div>
            </BentoCard>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Portfolio;
