import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLanding, isLocale, landings, locales } from "@/data/landings";
import LandingTemplate from "@/components/landing/LandingTemplate";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3d.felipeos.com";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => landings.map((l) => ({ locale, slug: l.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const landing = getLanding(slug);
  if (!landing || !isLocale(locale)) return {};
  const c = landing[locale];
  const path = `/lp/${locale}/${slug}`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        en: `${siteUrl}/lp/en/${slug}`,
        fr: `${siteUrl}/lp/fr/${slug}`,
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${siteUrl}${path}`,
      type: "website",
    },
  };
}

export default async function LandingPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const landing = getLanding(slug);
  if (!landing || !isLocale(locale)) notFound();

  return <LandingTemplate landing={landing} locale={locale} />;
}
