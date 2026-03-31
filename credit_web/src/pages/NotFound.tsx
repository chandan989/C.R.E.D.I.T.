import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center relative overflow-hidden selection:bg-emerald-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/10 bg-black/50 backdrop-blur-xl rounded-2xl p-10 md:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top glare */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20"
            >
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">
                Status: 404
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4"
            >
              Block Not Found
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-zinc-400 mb-10 max-w-md mx-auto"
            >
              The requested node or pathway <span className="font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md border border-emerald-400/20">{location.pathname}</span> does not exist in the current ledger state.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                to="/"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium tracking-wide overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Return to Genesis Block
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 flex justify-between items-center text-xs font-mono text-zinc-600"
        >
          <span>SYS.ERR_ORPHAN_ROUTE</span>
          <span>{new Date().toISOString().split('T')[0]}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
