import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ethers } from 'ethers';

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
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
            params: [{ chainId: '0x61' }], // 97 in hex
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
  };

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
          {walletAddress ? (
            <span className="contract-hash" onClick={disconnectWallet} title="Disconnect Wallet" style={{ fontSize: 11, cursor: 'pointer', background: 'var(--data-mint)', color: 'var(--regen-emerald)' }}>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
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
  );
};

export default Header;
