"use client";

import { track } from "@/lib/analytics";

export default function LandingBookButton({
  href,
  external,
  slug,
  locale,
  variant = "primary",
  children,
}: {
  href: string;
  external: boolean;
  slug: string;
  locale: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      onClick={() => track("book_call_click", { service: slug, locale })}
      className={
        variant === "primary"
          ? "inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100"
          : "inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white"
      }
    >
      {children}
    </a>
  );
}
