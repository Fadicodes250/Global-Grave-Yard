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
            A Place to Leave <br /> Your Thoughts.
          </motion.h1>
        </section>

        {/* Intent Body */}
        <section className="space-y-16 font-serif text-lg sm:text-xl md:text-2xl leading-relaxed opacity-90">
          <FadeInText>
            The Global Graveyard is a safe place to share your secrets anonymously. 
            In a world where everything is public, we give you a space where your private thoughts can stay forever.
          </FadeInText>

          <FadeInText delay={0.2}>
            Every light you see on "The Field" is a real memory or feeling from someone like you—a regret, a hope, 
            or just a small note to say they were here. By adding your own, you are marking your spot in this digital world.
          </FadeInText>

          <FadeInText delay={0.4}>
            We invite you to explore. Read the messages left by others. Highlighting the ones that mean something to you. 
            Being anonymous makes it easier to be honest, and reading others helps us feel less alone.
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
              "I wanted to build a place that reflects our inner feelings. In the real world, we are limited by 
              time. Here, we are only limited by how honest we want to be. 
              The Global Graveyard is a reminder that even if we fade away, 
              the things we felt and shared will still be here, shining in the dark."
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
