"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import WorldMap from "@/components/WorldMap";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className={`relative w-full ${isEntered ? "min-h-screen overflow-y-auto overflow-x-hidden" : "h-screen overflow-hidden"} bg-[#050505]`}>
      {/* Navigation reveals after enter */}
      {isEntered && <Navigation />}

      {/* 
        The splash screen covers the entire view with z-50. 
        When user enters, it unmounts gracefully, revealing the canvas underneath.
      */}
      {!isEntered && <SplashScreen onEnter={() => setIsEntered(true)} />}

      <div className="relative w-full h-screen">
        {/* The Map spans the entire viewport, functioning underneath everything */}
        <WorldMap className="absolute inset-0 z-0" />
      </div>

      {/* Footer appears at the bottom of the scrollable field */}
      {isEntered && (
        <div className="relative z-10 bg-gradient-to-t from-[#050505] to-transparent pt-32">
          {/* Footer is already in layout.tsx, but since we have overflow-hidden there, 
              we need to make sure this page allows scrolling down to find it. */}
        </div>
      )}
    </div>
  );
}
