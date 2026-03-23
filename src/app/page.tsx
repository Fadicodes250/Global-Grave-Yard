"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import WorldMap from "@/components/WorldMap";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Navigation reveals after enter */}
      {isEntered && <Navigation />}

      {/* 
        The splash screen covers the entire view with z-50. 
        When user enters, it unmounts gracefully, revealing the canvas underneath.
      */}
      {!isEntered && <SplashScreen onEnter={() => setIsEntered(true)} />}

      {/* The Map spans the entire viewport, functioning underneath everything */}
      <WorldMap className="absolute inset-0 z-0" />
    </div>
  );
}
