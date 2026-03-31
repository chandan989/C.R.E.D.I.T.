import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isMarket = location.pathname.startsWith('/market');

  const navLinks = (
    <>
      <NavLink to="/terminal" className={`site-nav__link ${isActive('/terminal') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Terminal</NavLink>
      <div className="nav-dropdown">
        <span className={`site-nav__link ${isMarket ? 'site-nav__link--active' : ''}`} style={{ cursor: 'pointer' }}>Markets ▾</span>
        <div className="nav-dropdown__menu">
          <Link to="/market/vcc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Carbon Credits</Link>
          <Link to="/market/acfc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Forward Contracts</Link>
        </div>
      </div>
      <NavLink to="/oracle" className={`site-nav__link ${isActive('/oracle') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Oracle</NavLink>
      <NavLink to="/docs" className={`site-nav__link ${isActive('/docs') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Docs</NavLink>
    </>
  );

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo">
          <img src="/Logo.svg" alt="C.R.E.D.I.T. Logo" style={{ height: '32px', marginRight: '8px' }} />
          <span className="logo-text">C.R.E.D.I.T.</span>
        </Link>

        <nav className="site-nav">
          {navLinks}
          {walletConnected ? (
            <span className="contract-hash" onClick={() => setWalletConnected(false)} style={{ fontSize: 11 }}>
              0x71C7...8f2e
            </span>
          ) : (
            <button className="btn-protocol btn-sm" onClick={() => setWalletConnected(true)}>
              Connect Wallet
            </button>
          )}
        </nav>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`}>
        {navLinks}
        {walletConnected ? (
          <span className="contract-hash" onClick={() => setWalletConnected(false)}>0x71C7...8f2e</span>
        ) : (
          <button className="btn-protocol btn-sm" onClick={() => setWalletConnected(true)}>Connect Wallet</button>
        )}
      </div>
    </header>
  );
};

export default Header;
