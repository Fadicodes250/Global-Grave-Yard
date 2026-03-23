"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";

const FadeInText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className="mb-8"
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] selection:bg-[#d1d1d1] selection:text-[#050505] pb-32">
      <Navigation />

      <main className="max-w-4xl mx-auto px-10 pt-48 sm:pt-64">
        {/* Header Section */}
        <section className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-tight text-white"
          >
            A Monument to What <br /> We Leave Behind.
          </motion.h1>
        </section>

        {/* Intent Body */}
        <section className="space-y-16 font-serif text-lg sm:text-xl md:text-2xl leading-relaxed opacity-90">
          <FadeInText>
            The Global Graveyard is not a place of mourning, but a digital sanctuary for anonymous vulnerability. 
            In an era of performative permanence, we offer a space where the ephemeral can be etched into the void.
          </FadeInText>

          <FadeInText delay={0.2}>
            Every soul orb you see drifting on "The Field" is a fragment of a real human thought—a regret, a hope, 
            or a quiet admission of existence. By placing a marker, you are not just leaving a message; you are 
            claiming a coordinate in the collective consciousness of our digital era.
          </FadeInText>

          <FadeInText delay={0.4}>
            We invite you to wander. To read the echoes of those who came before you. To tend to the plots that 
            resonate with your own silence. Here, anonymity is the catalyst for truth, and distance is the bridge 
            to connection.
          </FadeInText>
        </section>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-full h-px bg-white/10 my-32 origin-left"
        />

        {/* Fadi Signature Section */}
        <section className="max-w-2xl">
          <FadeInText>
            <h2 className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/40 mb-12">
              Vision by Malayali
            </h2>
          </FadeInText>

          <FadeInText delay={0.2}>
            <p className="font-serif italic text-xl sm:text-2xl text-white/80 leading-relaxed">
              "My intention was to build a mirror for the interior world. In the physical realm, we are bounded by 
              gravity and time. In this digital field, we are only bounded by the reach of our vulnerability. 
              The Global Graveyard is an experiment in digital permanence—a reminder that while we may fade, 
              our impact on the void remains, pulsing like a dying candle in the dark."
            </p>
          </FadeInText>

          <FadeInText delay={0.4}>
            <div className="mt-16 flex items-center gap-4">
              <div className="w-12 h-px bg-white/20" />
              <span className="font-serif text-sm tracking-[0.3em] uppercase opacity-40">
                Curator of the Void
              </span>
            </div>
          </FadeInText>
        </section>
      </main>

      {/* Atmospheric Background Noise/Fog (Optional CSS overlay) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
    </div>
  );
}
