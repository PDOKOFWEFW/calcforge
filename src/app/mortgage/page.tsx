import type { Metadata } from "next";
import Link from "next/link";
import CityCard from "@/components/CityCard";
import { getAllCities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Estimate Monthly Payments by City",
  description:
    "Free mortgage calculators pre-loaded with local city data. Choose your city to see median home prices, property tax rates, and estimated monthly payments.",
  alternates: {
    canonical: "https://calcforge.com/mortgage",
  },
};

export default function MortgageIndexPage() {
  const cities = getAllCities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span className="text-gray-300 mx-1">/</span>
        <span className="text-gray-800 font-medium">Mortgage Calculator</span>
      </nav>

      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Mortgage Calculator by City
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
          Each calculator is pre-loaded with real local data: median home price,
          property tax rate, and average HOA fee — so your estimate is
          meaningful from the first click.
        </p>
      </header>

      {/* How it works */}
      <section className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-10">
        <h2 className="font-semibold text-brand-900 mb-3">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-800">
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</span>
            <p>Select your city from the list below to open the calculator pre-filled with local data.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</span>
            <p>Adjust home price, down payment, interest rate, and loan term to match your scenario.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</span>
            <p>See your estimated monthly payment, total interest, and a full amortization schedule instantly.</p>
          </div>
        </div>
      </section>

      {/* City grid */}
      <section aria-labelledby="cities-heading">
        <h2 id="cities-heading" className="text-xl font-bold text-gray-900 mb-4">
          Available Cities
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      </section>

      {/* Educational content for SEO */}
      <section className="mt-14 prose prose-gray max-w-none">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Understanding Your Mortgage Payment
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 text-base">What goes into a monthly payment?</h3>
            <p>
              A complete monthly mortgage payment (often called PITI) includes four
              components: <strong>Principal</strong> — the portion that reduces your loan
              balance; <strong>Interest</strong> — the cost of borrowing; <strong>Taxes</strong> —
              property taxes collected into escrow; and <strong>Insurance</strong> — homeowner&apos;s
              insurance and PMI if applicable.
            </p>
            <p>
              Our calculator covers principal, interest, property tax, and HOA fees.
              Add 0.5–1% of the home price annually for homeowner&apos;s insurance.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 text-base">How does a 30-year vs 15-year mortgage compare?</h3>
            <p>
              A 15-year mortgage has a higher monthly payment — typically 40–50% more
              than a 30-year loan — but you pay dramatically less total interest over
              the life of the loan. On a $400,000 loan at 7%, you&apos;d save over
              $200,000 in interest by choosing a 15-year term.
            </p>
            <p>
              Use the loan term buttons in our calculator to compare scenarios
              side-by-side.
            </p>
          </div>
        </div>
      </section>

      {/* Internal links to all city pages */}
      <section className="mt-10 bg-gray-100 rounded-xl p-6">
        <h2 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">
          Mortgage Calculators by City
        </h2>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/mortgage/${city.slug}`}
              className="text-sm bg-white border border-gray-200 text-gray-700 hover:border-brand-400 hover:text-brand-600 px-3 py-1.5 rounded-full transition-colors"
            >
              {city.name}, {city.stateAbbr}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
