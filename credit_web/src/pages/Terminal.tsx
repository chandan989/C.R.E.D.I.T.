import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Layout from '../components/Layout';
import BentoCard from '../components/BentoCard';
import ContractHash from '../components/ContractHash';
import ProgressRhombus from '../components/ProgressRhombus';
import { useCountUp } from '../hooks/useCountUp';
import { sequestrationData, creditPriceData, nodeCountData, topProjects, activityFeed } from '../data/mockCharts';

const Terminal: React.FC = () => {
  const seqRate = useCountUp(14280.42, 1500, 2);
  const trustScore = useCountUp(99.8, 1200, 1);
  const nodes = useCountUp(1204, 1200);
  const price = useCountUp(2.47, 1200, 2);

  const tickerText = 'BLOCK 38,291,044 · GAS 3.2 GWEI · $CREDIT $2.47 (+3.2%) · VCC FLOOR $14.80 · ORACLE NODES 1,204 · SEQUESTRATION RATE +2.4T/hr · ';

  return (
    <Layout>
      {/* Ticker */}
      <div className="ticker-bar">
        <div className="ticker-bar__content">
          {tickerText}{tickerText}
        </div>
      </div>

      {/* Key Metrics */}
      <section className="section" style={{ paddingBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          <BentoCard accent="emerald" delay={0}>
            <div style={{ fontSize: 12, color: 'var(--color-slate-60)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Current Sequestration Rate</div>
            <div style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{seqRate.toLocaleString()} <span style={{ fontSize: 14, color: 'var(--color-slate-60)' }}>TONS CO₂e</span></div>
            <ProgressRhombus current={3} total={5} />
            <div className="micro-label micro-label--verified" style={{ marginTop: 8 }}>LIVE FEED: AMAZON BASIN / PROJECT_77</div>
          </BentoCard>
          <BentoCard accent="emerald" verified delay={80}>
            <div style={{ fontSize: 12, color: 'var(--color-slate-60)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Protocol Trust Score</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{trustScore}%</div>
            <ContractHash hash="0x71C7a034B91f24E13c8d8b7D59C4Fe2b44e38f2e44" />
          </BentoCard>
          <BentoCard accent="emerald" delay={160}>
            <div style={{ fontSize: 12, color: 'var(--color-slate-60)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Active Oracle Nodes</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>{nodes}</div>
            <div style={{ height: 60 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={nodeCountData}>
                  <Line type="monotone" dataKey="nodes" stroke="#0EDC7A" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
          <BentoCard accent="emerald" delay={240}>
            <div style={{ fontSize: 12, color: 'var(--color-slate-60)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>$CREDIT Price</div>
            <div style={{ fontSize: '2rem', fontWeight: 600 }}>${price} <span style={{ fontSize: 14, color: 'var(--color-regen-emerald)' }}>+3.2%</span></div>
            <div style={{ height: 60 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={creditPriceData}>
                  <Area type="monotone" dataKey="price" stroke="#0EDC7A" fill="rgba(14,220,122,0.1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Charts */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <BentoCard accent="slate" delay={0}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Cumulative Sequestration (2025–2026)</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sequestrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,29,32,0.08)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="tons" stroke="#0EDC7A" fill="rgba(14,220,122,0.1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
          <BentoCard accent="slate" delay={80}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Top Projects by Impact</h3>
            {topProjects.map((p, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-slate-60)' }}>{p.region}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(26,29,32,0.08)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${(p.tons / 42180) * 100}%`, background: 'var(--color-regen-emerald)', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-60)', marginTop: 2 }}>{p.tons.toLocaleString()} TONS</div>
              </div>
            ))}
          </BentoCard>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="section" style={{ paddingTop: 0 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Recent Protocol Activity</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event</th>
                <th>Project</th>
                <th>Value</th>
                <th>TX Hash</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activityFeed.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{row.timestamp}</td>
                  <td><span className="micro-label">{row.event}</span></td>
                  <td>{row.project}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{row.value}</td>
                  <td><ContractHash hash={row.txHash} /></td>
                  <td>
                    <span className={`micro-label ${row.status === 'verified' ? 'micro-label--verified' : 'micro-label--pending'}`}>
                      {row.status === 'verified' ? 'Verified ✓' : 'Pending ◷'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default Terminal;
