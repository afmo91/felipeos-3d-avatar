"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";

const sectionLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#proof", label: "Proof" },
  { href: "#pricing", label: "Pricing" },
];

const pageLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

function bookProps() {
  return {
    href: getBookingHref(),
    rel: hasBookingUrl() ? "noopener noreferrer" : undefined,
    target: getBookingTarget(),
  };
}

export default function HomeNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[120] h-14 border-b border-white/10 bg-[rgba(8,8,16,0.72)] backdrop-blur-xl">
      <nav aria-label="Primary" className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="text-base font-extrabold tracking-tight text-white" onClick={() => setOpen(false)}>
          Felipe OS
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {sectionLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-300/80 transition hover:text-white">
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-300/80 transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            {...bookProps()}
            className="inline-flex min-h-[40px] items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3.5 py-2 text-[0.8rem] font-semibold text-cyan-50 transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
          >
            Book a call
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open ? (
        <div className="border-t border-white/10 bg-[rgba(8,8,16,0.97)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {sectionLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm text-slate-200"
              >
                {l.label}
              </a>
            ))}
            {pageLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm text-slate-200"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="py-3 text-sm text-slate-400"
            >
              For recruiters →
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
