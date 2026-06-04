import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import { getBaseCV } from "@/lib/cv";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3d.felipeos.com";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Felipe OS | Product, Growth & AI Systems",
    template: "%s | Felipe OS",
  },
  description:
    "AI-powered systems, automation, growth infrastructure and product builds by Felipe Mejia.",
  keywords: [
    "Felipe Mejia",
    "freelance product consultant",
    "growth product manager",
    "AI product strategy",
    "agentic AI workflows",
    "AI workflow automation",
    "AI assistants",
    "systems integrations",
    "Felipe OS",
    "SaaS growth",
    "product-led growth",
    "analytics instrumentation",
    "digital onboarding",
  ],
  openGraph: {
    description:
      "AI-powered systems, automation, growth infrastructure and product builds by Felipe Mejia.",
    siteName: "Felipe OS",
    title: "Felipe OS | Product, Growth & AI Systems",
    type: "website",
    url: siteUrl,
  },
  alternates: {
    canonical: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    description:
      "AI-powered systems, automation, growth infrastructure and product builds by Felipe Mejia.",
    title: "Felipe OS | Product, Growth & AI Systems",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { contact, name, title } = getBaseCV();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        email: contact.email,
        jobTitle: title,
        name,
        sameAs: [contact.linkedin.url, contact.github.url],
        url: siteUrl,
      },
      {
        "@type": "ProfessionalService",
        email: contact.email,
        name: "Felipe OS",
        sameAs: [contact.linkedin.url, contact.github.url],
        url: siteUrl,
        areaServed: "Global",
        serviceType: [
          "AI systems consulting",
          "Custom AI assistant development",
          "Customer support AI agent",
          "B2B prospecting agent",
          "RAG knowledge base development",
          "Fine-tuning and agent orchestration",
          "OpenCLAW agent runtime setup",
          "Workflow automation and API integrations",
          "Growth system audit",
          "Product and MVP build",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI product and growth consulting services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom AI Assistant" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customer Support (SAV) Agent" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "B2B Prospecting Agent" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "OpenCLAW Agent Runtime" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "RAG Knowledge Base" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workflow Automation" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Workflow Sprint" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Growth System Audit" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product / MVP Build" } },
          ],
        },
      },
      {
        "@type": "WebSite",
        name: "Felipe OS",
        url: siteUrl,
      },
    ],
  };

  return (
    <html className={`${geist.variable} ${geistMono.variable}`} lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <LayoutShell header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </LayoutShell>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
