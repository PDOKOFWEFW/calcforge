import Link from "next/link";
import { getAllCities } from "@/lib/cities";

export default function Footer() {
  const cities = getAllCities();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-white/10">

          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13V7l5-4 5 4v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 13v-3h4v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-semibold text-[15px]">CalcForge</span>
            </div>
            <p className="text-sm leading-relaxed text-white/40 mb-5">
              Free online calculators for finance and everyday math. Built for accuracy, optimized for speed.
            </p>

            {/* Trust badges */}
            <div className="space-y-2">
              {[
                { icon: "🔒", text: "No data stored" },
                { icon: "⚡", text: "Browser-only calculations" },
                { icon: "🆓", text: "Always free" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2 text-xs text-white/30">
                  <span>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Calculators
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/mortgage" className="hover:text-white transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              {["Compound Interest", "BMI Calculator", "Age Calculator", "Loan Calculator"].map(t => (
                <li key={t} className="text-white/25">{t} <span className="text-[10px]">(soon)</span></li>
              ))}
            </ul>
          </div>

          {/* Cities — SEO internal links */}
          <div>
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Mortgage by City
            </h3>
            <ul className="space-y-2.5 text-sm">
              {cities.map(city => (
                <li key={city.slug}>
                  <Link
                    href={`/mortgage/${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {city.name}, {city.stateAbbr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[11px] text-white/25 leading-relaxed">
                Estimates for informational purposes only. Not financial advice. Consult a licensed mortgage professional before making decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-[12px] text-white/25">
          <p>© {year} CalcForge. All rights reserved.</p>
          <p>Data updated weekly · Rates are estimates only</p>
        </div>
      </div>
    </footer>
  );
}
