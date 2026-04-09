import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react";
import Layout from "../components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout fullScreen>
      <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, padding: 24 }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: '100%', maxWidth: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ marginBottom: 32 }}
          >
            <ShieldAlert size={64} color="var(--color-danger)" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="micro-label micro-label--rejected"
            style={{ marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <Terminal size={12} />
            STATUS: 404 NOT FOUND
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em', color: 'var(--color-oracle-slate)' }}
          >
            Block Not Found
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '1.1rem', color: 'var(--color-slate-60)', marginBottom: 48, maxWidth: 500, lineHeight: 1.6 }}
          >
            The requested node or pathway <span className="mono" style={{ background: 'var(--color-data-mint)', color: 'var(--color-regen-emerald)', padding: '4px 8px', borderRadius: 4, border: '1px solid var(--color-regen-emerald)', fontSize: '0.9em', wordBreak: 'break-all' }}>{location.pathname}</span> does not exist in the current ledger state.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link 
              to="/"
              className="btn-protocol"
              style={{ padding: '16px 32px', fontSize: '1rem' }}
            >
              <ArrowLeft size={18} />
              Return to Genesis Block
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mono"
          style={{ position: 'absolute', bottom: 40, width: '100%', maxWidth: 'var(--max-width)', padding: '0 var(--gutter)', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--color-slate-60)', letterSpacing: '0.1em' }}
        >
          <span>SYS.ERR_ORPHAN_ROUTE</span>
          <span>{new Date().toISOString().split('T')[0]}</span>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
