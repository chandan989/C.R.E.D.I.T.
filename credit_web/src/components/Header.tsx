import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ethers } from 'ethers';

export type UserRole = 'investor' | 'farmer' | 'admin';

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>((localStorage.getItem('credit_role') as UserRole) || null);
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) setWalletAddress(accounts[0].address);
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    if (ethereum) {
      try {
        const provider = new ethers.BrowserProvider(ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        try {
          await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x61' }] });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x61', chainName: 'BNB Smart Chain Testnet',
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                nativeCurrency: { name: 'BNB', symbol: 'tBNB', decimals: 18 },
                blockExplorerUrls: ['https://testnet.bscscan.com']
              }],
            });
          }
        }
        setWalletAddress(accounts[0]);
        if (!localStorage.getItem('credit_role')) setShowRolePicker(true);
      } catch (err) { console.error(err); }
    } else {
      alert("Please install MetaMask!");
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('credit_role');
    setRole(null);
  };

  const selectRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('credit_role', newRole);
    setShowRolePicker(false);
    setShowRoleMenu(false);
    if (newRole === 'farmer') navigate('/farmer');
    else if (newRole === 'admin') navigate('/terminal');
    else navigate('/market/vcc');
  };

  const isActive = (path: string) => location.pathname === path;
  const isMarket = location.pathname.startsWith('/market');

  const roleLabel = role === 'farmer' ? '🌾 Farmer' : role === 'admin' ? '⚙️ Admin' : '📊 Investor';
  const roleColor = role === 'farmer' ? '#f59e0b' : role === 'admin' ? '#8b5cf6' : 'var(--color-regen-emerald)';
  const roleBg = role === 'farmer' ? 'rgba(245,158,11,0.15)' : role === 'admin' ? 'rgba(139,92,246,0.15)' : 'rgba(14,220,122,0.1)';
  const roleBorder = role === 'farmer' ? 'rgba(245,158,11,0.3)' : role === 'admin' ? 'rgba(139,92,246,0.3)' : 'rgba(14,220,122,0.2)';

  const navLinks = (
    <>
      {/* Farmer */}
      {role === 'farmer' && (
        <NavLink to="/farmer" className={`site-nav__link ${isActive('/farmer') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>My Farm</NavLink>
      )}
      {/* Investor */}
      {role === 'investor' && (
        <div className="nav-dropdown">
          <span className={`site-nav__link ${isMarket ? 'site-nav__link--active' : ''}`} style={{ cursor: 'pointer' }}>Markets ▾</span>
          <div className="nav-dropdown__menu">
            <Link to="/market/vcc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Carbon Credits</Link>
            <Link to="/market/acfc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Forward Contracts</Link>
          </div>
        </div>
      )}
      {role === 'investor' && (
        <NavLink to="/portfolio" className={`site-nav__link ${isActive('/portfolio') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>My Portfolio</NavLink>
      )}
      {/* Admin */}
      {role === 'admin' && (
        <NavLink to="/terminal" className={`site-nav__link ${isActive('/terminal') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Dashboard</NavLink>
      )}
      {role === 'admin' && (
        <NavLink to="/oracle" className={`site-nav__link ${isActive('/oracle') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Oracle</NavLink>
      )}
      {role === 'admin' && (
        <div className="nav-dropdown">
          <span className={`site-nav__link ${isMarket ? 'site-nav__link--active' : ''}`} style={{ cursor: 'pointer' }}>Markets ▾</span>
          <div className="nav-dropdown__menu">
            <Link to="/market/vcc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Carbon Credits</Link>
            <Link to="/market/acfc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Forward Contracts</Link>
          </div>
        </div>
      )}
      {/* Common */}
      <NavLink to="/docs" className={`site-nav__link ${isActive('/docs') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Docs</NavLink>
    </>
  );

  return (
    <>
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <Link to="/" className="site-header__logo">
            <img src="/Logo.svg" alt="C.R.E.D.I.T. Logo" style={{ height: '32px', marginRight: '8px' }} />
            <span className="logo-text">C.R.E.D.I.T.</span>
          </Link>

          <nav className="site-nav">
            {navLinks}
            {walletAddress ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
                {role && (
                  <div
                    onClick={() => setShowRoleMenu(!showRoleMenu)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
                      background: roleBg, border: `1px solid ${roleBorder}`,
                      fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em',
                      color: roleColor,
                    }}
                  >
                    {roleLabel}
                    <ChevronDown size={12} />
                  </div>
                )}
                {showRoleMenu && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 60, marginTop: 6, zIndex: 9999,
                    background: '#1a1d20', border: '1px solid rgba(14,220,122,0.2)', borderRadius: 8,
                    overflow: 'hidden', minWidth: 180, boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                  }}>
                    {(['investor', 'farmer', 'admin'] as UserRole[]).map(r => {
                      const labels: Record<UserRole, string> = { investor: '📊 Investor', farmer: '🌾 Farmer', admin: '⚙️ Protocol Admin' };
                      const colors: Record<UserRole, string> = { investor: 'rgba(14,220,122,0.1)', farmer: 'rgba(245,158,11,0.1)', admin: 'rgba(139,92,246,0.1)' };
                      return (
                        <div
                          key={r}
                          onClick={() => selectRole(r)}
                          style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, background: role === r ? colors[r] : 'transparent' }}
                          onMouseEnter={e => (e.currentTarget.style.background = colors[r])}
                          onMouseLeave={e => (e.currentTarget.style.background = role === r ? colors[r] : 'transparent')}
                        >
                          {labels[r]}
                        </div>
                      );
                    })}
                  </div>
                )}
                <span className="contract-hash" onClick={disconnectWallet} title="Disconnect Wallet" style={{ fontSize: 11, cursor: 'pointer', background: 'var(--data-mint)', color: 'var(--regen-emerald)' }}>
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            ) : (
              <button className="btn-protocol btn-sm" onClick={connectWallet}>Connect Wallet</button>
            )}
          </nav>

          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`}>
          {navLinks}
          {walletAddress ? (
            <span className="contract-hash" onClick={disconnectWallet} title="Disconnect" style={{ cursor: 'pointer' }}>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          ) : (
            <button className="btn-protocol btn-sm" onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </header>

      {/* Role Picker Modal */}
      {showRolePicker && walletAddress && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 700, padding: 40 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Welcome to C.R.E.D.I.T.</h2>
            <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 32 }}>
              Connected as <span style={{ color: 'var(--color-regen-emerald)', fontFamily: 'var(--font-mono)' }}>{walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</span>. Choose your role.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              {/* Farmer */}
              <div onClick={() => selectRole('farmer')} style={{ padding: 28, borderRadius: 12, cursor: 'pointer', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌾</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f59e0b', marginBottom: 8 }}>Farmer</div>
                <p style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>Register farm, trigger IoT sensors, earn carbon credits.</p>
              </div>
              {/* Investor */}
              <div onClick={() => selectRole('investor')} style={{ padding: 28, borderRadius: 12, cursor: 'pointer', background: 'rgba(14,220,122,0.05)', border: '1px solid rgba(14,220,122,0.2)', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,220,122,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(14,220,122,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📊</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-regen-emerald)', marginBottom: 8 }}>Investor</div>
                <p style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>Buy carbon credits, invest in forward contracts.</p>
              </div>
              {/* Admin */}
              <div onClick={() => selectRole('admin')} style={{ padding: 28, borderRadius: 12, cursor: 'pointer', background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚙️</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#8b5cf6', marginBottom: 8 }}>Protocol Admin</div>
                <p style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>Dashboard, Oracle pipeline, and protocol metrics.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
