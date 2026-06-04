import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, landings, locales, ui } from "@/data/landings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3d.felipeos.com";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const en = locale === "en";
  return {
    title: en ? "AI Solutions for Business | Felipe OS" : "Solutions IA pour entreprise | Felipe OS",
    description: en
      ? "Ready-to-deploy AI solutions: assistants, support and prospecting agents, OpenClaw deployment, RAG and automation."
      : "Solutions IA prêtes à déployer : assistants, agents support et prospection, déploiement OpenClaw, RAG et automatisation.",
    alternates: {
      canonical: `${siteUrl}/lp/${locale}`,
      languages: { en: `${siteUrl}/lp/en`, fr: `${siteUrl}/lp/fr` },
    },
  };
}

export default async function LandingIndex({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui[locale];
  const heading = locale === "en" ? "Ready-to-deploy AI solutions" : "Solutions IA prêtes à déployer";
  const sub =
    locale === "en"
      ? "Pick the outcome you need. Each is scoped to your tools, GDPR-compliant, and shipped end-to-end."
      : "Choisissez le résultat dont vous avez besoin. Chaque solution est cadrée sur vos outils, conforme RGPD et livrée de bout en bout.";

  return (
    <div lang={locale} className="min-h-screen bg-[#080810] px-5 py-16 text-slate-100 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70 hover:text-white">
            {t.backHome}
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">{heading}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300/85">{sub}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {landings.map((l) => {
            const c = l[locale];
            return (
              <Link
                key={l.slug}
                href={`/lp/${locale}/${l.slug}`}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/30"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-cyan-200/60">{c.heroEyebrow}</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{c.heroTitle}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-300/80">{c.entryOffer}</p>
                <p className="mt-4 text-sm font-semibold text-cyan-100">{l.priceRange}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
