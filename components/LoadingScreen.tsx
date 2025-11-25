import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  // Simulate loading duration
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] text-white">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Animated Orbits */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute w-full h-full border-2 border-blue-500/20 rounded-full border-t-blue-500"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="absolute w-48 h-48 border-2 border-purple-500/20 rounded-full border-b-purple-500"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 bg-yellow-400 rounded-full shadow-[0_0_40px_rgba(250,204,21,0.6)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-display font-bold tracking-wider mb-2">INITIALIZING STAR MAP</h2>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-400 text-sm animate-pulse">Loading High-Res Textures...</p>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 3.2, ease: "easeInOut" }}
               className="h-full bg-blue-500"
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;