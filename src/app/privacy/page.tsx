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

export default function PrivacyPage() {
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
          Privacy Policy.
        </motion.h1>

        <Section title="Data Anonymity">
          <p>
            The Global Graveyard is built on the principle of anonymity. We do not require account creation, 
            usernames, or personal identification to participate in the field. Every message left is 
            stored as an anonymous entry in our collective void.
          </p>
        </Section>

        <Section title="Cookies & Storage">
          <p>
            We use minimal cookies and local storage only to remember your preferences, such as your 
            position on the map and whether you have dismissed the initial instructions. We do not use 
            tracking pixels or third-party marketing cookies.
          </p>
        </Section>

        <Section title="External Services">
          <p>
            We use Supabase for our database and Formspree for our contact form. Any information submitted 
            via the Contact page is handled securely by Formspree and used only to respond to your inquiry.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            As all burials are anonymous, we cannot verify ownership of a specific orb after it has been 
            placed. If you find a message that violates our community standards, please contact us for 
            removal.
          </p>
        </Section>
      </main>
    </div>
  );
}
