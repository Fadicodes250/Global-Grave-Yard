"use client";

import { useEffect } from "react";

interface AdSenseBannerProps {
  dataAdSlot: string;
  className?: string;
}

export default function AdSenseBanner({ dataAdSlot, className = "" }: AdSenseBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex justify-center py-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", width: "100%" }}
        data-ad-client="ca-pub-6899968908327043"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
