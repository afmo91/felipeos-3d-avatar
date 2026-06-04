"use client";

import { useEffect, useState } from "react";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";

/**
 * Persistent mobile "Book a call" bar. Hidden over the hero (where the chat
 * bottom-sheet lives) and revealed once the user scrolls into the marketing
 * sections, so the two never overlap.
 */
export default function MobileBookBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Reveal once scrolled roughly past the hero (first screen).
      setShow(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[115] border-t border-white/10 bg-[rgba(8,8,16,0.92)] px-4 pb-[env(safe-area-inset-bottom)] pt-3 backdrop-blur-xl lg:hidden">
      <a
        href={getBookingHref()}
        rel={hasBookingUrl() ? "noopener noreferrer" : undefined}
        target={getBookingTarget()}
        className="flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
      >
        Book a 30-min call
      </a>
    </div>
  );
}
