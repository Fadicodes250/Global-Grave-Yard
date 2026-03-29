"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface WelcomeAdsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeAdsModal({ isOpen, onClose }: WelcomeAdsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ scale: 0.9, y: 20, filter: "blur(10px)" }}
            className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          >
            {/* Soft background glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center gap-8 text-center relative z-10">
              <div className="p-4 bg-white/5 rounded-full">
                <Heart className="w-8 h-8 text-white/40" strokeWidth={1} />
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-white tracking-wide">A Message from the Creator</h2>
                
                <div className="space-y-4 font-serif text-lg text-[#d1d1d1]/70 leading-relaxed italic">
                  <p>
                    "Hi, I am Fadi, a 15-year-old developer who created this website."
                  </p>
                  <p>
                    "This site contains ads and I am very sorry for that. Please forgive us; it is just to help with a small amount of earnings to keep the graveyard drifting."
                  </p>
                </div>
              </div>

              <div className="w-12 h-px bg-white/10" />

              <button
                onClick={onClose}
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white text-xs tracking-[0.4em] uppercase transition-all duration-500 font-sans"
              >
                Proceed with Grace
              </button>
              
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                Curated with ❤️ by Malayali
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
