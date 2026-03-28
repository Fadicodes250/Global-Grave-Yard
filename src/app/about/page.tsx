"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import AdSenseBanner from "@/components/AdSenseBanner";

const FadeInText = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={`mb-8 ${className}`}
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

          <FadeInText delay={0.6}>
            <h3 className="font-serif text-white text-2xl mb-6">The Philosophy of the Void</h3>
            <p className="text-lg opacity-80 leading-relaxed">
              In the age of the permanent digital footprint, the Global Graveyard stands as a paradox: a place where the weight of your identity is lifted, allowing for a different kind of permanence. We believe that some truths can only be spoken when no one is watching, and that these hidden truths are the most vital parts of the human experience. 
              By burying a memory here, you aren't just letting go; you are contributing to a collective tapestry of human emotion that spans the entire globe.
            </p>
          </FadeInText>

          <FadeInText delay={0.8}>
            <p className="text-lg opacity-80 leading-relaxed">
              This field was not built for data or algorithms. It was built for the quiet moments in the middle of the night when you need to say something that can't be said to a friend, a partner, or a screen that knows your name. It is a sanctuary for the unspoken, an archive of the heart, and a tribute to the beautiful complexity of the people we pass on the street every day.
            </p>
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

          <FadeInText delay={0.6} className="mt-24">
            <h3 className="font-serif text-white text-xl mb-6">The Caretaker's Pledge</h3>
            <p className="font-serif text-lg opacity-60 leading-relaxed italic">
              "As your caretaker, my only duty is to keep the lights burning and the fog drifting. I do not own your memories; I only guard the field where they rest. This space will always remain free to enter, always anonymous, and always here for those who need it. We are all just travelers in the dark, and it is my honor to provide a map for your journey."
            </p>
          </FadeInText>
        </section>

        <AdSenseBanner dataAdSlot="6604671133" className="mt-24 border-t border-[#d1d1d1]/10 pt-16" />
      </main>

      {/* Atmospheric Background Noise/Fog (Optional CSS overlay) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
    </div>
  );
}
