import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

import MortgageCalculator from "@/components/MortgageCalculator";
import AffiliateCTA from "@/components/AffiliateCTA";
import AdBanner from "@/components/AdBanner";
import CityCard from "@/components/CityCard";
import { getAllCities, getCityBySlug } from "@/lib/cities";
import { calculateMortgage, formatCurrency } from "@/lib/mortgage";
import { buildMortgageFAQSchema, buildBreadcrumbSchema, buildWebAppSchema } from "@/lib/schema";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllCities().map(city => ({ cityName: city.slug }));
}

export async function generateMetadata({ params }: { params: { cityName: string } }): Promise<Metadata> {
  const city = getCityBySlug(params.cityName);
  if (!city) return {};

  const r = city.avgRate30yr / 100 / 12;
  const n = 360;
  const pi = (city.medianHomePrice * 0.8 * (r * Math.pow(1+r,n))) / (Math.pow(1+r,n)-1);
  const total = Math.round(pi + (city.medianHomePrice * city.propertyTaxRate)/100/12 + city.avgHOA);

  const title = `${city.name}, ${city.stateAbbr} Mortgage Calculator — ${new Date().getFullYear()} Monthly Payment Estimator`;
  const description = `Free ${city.name} mortgage calculator. Based on median price ${formatCurrency(city.medianHomePrice)} and ${city.avgRate30yr}% rate — estimated monthly payment is ${formatCurrency(total)}. Includes ${city.propertyTaxRate}% property tax and HOA.`;

  return {
    title,
    description,
    keywords: [
      `${city.name} mortgage calculator`,
      `${city.name} home loan calculator`,
      `mortgage calculator ${city.state}`,
      `${city.name} monthly mortgage payment`,
      `${city.name.toLowerCase()} mortgage rates ${new Date().getFullYear()}`,
    ],
    alternates: { canonical: `https://calcforge.com/mortgage/${city.slug}` },
    openGraph: { title, description, url: `https://calcforge.com/mortgage/${city.slug}`, type: "website" },
  };
}

