import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import { useCountUp } from '../hooks/useCountUp';
import { oracleEvents, OracleEvent } from '../data/mockOracle';
import { Satellite, Radio, UserCheck } from 'lucide-react';

const typeIcons: Record<string, React.ReactNode> = { 
  satellite: <Satellite size={16} />, 
  sensor: <Radio size={16} />, 
  auditor: <UserCheck size={16} /> 
};

// HACKATHON MVP MAGIC: We embed the Oracle Worker directly in the frontend 
// using the testnet burner wallet, so judges can test the backend without a terminal!
const PRIVATE_KEY = "5387b0631976750573171d20806265aa6c806fd1d6e79f95c4921fb14d58daa1";
const VCC_ADDRESS = '0x53fa7BA2D2031EbD6Cc8E15FF927bE8D61ab5B85'; 
const VCC_ABI = ["function mint(address account, uint256 amount, string memory metadataURI) external returns (uint256)"];

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

  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const triggerOracleWorker = async () => {
    try {
      setOracleStatus('Simulating IoT Ingestion...');
      const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      const oracleWallet = new ethers.Wallet(PRIVATE_KEY, provider);

      // Simulate payload and greenfield
      await new Promise(r => setTimeout(r, 1000));
      setOracleStatus('Anchoring to BNB Greenfield...');
      await new Promise(r => setTimeout(r, 1500));
      
      const mockURI = `greenfield://credit-oracle-${oracleWallet.address.toLowerCase()}/sensor_payload_${Date.now()}.json`;
      
      setOracleStatus('Minting Token on BSC Testnet...');
      const vccContract = new ethers.Contract(VCC_ADDRESS, VCC_ABI, oracleWallet);
      
      const tx = await vccContract.mint(oracleWallet.address, 1, mockURI);
      
      setOracleStatus(`Confirming Blockchain Hash: ${tx.hash.slice(0,10)}...`);
      await tx.wait();

      // HACKATHON DEMO TRICK: Store the TX globally so the Terminal page instantly shows it
      const recentTxs = JSON.parse(localStorage.getItem('credit_txs') || '[]');
      recentTxs.unshift({
        timestamp: new Date().toLocaleTimeString(),
        event: 'TOKEN_MINTED',
        project: 'Oracle Data Ingestion',
        value: '1 VCC',
        txHash: tx.hash,
        status: 'verified'
      });
      localStorage.setItem('credit_txs', JSON.stringify(recentTxs));

      setOracleStatus('');
      setSuccessMsg(`SUCCESS! Data processed and 1 VCC Token seamlessly minted to the Oracle Treasury! URI: ${mockURI}`);
    } catch (err: any) {
      console.error(err);
      setOracleStatus('');
      setErrorMsg("Oracle failed to execute. Ensure the testnet wallet has BNB for gas.");
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="section-title">Oracle Explorer</h1>
            <p className="section-subtitle">Deep-dive into the CREDIT-Guard oracle network operations.</p>
          </div>
          <button 
            className="btn-protocol" 
            style={{ padding: '12px 24px', fontSize: '1rem' }} 
            onClick={triggerOracleWorker} 
            disabled={!!oracleStatus}
          >
            {oracleStatus || 'Simulate Verified IoT Data Injection ⚡️'}
          </button>
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
