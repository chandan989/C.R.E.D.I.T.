import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Satellite, ShieldCheck, Coins, Database, Cpu, AlertTriangle, Globe, Sprout, Scale, Banknote, ArrowRight,
  TrendingUp, Activity, BarChart3, Link2Off, Lock, Route, CheckCircle, Leaf, PieChart as PieChartIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import Footer from '../components/Footer';

const vcmData = [
  { year: '2024', value: 2 },
  { year: '2025', value: 5 },
  { year: '2026', value: 12 },
  { year: '2027', value: 22 },
  { year: '2028', value: 35 },
  { year: '2030', value: 50 },
];

const financeGapData = [
  { name: 'Need', amount: 170 },
  { name: 'Supply', amount: 12 }
];

const tokenomicsData = [
  { name: 'Protocol Growth', value: 75, color: 'var(--color-regen-emerald)' },
  { name: 'Risk Backstop', value: 25, color: '#ff4444' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0a0a0a', border: '1px solid var(--color-oracle-slate)', padding: '8px 12px', fontSize: 14 }}>
        <p style={{ margin: 0, color: 'var(--color-slate-60)', marginBottom: 4 }}>{label || payload[0].name}</p>
        <p style={{ margin: 0, fontWeight: 600, color: payload[0].payload.fill || payload[0].color || '#fff' }}>
          {payload[0].name === 'amount' ? `$${payload[0].value}B` :
            (payload[0].name === 'Protocol Growth' || payload[0].name === 'Risk Backstop') ? `${payload[0].value}%` :
              `$${payload[0].value}B+`}
        </p>
      </div>
    );
  }
  return null;
};

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
            <img src="/Logo.svg" alt="C.R.E.D.I.T. Logo" style={{ width: 80, height: 80, marginBottom: 32 }} />

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
            01. THE FAILURE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Market Failure</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            The agricultural and climate finance systems are fundamentally broken. C.R.E.D.I.T. addresses the collapse of institutional trust and structural exclusion of the bottom billions.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <AlertTriangle size={32} color="#ff4444" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#ff4444', marginBottom: 12, lineHeight: 1 }}>$170B<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>FINANCING GAP</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 24 }}>
                Smallholder farmers pay 50–100% APR to predatory lenders for seasonal capital due to lack of traditional collateral.
              </p>
              <div style={{ height: 100, width: '100%', marginTop: 'auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financeGapData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" hide />
                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                    <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={24}>
                      {financeGapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#ff4444' : '#333'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
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
            02. THE OPPORTUNITY
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Market Opportunity</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            By solving verification at scale, we unify the immense latent supply of smallholder ecology with the explosive institutional demand for compliance offsets.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="emerald" delay={0}>
              <TrendingUp size={32} color="var(--color-regen-emerald)" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-regen-emerald)', marginBottom: 12, lineHeight: 1 }}>$50B+<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>VCM SCALE (2030)</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 24 }}>
                Voluntary Carbon Markets are projected to surge as corporate Net Zero mandates shift from pledges to legally binding compliance.
              </p>
              <div style={{ height: 120, width: '100%', marginTop: 'auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vcmData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVcm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-regen-emerald)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--color-regen-emerald)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" hide />
                    <YAxis hide />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="var(--color-regen-emerald)" strokeWidth={2} fillOpacity={1} fill="url(#colorVcm)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
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
            03. MACRO CATALYSTS
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

        {/* Slide 4.5: Ecosystem at a Glance */}
        <motion.section
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            04. END-TO-END FLOW
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Ecosystem at a Glance</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            An end-to-end marketplace routing institutional capital down to grassroots smallholders, secured entirely by mathematical verification and automated smart contracts.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, width: '100%', marginTop: 24, alignItems: 'center' }}>
            {/* Step 1 */}
            <BentoCard accent="slate" delay={0} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 280, justifyContent: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--color-oracle-slate)', lineHeight: 1 }}>1</div>
              <div className="micro-label" style={{ marginTop: 16, marginBottom: 16 }}>REAL WORLD</div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>Smallholder Farmers implement regenerative practices monitored continuously by IoT Sensors & Satellite Data.</p>
            </BentoCard>

            {/* Step 2 */}
            <BentoCard accent="emerald" delay={100} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', borderColor: 'var(--color-regen-emerald)', minHeight: 280, justifyContent: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--color-regen-emerald)', lineHeight: 1 }}>2</div>
              <div className="micro-label" style={{ marginTop: 16, marginBottom: 16, backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534' }}>CREDIT PROTOCOL</div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>The CREDIT-Guard Oracle Network generates ZK-verified proofs, triggers Smart Contracts, and archives raw data on BNB Greenfield.</p>
            </BentoCard>

            {/* Step 3 */}
            <BentoCard accent="slate" delay={200} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--color-oracle-slate)', color: 'var(--color-terminal-white)', minHeight: 280, justifyContent: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--color-regen-emerald)', lineHeight: 1 }}>3</div>
              <div className="micro-label" style={{ marginTop: 16, marginBottom: 16, color: 'var(--color-terminal-white)', borderColor: 'var(--color-terminal-white)' }}>THE MARKET</div>
              <p style={{ fontSize: 14, color: 'var(--color-terminal-white)', opacity: 0.8, lineHeight: 1.6 }}>CREDIT-VCC & ACFC tokens are minted to DEX marketplaces where Institutional Investors provide liquidity seamlessly.</p>
            </BentoCard>

          </motion.div>
        </motion.section>

        {/* Slide 5: Verified Carbon Credits Detailed */}
        <motion.section
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            05. ASSET DEEP DIVE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Verified Carbon Credits (CREDIT-VCC)</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            An end-to-end data integrity standard using dMRV to mint tokens directly tied to scientifically grounded, verifiable real-world outcomes.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="slate" delay={0} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: 24 }}>Zero-Trust Issuance</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8 }}>
                  <li style={{ display: 'flex', gap: 12, marginBottom: 12 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--color-regen-emerald)', flexShrink: 0 }} /> <strong>Ingestion:</strong> Multispectral satellite & IoT sensors continuously stream ground data.</li>
                  <li style={{ display: 'flex', gap: 12, marginBottom: 12 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--color-regen-emerald)', flexShrink: 0 }} /> <strong>Verification:</strong> ZK-proofs generated via the CREDIT-Guard Oracle Network.</li>
                  <li style={{ display: 'flex', gap: 12, marginBottom: 12 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--color-regen-emerald)', flexShrink: 0 }} /> <strong>Archival:</strong> Raw data permanently archived via BNB Greenfield decentralised storage.</li>
                  <li style={{ display: 'flex', gap: 12, marginBottom: 12 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--color-regen-emerald)', flexShrink: 0 }} /> <strong>Minting:</strong> Smart contract deterministically issues ERC-1155 token to the farmer.</li>
                </ul>
              </div>
              <div style={{ marginTop: 32 }}>
                <span className="btn-protocol" style={{ background: 'var(--color-regen-emerald)', color: '#000', borderColor: '#000', cursor: 'default' }}>1 TOKEN = 1 TONNE CO2e</span>
              </div>
            </BentoCard>

            <BentoCard accent="emerald" delay={100} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="micro-label" style={{ marginBottom: 24 }}>DATA CONTINUITY MODEL</div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 32, paddingBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 600, width: 40, color: 'var(--color-oracle-slate)' }}>1</div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: 4 }}>Physical Actions</h3>
                    <p style={{ fontSize: 14, color: 'var(--color-slate-60)', margin: 0 }}>Farmer scales zero-tillage & cover planting.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 600, width: 40, color: 'var(--color-oracle-slate)' }}>2</div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: 4 }}>Oracle ZK Proof</h3>
                    <p style={{ fontSize: 14, color: 'var(--color-slate-60)', margin: 0 }}>Data processed. Mathematical proof encoded without metadata exposure.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 600, width: 40, color: 'var(--color-oracle-slate)' }}>3</div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: 4 }}>DEX Execution</h3>
                    <p style={{ fontSize: 14, color: 'var(--color-slate-60)', margin: 0 }}>Institutional capital acquires instantly verifiable ERC-1155 assets.</p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 5.5: Verification-to-Minting Pipeline */}
        <motion.section
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            06. TOKEN LIFECYCLE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Verification-to-Minting Pipeline</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            The full lifecycle of a CREDIT token from a real-world agricultural event to a tradeable on-chain asset.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <div className="micro-label" style={{ marginBottom: 16 }}>STAGE 1</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Data Ingestion</h3>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>IoT devices and multispectral/SAR satellite APIs continuously stream environmental data. Every incoming data packet is timestamped and cryptographically signed.</p>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
              <div className="micro-label" style={{ marginBottom: 16 }}>STAGE 2</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>ZK Verification</h3>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>The oracle network processes incoming data against the Regen-Standard criteria. A Zero-Knowledge proof is generated confirming pass/fail without exposing farmer privacy.</p>
            </BentoCard>

            <BentoCard accent="emerald" delay={200} style={{ borderColor: 'var(--color-regen-emerald)' }}>
              <div className="micro-label" style={{ marginBottom: 16, backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534' }}>STAGE 3</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Greenfield Archival</h3>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>Before minting, the complete raw data payload is uploaded to BNB Greenfield. The storage object ID is returned to provide an auditable public foundation.</p>
            </BentoCard>

            <BentoCard accent="slate" delay={300} style={{ backgroundColor: 'var(--color-oracle-slate)', color: 'var(--color-terminal-white)' }}>
              <div className="micro-label" style={{ marginBottom: 16, color: 'var(--color-terminal-white)', borderColor: 'var(--color-terminal-white)' }}>STAGE 4</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>On-Chain Minting</h3>
              <p style={{ fontSize: 14, color: 'var(--color-terminal-white)', opacity: 0.8, lineHeight: 1.6 }}>The smart contract receives the ZK proof, verifies its validity on-chain, confirms the Greenfield reference, and mints the token to the farmer's wallet deterministically.</p>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 5.8: Agri-Commodity Forward Contracts */}
        <motion.section
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            07. ASSET DEEP DIVE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Agri-Commodity Forward Contracts (CREDIT-ACFC)</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Solving the working capital problem instantly by bringing legally enforceable forward contracts on-chain, uniquely tailored for unbanked smallholders.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <h3 style={{ fontSize: '2rem', marginBottom: 24 }}>Defeating Predatory APRs</h3>
              <p style={{ fontSize: 15, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 16 }}>
                Farmers declare a percentage of expected future harvest (e.g., 4 tonnes of rice) minting unique <strong>ERC-721 tokens</strong> representing defined delivery terms at a discounted spot rate.
              </p>
              <p style={{ fontSize: 15, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 32 }}>
                Investors provide immediate capital via DEX marketplace, securing the protocol's liquidity. Settlements happen via smart contract upon oracle data verification of the yield.
              </p>

              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                <div>
                  <div className="micro-label" style={{ marginBottom: 8 }}>LIQUIDITY</div>
                  <h4 style={{ fontSize: '1.6rem', margin: 0 }}>Immediate</h4>
                </div>
                <div>
                  <div className="micro-label" style={{ marginBottom: 8 }}>YIELD SETTLEMENT</div>
                  <h4 style={{ fontSize: '1.6rem', margin: 0 }}>Programmatic</h4>
                </div>
              </div>
            </BentoCard>

            <BentoCard accent="slate" delay={100} style={{ backgroundColor: 'var(--color-oracle-slate)', color: 'var(--color-terminal-white)' }}>
              <div className="micro-label" style={{ color: 'var(--color-terminal-white)', borderColor: 'var(--color-terminal-white)', marginBottom: 32 }}>CREDIT-ACFC SPECS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--color-regen-emerald)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>ASSET STANDARD</div>
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>ERC-721 NFT</h3>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--color-regen-emerald)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>UNDERLYING</div>
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Physical Ag-Yield</h3>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--color-regen-emerald)', marginBottom: 4, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>INSURANCE</div>
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Treasury Buffered</h3>
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
            08. COMPETITIVE ADVANTAGE
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
            09. TECHNOLOGY STACK
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Protocol Architecture</motion.h2>
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

        {/* Slide 7.5: Business Model */}
        <motion.section
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            10. MONETIZATION
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Business Model</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Revenue starts with protocol fees on issuance, trading, and settlement. The current marketplace implementation already enforces a 2.5% fee.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, width: '100%', marginTop: 24 }}>
            <BentoCard accent="emerald" delay={0}>
              <div className="micro-label" style={{ marginBottom: 16, backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534' }}>TODAY</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Protocol Marketplace Fees</h3>
              <div style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--color-regen-emerald)', marginBottom: 12, lineHeight: 1 }}>2.5%<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>CURRENT FEE</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Applied to market activity across the existing marketplace flow as the first monetization layer of the protocol.
              </p>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
              <div className="micro-label" style={{ marginBottom: 16 }}>EXPANSION</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Issuance + Settlement</h3>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                As verification matures, the protocol can capture value at the points where new assets are created, financed, and settled.
              </p>
            </BentoCard>

            <BentoCard accent="slate" delay={200} style={{ backgroundColor: 'var(--color-oracle-slate)', color: 'var(--color-terminal-white)' }}>
              <div className="micro-label" style={{ marginBottom: 16, color: 'var(--color-terminal-white)', borderColor: 'var(--color-terminal-white)' }}>THESIS</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Own the Trust Rail</h3>
              <p style={{ fontSize: 14, color: 'var(--color-terminal-white)', opacity: 0.8, lineHeight: 1.6 }}>
                The larger opportunity is becoming the issuance and trust layer for ecological and agricultural RWAs that currently cannot reach capital markets credibly.
              </p>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 11: Tokenomics & Treasury */}
        <motion.section
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            11. TOKENOMICS & SECURITY
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Native Tokenomics ($CREDIT)</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Driving protocol alignment across institutional buyers, farmers, and decentralised node operators without relying on runaway speculation.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-regen-emerald)', marginBottom: 8, letterSpacing: '0.05em', fontWeight: 600 }}>VALUE ACCRUAL</div>
                <div style={{ fontSize: '2rem', fontWeight: 600 }}>Fee Governance</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 16 }}>
                Every commercial action across the network (Carbon purchase, ACFC settlement) enforces a protocol marketplace fee.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8, marginBottom: 24 }}>
                <li style={{ display: 'flex', gap: 12, marginBottom: 8 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--color-regen-emerald)', flexShrink: 0 }} /> <span><strong>25% Discount</strong> when fees are paid using $CREDIT, creating perpetual demand vectors.</span></li>
                <li style={{ display: 'flex', gap: 12, marginBottom: 8 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--color-regen-emerald)', flexShrink: 0 }} /> <span><strong>75% Yield</strong> directed toward the DAO for operational development and continuous R&D.</span></li>
              </ul>
              <div className="micro-label" style={{ backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534' }}>REAL DEMAND DRIVER</div>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '25%', height: 4, backgroundColor: '#ff4444' }} />
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#ff4444', marginBottom: 8, letterSpacing: '0.05em', fontWeight: 600 }}>SYSTEMIC PROTECTION</div>
                  <div style={{ fontSize: '2rem', fontWeight: 600 }}>Climate Insurance Treasury</div>
                </div>
                <PieChartIcon size={40} color="#ff4444" style={{ opacity: 0.2 }} />
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 16 }}>
                Agricultural income is highly exposed to catastrophic climate-scale events (flash floods, droughts, pests).
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 24 }}>
                <li style={{ display: 'flex', gap: 12, marginBottom: 8 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: '#ff4444', flexShrink: 0 }} /> <span><strong>25% of all Protocol Fees</strong> are automatically funnelled to the community risk backstop.</span></li>
                <li style={{ display: 'flex', gap: 12, marginBottom: 8 }}><div style={{ marginTop: 6, width: 6, height: 6, borderRadius: '50%', background: '#ff4444', flexShrink: 0 }} /> <span><strong>Programmatic Payouts:</strong> In disaster events verified by the Oracle, the Treasury covers investor shorts and shields the farmer instantly automatically.</span></li>
              </ul>

              <div style={{ height: 160, width: '100%', marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie
                      data={tokenomicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {tokenomicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--color-regen-emerald)' }} />
                    <span style={{ fontSize: 12, color: 'var(--color-slate-60)' }}>75% Protocol Growth</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 2, background: '#ff4444', boxShadow: '0 0 10px rgba(255,68,68,0.5)' }} />
                    <span style={{ fontSize: 12, color: 'var(--color-slate-60)' }}>25% Auto-Treasury</span>
                  </div>
                </div>
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
            12. OPEN SOURCE TRAJECTORY
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Protocol Roadmap</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Phased execution transitioning from isolated testnet mechanisms to wide-scale institutional adoption in emerging agrarian markets.
          </motion.p>

          <motion.div variants={itemVariants} style={{ position: 'relative', width: '100%', margin: '24px 0', padding: '20px 0' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>

              {/* Top Row (Phase 1 and 3) */}
              <div style={{ display: 'flex', width: '100%', zIndex: 3 }}>
                <div style={{ flex: 1, padding: '0 16px', paddingBottom: 24 }}>
                  <BentoCard accent="emerald" delay={0} style={{ height: '100%', margin: 0 }}>
                    <div className="micro-label" style={{ backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534', display: 'inline-block', marginBottom: 8 }}>PHASE 1 · ACTIVE</div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Testnet Deployment & Audits</h3>
                    <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>Deploying core EVM contracts to BNB Testnet. Iterating CREDIT-Guard oracle and solidifying pipelines.</p>
                  </BentoCard>
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ flex: 1, padding: '0 16px', paddingBottom: 24 }}>
                  <BentoCard accent="slate" delay={200} style={{ height: '100%', margin: 0 }}>
                    <div className="micro-label" style={{ display: 'inline-block', marginBottom: 8 }}>PHASE 3 · SCALE</div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Regional Integration</h3>
                    <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>Formal partnerships with agrarian cooperatives. Onboarding initial 10,000 farmers in India and Southeast Asia.</p>
                  </BentoCard>
                </div>
              </div>

              {/* Road Row (Center) */}
              <div style={{ height: 40, position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', left: '16.66%', right: '16.66%', height: 2, background: 'var(--color-oracle-slate)', opacity: 0.3, zIndex: 0 }} />

                <div style={{ position: 'absolute', left: '16.66%', width: '33.33%', height: 2, background: 'var(--color-regen-emerald)', zIndex: 1, boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />

                {/* Nodes */}
                <div style={{ display: 'flex', width: '100%', position: 'absolute', left: 0, right: 0, zIndex: 3 }}>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-terminal-white)', border: '5px solid var(--color-regen-emerald)', boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-terminal-white)', border: '3px solid var(--color-oracle-slate)' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-terminal-white)', border: '3px solid var(--color-oracle-slate)' }} />
                  </div>
                </div>
              </div>

              {/* Bottom Row (Phase 2) */}
              <div style={{ display: 'flex', width: '100%', zIndex: 3 }}>
                <div style={{ flex: 1 }} />
                <div style={{ flex: 1, padding: '0 16px', paddingTop: 24 }}>
                  <BentoCard accent="slate" delay={100} style={{ height: '100%', margin: 0 }}>
                    <div className="micro-label" style={{ display: 'inline-block', marginBottom: 8 }}>PHASE 2 · UPCOMING</div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Mainnet V1 Launch</h3>
                    <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>Live deployment on BNB Mainnet. Initial whitelist of verified NGO field researchers allowed into auditor network.</p>
                  </BentoCard>
                </div>
                <div style={{ flex: 1 }} />
              </div>

            </div>
          </motion.div>
        </motion.section>

        {/* Slide 10: The Team */}
        <motion.section
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            13. CORE CONTRIBUTORS
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Team</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Bringing together deep expertise across Web3 infrastructure, artificial intelligence, and scalable consumer platforms to build the future of regenerative finance.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-regen-emerald)', marginBottom: 8, letterSpacing: '0.05em', fontWeight: 600 }}>WEB3 & GENAI ENGINEER</div>
                <div style={{ fontSize: '2rem', fontWeight: 600 }}>Nikhil Sharma</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8 }}>
                <li>• Multi-hackathon-winning Web3 & GenAI engineer</li>
                <li>• Specialized in decentralized systems, AI, and blockchain innovation</li>
                <li>• Built scalable products including Loopin and Veritas</li>
                <li>• Global recognition: WCHL Finalist, Hedera & Stacks hackathons</li>
                <li>• Expertise in smart contracts and decentralized identity systems</li>
                <li>• Strong experience in full-stack AI integrations</li>
              </ul>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-regen-emerald)', marginBottom: 8, letterSpacing: '0.05em', fontWeight: 600 }}>FULL-STACK & MOBILE ENGINEER</div>
                <div style={{ fontSize: '2rem', fontWeight: 600 }}>Chandan Soni</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8 }}>
                <li>• Full-stack and mobile engineer</li>
                <li>• Expertise in AI-powered applications and scalable backend systems</li>
                <li>• Founder of Elykid (live AI companion platform on iOS & Android)</li>
                <li>• Skilled in end-to-end product development (0 → 1 → scale)</li>
                <li>• Experience in building and integrating AI pipelines</li>
                <li>• Led product development from concept to deployment</li>
              </ul>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Slide 11: Thank You & Footer */}
        <motion.section
          className="snap-section"
          style={{ paddingBottom: 0, justifyContent: 'space-between', padding: '120px 0 0 0', width: '100%' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--gutter)', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, padding: '4px 12px', background: 'var(--color-regen-emerald)', color: '#fff', border: 'none' }}>
              END OF DECK
            </motion.div>
            <motion.h2 variants={itemVariants} className="section-title" style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.03em' }}>
              Thank You.
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto 40px auto' }}>
              We're building the infrastructure for a regenerative global economy. Join us in making impact verifiable, scalable, and liquid.
            </motion.p>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/docs" className="btn-protocol" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>
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