export default function CityMortgagePage({ params }: { params: { cityName: string } }) {
  const city = getCityBySlug(params.cityName);
  if (!city) notFound();

  const result = calculateMortgage({
    homePrice: city.medianHomePrice,
    downPaymentPct: 20,
    interestRate: city.avgRate30yr,
    loanTermYears: 30,
    propertyTaxRate: city.propertyTaxRate,
    monthlyHOA: city.avgHOA,
  });

  const requiredIncome = (result.totalMonthlyPayment / 0.28) * 12;
  const allCities = getAllCities();
  const relatedCities = allCities.filter(c => c.slug !== city.slug);

  return (
    <>
      {/* JSON-LD Schemas */}
      {[
        buildMortgageFAQSchema(city, result.monthlyPrincipalAndInterest),
        buildBreadcrumbSchema(city),
        buildWebAppSchema(city),
      ].map((schema, i) => (
        <Script key={i} id={`schema-${i}`} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-7">
          {[
            { label: "Home", href: "/" },
            { label: "Mortgage Calculator", href: "/mortgage" },
            { label: `${city.name}, ${city.stateAbbr}` },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <svg className="w-3 h-3 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>}
              {item.href
                ? <Link href={item.href} className="hover:text-brand-600 transition-colors">{item.label}</Link>
                : <span className="text-stone-700 font-medium">{item.label}</span>
              }
            </span>
          ))}
        </nav>

        {/* Page header */}
        <header className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-stone-900 leading-tight mb-3">
            {city.name}, {city.state}<br />
            <span className="text-stone-400">Mortgage Calculator</span>
          </h1>
          <p className="text-stone-500 text-base max-w-2xl leading-relaxed">
            Pre-filled with {city.name}&apos;s local data: median price of{" "}
            <strong className="text-stone-700">{formatCurrency(city.medianHomePrice)}</strong>,{" "}
            {city.propertyTaxRate}% annual property tax, and a {city.avgRate30yr}% 30-year rate.
          </p>
        </header>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Median Home Price",  value: formatCurrency(city.medianHomePrice), highlight: false },
            { label: "30-Year Rate",       value: `${city.avgRate30yr}%`,               highlight: false },
            { label: "Property Tax Rate",  value: `${city.propertyTaxRate}%/yr`,        highlight: false },
            { label: "Est. Monthly",       value: formatCurrency(result.totalMonthlyPayment), highlight: true },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border px-4 py-3.5 ${
              s.highlight
                ? "bg-navy border-navy-mid text-white"
                : "bg-white border-stone-200"
            }`}>
              <p className={`text-xs mb-1.5 ${s.highlight ? "text-white/50" : "text-stone-400"}`}>
                {s.label}
              </p>
              <p className={`font-display text-2xl tabular-nums leading-none ${s.highlight ? "text-white" : "text-stone-900"}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column layout: main content + sidebar */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">

          {/* ── MAIN COLUMN ── */}
          <div className="space-y-8 min-w-0">

            {/* Calculator */}
            <MortgageCalculator city={city} />

            {/* Affiliate CTA — below calculator, high intent moment */}
            <AffiliateCTA cityName={city.name} monthlyPayment={result.totalMonthlyPayment} />

            {/* Ad: In-content after calculator */}
            <AdBanner slot="3333333333" format="auto" minHeight={250} />

            {/* City overview */}
            <section aria-labelledby="city-overview">
              <h2 id="city-overview" className="font-display text-2xl text-stone-900 mb-4">
                Home Prices in {city.name} ({new Date().getFullYear()})
              </h2>
              <div className="bg-white border border-stone-200 rounded-2xl p-6">
                <p className="text-stone-600 text-sm leading-relaxed mb-6">{city.description}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Median Home Price",
                      value: formatCurrency(city.medianHomePrice),
                      sub: `20% down = ${formatCurrency(city.medianHomePrice * 0.2)}`,
                    },
                    {
                      label: "Annual Property Tax",
                      value: `${formatCurrency((city.medianHomePrice * city.propertyTaxRate) / 100)}/yr`,
                      sub: `${city.propertyTaxRate}% effective rate`,
                    },
                    {
                      label: "Income Needed",
                      value: `${formatCurrency(requiredIncome)}/yr`,
                      sub: "28% DTI rule",
                    },
                  ].map(s => (
                    <div key={s.label} className="bg-stone-50 rounded-xl p-4">
                      <p className="text-xs text-stone-400 mb-1.5">{s.label}</p>
                      <p className="font-display text-xl text-stone-900 mb-1">{s.value}</p>
                      <p className="text-xs text-stone-400">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Affordability */}
            <section aria-labelledby="affordability">
              <h2 id="affordability" className="font-display text-2xl text-stone-900 mb-4">
                How Much House Can You Afford in {city.name}?
              </h2>
              <div className="bg-white border border-stone-200 rounded-2xl p-6 text-sm text-stone-600 space-y-3 leading-relaxed">
                <p>
                  The standard guideline is the <strong className="text-stone-800">28/36 rule</strong>: monthly
                  housing costs should stay under 28% of gross monthly income, and total debt under 36%.
                </p>
                <p>
                  For {city.name}&apos;s median price of {formatCurrency(city.medianHomePrice)} with 20% down
                  at {city.avgRate30yr}%, the estimated payment is{" "}
                  <strong className="text-stone-800">{formatCurrency(result.totalMonthlyPayment)}/mo</strong>.
                  That requires roughly{" "}
                  <strong className="text-stone-800">{formatCurrency(requiredIncome)}/year</strong> gross income.
                </p>
                <p>
                  Lenders also weigh your credit score, existing debt, employment history, and down payment size
                  when qualifying your application.
                </p>
              </div>
            </section>

            {/* Rates table */}
            <section aria-labelledby="rates">
              <h2 id="rates" className="font-display text-2xl text-stone-900 mb-4">
                {city.name} Mortgage Rates Today
              </h2>
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">Loan Type</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">Rate</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide">Monthly</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-stone-600 text-xs uppercase tracking-wide hidden sm:table-cell">Total Interest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {[
                      { type: "30-Year Fixed", rate: city.avgRate30yr, years: 30 },
                      { type: "20-Year Fixed", rate: city.avgRate30yr - 0.2, years: 20 },
                      { type: "15-Year Fixed", rate: city.avgRate30yr - 0.5, years: 15 },
                      { type: "10-Year Fixed", rate: city.avgRate30yr - 0.75, years: 10 },
                    ].map(row => {
                      const c = calculateMortgage({ homePrice: city.medianHomePrice, downPaymentPct: 20, interestRate: row.rate, loanTermYears: row.years, propertyTaxRate: city.propertyTaxRate, monthlyHOA: city.avgHOA });
                      const isDefault = row.years === 30;
                      return (
                        <tr key={row.type} className={`hover:bg-stone-50 transition-colors ${isDefault ? "bg-brand-50/40" : ""}`}>
                          <td className="px-5 py-3.5 font-medium text-stone-800">
                            {row.type}
                            {isDefault && <span className="ml-2 text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded-md font-medium">Most common</span>}
                          </td>
                          <td className="px-5 py-3.5 text-right font-mono text-brand-600 font-semibold">{row.rate.toFixed(2)}%</td>
                          <td className="px-5 py-3.5 text-right font-mono font-semibold text-stone-800">{formatCurrency(c.totalMonthlyPayment)}</td>
                          <td className="px-5 py-3.5 text-right font-mono text-stone-400 hidden sm:table-cell">{formatCurrency(c.totalInterestPaid)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="text-xs text-stone-400 px-5 py-3 border-t border-stone-100">
                  * Estimates only. Actual rates vary by lender and borrower profile. Based on {formatCurrency(city.medianHomePrice)}, 20% down.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section aria-labelledby="faq">
              <h2 id="faq" className="font-display text-2xl text-stone-900 mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: `What is the average mortgage payment in ${city.name}, ${city.state}?`,
                    a: `Based on ${city.name}'s median home price of ${formatCurrency(city.medianHomePrice)} with a 20% down payment and the current 30-year rate of ${city.avgRate30yr}%, the estimated total monthly payment (including property tax and HOA) is approximately ${formatCurrency(result.totalMonthlyPayment)}.`,
                  },
                  {
                    q: `What is the property tax rate in ${city.name}?`,
                    a: `${city.name}, ${city.state} has an effective property tax rate of approximately ${city.propertyTaxRate}% per year. On a ${formatCurrency(city.medianHomePrice)} home, this equals roughly ${formatCurrency((city.medianHomePrice * city.propertyTaxRate)/100/12)}/month collected into escrow.`,
                  },
                  {
                    q: `How much income do I need to afford a home in ${city.name}?`,
                    a: `Using the 28% debt-to-income guideline, you'd need roughly ${formatCurrency(requiredIncome)}/year in gross income to comfortably cover the estimated payment. Lenders also consider your credit score, existing debts, and down payment.`,
                  },
                  {
                    q: `What are current mortgage rates in ${city.name}?`,
                    a: `Current 30-year fixed rates in ${city.name} are approximately ${city.avgRate30yr}%. The 15-year rate is typically 0.5% lower, around ${(city.avgRate30yr - 0.5).toFixed(2)}%. Rates vary by lender, credit score, and down payment size.`,
                  },
                ].map((item, i) => (
                  <details key={i} className="bg-white border border-stone-200 rounded-2xl group overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-stone-800 text-sm hover:bg-stone-50 transition-colors list-none">
                      <span>{item.q}</span>
                      <svg className="w-4 h-4 text-stone-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 pt-3 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related cities */}
            <section aria-labelledby="related-cities">
              <h2 id="related-cities" className="font-display text-2xl text-stone-900 mb-5">
                Mortgage Calculators for Other Cities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedCities.map(c => <CityCard key={c.slug} city={c} />)}
              </div>
            </section>

            {/* Disclaimer */}
            <aside className="bg-stone-100 rounded-2xl p-4 text-xs text-stone-400 leading-relaxed">
              <strong className="text-stone-500">Disclaimer:</strong> All calculations are estimates for informational
              purposes only and do not constitute financial or mortgage advice. Actual rates, taxes, and fees may
              vary. Consult a licensed mortgage professional. Data last updated{" "}
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.
            </aside>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block space-y-5 sticky top-24">
            {/* Affiliate */}
            <AffiliateCTA cityName={city.name} monthlyPayment={result.totalMonthlyPayment} variant="sidebar" />

            {/* Ad: Sidebar rectangle */}
            <AdBanner slot="4444444444" format="rectangle" minHeight={250} />

            {/* Quick facts */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                {city.name} Quick Facts
              </p>
              <div className="space-y-3">
                {[
                  { label: "State", value: city.state },
                  { label: "Population", value: city.population.toLocaleString() },
                  { label: "Median Price", value: formatCurrency(city.medianHomePrice) },
                  { label: "Property Tax", value: `${city.propertyTaxRate}% / year` },
                  { label: "Avg HOA", value: `${formatCurrency(city.avgHOA)} / mo` },
                  { label: "30yr Rate (est.)", value: `${city.avgRate30yr}%` },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between text-sm">
                    <span className="text-stone-400">{f.label}</span>
                    <span className="font-medium text-stone-700 tabular-nums">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad: Second sidebar */}
            <AdBanner slot="5555555555" format="rectangle" minHeight={250} />
          </aside>
        </div>
      </div>
    </>
  );
}
