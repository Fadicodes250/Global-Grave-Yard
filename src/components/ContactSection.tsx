"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mkoqdayl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const result = await response.json();
        setError(result.errors?.[0]?.message || "Something went wrong. The fog is too thick.");
      }
    } catch (err) {
      setError("The connection to the void failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-40 border-t border-white/5 pt-32 pb-20">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/40 mb-12">
                Contact the Field
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-4">
                  <label htmlFor="email" className="block font-serif text-sm text-white/30 tracking-widest uppercase">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-transparent border-b-[0.5px] border-white/20 py-4 font-serif text-xl text-white focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/5"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-4">
                  <label htmlFor="message" className="block font-serif text-sm text-white/30 tracking-widest uppercase">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-transparent border-[0.5px] border-white/20 p-6 font-serif text-xl text-white focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/5 resize-none rounded-none"
                    placeholder="Write your words here..."
                  />
                </div>

                {error && (
                  <p className="text-red-400/60 font-serif text-sm italic">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-6 py-4 font-serif text-sm tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors disabled:opacity-30"
                >
                  <span className={isSubmitting ? "opacity-0" : "opacity-100"}>
                    Send to Void
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-t border-white/40 rounded-full animate-spin" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 group-hover:bg-white/40 transition-colors" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <p className="font-serif text-2xl text-white/80 italic tracking-wide leading-relaxed">
                "Your message has been carried into the fog. <br /> 
                The Caretaker will find it."
              </p>
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="mt-12 w-px bg-gradient-to-b from-white/20 to-transparent" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
