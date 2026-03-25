"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-20 pb-12 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {/* Column 1: Site */}
        <div className="space-y-6">
          <h4 className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">The Sanctuary</h4>
          <ul className="space-y-4 font-serif text-sm tracking-widest text-[#d1d1d1]/60">
            <li><Link href="/" className="hover:text-white transition-colors uppercase">The Field</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors uppercase">About</Link></li>
            <li><Link href="/guide" className="hover:text-white transition-colors uppercase">Guide</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors uppercase">Contact</Link></li>
          </ul>
        </div>

        {/* Column 2: Legal */}
        <div className="space-y-6">
          <h4 className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">The Law</h4>
          <ul className="space-y-4 font-serif text-sm tracking-widest text-[#d1d1d1]/60">
            <li><Link href="/privacy" className="hover:text-white transition-colors uppercase">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors uppercase">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 3: Identity */}
        <div className="space-y-6 md:text-right">
          <h4 className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">The Caretaker</h4>
          <div className="space-y-4">
            <p className="font-serif text-lg text-white italic">Malayali</p>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
              By Fadi Vkkayil <br />
              All rights reserved &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <p className="mt-8 text-center font-serif text-[10px] tracking-[1em] uppercase opacity-20 text-white">
          memento mori
        </p>
      </div>
    </footer>
  );
}
