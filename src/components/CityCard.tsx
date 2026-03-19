import Link from "next/link";
import type { City } from "@/lib/types";
import { formatCurrency } from "@/lib/mortgage";

interface Props {
  city: City;
}

export default function CityCard({ city }: Props) {
  const loanAmount = city.medianHomePrice * 0.8;
  const r = city.avgRate30yr / 100 / 12;
  const n = 360;
  const monthlyPI = (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  const monthlyTax = (city.medianHomePrice * city.propertyTaxRate) / 100 / 12;
  const total = monthlyPI + monthlyTax + city.avgHOA;

  return (
    <Link
      href={`/mortgage/${city.slug}`}
      className="group block bg-white border border-stone-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-stone-900 text-[15px] group-hover:text-brand-700 transition-colors leading-none">
            {city.name}, {city.stateAbbr}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {city.state} · {city.population.toLocaleString()} residents
          </p>
        </div>
        <span className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-brand-50 transition-colors flex items-center justify-center text-xs font-bold text-stone-500 group-hover:text-brand-600 font-mono flex-shrink-0">
          {city.stateAbbr}
        </span>
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-4">
        {[
          { label: "Median home price", value: formatCurrency(city.medianHomePrice) },
          { label: "Property tax", value: `${city.propertyTaxRate}%/yr` },
          { label: "Average HOA", value: `${formatCurrency(city.avgHOA)}/mo` },
        ].map(stat => (
          <div key={stat.label} className="flex items-center justify-between text-sm">
            <span className="text-stone-500">{stat.label}</span>
            <span className="font-medium text-stone-700 tabular-nums">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Payment highlight */}
      <div className="bg-gradient-to-r from-navy to-navy-mid rounded-xl px-4 py-3 flex items-center justify-between">
        <span className="text-white/60 text-xs">Est. monthly</span>
        <span className="text-white font-display text-xl tabular-nums">
          {formatCurrency(total)}
        </span>
      </div>
      <p className="text-[10px] text-stone-400 text-right mt-1.5">
        20% down · 30yr · {city.avgRate30yr}% APR
      </p>
    </Link>
  );
}
