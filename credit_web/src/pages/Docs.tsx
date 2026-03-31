import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';

const sections = [
  { id: 'overview', label: 'Overview', sub: false },
  { id: 'problem', label: 'The Problem', sub: false },
  { id: 'solution', label: 'The CREDIT Solution', sub: false },
  { id: 'vcc', label: 'Verified Carbon Credits', sub: true },
  { id: 'acfc', label: 'Forward Contracts', sub: true },
  { id: 'architecture', label: 'Technical Architecture', sub: false },
  { id: 'bnb-chain', label: 'BNB Chain', sub: true },
  { id: 'greenfield', label: 'BNB Greenfield', sub: true },
  { id: 'oracle', label: 'CREDIT-Guard Oracle', sub: true },
  { id: 'pipeline', label: 'Verification Pipeline', sub: true },
  { id: 'tokenomics', label: 'Tokenomics', sub: false },
  { id: 'credit-token', label: '$CREDIT Token', sub: true },
  { id: 'insurance', label: 'Climate Insurance', sub: true },
  { id: 'getting-started', label: 'Getting Started', sub: false },
];

const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    const headings = contentRef.current?.querySelectorAll('[id]');
    headings?.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout>
      <div className="docs-layout">
        <nav className="docs-sidebar">
          {sections.map(s => (
            <a
              key={s.id}
              className={`docs-sidebar__item ${s.sub ? 'docs-sidebar__item--sub' : ''} ${activeSection === s.id ? 'docs-sidebar__item--active' : ''}`}
              onClick={() => scrollTo(s.id)}
              href={`#${s.id}`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="docs-content" ref={contentRef}>
          <h1 id="overview">C.R.E.D.I.T. Protocol Documentation</h1>
          <p>Carbon & Regenerative Ecological Derivatives Investment Token — the transparent ledger for institutional ecological asset verification.</p>

          <h2 id="problem">The Problem</h2>
          <p>The voluntary carbon market is plagued by three systemic failures:</p>
          <ul>
            <li><strong>Opacity:</strong> Manual verification processes are slow, expensive, and prone to fraud. Over 40% of carbon credits in circulation have questionable additionality claims.</li>
            <li><strong>Fragmentation:</strong> Smallholder farmers in the Global South — responsible for the majority of regenerative agriculture — are effectively locked out of carbon markets due to high entry costs and complex compliance requirements.</li>
            <li><strong>Latency:</strong> Traditional carbon credit issuance takes 12–24 months. By the time credits are verified, the market conditions have shifted, and farmer incentives have evaporated.</li>
          </ul>

          <h2 id="solution">The CREDIT Solution</h2>
          <p>C.R.E.D.I.T. deploys a fully on-chain, oracle-driven verification pipeline that transforms raw environmental data into institutional-grade financial instruments in near-real-time.</p>

          <h3 id="vcc">Verified Carbon Credits (CREDIT-VCC)</h3>
          <p>Each CREDIT-VCC token represents exactly <strong>1 metric ton of verified CO₂ sequestration</strong>. The token is minted as an ERC-1155 fungible asset on BNB Chain, with its complete data provenance archived immutably on BNB Greenfield.</p>
          <table>
            <thead><tr><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td>ERC-1155</td></tr>
              <tr><td>Fungibility</td><td>Fungible</td></tr>
              <tr><td>Unit</td><td>1 VCC = 1 metric ton CO₂e</td></tr>
              <tr><td>Backing</td><td>BNB Greenfield data archive</td></tr>
              <tr><td>Verification</td><td>ZK-proof validated dMRV pipeline</td></tr>
            </tbody>
          </table>

          <h3 id="acfc">Agricultural Forward Contracts (CREDIT-ACFC)</h3>
          <p>CREDIT-ACFC tokens are ERC-721 non-fungible tokens representing unique forward contracts on future agricultural production. Farmers tokenise a percentage of their expected harvest, and investors purchase at a discount, providing immediate working capital.</p>

          <h2 id="architecture">Technical Architecture</h2>

          <h3 id="bnb-chain">BNB Chain</h3>
          <p>BNB Chain serves as the settlement layer for all CREDIT protocol transactions. Its high throughput (2,000+ TPS) and low gas costs make it ideal for high-frequency oracle updates and micro-transactions from smallholder farmers.</p>

          <h3 id="greenfield">BNB Greenfield</h3>
          <p>BNB Greenfield provides the decentralised data storage layer. Every piece of dMRV evidence — satellite imagery, IoT sensor readings, third-party audit reports — is permanently archived with cryptographic integrity guarantees.</p>

          <h3 id="oracle">CREDIT-Guard Oracle Network</h3>
          <p>The CREDIT-Guard oracle is a purpose-built decentralised oracle network consisting of 1,200+ validator nodes. Nodes ingest data from three tiers:</p>
          <ul>
            <li><strong>Tier 1 — Satellite:</strong> Multispectral and SAR imagery from Sentinel-2, Landsat-8, and commercial providers.</li>
            <li><strong>Tier 2 — IoT Sensors:</strong> Ground-deployed soil moisture, carbon flux, and weather stations.</li>
            <li><strong>Tier 3 — Auditors:</strong> Human-verified audit reports and methodology compliance checks.</li>
          </ul>

          {/* Styled Flow Diagram */}
          <h3 id="pipeline">Verification Pipeline</h3>
          <div className="flow-diagram" style={{ flexWrap: 'wrap' }}>
            <div className="flow-step flow-step--active">Data Ingestion</div>
            <div className="flow-arrow" />
            <div className="flow-step flow-step--active">Aggregation</div>
            <div className="flow-arrow" />
            <div className="flow-step flow-step--active">ZK Proof Generation</div>
            <div className="flow-arrow" />
            <div className="flow-step flow-step--active">Greenfield Archive</div>
            <div className="flow-arrow" />
            <div className="flow-step flow-step--active">Token Minting</div>
          </div>
          <p>The entire pipeline executes in under 5 seconds for routine verification events, with complex multi-source correlations completing within 30 seconds.</p>

          <h2 id="tokenomics">Tokenomics</h2>

          <h3 id="credit-token">$CREDIT Token</h3>
          <p>$CREDIT is the native utility token of the protocol. It is used for:</p>
          <ul>
            <li><strong>Fee Payment:</strong> Protocol fees for minting, trading, and settling tokens are paid in $CREDIT.</li>
          </ul>


          <h3 id="insurance">Climate Insurance Treasury</h3>
          <p>2% of all protocol fees are directed to the Climate Insurance Treasury (CIT). The CIT provides parametric insurance coverage for ACFC contracts affected by extreme weather events, drought, or crop disease. Claims are triggered automatically by oracle data, with no manual process required.</p>

          <h2 id="getting-started">Getting Started</h2>
          <p>To begin using the CREDIT protocol:</p>
          <ol>
            <li>Connect your BNB Chain-compatible wallet (MetaMask, Trust Wallet, etc.)</li>
            <li>Browse the Carbon Market to acquire CREDIT-VCC tokens</li>
            <li>Explore Agricultural Forward Contracts for yield-bearing investments</li>
            <li>Monitor the Oracle Explorer for real-time verification data</li>
          </ol>
          <pre>
{`// Example: Acquire VCC tokens via smart contract
const tx = await creditMarket.acquireVCC(
  tokenId,    // VCC batch ID
  quantity,   // Number of tons
  { value: ethers.utils.parseEther(price) }
);
await tx.wait();`}
          </pre>
        </div>
      </div>
    </Layout>
  );
};

export default Docs;
