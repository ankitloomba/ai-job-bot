"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "horizontal" | "vertical" | "square" | "small";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const formatMap = {
  horizontal: { width: "100%", height: "90px", format: "auto" },
  vertical: { width: "160px", height: "600px", format: "auto" },
  square: { width: "300px", height: "250px", format: "auto" },
  small: { width: "320px", height: "50px", format: "auto" },
};

export function AdBanner({ slot, format = "horizontal", className }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet — silent fail in dev
    }
  }, []);

  const { height } = formatMap[format];

  return (
    <div
      className={`ad-slot ${format === "vertical" ? "ad-slot-sidebar" : "ad-slot-banner"} ${className ?? ""}`}
      style={{ minHeight: height }}
      aria-label="Advertisement"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
