"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/20">{label}</span>
    <p className="font-serif text-lg text-white/80">{value}</p>
  </div>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] pb-32">
      <Navigation />

      <main className="max-w-4xl mx-auto px-10 pt-48 sm:pt-64">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Header & Info */}
          <section>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white mb-16"
            >
              Reach the <br /> Caretaker.
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="space-y-12"
            >
              <InfoItem label="Identity" value="Fadi Vkkayil (Malayali)" />
              <InfoItem label="Purpose" value="Curator of the Void & Site Admin" />
              <InfoItem label="Response Time" value="Within 3 to 5 business fogs" />
            </motion.div>
          </section>

          {/* Form */}
          <div className="mt-12 lg:mt-0">
            <ContactSection />
          </div>
        </div>
      </main>
    </div>
  );
}
