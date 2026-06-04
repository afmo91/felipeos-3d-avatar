// Lightweight analytics helper. No-ops unless a GA4 id is configured AND the
// visitor has granted analytics consent (handled in components/Analytics.tsx).

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/** Fire a GA4 event (and a generic dataLayer push) if analytics is live. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
  window.dataLayer?.push({ event, ...params });
}
