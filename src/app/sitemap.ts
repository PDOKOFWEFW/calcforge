import { MetadataRoute } from "next";
import { getAllCities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://calcforge.com";
  const now = new Date();
  const cities = getAllCities();
  const currentYear = now.getFullYear();
  const birthYears = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i);

  return [
    { url: base,                              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/mortgage`,                lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/compound-interest`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/loan-calculator`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/age-calculator`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy-policy`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,                   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    ...cities.map(city => ({
      url: `${base}/mortgage/${city.slug}`,
      lastModified: now, changeFrequency: "weekly" as const, priority: 0.8,
    })),
    ...birthYears.map(year => ({
      url: `${base}/age-calculator/born-in-${year}`,
      lastModified: now, changeFrequency: "yearly" as const, priority: 0.5,
    })),
  ];
}
