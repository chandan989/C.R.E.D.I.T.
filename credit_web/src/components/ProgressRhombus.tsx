import React from 'react';

interface ProgressRhombusProps {
  current: number;
  total: number;
  labels?: string[];
}

const ProgressRhombus: React.FC<ProgressRhombusProps> = ({ current, total, labels }) => {
  return (
    <div className="rhombus-row">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`rhombus-step ${i < current ? 'completed' : ''} ${i === current ? 'current' : ''}`}
            title={labels?.[i]}
          />
          {labels && labels[i] && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-slate-60)', marginRight: 4 }}>
              {labels[i]}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressRhombus;
