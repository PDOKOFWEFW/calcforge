import type { Metadata } from "next";
import Link from "next/link";
import CityCard from "@/components/CityCard";
import AdBanner from "@/components/AdBanner";
import { getAllCities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "CalcForge — Free Mortgage Calculators for 50+ US Cities",
  description: "Free mortgage calculators with real local data for Austin, Denver, Miami, Seattle and 50+ more US cities. Plus compound interest, loan, and age calculators.",
};

export default function HomePage() {
  const cities = getAllCities();
  const featured = cities.slice(0, 9);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full border border-white/5" />
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-white/70 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              50+ cities · Real local data · Free forever
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-[1.1] mb-5">
              Mortgage calculators<br />
              <em className="text-white/50">built for your city</em>
            </h1>
            <p className="text-lg text-white/55 max-w-xl leading-relaxed mb-8">
              Pre-loaded with real local data — median home prices, property tax rates, and HOA averages — so your estimate is accurate from the first click.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/mortgage" className="bg-white text-navy font-semibold px-6 py-3 rounded-xl hover:bg-stone-100 transition-colors shadow-lg text-sm">
                Browse All Cities →
              </Link>
              <Link href="/compound-interest" className="bg-white/10 border border-white/20 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/15 transition-colors text-sm">
                Compound Interest Calculator
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-2xl">
            {[
              { value: "50+", label: "US cities with local data" },
              { value: "4",   label: "Calculator tools" },
              { value: "0",   label: "Signup required" },
              { value: "24h", label: "Data refresh cycle" },
            ].map(s => (
              <div key={s.label} className="bg-white/8 border border-white/10 rounded-2xl p-4">
                <p className="font-display text-3xl text-white mb-1">{s.value}</p>
                <p className="text-xs text-white/40 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad: Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdBanner slot="1111111111" format="horizontal" minHeight={90} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Featured cities */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">Mortgage Calculators</p>
              <h2 className="font-display text-3xl text-stone-900">Choose your city</h2>
              <p className="text-stone-500 text-sm mt-1.5">Use the search bar above to find any US city instantly.</p>
            </div>
            <Link href="/mortgage" className="hidden sm:flex items-center gap-1 text-sm text-brand-600 font-medium hover:text-brand-700">
              All {cities.length} cities <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(city => <CityCard key={city.slug} city={city} />)}
          </div>
          <div className="mt-4 text-center">
            <Link href="/mortgage" className="inline-flex items-center gap-2 text-sm text-brand-600 font-medium hover:text-brand-700 bg-brand-50 px-5 py-2.5 rounded-xl hover:bg-brand-100 transition-colors">
              View all {cities.length} city calculators →
            </Link>
          </div>
        </section>

        {/* All 4 tools */}
        <section className="mb-16">
          <div className="mb-7">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">All Calculators</p>
            <h2 className="font-display text-3xl text-stone-900">More tools</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href:"/mortgage", icon:"🏠", title:"Mortgage Calculator", desc:"Monthly payments with local city data for 50+ US cities.", badge:"50+ cities", color:"brand" },
              { href:"/compound-interest", icon:"📈", title:"Compound Interest", desc:"See how investments grow over time with monthly contributions.", badge:"Interactive chart", color:"teal" },
              { href:"/loan-calculator", icon:"💳", title:"Loan Calculator", desc:"Monthly payments for auto loans, personal loans, and student debt.", badge:"All loan types", color:"gold" },
              { href:"/age-calculator", icon:"🎂", title:"Age Calculator", desc:"Exact age in years, months, days. Days until next birthday.", badge:"Instant result", color:"stone" },
            ].map(tool => (
              <Link key={tool.href} href={tool.href}
                className="group bg-white border border-stone-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <span className="text-2xl mb-3 block">{tool.icon}</span>
                <h3 className="font-semibold text-stone-800 text-sm mb-1.5 group-hover:text-brand-700 transition-colors">{tool.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-3">{tool.desc}</p>
                <span className="inline-block text-[10px] bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full font-medium">{tool.badge}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad: Mid */}
        <div className="mb-16">
          <AdBanner slot="2222222222" format="auto" minHeight={250} />
        </div>

        {/* Why CalcForge */}
        <section className="bg-navy-gradient rounded-3xl px-8 sm:px-10 py-10 text-white mb-16">
          <h2 className="font-display text-3xl text-white mb-8 text-center">Why CalcForge?</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon:"📍", title:"Real Local Data", desc:"City-specific median home prices, property tax rates, and HOA averages — not generic national figures." },
              { icon:"⚡", title:"Instant Results",  desc:"All calculations run in your browser. No servers, no waiting, no lag as you adjust sliders." },
              { icon:"🔒", title:"Free Forever",     desc:"No account, no email, no paywall. CalcForge is and always will be completely free to use." },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1.5">{item.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All cities A-Z */}
        <section>
          <div className="mb-6">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">All Cities</p>
            <h2 className="font-display text-3xl text-stone-900">Mortgage calculators A–Z</h2>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex flex-wrap gap-2">
              {cities.map(city => (
                <Link key={city.slug} href={`/mortgage/${city.slug}`}
                  className="text-sm bg-stone-50 border border-stone-200 text-stone-700 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-full transition-colors">
                  {city.name}, {city.stateAbbr}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
