import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullScreen = false }) => {
  return (
    <>
      <Header />
      <main style={fullScreen ? {} : { paddingTop: 'var(--header-h)' }}>
        <div className="page-enter" style={fullScreen ? { height: '100vh', overflow: 'hidden' } : {}}>
          {children}
        </div>
      </main>
      {!fullScreen && <Footer />}
    </>
  );
};

export default Layout;
