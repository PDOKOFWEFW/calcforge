import type { Metadata } from "next";
import Link from "next/link";
import CityCard from "@/components/CityCard";
import { getAllCities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "CalcForge — Free Online Calculators for Finance, Health & Math",
  description:
    "Free, accurate online calculators. Mortgage calculators pre-loaded with local city data, compound interest, BMI, age calculator, and more.",
};

export default function HomePage() {
  const cities = getAllCities();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-900 to-brand-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Free · No signup · Instant results
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Free Calculators for{" "}
            <span className="text-brand-100">Every Calculation</span>
          </h1>
          <p className="text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
            Mortgage calculators pre-loaded with city-specific data, finance
            tools, health calculators — all free, no ads that slow you down.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link
              href="/mortgage"
              className="bg-white text-brand-700 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-50 transition-colors shadow"
            >
              Mortgage Calculator →
            </Link>
            <Link
              href="#tools"
              className="bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              Browse All Tools
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mortgage by city section */}
        <section id="tools" aria-labelledby="city-heading" className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2
                id="city-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Mortgage Calculator by City
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                Each calculator is pre-filled with local median home price,
                property tax rate, and average HOA.
              </p>
            </div>
            <Link
              href="/mortgage"
              className="text-sm text-brand-600 font-medium hover:underline hidden sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
        </section>

        {/* Coming soon tools */}
        <section aria-labelledby="coming-soon-heading">
          <h2
            id="coming-soon-heading"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            More Calculators Coming Soon
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "📈",
                title: "Compound Interest",
                desc: "See how your investments grow over time with compound interest and monthly contributions.",
              },
              {
                icon: "⚖️",
                title: "BMI Calculator",
                desc: "Calculate your Body Mass Index and healthy weight range with imperial or metric units.",
              },
              {
                icon: "🎂",
                title: "Age Calculator",
                desc: "Exact age in years, months, and days. Plus days until your next birthday.",
              },
              {
                icon: "💳",
                title: "Loan Calculator",
                desc: "Monthly payments for auto loans, personal loans, and student loans.",
              },
            ].map((tool) => (
              <div
                key={tool.title}
                className="bg-white border border-gray-200 border-dashed rounded-xl p-5 opacity-75"
              >
                <span className="text-2xl mb-3 block">{tool.icon}</span>
                <h3 className="font-semibold text-gray-800 mb-1">{tool.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
                <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Trust / SEO content block */}
        <section className="mt-16 bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Why Use CalcForge?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-800 mb-1">📍 Local Data</p>
              <p>
                Our mortgage calculators use real local data — median home
                prices, city-specific property tax rates, and average HOA fees.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">⚡ Instant</p>
              <p>
                All calculations happen in your browser. No server round trips,
                no waiting. Results update as you type.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">🔒 Free Forever</p>
              <p>
                No signup, no email, no paywall. CalcForge is and always will be
                100% free to use.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
