"use client";

import Link from "next/link";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";

export default function SiteHeader() {
  const bookingHref = getBookingHref();
  const bookingTarget = getBookingTarget();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10"
      >
        <Link
          aria-label="Felipe OS home"
          className="text-xl font-semibold text-white transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          href="/"
        >
          Felipe OS
        </Link>

        <a
          className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
          href={bookingHref}
          rel={hasBookingUrl() ? "noopener noreferrer" : undefined}
          target={bookingTarget}
        >
          Book a 30-min call
        </a>
      </nav>
    </header>
  );
}
