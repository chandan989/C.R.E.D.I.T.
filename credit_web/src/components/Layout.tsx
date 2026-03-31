import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-h)' }}>
        <div className="page-enter">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
