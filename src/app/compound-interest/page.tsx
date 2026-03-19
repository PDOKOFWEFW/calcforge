import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Watch Your Money Grow",
  description: "Free compound interest calculator. See exactly how investments grow over time with monthly contributions. Includes interactive chart and year-by-year breakdown.",
  alternates: { canonical: "https://calcforge.com/compound-interest" },
};

export default function CompoundInterestPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
        <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
        <span className="text-stone-300">/</span>
        <span className="text-stone-700 font-medium">Compound Interest Calculator</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-900 mb-3">
          Compound Interest Calculator
        </h1>
        <p className="text-stone-500 text-base max-w-2xl leading-relaxed">
          See how your money grows over time. Adjust your initial investment, monthly contributions, rate of return, and time horizon to visualize the power of compounding.
        </p>
      </header>

      <AdBanner slot="6666666666" format="horizontal" minHeight={90} className="mb-8" />

      <CompoundInterestCalculator />

      <section className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-display text-xl text-stone-900 mb-3">What is compound interest?</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Compound interest means you earn interest on your interest, not just your original principal. Over time, this creates exponential growth — commonly called the &ldquo;snowball effect.&rdquo; Albert Einstein reportedly called it the eighth wonder of the world.
          </p>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-display text-xl text-stone-900 mb-3">How often does it compound?</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            The more frequently interest compounds, the faster your money grows. Monthly compounding (most savings accounts and investments) yields more than annual compounding. Our calculator uses monthly compounding, which is standard for most investment accounts and savings vehicles.
          </p>
        </div>
      </section>

      <AdBanner slot="7777777777" format="auto" minHeight={250} className="mt-10" />
    </div>
  );
}
