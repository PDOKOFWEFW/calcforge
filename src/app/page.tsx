import type { Metadata } from "next";
import Link from "next/link";
import CityCard from "@/components/CityCard";
import AdBanner from "@/components/AdBanner";
import { getAllCities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "CalcForge — Free Mortgage Calculators with Local City Data",
  description:
    "Free mortgage calculators pre-loaded with real local data for US cities. Get an accurate monthly payment estimate in seconds — no signup required.",
};

const STATS = [
  { value: "5", label: "City calculators", suffix: "" },
  { value: "100", label: "% browser-based", suffix: "%" },
  { value: "0", label: "Signup required", suffix: "" },
  { value: "24h", label: "Data refresh cycle", suffix: "" },
];

export default function HomePage() {
  const cities = getAllCities();
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-navy-gradient relative overflow-hidden">
        {/* Mesh overlay */}
        <div className="absolute inset-0 bg-mesh-blue opacity-60" />
        {/* Decorative circle */}
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full border border-white/5" />
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-white/70 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Free · No signup · Instant results
            </div>

            <h1 className="font-display text-5xl sm:text-6xl text-white leading-[1.1] mb-5 animate-fade-up">
              Mortgage calculators{" "}
              <em className="text-white/50">built for your city</em>
            </h1>

            <p className="text-lg text-white/55 max-w-xl leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Pre-loaded with real local data — median home prices, property tax
              rates, and HOA averages — so your estimate is accurate from the
              first click.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link
                href="/mortgage"
                className="bg-white text-navy font-semibold px-6 py-3 rounded-xl hover:bg-stone-100 transition-colors shadow-lg text-sm"
              >
                Browse City Calculators →
              </Link>
              <Link
                href="/mortgage/austin-tx"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/15 transition-colors text-sm"
              >
                Try Austin Demo
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-2xl animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {STATS.map(s => (
              <div key={s.label} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <p className="font-display text-3xl text-white mb-1">{s.value}{s.suffix}</p>
                <p className="text-xs text-white/40 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD: Top leaderboard ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdBanner slot="1111111111" format="horizontal" minHeight={90} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── CITY CARDS ───────────────────────────────────── */}
        <section id="calculators" aria-labelledby="cities-heading" className="mb-16">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">
                Mortgage Calculators
              </p>
              <h2 id="cities-heading" className="font-display text-3xl text-stone-900">
                Choose your city
              </h2>
              <p className="text-stone-500 text-sm mt-1.5 max-w-lg">
                Each calculator is pre-filled with local median home price,
                property tax rate, and average HOA fee.
              </p>
            </div>
            <Link href="/mortgage" className="hidden sm:flex items-center gap-1 text-sm text-brand-600 font-medium hover:text-brand-700">
              View all
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {cities.map(city => (
              <div key={city.slug} className="animate-fade-up">
                <CityCard city={city} />
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <section className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">How it works</p>
            <h2 className="font-display text-3xl text-stone-900">Accurate estimates in seconds</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Pick your city",
                desc: "Select from our growing list of US cities. Each one is pre-loaded with local real estate data.",
                icon: "📍",
              },
              {
                step: "02",
                title: "Adjust your scenario",
                desc: "Change home price, down payment, interest rate, and loan term to match your situation.",
                icon: "🎛️",
              },
              {
                step: "03",
                title: "Get your estimate",
                desc: "See your monthly payment, total interest, affordability estimate, and full amortization schedule instantly.",
                icon: "⚡",
              },
            ].map(item => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-mono text-stone-400 mb-1">STEP {item.step}</p>
                  <h3 className="font-semibold text-stone-800 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── AD: Mid-page rectangle ───────────────────────── */}
        <div className="mb-16">
          <AdBanner slot="2222222222" format="auto" minHeight={250} />
        </div>

        {/* ── COMING SOON TOOLS ────────────────────────────── */}
        <section className="mb-16" aria-labelledby="tools-heading">
          <div className="mb-6">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Coming soon</p>
            <h2 id="tools-heading" className="font-display text-3xl text-stone-900">More calculators</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📈", title: "Compound Interest", desc: "Watch investments grow over time with monthly contributions." },
              { icon: "⚖️", title: "BMI Calculator",    desc: "Body Mass Index with healthy weight range guidance." },
              { icon: "🎂", title: "Age Calculator",     desc: "Exact age in years, months, and days from any birthdate." },
              { icon: "💳", title: "Loan Calculator",    desc: "Monthly payments for auto, personal, and student loans." },
            ].map(tool => (
              <div key={tool.title} className="bg-white border border-stone-200 border-dashed rounded-2xl p-5">
                <span className="text-2xl mb-3 block">{tool.icon}</span>
                <h3 className="font-semibold text-stone-700 text-sm mb-1">{tool.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{tool.desc}</p>
                <span className="inline-block mt-3 text-[10px] bg-stone-100 text-stone-400 px-2.5 py-1 rounded-full font-medium uppercase tracking-wide">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY CALCFORGE ────────────────────────────────── */}
        <section className="bg-navy-gradient rounded-3xl px-8 sm:px-10 py-10 text-white">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: "📍", title: "Real Local Data", desc: "City-specific median home prices, tax rates, and HOA averages — not generic national figures." },
              { icon: "⚡", title: "Instant Results",  desc: "All calculations run in your browser. No servers, no waiting, no lag." },
              { icon: "🔒", title: "Free Forever",     desc: "No account required. No paywalls. CalcForge is and will always be completely free." },
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
      </div>
    </>
  );
}
