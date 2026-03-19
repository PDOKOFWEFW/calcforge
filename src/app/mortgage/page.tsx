import type { Metadata } from "next";
import Link from "next/link";
import CityCard from "@/components/CityCard";
import { getAllCities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Mortgage Calculator by City — 50+ US Cities with Local Data",
  description: "Free mortgage calculators for 50+ US cities, each pre-loaded with real local median home prices, property tax rates, and HOA estimates.",
  alternates: { canonical: "https://calcforge.com/mortgage" },
};

export default function MortgageIndexPage() {
  const cities = getAllCities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-700 font-medium">Mortgage Calculator</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-900 mb-3">Mortgage Calculator by City</h1>
        <p className="text-lg text-stone-500 max-w-2xl leading-relaxed">
          Each calculator is pre-loaded with real local data — median home price, property tax rate, and average HOA fee — for {cities.length} US cities.
          Use the search bar above to find your city instantly.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map(city => <CityCard key={city.slug} city={city} />)}
      </div>

      <section className="mt-14 bg-white border border-stone-200 rounded-2xl p-8">
        <h2 className="font-display text-2xl text-stone-900 mb-4">Understanding Your Mortgage Payment</h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-stone-600">
          <div className="space-y-3">
            <h3 className="font-semibold text-stone-800">What goes into a monthly payment?</h3>
            <p>A mortgage payment includes Principal (reduces your balance), Interest (borrowing cost), Property Taxes (collected into escrow), and Insurance. Our calculators cover P&I, property tax, and HOA.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-stone-800">30-year vs 15-year mortgage?</h3>
            <p>A 15-year mortgage has higher monthly payments — typically 40–50% more — but you pay dramatically less total interest. On a $400,000 loan at 7%, a 15-year term saves over $200,000 in interest.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
