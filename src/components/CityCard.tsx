import Link from "next/link";
import type { City } from "@/lib/types";
import { formatCurrency } from "@/lib/mortgage";

interface Props {
  city: City;
}

export default function CityCard({ city }: Props) {
  // Quick preview: 20% down, 30yr
  const loanAmount = city.medianHomePrice * 0.8;
  const monthlyRate = city.avgRate30yr / 100 / 12;
  const numPayments = 360;
  const monthlyPI =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const monthlyTax = (city.medianHomePrice * city.propertyTaxRate) / 100 / 12;
  const totalMonthly = monthlyPI + monthlyTax + city.avgHOA;

  return (
    <Link
      href={`/mortgage/${city.slug}`}
      className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-400 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
            {city.name}, {city.stateAbbr}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {city.population.toLocaleString()} residents
          </p>
        </div>
        <span className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-full font-medium">
          {city.state}
        </span>
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Median home price</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(city.medianHomePrice)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Property tax rate</span>
          <span className="font-medium text-gray-800">{city.propertyTaxRate}%/yr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Avg HOA</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(city.avgHOA)}/mo
          </span>
        </div>
      </div>

      {/* Estimated payment */}
      <div className="bg-brand-50 rounded-lg px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-brand-700 font-medium">Est. monthly payment</span>
        <span className="font-bold text-brand-700 text-lg font-mono">
          {formatCurrency(totalMonthly)}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-right">
        20% down · 30yr · {city.avgRate30yr}% APR →
      </p>
    </Link>
  );
}
