import citiesData from "@/data/cities.json";
import type { City } from "./types";

const cities = citiesData as City[];

export function getAllCities(): City[] {
  // Deduplicate by slug, sort by population descending
  const seen = new Set<string>();
  return cities
    .filter(c => { if (seen.has(c.slug)) return false; seen.add(c.slug); return true; })
    .sort((a, b) => b.population - a.population);
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(c => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return getAllCities().map(c => c.slug);
}

export function searchCities(query: string): City[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllCities().slice(0, 12);
  return getAllCities().filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.state.toLowerCase().includes(q) ||
    c.stateAbbr.toLowerCase().includes(q)
  ).slice(0, 20);
}
