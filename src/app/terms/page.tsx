"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="mb-20"
  >
    <h2 className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/40 mb-8">{title}</h2>
    <div className="font-serif text-lg sm:text-xl leading-relaxed text-white/80 space-y-6">
      {children}
    </div>
  </motion.section>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] pb-32">
      <Navigation />

      <main className="max-w-4xl mx-auto px-10 pt-48 sm:pt-64">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white mb-24"
        >
          Terms of Service.
        </motion.h1>

        <Section title="The Field Guide">
          <p>
            By using the Global Graveyard, you agree to respect the silence of others. This is a space 
            for expression, but not for harassment, hate speech, or the exposure of private 
            information of others.
          </p>
        </Section>

        <Section title="Permanence">
          <p>
            While we strive for digital permanence, we do not guarantee that your burial will remain 
            forever. The void consumes all eventually. We reserve the right to remove messages that 
            threaten the safety or integrity of the sanctuary.
          </p>
        </Section>

        <Section title="No Commercial Use">
          <p>
            The field is for human thoughts, not commercial advertisements. Any entries found to be 
            spam or promotional in nature will be faded into the deep fog.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            The Global Graveyard is provided "as is". We are not responsible for any emotional 
            distress or data loss resulting from the use of this digital sanctuary.
          </p>
        </Section>
      </main>
    </div>
  );
}
