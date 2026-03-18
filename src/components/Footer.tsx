import Link from "next/link";
import { getAllCities } from "@/lib/cities";

export default function Footer() {
  const cities = getAllCities();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">CF</span>
              </div>
              <span className="text-white font-bold text-base">CalcForge</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Free online calculators for finance, health, and everyday math.
              Built for accuracy, designed for speed.
            </p>
            <p className="text-xs text-gray-600 mt-4">
              Estimates are for informational purposes only and do not
              constitute financial advice.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Calculators
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mortgage" className="hover:text-white transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <span className="text-gray-600">Compound Interest (coming soon)</span>
              </li>
              <li>
                <span className="text-gray-600">BMI Calculator (coming soon)</span>
              </li>
              <li>
                <span className="text-gray-600">Age Calculator (coming soon)</span>
              </li>
              <li>
                <span className="text-gray-600">Loan Calculator (coming soon)</span>
              </li>
            </ul>
          </div>

          {/* City pages — powerful for SEO internal linking */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Mortgage by City
            </h3>
            <ul className="space-y-2 text-sm">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/mortgage/${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {city.name}, {city.stateAbbr} Mortgage Calculator
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {year} CalcForge. All rights reserved.</p>
          <p>
            Data updated weekly. Rates are estimates and may not reflect current
            market conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}
