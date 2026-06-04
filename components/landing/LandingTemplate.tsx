import Link from "next/link";
import { ui, type Landing, type Locale } from "@/data/landings";
import { getBookingHref, getBookingTarget, hasBookingUrl } from "@/lib/booking";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import LandingBookButton from "@/components/landing/LandingBookButton";

const proofMetrics = ["+25% conversion", "-30% CAC", "€200K+ recovered", "€3M+ budget", "12+ yrs"];

export default function LandingTemplate({ landing, locale }: { landing: Landing; locale: Locale }) {
  const c = landing[locale];
  const t = ui[locale];
  const bookingHref = getBookingHref();
  const bookingExternal = hasBookingUrl() && getBookingTarget() === "_blank";
  const otherLocale: Locale = locale === "en" ? "fr" : "en";

  return (
    <div lang={locale} className="min-h-screen bg-[#080810] text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(8,8,16,0.8)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 md:px-6">
          <Link href="/" className="text-base font-extrabold tracking-tight text-white">
            {t.backHome}
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href={`/lp/${locale}`} className="hidden text-slate-300/80 transition hover:text-white sm:inline">
              {t.allSolutions}
            </Link>
            <Link href={`/lp/${otherLocale}/${landing.slug}`} className="text-slate-300/80 transition hover:text-white">
              {t.langSwitch}
            </Link>
            <LandingBookButton href={bookingHref} external={bookingExternal} slug={landing.slug} locale={locale}>
              {t.bookCall}
            </LandingBookButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="px-5 py-16 md:px-8 md:py-24"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, rgba(34,211,238,0.12), transparent 36%), radial-gradient(circle at 18% 78%, rgba(139,92,246,0.14), transparent 38%)",
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">{c.heroEyebrow}</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">{c.heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300/85 md:text-lg">{c.heroSub}</p>
          <div className="mt-6 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-sm font-semibold text-cyan-50">
            {c.entryOffer}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <LandingBookButton href={bookingHref} external={bookingExternal} slug={landing.slug} locale={locale}>
              {t.bookCall}
            </LandingBookButton>
            <a
              href="#lead"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white"
            >
              {t.formTitle}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-1.5">
            {landing.tech.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-mono text-xs uppercase tracking-[0.16em] text-cyan-200/70">{t.theProblem}</h2>
          <ul className="mx-auto mt-6 grid max-w-2xl gap-3">
            {c.pains.map((p) => (
              <li key={p} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300/85">
                <span className="text-rose-300/80">✕</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you get */}
      <section className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">{t.whatYouGet}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {c.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300/80">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">{t.howItWorks}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [t.step1Title, t.step1Desc],
              [t.step2Title, t.step2Desc],
              [t.step3Title, t.step3Desc],
            ].map(([title, desc], i) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-mono text-sm font-bold text-cyan-200/80">0{i + 1}</p>
                <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300/80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-t border-white/10 px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {proofMetrics.map((m) => (
            <div key={m} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center text-sm font-semibold text-white">
              {m}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-cyan-300/20 bg-white/[0.03] p-7 text-center">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-200/70">{t.pricing}</h2>
          <p className="mt-3 text-2xl font-bold text-white">{landing.priceRange}</p>
          <p className="mt-2 text-sm text-slate-300/80">{c.entryOffer}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">{t.faq}</h2>
          <div className="mt-8 grid gap-3">
            {c.faq.map((item) => (
              <details key={item.q} className="group rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-white">{item.q}</summary>
                <p className="mt-2 text-sm leading-6 text-slate-300/80">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form / final CTA */}
      <section id="lead" className="border-t border-white/10 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-300/85">{c.ctaSub}</p>
        </div>
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="text-sm font-semibold text-white">{t.formTitle}</p>
          <p className="mb-4 mt-1 text-sm text-slate-300/75">{t.formSub}</p>
          <LandingLeadForm locale={locale} slug={landing.slug} serviceInterest={c.heroEyebrow} />
          <p className="mt-4 text-center text-xs text-slate-400">
            {t.or}{" "}
            <LandingBookButton href={bookingHref} external={bookingExternal} slug={landing.slug} locale={locale} variant="secondary">
              {t.bookCall}
            </LandingBookButton>
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-slate-400 md:px-8">
        <Link href="/" className="hover:text-white">
          {t.builtBy}
        </Link>
      </footer>
    </div>
  );
}
