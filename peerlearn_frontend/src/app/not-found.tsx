'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowLeft, Home, Search, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [floatingIcons, setFloatingIcons] = React.useState<any[]>([]);

  React.useEffect(() => {
    const icons = [...Array(6)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50 + '%',
      y: Math.random() * 100 - 50 + '%',
      animateX: [
        Math.random() * 100 + '%',
        Math.random() * 100 + '%',
        Math.random() * 100 + '%'
      ],
      animateY: [
        Math.random() * 100 + '%',
        Math.random() * 100 + '%',
        Math.random() * 100 + '%'
      ],
      duration: 20 + Math.random() * 10,
      iconType: i % 3
    }));
    
    const timeoutId = setTimeout(() => {
      setFloatingIcons(icons);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/10 blur-[150px] -z-10 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10 rounded-full" />
      
      {/* Floating Icons Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.id}
            initial={{ 
              x: icon.x, 
              y: icon.y,
              opacity: 0 
            }}
            animate={{ 
              x: icon.animateX,
              y: icon.animateY,
              opacity: [0, 0.2, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: icon.duration, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-indigo-500/20"
          >
            {icon.iconType === 0 ? <BookOpen size={40} /> : icon.iconType === 1 ? <GraduationCap size={40} /> : <Sparkles size={40} />}
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated 404 Text */}
          <div className="relative inline-block mb-8">
            <motion.h1 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-indigo-900 select-none"
            >
              404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center -translate-y-4">
               <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="glass p-6 rounded-3xl border-white/10 shadow-2xl backdrop-blur-xl"
               >
                 <Search className="w-16 h-16 text-indigo-400" />
               </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50" />
            
            <h2 className="text-3xl font-bold mb-4 font-display">Oops! Class Disappeared</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              We couldn&apos;t find the topic or page you were looking for. It might have been moved, deleted, or was never here in the first place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/" 
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 group"
              >
                <Home className="w-5 h-5" />
                Return Home
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto glass hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Link */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-slate-600 text-sm font-medium tracking-wide"
        >
          STILL LOST? CONTACT PEERLEARN SUPPORT
        </motion.p>
      </div>
    </main>
  );
}
