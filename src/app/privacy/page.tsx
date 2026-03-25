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
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2 }}
           className="mb-24"
        >
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white mb-6">
            Privacy Policy.
          </h1>
          <p className="font-serif text-sm opacity-40 italic">Last Updated: March 24, 2026</p>
        </motion.div>

        <Section title="Overview">
          <p>
            This Privacy Policy describes how Fadi Vakkayil ("we," "us," or "our") collects, uses, and shares 
            information about you when you use our website/application The Global Graveyard (https://global-grave-yard.vercel.app).
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </Section>

        <Section title="1. Information We Collect">
          <p><strong>1.2 Usage Data</strong></p>
          <p>
            We automatically collect certain information when you visit our website/app, including:
            IP address, Browser type and version, Device type and operating system, Pages visited, and time 
            spent on each page.
          </p>
          <p><strong>1.3 Cookies and Tracking Technologies</strong></p>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
            Cookies are small data files stored on your device.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>
            We use the collected information for various purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 opacity-80">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To display relevant advertisements and measure their effectiveness</li>
          </ul>
        </Section>

        <Section title="3. Sharing Your Information">
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your 
            information with service providers (like Supabase and Formspree) to facilitate our service, 
            or for legal requirements.
          </p>
        </Section>

        <Section title="4. GDPR (European Users)">
          <p>
            If you are located in the European Economic Area (EEA), you have certain data protection rights 
            under the GDPR, including the right to access, rectification, erasure, and data portability.
          </p>
          <p>
            To exercise any of these rights, please contact us at <strong>suharafadi@gmail.com</strong>.
          </p>
        </Section>

        <Section title="5. Data Security">
          <p>
            The security of your personal information is important to us. We implement appropriate technical 
            security measures like SSL/TLS encryption. However, no method of transmission over the Internet is 100% secure.
          </p>
        </Section>

        <Section title="6. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="space-y-4 pt-4 border-t border-white/5">
             <div className="flex flex-col">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">Company</span>
                <span className="font-serif">Fadi Vakkayil</span>
             </div>
             <div className="flex flex-col">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">Email</span>
                <span className="font-serif text-white/80 select-all">suharafadi@gmail.com</span>
             </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
