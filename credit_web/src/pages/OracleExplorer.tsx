import React, { useState, useEffect } from 'react';
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
        <h1 className="section-title">Oracle Explorer</h1>
        <p className="section-subtitle">Deep-dive into the CREDIT-Guard oracle network operations.</p>
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
    </Layout>
  );
};

export default OracleExplorer;
