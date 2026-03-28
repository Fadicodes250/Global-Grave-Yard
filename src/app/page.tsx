"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import WorldMap from "@/components/WorldMap";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className={`relative w-full ${isEntered ? "min-h-screen overflow-y-auto overflow-x-hidden" : "h-screen overflow-hidden"} bg-[#050505]`}>
      {isEntered && <Navigation />}

      {!isEntered && <SplashScreen onEnter={() => setIsEntered(true)} />}

      <div className="relative w-full h-screen">
        <WorldMap className="absolute inset-0 z-0" />
      </div>

      {/* Legacy/SEO Content Layer for AdSense Compliance */}
      {isEntered && (
        <section className="relative z-10 bg-[#050505] border-t border-white/5 px-10 py-32 sm:py-48">
          <div className="max-w-4xl mx-auto space-y-24">
            <div className="space-y-8">
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-wide">
                What is the Global Graveyard?
              </h2>
              <p className="font-serif text-lg sm:text-xl text-[#d1d1d1]/70 leading-relaxed">
                The Global Graveyard is an interactive, digital tribute to the unspoken moments of human existence. It is a vast, infinite field where every light represents a real story, a hidden secret, or a final goodbye left by a traveler from somewhere in the world. 
                In a digital age defined by noise and public profiles, this space offers the opposite: a sanctuary of silence and absolute anonymity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">The Ritual of Burial</h3>
                <p className="font-serif text-base text-[#d1d1d1]/60 leading-relaxed">
                  By double-clicking anywhere on the map, you participate in the 'Burial'—the act of planting a memory in the digital soil. Once buried, your message becomes a 'Soul Orb,' a flickering light that others can discover, read, and honor. This process allows for a unique form of catharsis, letting you release thoughts into the void while knowing they will be guarded by the collective presence of others.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Tending the Field</h3>
                <p className="font-serif text-base text-[#d1d1d1]/60 leading-relaxed">
                  The graveyard is a living ecosystem. As visitors explore the map and interact with the lights, they 'tend' the memories. Highlighting a burial with stars ensures its presence grows stronger, turning the light from a dim blue to a brilliant gold. This collaborative effort ensures that the most impactful and resonant human stories are never lost to the drifting fog of time.
                </p>
              </div>
            </div>

            <div className="pt-24 border-t border-white/5">
              <p className="font-serif text-sm italic text-white/30 text-center tracking-[0.2em] uppercase">
                An anonymous archive of the human heart, curated by Malayali.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer appears at the bottom of the scrollable field */}
      {isEntered && (
        <div className="relative z-10 bg-gradient-to-t from-[#050505] to-transparent pt-32">
          {/* Footer is in layout.tsx, this space allows scrolling deep enough to reveal it */}
        </div>
      )}
    </div>
  );
}
