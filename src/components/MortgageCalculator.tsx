"use client";

import { useState, useCallback } from "react";
import { calculateMortgage, formatCurrency } from "@/lib/mortgage";
import type { City } from "@/lib/types";

interface Props {
  city: City;
}

export default function MortgageCalculator({ city }: Props) {
  const [homePrice, setHomePrice] = useState(city.medianHomePrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(city.avgRate30yr);
  const [termYears, setTermYears] = useState(30);
  const [includeHOA, setIncludeHOA] = useState(true);

  const result = calculateMortgage({
    homePrice,
    downPaymentPct: downPct,
    interestRate: rate,
    loanTermYears: termYears,
    propertyTaxRate: city.propertyTaxRate,
    monthlyHOA: includeHOA ? city.avgHOA : 0,
  });

  const downPaymentDollars = homePrice * (downPct / 100);

  const handleNumericInput = useCallback(
    (setter: (v: number) => void, min: number, max: number) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value.replace(/,/g, ""));
        if (!isNaN(val)) setter(Math.min(max, Math.max(min, val)));
      },
    []
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="bg-brand-600 px-6 py-4">
        <h2 className="text-white font-semibold text-lg">
          Mortgage Calculator — {city.name}, {city.stateAbbr}
        </h2>
        <p className="text-brand-100 text-sm mt-0.5">
          Pre-filled with {city.name} local data · Adjust any field below
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* ── INPUTS ── */}
        <div className="p-6 space-y-5">
          {/* Home Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Home Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                $
              </span>
              <input
                type="number"
                min={50000}
                max={10000000}
                step={1000}
                value={homePrice}
                onChange={handleNumericInput(setHomePrice, 50000, 10000000)}
                className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              min={100000}
              max={2000000}
              step={5000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full mt-2 accent-brand-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>$100k</span>
              <span>$2M</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Down Payment
              <span className="ml-2 text-xs text-gray-400 font-normal">
                ({formatCurrency(downPaymentDollars)})
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={downPct}
                onChange={handleNumericInput(setDownPct, 0, 100)}
                className="w-full pr-8 pl-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                %
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="w-full mt-2 accent-brand-600"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Interest Rate (Annual)
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={20}
                step={0.05}
                value={rate}
                onChange={handleNumericInput(setRate, 1, 20)}
                className="w-full pr-8 pl-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                %
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full mt-2 accent-brand-600"
            />
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term
            </label>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTermYears(yr)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                    termYears === yr
                      ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:border-brand-400 hover:text-brand-600"
                  }`}
                >
                  {yr}yr
                </button>
              ))}
            </div>
          </div>

          {/* HOA toggle */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <button
              role="switch"
              aria-checked={includeHOA}
              onClick={() => setIncludeHOA((v) => !v)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                includeHOA ? "bg-brand-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  includeHOA ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700">
              Include HOA fee
              <span className="ml-1 text-gray-400 text-xs">
                (avg. {formatCurrency(city.avgHOA)}/mo in {city.name})
              </span>
            </span>
          </div>
        </div>

        {/* ── RESULTS ── */}
        <div className="p-6 bg-gray-50 flex flex-col gap-4">
          {/* Primary result */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Estimated Monthly Payment</p>
            <p className="text-4xl font-bold text-brand-600 font-mono tabular-nums">
              {formatCurrency(result.totalMonthlyPayment)}
            </p>
            <p className="text-xs text-gray-400 mt-1">per month</p>
          </div>

          {/* Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Principal &amp; Interest</span>
              <span className="text-sm font-semibold font-mono tabular-nums text-gray-900">
                {formatCurrency(result.monthlyPrincipalAndInterest)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Property Tax</span>
              <span className="text-sm font-semibold font-mono tabular-nums text-gray-900">
                {formatCurrency(result.monthlyPropertyTax)}
              </span>
            </div>
            {includeHOA && city.avgHOA > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">HOA Fee</span>
                <span className="text-sm font-semibold font-mono tabular-nums text-gray-900">
                  {formatCurrency(result.monthlyHOA)}
                </span>
              </div>
            )}
          </div>

          {/* Loan summary */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
              <p className="text-sm font-bold font-mono text-gray-900">
                {formatCurrency(result.loanAmount)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Total Interest</p>
              <p className="text-sm font-bold font-mono text-success-600">
                {formatCurrency(result.totalInterestPaid)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Total Cost</p>
              <p className="text-sm font-bold font-mono text-gray-900">
                {formatCurrency(result.totalCostOfLoan)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Payoff Date</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(
                  Date.now() + termYears * 365.25 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
              </p>
            </div>
          </div>

          {/* Affordability guide */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-auto">
            <p className="text-xs font-medium text-amber-800">
              💡 Affordability Rule
            </p>
            <p className="text-xs text-amber-700 mt-1">
              To afford {formatCurrency(result.totalMonthlyPayment)}/mo, you'd
              need ~{formatCurrency((result.totalMonthlyPayment / 0.28) * 12)}{" "}
              annual gross income (28% rule).
            </p>
          </div>
        </div>
      </div>

      {/* Amortization table (collapsed by default) */}
      <AmortizationTable result={result} termYears={termYears} />
    </div>
  );
}

// ── Amortization sub-component ──────────────────────────────

function AmortizationTable({
  result,
  termYears,
}: {
  result: ReturnType<typeof calculateMortgage>;
  termYears: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-3.5 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <span>Amortization Schedule ({termYears} years)</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="overflow-x-auto animate-fade-in">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-2 font-semibold">Year</th>
                <th className="px-4 py-2 font-semibold text-right">Principal</th>
                <th className="px-4 py-2 font-semibold text-right">Interest</th>
                <th className="px-4 py-2 font-semibold text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.amortization.map((row) => (
                <tr key={row.year} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono">{row.year}</td>
                  <td className="px-4 py-2 text-right font-mono text-brand-600">
                    {formatCurrency(row.principalPaid)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-gray-500">
                    {formatCurrency(row.interestPaid)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono font-medium">
                    {row.endingBalance < 100
                      ? "$0"
                      : formatCurrency(row.endingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
