"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Spade } from "lucide-react";

interface GraveModalProps {
  isOpen: boolean;
  x: number;
  y: number;
  onClose: () => void;
  onSubmit: (message: string) => Promise<void>;
}

export default function GraveModal({ isOpen, x, y, onClose, onSubmit }: GraveModalProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    await onSubmit(message);
    setIsSubmitting(false);
    setMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#0a0a0a] border border-[#d1d1d1]/20 rounded-2xl p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Background design */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d1d1d1]/30 to-transparent" />

            <div className="flex flex-col items-center gap-4 sm:gap-8 text-center">
              <div className="p-4 bg-[#d1d1d1]/5 rounded-full">
                <Spade className="w-8 h-8 text-[#d1d1d1]/70" strokeWidth={1.5} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-serif text-[#d1d1d1] tracking-wide">
                  Lay a Digital Soul to Rest
                </h2>
                <p className="text-sm font-mono text-[#d1d1d1]/50 tracking-widest uppercase">
                  Location: X {Math.round(x)} | Y {Math.round(y * -1)}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inscribe a memory, a thought, or a forgotten era..."
                  rows={3}
                  required
                  maxLength={500}
                  className="w-full bg-[#050505] border border-[#d1d1d1]/10 rounded-xl p-4 text-[#d1d1d1] placeholder:text-[#d1d1d1]/30 focus:outline-none focus:border-[#d1d1d1]/40 transition-colors resize-none font-serif text-base sm:text-lg leading-relaxed mix-blend-plus-lighter"
                />

                <div className="flex gap-4 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setMessage("");
                      onClose();
                    }}
                    className="flex-1 py-3 px-6 rounded-xl border border-[#d1d1d1]/10 text-[#d1d1d1]/60 text-sm tracking-widest uppercase hover:bg-[#d1d1d1]/5 transition-colors"
                  >
                    Abandon
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="flex-1 py-3 px-6 rounded-xl bg-[#d1d1d1]/10 text-[#d1d1d1] border border-[#d1d1d1]/20 text-sm tracking-widest uppercase hover:bg-[#d1d1d1]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "Digging..." : "Engrave"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
