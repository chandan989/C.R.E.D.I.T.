import React from 'react';
import { Link } from 'react-router-dom';
import { Satellite, ShieldCheck, Coins, Database, Cpu, AlertTriangle, Globe, Sprout, Scale, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import Footer from '../components/Footer';
import { useCountUp } from '../hooks/useCountUp';

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


const Landing: React.FC = () => {
  const co2 = useCountUp(142807, 1500);
  const projects = useCountUp(347, 1200);
  const tvl = useCountUp(28.4, 1500, 1);
  const uptime = useCountUp(99.97, 1500, 2);

  return (
    <Layout fullScreen>
      <div className="snap-container">
        {/* Screen 1: Hero & Stats */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            PROTOCOL STATUS: OPERATIONAL · TESTNET
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', maxWidth: 720, marginBottom: 20 }}>
            Institutional Ecological<br />Asset Verification.
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: 16, color: 'var(--color-slate-60)', maxWidth: 640, marginBottom: 32, lineHeight: 1.7 }}>
            Deploying high-fidelity dMRV data to anchor carbon sequestration and agricultural forward contracts onto the transparent ledger. Real-time verification for the regenerative economy.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 60, alignSelf: 'flex-start' }}>
            <Link to="/terminal" className="btn-protocol">Launch Terminal</Link>
            <Link to="/docs" className="btn-secondary">Read Whitepaper</Link>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, width: '100%' }}>
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
          </motion.div>
        </motion.section>

        {/* Screen 2: The Market Failure */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label" style={{ marginBottom: 24, alignSelf: 'flex-start', color: '#ff4444', borderColor: '#ff4444' }}>
            THE TRUST DEFICIT
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">The Market Failure</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Global agricultural and climate finance systems are structurally broken. The communities most capable of contributing to climate solutions are rigorously excluded.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%' }}>
            <BentoCard accent="slate" delay={0}>
              <AlertTriangle size={32} color="#ff4444" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '3rem', fontWeight: 600, color: '#ff4444', marginBottom: 12, lineHeight: 1 }}>$170B<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>FINANCING GAP</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Smallholders are excluded from formal systems, routinely paying 50–100% APR to predatory lenders for seasonal capital.
              </p>
            </BentoCard>
            <BentoCard accent="slate" delay={80}>
              <Globe size={32} color="#ff4444" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '3rem', fontWeight: 600, color: '#ff4444', marginBottom: 12, lineHeight: 1 }}>&lt;1%<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>CLIMATE FINANCE</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Despite enormous atmospheric sequestration potential, high verification transaction costs lock individual farmers out of VCMs.
              </p>
            </BentoCard>
            <BentoCard accent="slate" delay={160}>
              <ShieldCheck size={32} color="#ff4444" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: '3rem', fontWeight: 600, color: '#ff4444', marginBottom: 12, lineHeight: 1 }}>TRUST<span style={{ fontSize: '1rem', color: 'var(--color-slate-60)', display: 'block', marginTop: 8 }}>COLLAPSE</span></div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Voluntary carbon markets are plagued by greenwashing scandals. Buyers cannot confidently verify that credits do what they claim.
              </p>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Screen 3: Verification-to-Minting Architecture */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            PROTOCOL ARCHITECTURE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">End-to-End Integrity</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 800 }}>
            From ground truth to tokenized asset via four deterministic, cryptographically verifiable stages. No human intermediaries.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginTop: 24 }}>
            <BentoCard accent="emerald" delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Satellite size={24} color="var(--color-regen-emerald)" />
                <span className="micro-label">STAGE 1</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Data Ingestion</h3>
              <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                IoT sensors & satellite APIs continuously stream raw telemetry to the CREDIT-Guard oracle network.
              </p>
            </BentoCard>

            <BentoCard accent="emerald" delay={100}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Cpu size={24} color="var(--color-regen-emerald)" />
                <span className="micro-label">STAGE 2</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>ZK Verification</h3>
              <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Oracle generates a Zero-Knowledge proof of the ecological outcome without exposing raw farmer data.
              </p>
            </BentoCard>

            <BentoCard accent="emerald" delay={200}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Database size={24} color="var(--color-regen-emerald)" />
                <span className="micro-label">STAGE 3</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Greenfield Archival</h3>
              <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                The full raw data payload is permanently archived on BNB Greenfield for independent corporate auditing.
              </p>
            </BentoCard>

            <BentoCard accent="emerald" delay={300}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Coins size={24} color="var(--color-regen-emerald)" />
                <span className="micro-label">STAGE 4</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>On-Chain Minting</h3>
              <p style={{ fontSize: 13, color: 'var(--color-slate-60)', lineHeight: 1.6 }}>
                Smart contract verifies the ZK proof and mints the precise VCC or ACFC token to the farmer's wallet.
              </p>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Screen 4: VCC Deep Dive */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            ERC-1155 · FUNGIBLE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Verified Carbon Credits</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Each CREDIT-VCC token represents exactly 1 metric ton of verified CO₂ sequestration, backed by an immutable BNB Greenfield data archive. Corporate ESG buyers get a complete, independently auditable proof chain.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ marginTop: 40, border: '1px solid var(--color-grid-dot)', padding: 32, background: 'var(--color-terminal-white)' }}>
            <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginBottom: 24, letterSpacing: '0.05em' }}>VCC LIFECYCLE FLOW</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <Satellite size={20} style={{ marginBottom: 12, color: 'var(--color-regen-emerald)' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>1. Data Stream</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginTop: 4 }}>Sensors capture soil data</div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <Cpu size={20} style={{ marginBottom: 12, color: 'var(--color-regen-emerald)' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>2. ZK Proof</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginTop: 4 }}>Oracle verifies outcome</div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <Database size={20} style={{ marginBottom: 12, color: 'var(--color-regen-emerald)' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>3. Archival</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginTop: 4 }}>Stored on BNB Greenfield</div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)', background: 'var(--color-regen-emerald)', color: '#fff' }}>
                <Coins size={20} style={{ marginBottom: 12, color: '#fff' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>4. Token Mint</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>VCC minted to farmer</div>
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'flex' }}>
              <Link to="/market/vcc" className="btn-protocol">Explore Carbon Market →</Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Screen 5: ACFC Deep Dive */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            ERC-721 · NON-FUNGIBLE
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Agricultural Forward Contracts</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Farmers tokenise a percentage of their future harvest as forward contracts. Investors purchase at a discount, providing immediate liquidity. Settlement is automated by smart contract upon oracle-verified yield.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ marginTop: 40, border: '1px solid var(--color-grid-dot)', padding: 32, background: 'var(--color-terminal-white)' }}>
            <div style={{ fontSize: 13, color: 'var(--color-slate-60)', marginBottom: 24, letterSpacing: '0.05em' }}>ACFC SETTLEMENT FLOW</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <Sprout size={20} style={{ marginBottom: 12, color: 'var(--color-regen-emerald)' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>1. Mint Contract</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginTop: 4 }}>Farmer declares harvest list</div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <Banknote size={20} style={{ marginBottom: 12, color: 'var(--color-regen-emerald)' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>2. Capital Lift</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginTop: 4 }}>Investor buys at discount</div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)' }}>
                <Scale size={20} style={{ marginBottom: 12, color: 'var(--color-regen-emerald)' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>3. Yield Verify</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginTop: 4 }}>Oracle network verifies yield</div>
              </div>
              <div style={{ padding: 16, border: '1px solid var(--color-oracle-slate)', background: 'var(--color-regen-emerald)', color: '#fff' }}>
                <Coins size={20} style={{ marginBottom: 12, color: '#fff' }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>4. Auto-Settle</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Smart contract pays out</div>
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'flex' }}>
              <Link to="/market/acfc" className="btn-protocol">Explore Forward Contracts →</Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Screen 6: Tokenomics & Treasury */}
        <motion.section 
          className="snap-section section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
            VALUE ACCRUAL & RISK
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title">Systemic Risk Backstop</motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 720 }}>
            Every trade generates a protocol fee. 75% funds continued development and operations, while 25% is swept into an autonomous climate insurance treasury to protect investors from natural disaster defaults.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginTop: 24 }}>
            <BentoCard accent="slate" delay={0}>
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 8, letterSpacing: '0.05em' }}>NATIVE UTILITY</div>
                <div style={{ fontSize: '2rem', fontWeight: 600 }}>$CREDIT Token</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 20 }}>
                The connective tissue of the protocol. Used for governance, oracle node staking, and capturing discounted protocol fees.
              </p>
              <div className="micro-label" style={{ backgroundColor: '#f0fdf4', color: '#166534', borderColor: '#166534' }}>25% FEE REDUCTION APPLIED</div>
            </BentoCard>

            <BentoCard accent="slate" delay={100}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '25%', height: 4, backgroundColor: 'var(--color-regen-emerald)' }} />
              <div style={{ padding: '24px 0', borderBottom: '1px solid var(--color-grid-dot)', marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 8, letterSpacing: '0.05em' }}>SMART CONTRACT VAULT</div>
                <div style={{ fontSize: '2rem', fontWeight: 600 }}>Insurance Treasury</div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.6, marginBottom: 20 }}>
                A community-governed reserve deployed automatically via smart contract when extreme climate events disrupt agricultural yields.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 3, height: 8, backgroundColor: 'var(--color-slate-60)', borderRadius: 4 }} title="75% Operations" />
                <div style={{ flex: 1, height: 8, backgroundColor: '#ff4444', borderRadius: 4, boxShadow: '0 0 10px rgba(255,68,68,0.5)' }} title="25% Treasury" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                <span>75% OPs</span>
                <span style={{ color: '#ff4444' }}>25% TREASURY</span>
              </div>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* Screen 7: Tech Stack & Footer */}
        <motion.section 
          className="snap-section"
          style={{ paddingBottom: 0, justifyContent: 'space-between', padding: '120px 0 0 0', width: '100%' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--gutter)', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div variants={itemVariants} className="micro-label micro-label--verified" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>
              INFRASTRUCTURE
            </motion.div>
            <motion.h2 variants={itemVariants} className="section-title">Three-Layer Architecture</motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle" style={{ maxWidth: 800 }}>
              Built on a custom stack designed for high-throughput agrarian finance and immutable ecological data storage.
            </motion.p>
            
            <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 40, marginBottom: 80 }}>
              <BentoCard accent="slate" delay={0}>
                <div style={{ borderBottom: '1px solid var(--color-oracle-slate)', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em' }}>LAYER 1</div>
                  <h3 style={{ fontSize: '1.4rem' }}>BNB Chain</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8 }}>
                  <li>• ERC-1155 VCC Minting</li>
                  <li>• ERC-721 ACFC Minting</li>
                  <li>• Low-fee DEX Settlement</li>
                </ul>
              </BentoCard>

              <BentoCard accent="slate" delay={80}>
                <div style={{ borderBottom: '1px solid var(--color-oracle-slate)', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em' }}>LAYER 2</div>
                  <h3 style={{ fontSize: '1.4rem' }}>BNB Greenfield</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8 }}>
                  <li>• Satellite Imagery Archives</li>
                  <li>• Soil Sensor Data Logs</li>
                  <li>• Immutable Legal Deeds</li>
                </ul>
              </BentoCard>

              <BentoCard accent="slate" delay={160}>
                <div style={{ borderBottom: '1px solid var(--color-oracle-slate)', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--color-slate-60)', marginBottom: 4, letterSpacing: '0.05em' }}>LAYER 3</div>
                  <h3 style={{ fontSize: '1.4rem' }}>CREDIT-Guard</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-slate-60)', lineHeight: 1.8 }}>
                  <li>• Decentralised Oracle Network</li>
                  <li>• ZK Proof Generation</li>
                  <li>• IoT Data Ingestion Pipeline</li>
                </ul>
              </BentoCard>
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

export default Landing;
