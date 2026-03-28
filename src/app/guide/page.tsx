"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Star, MousePointer2, Compass, Flame } from "lucide-react";
import AdSenseBanner from "@/components/AdSenseBanner";

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
            A simple guide for sharing your story and honoring others.
          </motion.p>
        </section>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RitualCard 
            delay={0.1}
            icon={MousePointer2}
            title="How to Bury"
            description="Find a quiet spot on the endless field. Double-click to plant a new soul orb. You are invited to leave a secret, a regret, or a hope. Your words are anonymous and will be guarded by the fog forever. We recommend being as honest as possible; the void does not judge, it only remembers."
          />
          <RitualCard 
            delay={0.2}
            orbColor="255, 215, 0"
            icon={Compass}
            title="The Compass"
            description="The golden needle at the top left is your guide through the darkness. It points toward the nearest highly-rated burials that have resonated with our community. If you find yourself lost, follow the trail of ghostly dust particles; they will lead you toward the most profound memories in the field."
          />
          <RitualCard 
            delay={0.3}
            orbColor="255, 255, 255"
            icon={Star}
            title="Star Tributes"
            description="If a message moves you, grant it a star. These tributes are more than just likes; they feed the light of the soul orb. As a burial gathers stars, it grows brighter, turning from a cold blue to a brilliant, flickering gold. Your appreciation ensures that the most impactful stories are never lost to the deep fog."
          />
          <RitualCard 
            delay={0.4}
            orbColor="255, 100, 100"
            icon={Flame}
            title="Tending the Field"
            description="A memory only dies when it is forgotten. By visiting a burial, reading its inscription, and leaving a rating, you are 'tending' the field. This collective act of remembrance prevents the lights from fading. The more a spot is visited, the stronger its presence becomes in the digital afterlife."
          />
        </div>

        {/* Community Guidelines */}
        <section className="mt-32 max-w-4xl mx-auto border-t border-white/5 pt-24">
          <h2 className="font-serif text-3xl text-white mb-12">Universal Guidelines</h2>
          <div className="space-y-12 font-serif text-lg leading-relaxed opacity-70">
            <p>
              The Global Graveyard is a sanctuary for authentic human expression. To maintain the solemnity of the field, we ask all travelers to observe several core principles:
            </p>
            <ul className="space-y-6 list-disc pl-6 italic">
              <li>
                <strong>Respect the Silence:</strong> While we encourage honesty, we do not permit hate speech, harassment, or explicit threats. The void is a place for release, not for causing harm to others.
              </li>
              <li>
                <strong>Anonymity is Sacred:</strong> Do not post personal identifying information about yourself or others. The power of this place comes from the freedom of being unknown.
              </li>
              <li>
                <strong>Authenticity Matters:</strong> This is a place for real feelings. We discourage spam or commercial messages. Let every light represent a real moment of human existence.
              </li>
            </ul>
            <p>
              By participating in the burial ritual, you agree to these standards. The Caretaker reserves the right to fade any lights that violate the peace of the graveyard.
            </p>
          </div>
        </section>

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

        <AdSenseBanner dataAdSlot="6604671133" className="mt-8 border-t border-[#d1d1d1]/10 pt-16" />
      </main>
    </div>
  );
}
