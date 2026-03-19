import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgeCalculatorClient from "@/components/AgeCalculatorClient";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const revalidate = 86400;

const CURRENT_YEAR = new Date().getFullYear();

export async function generateStaticParams() {
  return Array.from({ length: 80 }, (_, i) => ({
    year: String(CURRENT_YEAR - 18 - i),
  }));
}

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const year = parseInt(params.year);
  if (isNaN(year) || year < 1900 || year > CURRENT_YEAR - 1) return {};
  const age = CURRENT_YEAR - year;
  return {
    title: `How Old Am I If I Was Born in ${year}? — Age Calculator`,
    description: `If you were born in ${year}, you are ${age} years old in ${CURRENT_YEAR}. Calculate your exact age in years, months, and days with our free age calculator.`,
    alternates: { canonical: `https://calcforge.com/age-calculator/born-in-${year}` },
  };
}

export default function BornInYearPage({ params }: { params: { year: string } }) {
  const year = parseInt(params.year);
  if (isNaN(year) || year < 1900 || year > CURRENT_YEAR - 1) notFound();

  const age = CURRENT_YEAR - year;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span className="text-stone-300">/</span>
        <Link href="/age-calculator" className="hover:text-brand-600 transition-colors">Age Calculator</Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-700 font-medium">Born in {year}</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-900 mb-3">
          Born in {year}? You&apos;re {age} years old.
        </h1>
        <p className="text-stone-500 text-base max-w-2xl leading-relaxed">
          If you were born in {year}, you are approximately <strong className="text-stone-700">{age} years old</strong> in {CURRENT_YEAR}. Enter your exact birth date below to calculate your precise age in years, months, and days.
        </p>
      </header>

      <AdBanner slot="1212121212" format="horizontal" minHeight={90} className="mb-8" />

      <AgeCalculatorClient defaultYear={year} />

      <section className="mt-10 bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="font-display text-2xl text-stone-900 mb-4">People born in {year}</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-stone-600">
          <div><strong className="text-stone-800">Age in {CURRENT_YEAR}:</strong> {age} years old</div>
          <div><strong className="text-stone-800">Generation:</strong> {year <= 1964 ? "Baby Boomer" : year <= 1980 ? "Generation X" : year <= 1996 ? "Millennial" : year <= 2012 ? "Generation Z" : "Generation Alpha"}</div>
          <div><strong className="text-stone-800">Decade born:</strong> The {Math.floor(year / 10) * 10}s</div>
        </div>
      </section>

      {/* Related years */}
      <section className="mt-8">
        <h2 className="font-display text-xl text-stone-900 mb-4">Other birth years</h2>
        <div className="flex flex-wrap gap-2">
          {[-3, -2, -1, 1, 2, 3].map(offset => {
            const y = year + offset;
            if (y < 1900 || y >= CURRENT_YEAR) return null;
            return (
              <Link key={y} href={`/age-calculator/born-in-${y}`}
                className="text-sm bg-stone-50 border border-stone-200 text-stone-700 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-full transition-colors">
                Born in {y}
              </Link>
            );
          })}
        </div>
      </section>

      <AdBanner slot="1313131313" format="auto" minHeight={250} className="mt-10" />
    </div>
  );
}
