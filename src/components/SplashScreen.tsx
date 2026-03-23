"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleEnter = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onEnter();
    }, 1500); // Wait for the exit animation to finish
  };

  const title = "Global Graveyard".split("");

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Fog/Smoke overlay background */}
          <motion.div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(209,209,209,0.1) 0%, rgba(5,5,5,0) 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 30% 70%, rgba(209,209,209,0.15) 0%, rgba(5,5,5,0) 60%)",
            }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: ["10%", "-10%", "10%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            
            {/* Title with scattering and glowing hover effect */}
            <motion.h1 
              className="text-4xl sm:text-7xl lg:text-8xl font-serif font-light text-[#d1d1d1] tracking-[0.2em] sm:tracking-widest flex items-center justify-center cursor-default text-center px-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.5 },
                },
              }}
            >
              {title.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.2,
                    y: (Math.random() - 0.5) * 20,
                    x: (Math.random() - 0.5) * 20,
                    filter: "blur(2px) drop-shadow(0 0 10px rgba(209,209,209,0.8))",
                    color: "#ffffff",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Entrance Button */}
            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(209, 209, 209, 0.05)",
                textShadow: "0 0 8px rgba(209,209,209,0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 mt-8 border border-[#d1d1d1]/20 rounded-full text-[#d1d1d1]/80 text-xs md:text-sm tracking-[0.3em] uppercase transition-all duration-500 font-sans hover:border-[#d1d1d1]/50"
            >
              Press to Descend
            </motion.button>
          </div>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 3, duration: 2 }}
            className="absolute bottom-6 right-8 mt-12 font-serif italic text-xs text-[#d1d1d1]/30 tracking-[0.3em] lowercase"
          >
            By Malayali
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
