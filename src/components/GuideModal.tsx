"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info, MousePointer2, Zap, Camera, X } from "lucide-react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/90 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ scale: 0.9, y: 20, filter: "blur(10px)" }}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden relative"
          >
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="p-8 sm:p-12 space-y-10">
              <div className="space-y-3 text-center">
                <div className="inline-flex p-3 bg-white/5 rounded-full mb-2">
                  <Info className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-serif text-white tracking-wide">Guide to the Void</h2>
                <p className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">Instructions & New Discoveries</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Interaction */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] border-b border-white/5 pb-2">The Rituals</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 p-2 bg-white/5 rounded-lg">
                        <MousePointer2 size={16} className="text-white/60" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 font-serif leading-relaxed">
                          <span className="text-white font-bold">Double-Click</span> to bury a memory in the digital soil.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 p-2 bg-white/5 rounded-lg">
                        <Zap size={16} className="text-white/60" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 font-serif leading-relaxed">
                          <span className="text-white font-bold">Single-Click</span> an orb to read and honor a soul.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Features */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-mono text-[#ffd700]/40 uppercase tracking-[0.4em] border-b border-[#ffd700]/10 pb-2">New Features</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 p-2 bg-[#ffd700]/10 rounded-lg">
                        <Zap size={16} className="text-[#ffd700]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 font-serif leading-relaxed">
                          <span className="text-[#ffd700] font-bold">The Pulse</span>: High-rated burials now emit a golden ripple visible to all travelers globally.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 p-2 bg-white/5 rounded-lg">
                        <Camera size={16} className="text-white/60" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 font-serif leading-relaxed">
                          <span className="text-white font-bold">Visual Souls</span>: You can now attach a photograph to your burials to create a richer memorial.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-xs tracking-[0.4em] uppercase transition-all duration-300 font-sans mt-4"
              >
                Begin Exploration
              </button>
            </div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors p-2"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
