import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "The Field", href: "/" },
  { name: "About", href: "/about" },
  { name: "Guide", href: "/guide" },
];

export default function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 h-20 flex items-center justify-between px-6 sm:px-10 border-b border-white/10 backdrop-blur-md bg-white/[0.02] select-none">
        {/* Branding */}
        <div className="flex-1">
          <Link href="/">
            <h1 className="font-serif text-[#d1d1d1] tracking-[0.4em] uppercase text-[10px] sm:text-sm md:text-base font-light whitespace-nowrap">
              Global Graveyard
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-12">
          {navLinks.map((link, idx) => (
            <li 
              key={link.name} 
              className="relative cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={link.href}>
                <span className="font-sans text-[10px] sm:text-xs text-[#d1d1d1]/60 group-hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase">
                  {link.name}
                </span>
              </Link>
              {/* Growing Underline Animation */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px bg-white/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ originX: 0.5 }}
              />
            </li>
          ))}
        </ul>

        {/* Desktop Signature / Mobile Menu Toggle */}
        <div className="flex-1 text-right flex items-center justify-end gap-4">
          <span className="hidden sm:inline-block font-serif italic text-[9px] md:text-[10px] text-[#d1d1d1]/30 tracking-widest lowercase whitespace-nowrap">
            By Malayali
          </span>
          
          <button 
            className="md:hidden p-2 text-[#d1d1d1]/60 hover:text-white transition-colors pointer-events-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#050505]/95 backdrop-blur-xl pt-24 px-10 flex flex-col gap-12 select-none"
          >
            <ul className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <li key={link.name} onClick={() => setIsMenuOpen(false)}>
                  <Link href={link.href} className="block group">
                    <span className="font-serif text-3xl sm:text-4xl text-[#d1d1d1]/40 group-hover:text-white transition-colors duration-500 tracking-wider">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto pb-12 opacity-30">
              <span className="font-serif italic text-sm tracking-[0.4em] lowercase">
                Curated by Malayali
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
