"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Star, MousePointer2, Compass, Flame } from "lucide-react";

const RitualCard = ({ 
  title, 
  description, 
  icon: Icon, 
  orbColor = "74, 144, 226", 
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  orbColor?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
    className="group relative p-10 border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
  >
    {/* Animated Orb Icon */}
    <div className="relative w-16 h-16 mb-8">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-xl"
        style={{ backgroundColor: `rgba(${orbColor}, 0.3)` }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
        <Icon size={32} strokeWidth={1} />
      </div>
      {/* Flicker Effect */}
      <motion.div
        animate={{ opacity: [1, 0.4, 1, 0.7, 1] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
        className="absolute inset-0 rounded-full border border-white/20"
      />
    </div>

    <h3 className="font-serif text-2xl mb-4 text-white tracking-wide">{title}</h3>
    <p className="font-serif text-lg text-[#d1d1d1]/70 leading-relaxed font-light">
      {description}
    </p>

    {/* Corner Accent */}
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
      <div className="w-8 h-8 rounded-full blur-md" style={{ backgroundColor: `rgba(${orbColor}, 0.6)` }} />
    </div>
  </motion.div>
);

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] pb-32">
      <Navigation />

      <main className="max-w-6xl mx-auto px-10 pt-48 sm:pt-64">
        {/* Title Section */}
        <section className="mb-24 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white mb-8"
          >
            Guide to Remembrance.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-serif text-xl opacity-60 italic"
          >
            A guide for those who wish to remain, and those who seek to honor.
          </motion.p>
        </section>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RitualCard 
            delay={0.1}
            icon={MousePointer2}
            title="The Burial"
            description="Find a quiet corner in the field. Double-click the void to manifest a soul orb. Every inscription you leave is an anonymous fragment of the truth, etched forever into the digital soil."
          />
          <RitualCard 
            delay={0.2}
            orbColor="255, 215, 0"
            icon={Compass}
            title="The Compass"
            description="The floating needle in the shadow guides you toward the 'Most Honored' burials—those with high community ratings. Follow the fading trail of dust to find souls that resonated deeply with others."
          />
          <RitualCard 
            delay={0.3}
            orbColor="255, 255, 255"
            icon={Star}
            title="Star Tributes"
            description="Respect is personal. Use the 5-star rating system to honor a burial. Highly rated soul orbs will transition from a cold, distant blue to an intense, flickering gold/white glow."
          />
          <RitualCard 
            delay={0.4}
            orbColor="255, 100, 100"
            icon={Flame}
            title="Tending"
            description="A grave only exists as long as it is remembered. Frequent visits and ratings keep a soul orb from fading into the deep fog. Tend to the field, for the void is always encroaching."
          />
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-32 text-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mx-auto mb-12" />
          <p className="font-serif text-sm tracking-[0.3em] uppercase opacity-40">
            Proceed with grace.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
