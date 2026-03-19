import Link from "next/link";
import { getAllCities } from "@/lib/cities";

export default function Footer() {
  const cities = getAllCities();
  const topCities = cities.slice(0, 20);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-white/10">
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
              Free calculators for mortgage, finance, and everyday math. 50+ US cities with local data.
            </p>
            <div className="space-y-2">
              {[{ icon:"🔒", text:"No data stored"}, {icon:"⚡", text:"Browser-only"}, {icon:"🆓", text:"Always free"}].map(b => (
                <div key={b.text} className="flex items-center gap-2 text-xs text-white/30">
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">Calculators</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/mortgage" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/compound-interest" className="hover:text-white transition-colors">Compound Interest</Link></li>
              <li><Link href="/loan-calculator" className="hover:text-white transition-colors">Loan Calculator</Link></li>
              <li><Link href="/age-calculator" className="hover:text-white transition-colors">Age Calculator</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">Mortgage by City</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {topCities.map(city => (
                <Link key={city.slug} href={`/mortgage/${city.slug}`} className="text-sm hover:text-white transition-colors truncate">
                  {city.name}, {city.stateAbbr}
                </Link>
              ))}
            </div>
            {cities.length > 20 && (
              <Link href="/mortgage" className="inline-block mt-3 text-xs text-brand-400 hover:text-brand-300">
                + {cities.length - 20} more cities →
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-[12px] text-white/25">
          <p>© {year} CalcForge. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
          </div>
          <p>Data updated weekly · Estimates only</p>
        </div>
      </div>
    </footer>
  );
}
