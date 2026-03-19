import type { Metadata } from "next";
import AgeCalculatorClient from "@/components/AgeCalculatorClient";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Age Calculator — How Old Am I?",
  description: "Free age calculator. Find your exact age in years, months, and days. See how many days you've lived, your zodiac sign, and days until your next birthday.",
  alternates: { canonical: "https://calcforge.com/age-calculator" },
};

// Generate SEO-friendly birth year links for programmatic SEO
const currentYear = new Date().getFullYear();
const birthYears = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i); // 18 to 97

export default function AgeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
        <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
        <span className="text-stone-300">/</span>
        <span className="text-stone-700 font-medium">Age Calculator</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-900 mb-3">Age Calculator</h1>
        <p className="text-stone-500 text-base max-w-2xl leading-relaxed">
          Find your exact age in years, months, and days. Discover how many days you&apos;ve been alive, your zodiac sign, and countdown to your next birthday.
        </p>
      </header>

      <AdBanner slot="1010101010" format="horizontal" minHeight={90} className="mb-8" />

      <AgeCalculatorClient />

      {/* Programmatic SEO section — born in [year] links */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-stone-900 mb-4">How old am I if I was born in...</h2>
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex flex-wrap gap-2">
            {birthYears.map(year => (
              <Link
                key={year}
                href={`/age-calculator/born-in-${year}`}
                className="text-sm bg-stone-50 border border-stone-200 text-stone-700 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-full transition-colors"
              >
                Born in {year}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-semibold text-stone-800 mb-2">How is age calculated?</h2>
          <p className="text-sm text-stone-500 leading-relaxed">Age is calculated from your date of birth to today. We count the exact number of completed years, then remaining months, then remaining days — giving you a precise answer like "35 years, 4 months, and 12 days."</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-semibold text-stone-800 mb-2">What is a leap year birthday?</h2>
          <p className="text-sm text-stone-500 leading-relaxed">If you were born on February 29 (a leap day), you only have a true birthday every 4 years. On non-leap years, many people celebrate on February 28 or March 1. Our calculator handles leap years correctly.</p>
        </div>
      </section>

      <AdBanner slot="1111111112" format="auto" minHeight={250} className="mt-10" />
    </div>
  );
}
