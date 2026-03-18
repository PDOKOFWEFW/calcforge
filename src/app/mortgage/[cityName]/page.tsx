import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

import MortgageCalculator from "@/components/MortgageCalculator";
import Breadcrumb from "@/components/Breadcrumb";
import CityCard from "@/components/CityCard";
import { getAllCities, getCityBySlug } from "@/lib/cities";
import { calculateMortgage, formatCurrency } from "@/lib/mortgage";
import {
  buildMortgageFAQSchema,
  buildBreadcrumbSchema,
  buildWebAppSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────
// ISR: Revalidate every 24 hours (86400 seconds)
// Vercel will serve the cached version and regenerate in the
// background when a request comes in after the interval.
// ─────────────────────────────────────────────────────────────
export const revalidate = 86400;

// ─────────────────────────────────────────────────────────────
// generateStaticParams: pre-render all city pages at build time
// Returns every slug from cities.json so Next.js generates a
// static HTML file for each city during `next build`.
// ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    cityName: city.slug,
  }));
}

// ─────────────────────────────────────────────────────────────
// Dynamic per-city SEO metadata
// ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { cityName: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.cityName);
  if (!city) return {};

  // Pre-compute a quick estimate for the meta description
  const loanAmount = city.medianHomePrice * 0.8;
  const monthlyRate = city.avgRate30yr / 100 / 12;
  const n = 360;
  const monthlyPI =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
    (Math.pow(1 + monthlyRate, n) - 1);
  const monthlyTotal = Math.round(
    monthlyPI +
      (city.medianHomePrice * city.propertyTaxRate) / 100 / 12 +
      city.avgHOA
  );

  const title = `${city.name}, ${city.stateAbbr} Mortgage Calculator — ${new Date().getFullYear()} Monthly Payment Estimator`;
  const description = `Free ${city.name} mortgage calculator. Based on median home price of ${formatCurrency(city.medianHomePrice)} and ${city.avgRate30yr}% rate, est. monthly payment is ${formatCurrency(monthlyTotal)}. Includes ${city.propertyTaxRate}% property tax + HOA.`;

  return {
    title,
    description,
    keywords: [
      `${city.name} mortgage calculator`,
      `${city.name} ${city.stateAbbr} mortgage`,
      `${city.name} home loan calculator`,
      `mortgage calculator ${city.state}`,
      `${city.name} monthly mortgage payment`,
      `how much is a mortgage in ${city.name}`,
      `${city.name} property tax mortgage`,
    ],
    alternates: {
      canonical: `https://calcforge.com/mortgage/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://calcforge.com/mortgage/${city.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────
export default function CityMortgagePage({
  params,
}: {
  params: { cityName: string };
}) {
  const city = getCityBySlug(params.cityName);

  // Returns Next.js 404 page if slug not found
  if (!city) notFound();

  // Pre-compute values for server-rendered content
  const defaultResult = calculateMortgage({
    homePrice: city.medianHomePrice,
    downPaymentPct: 20,
    interestRate: city.avgRate30yr,
    loanTermYears: 30,
    propertyTaxRate: city.propertyTaxRate,
    monthlyHOA: city.avgHOA,
  });

  // Structured data schemas
  const faqSchema = buildMortgageFAQSchema(city, defaultResult.monthlyPrincipalAndInterest);
  const breadcrumbSchema = buildBreadcrumbSchema(city);
  const webAppSchema = buildWebAppSchema(city);

  // Related cities (all except current)
  const allCities = getAllCities();
  const relatedCities = allCities.filter((c) => c.slug !== city.slug);

  // Affordability income estimate
  const requiredIncome = (defaultResult.totalMonthlyPayment / 0.28) * 12;

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Mortgage Calculator", href: "/mortgage" },
            { label: `${city.name}, ${city.stateAbbr}` },
          ]}
        />

        {/* ── H1 + Intro ── */}
        <header className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {city.name}, {city.state} Mortgage Calculator
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-3xl leading-relaxed">
            Estimate your monthly mortgage payment in {city.name} using local
            data: median home price of{" "}
            <strong className="text-gray-700">
              {formatCurrency(city.medianHomePrice)}
            </strong>
            , {city.propertyTaxRate}% property tax rate, and a current 30-year
            fixed rate of {city.avgRate30yr}%. Adjust any field to match your
            scenario.
          </p>
        </header>

        {/* ── Quick Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            {
              label: "Median Home Price",
              value: formatCurrency(city.medianHomePrice),
              accent: false,
            },
            {
              label: "30-Year Rate",
              value: `${city.avgRate30yr}%`,
              accent: false,
            },
            {
              label: "Property Tax Rate",
              value: `${city.propertyTaxRate}%/yr`,
              accent: false,
            },
            {
              label: "Est. Monthly Payment",
              value: formatCurrency(defaultResult.totalMonthlyPayment),
              accent: true,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl border px-4 py-3 ${
                stat.accent
                  ? "bg-brand-600 border-brand-700 text-white"
                  : "bg-white border-gray-200"
              }`}
            >
              <p
                className={`text-xs mb-1 ${
                  stat.accent ? "text-brand-100" : "text-gray-500"
                }`}
              >
                {stat.label}
              </p>
              <p
                className={`font-bold text-lg font-mono tabular-nums ${
                  stat.accent ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── MAIN CALCULATOR (Client Component) ── */}
        <MortgageCalculator city={city} />

        {/* ── H2: City Overview ── */}
        <section className="mt-12" aria-labelledby="city-overview">
          <h2 id="city-overview" className="text-2xl font-bold text-gray-900 mb-4">
            Home Prices in {city.name} ({new Date().getFullYear()})
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-600 leading-relaxed mb-5">{city.description}</p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Median Home Price</p>
                <p className="text-xl font-bold font-mono text-gray-900">
                  {formatCurrency(city.medianHomePrice)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  20% down = {formatCurrency(city.medianHomePrice * 0.2)} down payment
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Annual Property Tax</p>
                <p className="text-xl font-bold font-mono text-gray-900">
                  {formatCurrency(
                    (city.medianHomePrice * city.propertyTaxRate) / 100
                  )}
                  /yr
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {city.propertyTaxRate}% effective rate in {city.name}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Income Needed</p>
                <p className="text-xl font-bold font-mono text-gray-900">
                  {formatCurrency(requiredIncome)}/yr
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Based on 28% debt-to-income rule
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H2: How Much House Can You Afford ── */}
        <section className="mt-10" aria-labelledby="affordability">
          <h2 id="affordability" className="text-2xl font-bold text-gray-900 mb-4">
            How Much House Can You Afford in {city.name}?
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-gray-600 space-y-3 text-sm leading-relaxed">
            <p>
              The standard affordability guideline is the{" "}
              <strong className="text-gray-800">28/36 rule</strong>: your
              monthly housing costs should not exceed 28% of your gross monthly
              income, and total debt (including housing) should not exceed 36%.
            </p>
            <p>
              Based on {city.name}&apos;s median home price of{" "}
              {formatCurrency(city.medianHomePrice)} with a 20% down payment
              and the current {city.avgRate30yr}% rate, the estimated total
              monthly payment is{" "}
              <strong className="text-gray-800">
                {formatCurrency(defaultResult.totalMonthlyPayment)}
              </strong>
              . To afford this comfortably, you&apos;d need a gross annual
              income of approximately{" "}
              <strong className="text-gray-800">
                {formatCurrency(requiredIncome)}
              </strong>
              .
            </p>
            <p>
              Keep in mind that lenders also consider your credit score, existing
              debt, employment history, and the size of your down payment when
              qualifying you for a mortgage.
            </p>
          </div>
        </section>

        {/* ── H2: Mortgage Rates ── */}
        <section className="mt-10" aria-labelledby="rates">
          <h2 id="rates" className="text-2xl font-bold text-gray-900 mb-4">
            {city.name} Mortgage Rates Today
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">
                    Loan Type
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-700">
                    Rate (Est.)
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-700">
                    Monthly Payment
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-700 hidden sm:table-cell">
                    Total Interest
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { type: "30-Year Fixed", rate: city.avgRate30yr, years: 30 },
                  { type: "20-Year Fixed", rate: city.avgRate30yr - 0.2, years: 20 },
                  { type: "15-Year Fixed", rate: city.avgRate30yr - 0.5, years: 15 },
                  { type: "10-Year Fixed", rate: city.avgRate30yr - 0.75, years: 10 },
                ].map((row) => {
                  const calc = calculateMortgage({
                    homePrice: city.medianHomePrice,
                    downPaymentPct: 20,
                    interestRate: row.rate,
                    loanTermYears: row.years,
                    propertyTaxRate: city.propertyTaxRate,
                    monthlyHOA: city.avgHOA,
                  });
                  return (
                    <tr key={row.type} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-800">
                        {row.type}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-brand-600">
                        {row.rate.toFixed(2)}%
                      </td>
                      <td className="px-5 py-3 text-right font-mono font-semibold">
                        {formatCurrency(calc.totalMonthlyPayment)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-gray-500 hidden sm:table-cell">
                        {formatCurrency(calc.totalInterestPaid)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 px-5 py-3 border-t border-gray-100">
              * Rates are estimates based on national averages. Actual rates vary
              by lender, credit score, and down payment. Based on median home
              price of {formatCurrency(city.medianHomePrice)}, 20% down.
            </p>
          </div>
        </section>

        {/* ── H2: FAQ (also schema-marked) ── */}
        <section className="mt-10" aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-bold text-gray-900 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `What is the average mortgage payment in ${city.name}, ${city.state}?`,
                a: `Based on ${city.name}'s median home price of ${formatCurrency(city.medianHomePrice)} with a 20% down payment and the current 30-year fixed rate of ${city.avgRate30yr}%, the estimated total monthly payment (including property tax and HOA) is approximately ${formatCurrency(defaultResult.totalMonthlyPayment)}.`,
              },
              {
                q: `What is the property tax rate in ${city.name}?`,
                a: `${city.name}, ${city.state} has an effective property tax rate of approximately ${city.propertyTaxRate}% per year. On a ${formatCurrency(city.medianHomePrice)} home, this equals roughly ${formatCurrency((city.medianHomePrice * city.propertyTaxRate) / 100 / 12)}/month collected into escrow.`,
              },
              {
                q: `How much income do I need to afford a home in ${city.name}?`,
                a: `Using the 28% debt-to-income rule, you'd need an estimated gross annual income of ${formatCurrency(requiredIncome)} to comfortably afford the monthly mortgage payment on a median-priced home in ${city.name}. Lenders also consider your credit score, existing debt, and down payment.`,
              },
              {
                q: `What are current mortgage rates in ${city.name}?`,
                a: `Current 30-year fixed mortgage rates in ${city.name} are approximately ${city.avgRate30yr}%. The 15-year fixed rate is typically 0.5% lower, around ${(city.avgRate30yr - 0.5).toFixed(2)}%. Rates vary by lender and your individual financial profile.`,
              },
            ].map((item, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-xl group overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none">
                  <span>{item.q}</span>
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related Cities (Internal Linking) ── */}
        <section className="mt-12" aria-labelledby="related">
          <h2 id="related" className="text-xl font-bold text-gray-900 mb-4">
            Mortgage Calculators for Other Cities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCities.map((relCity) => (
              <CityCard key={relCity.slug} city={relCity} />
            ))}
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <aside className="mt-10 bg-gray-100 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-600">Disclaimer:</strong> All
          calculations are estimates for informational purposes only and do not
          constitute financial or mortgage advice. Actual loan terms, interest
          rates, property taxes, and HOA fees may vary. Consult a licensed
          mortgage professional before making financial decisions. Data was last
          updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.
        </aside>
      </div>
    </>
  );
}
