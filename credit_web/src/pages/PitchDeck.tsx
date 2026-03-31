import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Satellite, ShieldCheck, Coins, Database, Cpu, AlertTriangle, Globe, Sprout, Scale, Banknote, ArrowRight,
  TrendingUp, Activity, BarChart3, Link2Off, Lock, Route, CheckCircle, Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import Footer from '../components/Footer';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const PitchDeck: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout fullScreen>
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--color-terminal-white)', zIndex: 9999 }}>
          <motion.div
            style={{ width: 48, height: 48, border: '2px dashed var(--color-oracle-slate)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}
            animate={{ rotate: 360, borderRadius: ['10%', '50%', '10%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div 
              style={{ width: 12, height: 12, background: 'var(--color-regen-emerald)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: [0.3, 1, 0.3] }} 
             transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
             className="mono" style={{ fontSize: 13, color: 'var(--color-slate-60)', letterSpacing: '0.1em' }}
          >
            LOADING INVESTOR DECK...
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullScreen>
      <div className="snap-container">
        
        {/* Slide 1: Title */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'max(8vh, 64px)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: 800 }}>
            <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 32 }}>
              INVESTOR PRESENTATION · CONFIDENTIAL
            </motion.div>
            
            <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', lineHeight: 1.05, marginBottom: 32, letterSpacing: '-0.03em' }}>
              C.R.E.D.I.T.
            </motion.h1>
            
            <motion.p variants={itemVariants} style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)', color: 'var(--color-oracle-slate)', fontWeight: 600, marginBottom: 16 }}>
              Carbon & Regenerative Ecological Derivatives Investment Token
            </motion.p>

            <motion.p variants={itemVariants} style={{ fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', color: 'var(--color-slate-60)', maxWidth: 640, marginBottom: 48, lineHeight: 1.6 }}>
              Financing the future of the planet — one acre at a time. Bridging the gap between smallholder farmers and institutional capital via immutable dMRV data.
            </motion.p>
            
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-slate-60)', fontSize: 14 }}>
                 Scroll down to advance <ArrowRight size={16} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Slide 2: The Problem */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label" style={{ marginBottom: 24, alignSelf: 'flex-start', color: '#ff4444', borderColor: '#ff4444' }}>
            THE FAILURE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Three Interconnected Gaps</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            The agricultural and climate finance systems are fundamentally broken. C.R.E.D.I.T. addresses the collapse of institutional trust and structural exclusion of the bottom billions.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <AlertTriangle size={32} color="#ff4444" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#ff4444', marginBottom: 12, lineHeight: 1 }}>$170B<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>FINANCING GAP</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Smallholder farmers pay 50–100% APR to predatory lenders for seasonal capital due to lack of traditional collateral.
              </p>
            </BentoCard>
            <BentoCard accent="slate" delay={80}>
              <Globe size={32} color="#ff4444" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#ff4444', marginBottom: 12, lineHeight: 1 }}>&lt;1%<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>CLIMATE FINANCE</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Smallholder farmers receive negligible climate finance. High verification costs lock out the most potent sources of mass scale sequestration.
              </p>
            </BentoCard>
            <BentoCard accent="slate" delay={160}>
              <ShieldCheck size={32} color="#ff4444" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#ff4444', marginBottom: 12, lineHeight: 1 }}>TRUST<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>COLLAPSE</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Corporate ESG buyers halt offset purchases amid greenwashing scandals. VCM registries lack independent proof of impact.
              </p>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 3: The Opportunity / Market Size */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            THE OPPORTUNITY
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">A Half-Trillion Dollar Intersection</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            By solving verification at scale, we unify the immense latent supply of smallholder ecology with the explosive institutional demand for compliance offsets.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="emerald" delay={0}>
              <TrendingUp size={32} color="var(--color-regen-emerald)" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-regen-emerald)', marginBottom: 12, lineHeight: 1 }}>$50B+<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>VCM SCALE (2030)</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Voluntary Carbon Markets are projected to surge as corporate Net Zero mandates shift from pledges to legally binding compliance.
              </p>
            </BentoCard>
            <BentoCard accent="emerald" delay={80}>
              <BarChart3 size={32} color="var(--color-regen-emerald)" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-regen-emerald)', marginBottom: 12, lineHeight: 1 }}>500M+<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>ADDRESSABLE FARMS</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                There are over 500 million smallholder farms globally. They control the vast majority of arable land in high-impact regenerating biomes.
              </p>
            </BentoCard>
            <BentoCard accent="emerald" delay={160}>
              <Leaf size={32} color="var(--color-regen-emerald)" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-regen-emerald)', marginBottom: 12, lineHeight: 1 }}>S.E.A.<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>& INDIA FOCUS</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                The initial protocol expansion targets India and Southeast Asia—the epicenter of agricultural debt traps and massive carbon sink potential.
              </p>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 4: Why Now? */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            MACRO CATALYSTS
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Why Now?</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            C.R.E.D.I.T. was structurally impossible five years ago. Today, three macroeconomic and technological shifts have converged.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 16, marginTop: 24, maxWidth: 800 }}>
            <BentoCard accent="slate" delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                 <div style={{ flexShrink: 0, padding: 16, background: 'var(--color-terminal-white)', border: '1px solid var(--color-oracle-slate)' }}>
                   <Satellite size={32} color="var(--color-regen-emerald)" />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>TECHNOLOGY</div>
                   <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Democratized dMRV APIs</h3>
                   <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>High-resolution synthetic aperture radar and multispectral satellite imagery APIs are now affordable and real-time enough to automate rural auditing.</p>
                 </div>
              </div>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                 <div style={{ flexShrink: 0, padding: 16, background: 'var(--color-terminal-white)', border: '1px solid var(--color-oracle-slate)' }}>
                   <Activity size={32} color="var(--color-regen-emerald)" />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>CRYPTOGRAPHY</div>
                   <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Mature ZK-Proof Infrastructure</h3>
                   <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Zero-Knowledge proofs can now handle massive environmental data schemas efficiently, allowing verifiable audits without compromising farmer privacy.</p>
                 </div>
              </div>
            </BentoCard>
            
            <BentoCard accent="slate" delay={200}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                 <div style={{ flexShrink: 0, padding: 16, background: 'var(--color-terminal-white)', border: '1px solid var(--color-oracle-slate)' }}>
                   <Scale size={32} color="var(--color-regen-emerald)" />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>REGULATION</div>
                   <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Rigid ESG Compliance</h3>
                   <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Regulators (like the EU's CSRD) are mandating hard-proof carbon accounting, destroying the value of low-grade, non-transparent "legacy" offsets.</p>
                 </div>
              </div>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 5: The Solution */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            DUAL FINANCIAL INSTRUMENTS
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The C.R.E.D.I.T. Solution</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            We transform two categories of real-world ecological assets into highly liquid, verifiable on-chain financial instruments.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="emerald" delay={0}>
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 8, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>ERC-1155 · FUNGIBLE</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>Verified Carbon Credits (VCC)</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 20 }}>
                1 Token = 1 Metric Ton CO₂. Verified exclusively by satellite and IoT oracle integrations, fully stored on BNB Greenfield. Completely solving the ESG trust deficit.
              </p>
              <div style={{ background: 'var(--color-terminal-white)', padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <Satellite size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>dMRV Oracles</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Database size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Immutable Archival</span>
                </div>
              </div>
            </BentoCard>
            
            <BentoCard accent="emerald" delay={100}>
               <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 8, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>ERC-721 · NON-FUNGIBLE</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>Agri Forward Contracts (ACFC)</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 20 }}>
                A legally enforceable claim on a defined portion of a farmer's future harvest yielding immediate working capital via institutional DeFi purchases.
              </p>
              <div style={{ background: 'var(--color-terminal-white)', padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <Banknote size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Immediate Capital Lift</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Scale size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Auto-Settlement via Oracle</span>
                </div>
              </div>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 6: The Moat */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            COMPETITIVE ADVANTAGE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Institutional Moat</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Legacy registries run on fragmented Web2 databases, clip massive manual auditing fees, and offer zero independent proof. Our protocol replaces "Trust Me" with cryptographic mathematics.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <Link2Off size={32} color="var(--color-oracle-slate)" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-oracle-slate)', marginBottom: 12, lineHeight: 1.2 }}>Disintermediated<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>VS. MANUAL BROKERS</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                We eliminate the expensive, bureaucratic middlemen. VCC and ACFC tokens are minted parametrically based entirely on dMRV oracle consensus triggers.
              </p>
            </BentoCard>
            <BentoCard accent="slate" delay={80}>
              <Lock size={32} color="var(--color-oracle-slate)" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-oracle-slate)', marginBottom: 12, lineHeight: 1.2 }}>Immutable Base<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>VS. WEB2 SERVERS</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Every compliance document and satellite map is deeply archived on BNB Greenfield decentralized storage. Data cannot be altered or conveniently "lost" after a claim.
              </p>
            </BentoCard>
            <BentoCard accent="slate" delay={160}>
              <CheckCircle size={32} color="var(--color-oracle-slate)" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-oracle-slate)', marginBottom: 12, lineHeight: 1.2 }}>Zero-Knowledge<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>VS. PRIVACY LEAKS</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                We execute mathematical proof of impact without doxing farmer location data or proprietary farming methodologies to the open internet.
              </p>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 7: End-to-End Architecture */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            TECHNOLOGY STACK
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Three-Layer Architecture</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 800 }}>
            Built on a custom stack precisely designed for high-throughput agrarian finance and immutable ecological data storage without human intermediaries.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 16, marginTop: 24, maxWidth: 800 }}>
            
            <BentoCard accent="slate" delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                 <div style={{ flexShrink: 0, padding: 16, background: 'var(--color-terminal-white)', border: '1px solid var(--color-oracle-slate)' }}>
                   <Cpu size={32} color="var(--color-regen-emerald)" />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>LAYER 3 — ORACLE</div>
                   <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>CREDIT-Guard Network</h3>
                   <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Ingests continuous streams of raw IoT/Satellite telemetry and generates Zero-Knowledge proofs of ecological outcomes.</p>
                 </div>
              </div>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                 <div style={{ flexShrink: 0, padding: 16, background: 'var(--color-terminal-white)', border: '1px solid var(--color-oracle-slate)' }}>
                   <Database size={32} color="var(--color-regen-emerald)" />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>LAYER 2 — STORAGE</div>
                   <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>BNB Greenfield</h3>
                   <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Permanently archives full raw dMRV data payloads for frictionless corporate ESG compliance and auditability.</p>
                 </div>
              </div>
            </BentoCard>

            <BentoCard accent="slate" delay={200}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                 <div style={{ flexShrink: 0, padding: 16, background: 'var(--color-terminal-white)', border: '1px solid var(--color-oracle-slate)' }}>
                   <Globe size={32} color="var(--color-regen-emerald)" />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>LAYER 1 — SETTLEMENT</div>
                   <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>BNB Chain</h3>
                   <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Executes EVM-compatible low-fee atomic settlements and natively mints VCC / ACFC tokens into the market.</p>
                 </div>
              </div>
            </BentoCard>
            
          </motion.div>
        </motion.section>

        {/* Slide 8: Tokenomics & Treasury */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            TOKENOMICS & RISK MITIGATION
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Systemic Value & Insurance</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            The $CREDIT token drives utility, governance, and fee discounts, whilst our autonomous treasury eliminates systemic agricultural risk for liquidity providers.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-regen-emerald)', marginBottom: 8, letterSpacing: '0.05em', fontWeight: 600 }}>$CREDIT TOKEN</div>
                <div style={{ fontSize: '2rem', fontWeight: 600 }}>Native Utility</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8, marginBottom: 24 }}>
                  <li>• Used for Oracle node staking operations.</li>
                  <li>• Protocol fee discounts mechanism (25% off).</li>
                  <li>• Governance voting on Regen-Standard modifications.</li>
              </ul>
              <div className="micro-label" style={{ backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534' }}>REAL DEMAND DRIVER</div>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
               <div style={{ position: 'absolute', top: 0, left: 0, width: '25%', height: 4, backgroundColor: '#ff4444' }} />
               <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: '#ff4444', marginBottom: 8, letterSpacing: '0.05em', fontWeight: 600 }}>RISK BACKSTOP</div>
                <div style={{ fontSize: '2rem', fontWeight: 600 }}>Insurance Treasury</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 20 }}>
                25% of all protocol fees flow into an autonomous smart contract treasury to settle defaults driven by extreme, verified climate events.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 3, height: 8, backgroundColor: 'var(--color-regen-emerald)', borderRadius: 4 }} title="75% Protocol Growth" />
                <div style={{ flex: 1, height: 8, backgroundColor: '#ff4444', borderRadius: 4, boxShadow: '0 0 10px rgba(255,68,68,0.5)' }} title="25% Auto-Treasury" />
              </div>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 9: Protocol Roadmap */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            OPEN SOURCE TRAJECTORY
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Protocol Roadmap</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Phased execution transitioning from isolated testnet mechanisms to wide-scale institutional adoption in emerging agrarian markets.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ border: '1px solid var(--color-grid-dot)', padding: 32, background: 'var(--color-terminal-white)', marginTop: 24 }}>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                
                {/* Phase 1 */}
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                   <div style={{ background: 'var(--color-regen-emerald)', padding: 4, border: '1px solid var(--color-oracle-slate)', color: '#fff' }}>
                     <Route size={20} />
                   </div>
                   <div style={{ flex: 1, borderBottom: '1px dashed var(--color-grid-dot)', paddingBottom: 24 }}>
                     <div className="micro-label" style={{ backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534', display: 'inline-block', marginBottom: 8 }}>PHASE 1 · ACTIVE</div>
                     <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Testnet Deployment & Security Audits</h3>
                     <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Deploying core EVM contracts to BNB Testnet. Iterating CREDIT-Guard oracle and solidifying Greenfield dMRV pipelines with initial simulated data.</p>
                   </div>
                </div>

                {/* Phase 2 */}
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                   <div style={{ background: 'var(--color-terminal-white)', padding: 4, border: '1px solid var(--color-oracle-slate)', color: 'var(--color-oracle-slate)' }}>
                     <Route size={20} />
                   </div>
                   <div style={{ flex: 1, borderBottom: '1px dashed var(--color-grid-dot)', paddingBottom: 24 }}>
                     <div className="micro-label" style={{ display: 'inline-block', marginBottom: 8 }}>PHASE 2 · UPCOMING</div>
                     <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Mainnet V1 Launch</h3>
                     <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Live deployment on BNB Mainnet. Initial whitelist of verified NGO field researchers allowed into the auditor network for baseline standard benchmarking.</p>
                   </div>
                </div>

                {/* Phase 3 */}
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                   <div style={{ background: 'var(--color-terminal-white)', padding: 4, border: '1px solid var(--color-oracle-slate)', color: 'var(--color-oracle-slate)' }}>
                     <Route size={20} />
                   </div>
                   <div style={{ flex: 1 }}>
                     <div className="micro-label" style={{ display: 'inline-block', marginBottom: 8 }}>PHASE 3 · SCALE</div>
                     <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Regional Integration (India & SEA)</h3>
                     <p style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>Formal partnerships with agrarian cooperatives. Onboarding initial 10,000 farmers to tokenize their active land data to the ACFC protocol.</p>
                   </div>
                </div>

             </div>

          </motion.div>
        </motion.section>

        {/* Slide 10: Call To Action & Footer */}
        <motion.section 
          className="snap-section"
          style={{ paddingBottom: 0, justifyContent: 'space-between', padding: '120px 0 0 0', width: '100%' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--gutter)', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24 }}>
              JOIN THE REGENERATIVE ECONOMY
            </motion.div>
            <motion.h2 variants={itemVariants} className="section-title" style={{ fontSize: 'clamp(3rem, 5vw, 4rem)' }}>The Future is Verified.</motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto 40px auto' }}>
              Interact with the protocol on the BNB Testnet or read the comprehensive whitepaper for deep technical mechanics.
            </motion.p>
            
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/terminal" className="btn-protocol" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>Launch Terminal</Link>
              <Link to="/docs" className="btn-secondary" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>
                 Read Whitepaper
              </Link>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} style={{ width: '100%', borderTop: '1px solid var(--color-grid-dot)', marginTop: 'auto' }}>
            <div style={{ marginTop: '-80px' }}>
              <Footer />
            </div>
          </motion.div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default PitchDeck;
