"use client";
import { useEffect, useRef } from "react";

interface Props {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  minHeight?: number;
}

export default function AdBanner({ slot, format = "auto", className = "", minHeight = 90 }: Props) {
  const pushed = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isProd = process.env.NODE_ENV === "production" && !!clientId;

  useEffect(() => {
    if (!isProd || pushed.current) return;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
      pushed.current = true;
    } catch (e) { /* ignore */ }
  }, [isProd]);

  if (!isProd) {
    return (
      <div className={`ad-zone ${className}`} style={{ minHeight }}>
        <div className="text-center">
          <p className="text-stone-400 text-[10px] tracking-widest uppercase">Advertisement</p>
          <p className="text-stone-300 text-[9px] font-mono mt-0.5">{format} · {minHeight}px</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="text-[10px] text-stone-400 text-center uppercase tracking-widest mb-1">Advertisement</p>
      <ins className="adsbygoogle" style={{ display: "block", minHeight }}
        data-ad-client={clientId} data-ad-slot={slot}
        data-ad-format={format} data-full-width-responsive="true" />
    </div>
  );
}
