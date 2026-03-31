import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <div className="site-footer__grid">
        <div className="site-footer__col">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '8px' }}>
            <img src="/Logo.svg" alt="C.R.E.D.I.T. Logo" style={{ height: '20px' }} />
            <span className="logo-text" style={{ color: '#ffffff', fontSize: '14px' }}>C.R.E.D.I.T.</span>
          </div>
          <div style={{ color: '#ffffff' }}>©2026 C.R.E.D.I.T. PROTOCOL</div>
          <div style={{ marginTop: 8, color: '#a0aec0' }}>HIGH-FIDELITY dMRV · BNB CHAIN</div>
        </div>
        <div className="site-footer__col">
          <Link to="/terminal">Terminal</Link>
          <Link to="/market/vcc">Markets</Link>
          <Link to="/oracle">Oracle</Link>
          <Link to="/docs">Docs</Link>
        </div>
        <div className="site-footer__col" style={{ textAlign: 'right' }}>
          <div className="footer-status" style={{ justifyContent: 'flex-end', color: '#ffffff' }}>
            <div className="footer-status__dot" />
            <span>TESTNET: OPERATIONAL</span>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom" style={{ color: '#a0aec0', borderColor: '#333' }}>
        LAT: -3.4653 / LONG: -62.2159 · BLOCK: 38,291,044
      </div>
    </footer>
  );
};

export default Footer;
