"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AdBannerProps = {
  slot: string;
  label: string;
  className?: string;
  format?: "auto" | "horizontal" | "rectangle";
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdBanner({ slot, label, className, format = "auto" }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true" && process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: "240px"
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!adsEnabled || !isVisible || !clientId) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense may throw before approval; keep layout intact.
    }
  }, [adsEnabled, clientId, isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        "my-6 flex min-h-24 w-full items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-950/45 text-center text-xs text-slate-500",
        className
      )}
      aria-label={label}
    >
      {adsEnabled && isVisible && clientId ? (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <span>Ad space reserved: {label}</span>
      )}
    </div>
  );
}
