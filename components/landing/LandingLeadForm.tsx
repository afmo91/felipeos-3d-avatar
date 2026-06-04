"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { ui, type Locale } from "@/data/landings";

export default function LandingLeadForm({
  locale,
  slug,
  serviceInterest,
}: {
  locale: Locale;
  slug: string;
  serviceInterest: string;
}) {
  const t = ui[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError(t.errEmail);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email,
          company: String(data.get("company") || ""),
          problemSummary: String(data.get("message") || ""),
          serviceInterest,
          useCase: slug,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("generate_lead", { service: slug, locale, source: "landing_form" });
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setError(t.errGeneric);
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center text-emerald-100">
        {t.sent}
      </div>
    );
  }

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          aria-label={t.name}
          name="name"
          placeholder={t.name}
          required
          className="min-h-[44px] rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40"
        />
        <input
          aria-label={t.email}
          name="email"
          type="email"
          placeholder={t.email}
          required
          className="min-h-[44px] rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40"
        />
      </div>
      <input
        aria-label={t.company}
        name="company"
        placeholder={t.company}
        className="min-h-[44px] rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40"
      />
      <textarea
        aria-label={t.message}
        name="message"
        placeholder={t.message}
        rows={3}
        className="resize-y rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-[48px] rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100 disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
      {status === "error" ? (
        <p className="text-sm text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
