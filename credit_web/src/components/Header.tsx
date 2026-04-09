import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ethers } from 'ethers';

export type UserRole = 'investor' | 'farmer';

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>((localStorage.getItem('credit_role') as UserRole) || null);
  const [showRolePicker, setShowRolePicker] = useState(false); // Full-screen role picker after wallet connect
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if wallet is already connected on load
  useEffect(() => {
    const checkConnection = async () => {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0].address);
        }
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
        
        // Switch or ADD BSC Testnet
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x61',
                  chainName: 'BNB Smart Chain Testnet',
                  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                  nativeCurrency: { name: 'BNB', symbol: 'tBNB', decimals: 18 },
                  blockExplorerUrls: ['https://testnet.bscscan.com']
                }
              ],
            });
          }
        }
        setWalletAddress(accounts[0]);
        // If no role selected yet, show the role picker
        if (!localStorage.getItem('credit_role')) {
          setShowRolePicker(true);
        }
      } catch (err) {
        console.error("User rejected request or error occurred", err);
      }
    } else {
      alert("Please install MetaMask to interact with the C.R.E.D.I.T. protocol!");
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
    if (newRole === 'farmer') {
      navigate('/farmer');
    } else {
      navigate('/terminal');
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isMarket = location.pathname.startsWith('/market');

  // Role-specific navigation: farmers don't see market, investors don't see farmer portal
  const navLinks = (
    <>
      <NavLink to="/terminal" className={`site-nav__link ${isActive('/terminal') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Terminal</NavLink>
      {role !== 'farmer' && (
        <div className="nav-dropdown">
          <span className={`site-nav__link ${isMarket ? 'site-nav__link--active' : ''}`} style={{ cursor: 'pointer' }}>Markets ▾</span>
          <div className="nav-dropdown__menu">
            <Link to="/market/vcc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Carbon Credits</Link>
            <Link to="/market/acfc" className="nav-dropdown__item" onClick={() => setMobileOpen(false)}>Forward Contracts</Link>
          </div>
        </div>
      )}
      <NavLink to="/oracle" className={`site-nav__link ${isActive('/oracle') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>Oracle</NavLink>
      {role === 'farmer' && (
        <NavLink to="/farmer" className={`site-nav__link ${isActive('/farmer') ? 'site-nav__link--active' : ''}`} onClick={() => setMobileOpen(false)}>My Farm</NavLink>
      )}
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
                {/* Role Selector Dropdown */}
                {role && (
                  <div
                    onClick={() => setShowRoleMenu(!showRoleMenu)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
                      background: role === 'farmer' ? 'rgba(245,158,11,0.15)' : 'rgba(14,220,122,0.1)',
                      border: `1px solid ${role === 'farmer' ? 'rgba(245,158,11,0.3)' : 'rgba(14,220,122,0.2)'}`,
                      fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em',
                      color: role === 'farmer' ? '#f59e0b' : 'var(--color-regen-emerald)',
                    }}
                  >
                    {role === 'farmer' ? '🌾 Farmer' : '📊 Investor'}
                    <ChevronDown size={12} />
                  </div>
                )}
                {showRoleMenu && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 60, marginTop: 6, zIndex: 9999,
                    background: '#1a1d20', border: '1px solid rgba(14,220,122,0.2)', borderRadius: 8,
                    overflow: 'hidden', minWidth: 160, boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                  }}>
                    <div
                      onClick={() => selectRole('investor')}
                      style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, background: role === 'investor' ? 'rgba(14,220,122,0.1)' : 'transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,220,122,0.1)')}
                      onMouseLeave={e => (e.currentTarget.style.background = role === 'investor' ? 'rgba(14,220,122,0.1)' : 'transparent')}
                    >
                      📊 Investor / Auditor
                    </div>
                    <div
                      onClick={() => selectRole('farmer')}
                      style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, background: role === 'farmer' ? 'rgba(245,158,11,0.1)' : 'transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.1)')}
                      onMouseLeave={e => (e.currentTarget.style.background = role === 'farmer' ? 'rgba(245,158,11,0.1)' : 'transparent')}
                    >
                      🌾 Farmer / Producer
                    </div>
                  </div>
                )}
                {/* Wallet Address */}
                <span className="contract-hash" onClick={disconnectWallet} title="Disconnect Wallet" style={{ fontSize: 11, cursor: 'pointer', background: 'var(--data-mint)', color: 'var(--regen-emerald)' }}>
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            ) : (
              <button className="btn-protocol btn-sm" onClick={connectWallet}>
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
          {walletAddress ? (
            <span className="contract-hash" onClick={disconnectWallet} title="Disconnect" style={{ cursor: 'pointer' }}>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          ) : (
            <button className="btn-protocol btn-sm" onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </header>

      {/* Full-screen Role Picker Modal — shows after wallet connect if no role chosen */}
      {showRolePicker && walletAddress && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 500, padding: 40 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Welcome to C.R.E.D.I.T.</h2>
            <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 32 }}>
              Connected as <span style={{ color: 'var(--color-regen-emerald)', fontFamily: 'var(--font-mono)' }}>{walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</span>. 
              Choose how you want to use the protocol.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Farmer Card */}
              <div
                onClick={() => selectRole('farmer')}
                style={{
                  padding: 32, borderRadius: 12, cursor: 'pointer',
                  background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.15)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.05)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌾</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f59e0b', marginBottom: 8 }}>I am a Farmer</div>
                <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>Register your farm, monitor IoT sensors, and earn carbon credits from your land.</p>
              </div>
              {/* Investor Card */}
              <div
                onClick={() => selectRole('investor')}
                style={{
                  padding: 32, borderRadius: 12, cursor: 'pointer',
                  background: 'rgba(14,220,122,0.05)', border: '1px solid rgba(14,220,122,0.2)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,220,122,0.15)'; e.currentTarget.style.borderColor = 'rgba(14,220,122,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(14,220,122,0.05)'; e.currentTarget.style.borderColor = 'rgba(14,220,122,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📊</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-regen-emerald)', marginBottom: 8 }}>I am an Investor</div>
                <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>Buy carbon credits, invest in forward contracts, and fund sustainable agriculture.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
