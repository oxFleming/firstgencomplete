import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds base duration
    const intervalTime = 40;
    const totalSteps = duration / intervalTime;
    const baseIncrement = 100 / totalSteps;

    let imagesLoaded = false;
    const handleLoad = () => { imagesLoaded = true; };
    window.addEventListener('load', handleLoad);

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Slow down near the end if images aren't definitely loaded
        const slowdownThreshold = 85;
        let actualIncrement = baseIncrement;
        
        if (prev > slowdownThreshold && !imagesLoaded) {
          actualIncrement = (100 - prev) * 0.1; // Asymptotic approach to 100
        }

        const next = prev + actualIncrement;

        if (next >= 99.9) {
          clearInterval(interval);
          setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(onComplete, 800);
            }, 400);
          }, 200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/40 backdrop-blur-3xl overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="text-sm font-bold tracking-[0.2em] text-brand-primary uppercase mb-2">First Generation Homes</div>
              <div className="h-px w-12 bg-brand-primary/30 mx-auto"></div>
            </motion.div>

            <div className="relative">
              <span className="text-8xl md:text-[120px] font-heading font-light tracking-tighter text-brand-dark flex items-baseline justify-center">
                {Math.round(progress)}
                <span className="text-5xl md:text-7xl text-brand-primary ml-1">%</span>
              </span>
            </div>

            <div className="mt-12 w-64 h-[2px] bg-gray-200/50 mx-auto rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 text-gray-500 font-light tracking-wide text-xs uppercase"
            >
              Building around you...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
