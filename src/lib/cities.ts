import citiesData from "@/data/cities.json";
import type { City } from "./types";

// Cast raw JSON to typed array
const cities = citiesData as City[];

export function getAllCities(): City[] {
  return cities;
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
