"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA_ID } from "@/lib/analytics";

const COOKIE_KEY = "felipe-os-cookie-consent";

function hasAnalyticsConsent(): boolean {
  try {
    const raw = window.localStorage.getItem(COOKIE_KEY);
    if (!raw) return false;
    return Boolean(JSON.parse(raw)?.analytics);
  } catch {
    return false;
  }
}

/**
 * Loads GA4 only when (a) a measurement id is configured and (b) the visitor
 * has granted analytics consent. Reacts to consent changes live.
 */
export default function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    // One-time read of stored consent on mount (SSR-safe).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllowed(hasAnalyticsConsent());
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ analytics?: boolean }>).detail;
      setAllowed(Boolean(detail?.analytics ?? hasAnalyticsConsent()));
    };
    window.addEventListener("felipe-os-cookie-consent-updated", onUpdate);
    return () => window.removeEventListener("felipe-os-cookie-consent-updated", onUpdate);
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
