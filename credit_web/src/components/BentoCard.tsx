import React from 'react';

interface BentoCardProps {
  accent?: 'emerald' | 'slate' | 'warning' | 'danger';
  verified?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ accent = 'emerald', verified, className = '', style, children, onClick, delay = 0 }) => {
  return (
    <div
      className={`bento-card fade-in-card ${verified ? 'bento-card--verified' : ''} ${className}`}
      onClick={onClick}
      style={{ animationDelay: `${delay}ms`, cursor: onClick ? 'pointer' : undefined, ...style }}
    >
      <div className={`bento-card__accent bento-card__accent--${accent}`} />
      {children}
    </div>
  );
};

export default BentoCard;
