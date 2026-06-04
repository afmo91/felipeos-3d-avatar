import { getPosts } from "@/lib/content";
import { landings, locales } from "@/data/landings";
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3d.felipeos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/cv", "/about", "/portfolio", "/resume", "/blog", "/contact"].map((route) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: route === "" ? 1 : 0.8,
    url: `${siteUrl}${route}`,
  }));

  const landingRoutes = locales.flatMap((locale) => [
    {
      changeFrequency: "monthly" as const,
      lastModified: new Date(),
      priority: 0.7,
      url: `${siteUrl}/lp/${locale}`,
    },
    ...landings.map((l) => ({
      changeFrequency: "monthly" as const,
      lastModified: new Date(),
      priority: 0.9,
      url: `${siteUrl}/lp/${locale}/${l.slug}`,
    })),
  ]);

  const blogRoutes = getPosts().map((post) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(post.date),
    priority: 0.7,
    url: `${siteUrl}/blog/${post.slug}`,
  }));

  return [...staticRoutes, ...landingRoutes, ...blogRoutes];
}
