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

      {/* Footer appears at the bottom of the scrollable field */}
      {isEntered && (
        <div className="relative z-10 bg-gradient-to-t from-[#050505] to-transparent pt-32">
          {/* Footer is in layout.tsx, this space allows scrolling deep enough to reveal it */}
        </div>
      )}
    </div>
  );
}
