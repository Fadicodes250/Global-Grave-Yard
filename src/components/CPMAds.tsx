"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

/**
 * AD 1: Direct Redirect Link
 * Stylized as a "Support" button for the graveyard.
 */
export function CPMRedirectLink({ className = "" }: { className?: string }) {
  return (
    <a 
      href="https://www.profitablecpmratenetwork.com/suxas01vyw?key=ab4d54cebcb06ad437a5c21a530d1d27"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-[#d1d1d1]/60 text-xs tracking-[0.3em] uppercase hover:bg-white/10 hover:text-white transition-all duration-500 font-sans ${className}`}
    >
      <ExternalLink size={14} className="opacity-40" />
      Support the Grave
    </a>
  );
}

/**
 * AD 3: Container-based Ad
 */
export function CPMContainerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://pl29006727.profitablecpmratenetwork.com/08f2c28b15a3ab34e9425bf6011a32cc/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    
    containerRef.current.innerHTML = ""; // Clear on remount
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center py-8">
      <div id="container-08f2c28b15a3ab34e9425bf6011a32cc" ref={containerRef}></div>
    </div>
  );
}

/**
 * AD 4: Iframe-based Banner (320x50)
 */
export function CPMBannerAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Inject the atOptions global
    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '41f780c6e278f7cb7a09aa5dc29b0500',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "https://www.highperformanceformat.com/41f780c6e278f7cb7a09aa5dc29b0500/invoke.js";

    adRef.current.innerHTML = ""; // Clear on remount
    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="w-full flex justify-center py-8 overflow-hidden">
      <div ref={adRef}></div>
    </div>
  );
}
