"use client";
import { useState, useCallback } from "react";
import { calculateMortgage, formatCurrency } from "@/lib/mortgage";
import type { City } from "@/lib/types";

export default function MortgageCalculator({ city }: { city: City }) {
  const [homePrice, setHomePrice] = useState(city.medianHomePrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(city.avgRate30yr);
  const [termYears, setTermYears] = useState(30);
  const [includeHOA, setIncludeHOA] = useState(true);

  const result = calculateMortgage({
    homePrice, downPaymentPct: downPct, interestRate: rate,
    loanTermYears: termYears, propertyTaxRate: city.propertyTaxRate,
    monthlyHOA: includeHOA ? city.avgHOA : 0,
  });

  const downDollars = homePrice * (downPct / 100);
  const ltvPct = 100 - downPct;
  const piPct  = Math.round((result.monthlyPrincipalAndInterest / result.totalMonthlyPayment) * 100);
  const taxPct = Math.round((result.monthlyPropertyTax / result.totalMonthlyPayment) * 100);
  const hoaPct = includeHOA && city.avgHOA > 0 ? Math.round((result.monthlyHOA / result.totalMonthlyPayment) * 100) : 0;

  const onNum = useCallback((setter: (v: number) => void, min: number, max: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value.replace(/,/g, ""));
      if (!isNaN(v)) setter(Math.min(max, Math.max(min, v)));
    }, []);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-navy-gradient px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Mortgage Calculator</p>
          <h2 className="text-white font-semibold">{city.name}, {city.stateAbbr} — Local data pre-filled</h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-white/70 text-xs">Live</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px]">
        {/* Inputs */}
        <div className="p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-stone-100">

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">Home Price</label>
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                <span className="text-stone-400 text-sm">$</span>
                <input type="number" min={50000} max={10000000} step={1000} value={homePrice}
                  onChange={onNum(setHomePrice, 50000, 10000000)}
                  className="w-28 text-sm font-semibold text-stone-800 bg-transparent outline-none tabular-nums" />
              </div>
            </div>
            <input type="range" min={100000} max={2000000} step={5000} value={homePrice}
              onChange={e => setHomePrice(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-stone-400 mt-1"><span>$100k</span><span>$2M</span></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                Down Payment <span className="font-normal text-stone-400">({formatCurrency(downDollars)})</span>
              </label>
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                <input type="number" min={0} max={80} step={1} value={downPct}
                  onChange={onNum(setDownPct, 0, 80)}
                  className="w-10 text-sm font-semibold text-stone-800 bg-transparent outline-none text-right tabular-nums" />
                <span className="text-stone-400 text-sm">%</span>
              </div>
            </div>
            <input type="range" min={0} max={50} step={1} value={downPct}
              onChange={e => setDownPct(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-stone-400">0%</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${ltvPct > 80 ? "bg-gold-100 text-gold-700" : "bg-teal-100 text-teal-700"}`}>
                {ltvPct}% LTV {ltvPct > 80 ? "· PMI likely" : "· No PMI"}
              </span>
              <span className="text-stone-400">50%</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">Interest Rate</label>
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                <input type="number" min={1} max={20} step={0.05} value={rate}
                  onChange={onNum(setRate, 1, 20)}
                  className="w-12 text-sm font-semibold text-stone-800 bg-transparent outline-none text-right tabular-nums" />
                <span className="text-stone-400 text-sm">%</span>
              </div>
            </div>
            <input type="range" min={2} max={15} step={0.05} value={rate}
              onChange={e => setRate(parseFloat(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-stone-400 mt-1"><span>2%</span><span>15%</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Loan Term</label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 30].map(yr => (
                <button key={yr} onClick={() => setTermYears(yr)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    termYears === yr ? "bg-navy text-white border-navy shadow-md" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                  }`}>
                  {yr}yr
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-100">
            <div>
              <p className="text-sm font-medium text-stone-700">Include HOA Fee</p>
              <p className="text-xs text-stone-400 mt-0.5">Avg. {formatCurrency(city.avgHOA)}/mo in {city.name}</p>
            </div>
            <button role="switch" aria-checked={includeHOA} onClick={() => setIncludeHOA(v => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${includeHOA ? "bg-brand-600" : "bg-stone-300"}`}>
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${includeHOA ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-stone-50/50 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 text-center">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">Monthly Payment</p>
            <p className="font-display text-5xl text-navy tabular-nums leading-none mb-1">
              {formatCurrency(result.totalMonthlyPayment)}
            </p>
            <p className="text-xs text-stone-400">per month</p>
            <div className="flex rounded-full overflow-hidden h-2 mt-4 gap-0.5">
              <div className="bg-brand-600 transition-all duration-500" style={{ width: `${piPct}%` }} />
              <div className="bg-gold-500 transition-all duration-500" style={{ width: `${taxPct}%` }} />
              {hoaPct > 0 && <div className="bg-teal-500 transition-all duration-500" style={{ width: `${hoaPct}%` }} />}
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-[11px] text-stone-500"><span className="w-2 h-2 rounded-full bg-brand-600" />P&I {piPct}%</span>
              <span className="flex items-center gap-1.5 text-[11px] text-stone-500"><span className="w-2 h-2 rounded-full bg-gold-500" />Tax {taxPct}%</span>
              {hoaPct > 0 && <span className="flex items-center gap-1.5 text-[11px] text-stone-500"><span className="w-2 h-2 rounded-full bg-teal-500" />HOA {hoaPct}%</span>}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm divide-y divide-stone-100">
            {[
              { label: "Principal & Interest", value: result.monthlyPrincipalAndInterest, color: "text-brand-600" },
              { label: "Property Tax", value: result.monthlyPropertyTax, color: "text-gold-600" },
              ...(includeHOA && city.avgHOA > 0 ? [{ label: "HOA Fee", value: result.monthlyHOA, color: "text-teal-600" }] : []),
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-stone-600">{row.label}</span>
                <span className={`text-sm font-semibold font-mono tabular-nums ${row.color}`}>{formatCurrency(row.value)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Loan Amount", value: formatCurrency(result.loanAmount) },
              { label: "Total Interest", value: formatCurrency(result.totalInterestPaid) },
              { label: "Total Cost", value: formatCurrency(result.totalCostOfLoan) },
              { label: "Payoff Date", value: new Date(Date.now() + termYears * 365.25 * 864e5).toLocaleDateString("en-US", { year: "numeric", month: "short" }) },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-stone-200 px-3.5 py-3">
                <p className="text-[11px] text-stone-400 mb-1">{s.label}</p>
                <p className="text-sm font-semibold font-mono text-stone-800 tabular-nums">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-gold-50 border border-gold-200 rounded-xl p-3.5 flex gap-2.5">
            <span className="text-base flex-shrink-0">💡</span>
            <div>
              <p className="text-xs font-semibold text-gold-800 mb-0.5">Affordability Estimate</p>
              <p className="text-xs text-gold-700 leading-relaxed">
                To afford {formatCurrency(result.totalMonthlyPayment)}/mo, you need roughly{" "}
                <strong>{formatCurrency((result.totalMonthlyPayment / 0.28) * 12)}/year</strong> gross income (28% rule).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization */}
      <AmortizationSection result={result} termYears={termYears} />
    </div>
  );
}

function AmortizationSection({ result, termYears }: { result: ReturnType<typeof calculateMortgage>; termYears: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-stone-100">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Amortization Schedule ({termYears} years)
        </span>
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="overflow-x-auto animate-fade-in border-t border-stone-100">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500">
                <th className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider">Year</th>
                <th className="px-4 py-2.5 text-right font-semibold uppercase tracking-wider">Principal</th>
                <th className="px-4 py-2.5 text-right font-semibold uppercase tracking-wider">Interest</th>
                <th className="px-4 py-2.5 text-right font-semibold uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {result.amortization.map(row => (
                <tr key={row.year} className="hover:bg-stone-50">
                  <td className="px-4 py-2 font-mono text-stone-500">{row.year}</td>
                  <td className="px-4 py-2 text-right font-mono text-brand-600 font-medium">{formatCurrency(row.principalPaid)}</td>
                  <td className="px-4 py-2 text-right font-mono text-stone-400">{formatCurrency(row.interestPaid)}</td>
                  <td className="px-4 py-2 text-right font-mono text-stone-700 font-semibold">{row.endingBalance < 100 ? "$0" : formatCurrency(row.endingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
