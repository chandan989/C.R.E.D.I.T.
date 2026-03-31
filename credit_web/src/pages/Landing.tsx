import React from 'react';
import { Link } from 'react-router-dom';
import { Satellite, ShieldCheck, Coins } from 'lucide-react';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import { useCountUp } from '../hooks/useCountUp';

const Landing: React.FC = () => {
  const co2 = useCountUp(142807, 1500);
  const projects = useCountUp(347, 1200);
  const tvl = useCountUp(28.4, 1500, 1);
  const uptime = useCountUp(99.97, 1500, 2);

  return (
    <Layout>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="micro-label micro-label--verified" style={{ marginBottom: 24 }}>
          PROTOCOL STATUS: OPERATIONAL · TESTNET
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', maxWidth: 720, marginBottom: 20 }}>
          Institutional Ecological<br />Asset Verification.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--color-slate-60)', maxWidth: 640, marginBottom: 32, lineHeight: 1.7 }}>
          Deploying high-fidelity dMRV data to anchor carbon sequestration and agricultural forward contracts onto the transparent ledger. Real-time verification for the regenerative economy.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/terminal" className="btn-protocol">Launch Terminal</Link>
          <Link to="/docs" className="btn-secondary">Read Whitepaper</Link>
        </div>
      </section>

      {/* Stats Row */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          <BentoCard accent="emerald" delay={0}>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 12 }}>VERIFIED ON-CHAIN</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{co2.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--color-slate-60)' }}>TONS</span></div>
            <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginTop: 4 }}>Total CO₂ Sequestered</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={80}>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 12 }}>ACROSS 12 REGIONS</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{projects}</div>
            <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginTop: 4 }}>Active Projects</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={160}>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 12 }}>TOTAL VALUE LOCKED</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.02em' }}>${tvl}M</div>
            <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginTop: 4 }}>Protocol TVL</div>
          </BentoCard>
          <BentoCard accent="emerald" delay={240}>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 12 }}>CREDIT-GUARD NETWORK</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{uptime}%</div>
            <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginTop: 4 }}>Oracle Uptime</div>
          </BentoCard>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ paddingTop: 20 }}>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Three cryptographic stages from ground truth to tokenized asset.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <BentoCard accent="emerald" delay={0}>
            <Satellite size={32} color="var(--color-regen-emerald)" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Data Ingestion</h3>
            <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
              IoT sensors & satellite APIs continuously stream ground-truth environmental data to the CREDIT-Guard oracle network.
            </p>
          </BentoCard>
          <BentoCard accent="emerald" delay={80}>
            <ShieldCheck size={32} color="var(--color-regen-emerald)" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>ZK Verification</h3>
            <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
              Zero-Knowledge proofs cryptographically verify ecological outcomes without exposing sensitive farmer data.
            </p>
          </BentoCard>
          <BentoCard accent="emerald" delay={160}>
            <Coins size={32} color="var(--color-regen-emerald)" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Token Minting</h3>
            <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
              Verified carbon credits (VCC) and agricultural forward contracts (ACFC) are minted directly to farmer wallets.
            </p>
          </BentoCard>
        </div>
      </section>

      {/* Two-Token Explainer */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          <BentoCard accent="emerald" delay={0}>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 12 }}>ERC-1155 · FUNGIBLE</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Verified Carbon Credits</h3>
            <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.7, marginBottom: 20 }}>
              Each CREDIT-VCC token represents exactly 1 metric ton of verified CO₂ sequestration, backed by an immutable BNB Greenfield data archive. Corporate ESG buyers get a complete, independently auditable proof chain.
            </p>
            <Link to="/market/vcc" className="btn-protocol">Explore Carbon Market →</Link>
          </BentoCard>
          <BentoCard accent="emerald" delay={80}>
            <div className="micro-label micro-label--verified" style={{ marginBottom: 12 }}>ERC-721 · NON-FUNGIBLE</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Agricultural Forward Contracts</h3>
            <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.7, marginBottom: 20 }}>
              Farmers tokenise a percentage of their future harvest as forward contracts. Investors purchase at a discount, providing immediate liquidity. Settlement is automated by smart contract upon oracle-verified yield.
            </p>
            <Link to="/market/acfc" className="btn-protocol">Explore Forward Contracts →</Link>
          </BentoCard>
        </div>
      </section>

      {/* Partners */}
      <section className="section" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="micro-label">BNB CHAIN</span>
          <span className="micro-label">BNB GREENFIELD</span>
          <span className="micro-label">POWERED BY ZK PROOFS</span>
          <span className="micro-label">dMRV VERIFIED</span>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
