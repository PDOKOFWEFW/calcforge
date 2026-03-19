"use client";

import { useState } from "react";

function fmt(v: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
}

const LOAN_TYPES = [
  { label: "Auto Loan",      rate: 7.5,  term: 60 },
  { label: "Personal Loan", rate: 11.0, term: 48 },
  { label: "Student Loan",  rate: 6.53, term: 120 },
  { label: "Custom",        rate: 8.0,  term: 60 },
];

export default function LoanCalculatorClient() {
  const [loanType,   setLoanType]   = useState(0);
  const [amount,     setAmount]     = useState(25000);
  const [rate,       setRate]       = useState(LOAN_TYPES[0].rate);
  const [termMonths, setTermMonths] = useState(LOAN_TYPES[0].term);
  const [extraPmt,   setExtraPmt]   = useState(0);

  function handleTypeChange(idx: number) {
    setLoanType(idx);
    if (LOAN_TYPES[idx].label !== "Custom") {
      setRate(LOAN_TYPES[idx].rate);
      setTermMonths(LOAN_TYPES[idx].term);
    }
  }

  // Standard payment
  const r = rate / 100 / 12;
  const n = termMonths;
  const monthlyPmt = r === 0 ? amount / n : (amount * (r * Math.pow(1+r,n))) / (Math.pow(1+r,n)-1);
  const totalPaid  = monthlyPmt * n;
  const totalInt   = totalPaid - amount;

  // With extra payments
  let balEx = amount, monthsEx = 0, intEx = 0;
  if (extraPmt > 0) {
    while (balEx > 0.01 && monthsEx < n * 2) {
      const intCharge = balEx * r;
      const principal = Math.min(balEx, monthlyPmt + extraPmt - intCharge);
      balEx -= principal;
      intEx += intCharge;
      monthsEx++;
    }
  }
  const saving = extraPmt > 0 ? totalInt - intEx : 0;
  const monthsSaved = extraPmt > 0 ? n - monthsEx : 0;

  // Amortization
  const rows: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
  let bal = amount;
  for (let m = 1; m <= n && bal > 0.01; m++) {
    const interest  = bal * r;
    const principal = Math.min(bal, monthlyPmt - interest);
    bal -= principal;
    rows.push({ month: m, payment: monthlyPmt, principal, interest, balance: bal });
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
      <div className="bg-navy-gradient px-6 py-4">
        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Loan Calculator</p>
        <h2 className="text-white font-semibold">Monthly Payment Estimator</h2>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px]">
        {/* Inputs */}
        <div className="p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-stone-100">

          {/* Loan type selector */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Loan Type</label>
            <div className="grid grid-cols-4 gap-2">
              {LOAN_TYPES.map((t, i) => (
                <button key={t.label} onClick={() => handleTypeChange(i)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                    loanType === i ? "bg-navy text-white border-navy shadow-md" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loan amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">Loan Amount</label>
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                <span className="text-stone-400 text-sm">$</span>
                <input type="number" min={500} max={1000000} step={500} value={amount}
                  onChange={e => setAmount(Math.max(500, Math.min(1000000, +e.target.value)))}
                  className="w-24 text-sm font-semibold text-stone-800 bg-transparent outline-none tabular-nums" />
              </div>
            </div>
            <input type="range" min={1000} max={200000} step={500} value={amount}
              onChange={e => setAmount(+e.target.value)} className="w-full" />
            <div className="flex justify-between text-xs text-stone-400 mt-1"><span>$1k</span><span>$200k</span></div>
          </div>

          {/* Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">Interest Rate</label>
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                <input type="number" min={0.5} max={40} step={0.25} value={rate}
                  onChange={e => setRate(Math.max(0.5, Math.min(40, +e.target.value)))}
                  className="w-12 text-sm font-semibold text-stone-800 bg-transparent outline-none text-right tabular-nums" />
                <span className="text-stone-400 text-sm">%</span>
              </div>
            </div>
            <input type="range" min={0.5} max={30} step={0.25} value={rate}
              onChange={e => setRate(+e.target.value)} className="w-full" />
          </div>

          {/* Term */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">Loan Term</label>
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                <input type="number" min={6} max={360} step={6} value={termMonths}
                  onChange={e => setTermMonths(Math.max(6, Math.min(360, +e.target.value)))}
                  className="w-14 text-sm font-semibold text-stone-800 bg-transparent outline-none text-right tabular-nums" />
                <span className="text-stone-400 text-sm">mo</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[12, 24, 36, 48, 60, 72, 84, 120].map(m => (
                <button key={m} onClick={() => setTermMonths(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    termMonths === m ? "bg-navy text-white border-navy" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                  }`}>
                  {m >= 12 ? `${m/12}yr` : `${m}mo`}
                </button>
              ))}
            </div>
          </div>

          {/* Extra payment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                Extra Monthly Payment
                <span className="ml-2 text-xs text-stone-400 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                <span className="text-stone-400 text-sm">$</span>
                <input type="number" min={0} max={10000} step={25} value={extraPmt}
                  onChange={e => setExtraPmt(Math.max(0, +e.target.value))}
                  className="w-20 text-sm font-semibold text-stone-800 bg-transparent outline-none tabular-nums" />
              </div>
            </div>
            <input type="range" min={0} max={2000} step={25} value={extraPmt}
              onChange={e => setExtraPmt(+e.target.value)} className="w-full" />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-stone-50/50 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 text-center">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">Monthly Payment</p>
            <p className="font-display text-5xl text-navy tabular-nums leading-none mb-1">{fmt(monthlyPmt)}</p>
            <p className="text-xs text-stone-400">per month</p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm divide-y divide-stone-100">
            {[
              { label: "Loan Amount",     value: fmt(amount),   color: "text-stone-800" },
              { label: "Total Interest",  value: fmt(totalInt), color: "text-brand-600" },
              { label: "Total Paid",      value: fmt(totalPaid),color: "text-stone-800" },
              { label: "Payoff Date",     value: new Date(Date.now() + termMonths * 30.44 * 864e5).toLocaleDateString("en-US", { month:"short", year:"numeric" }), color: "text-stone-800" },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-stone-500">{row.label}</span>
                <span className={`text-sm font-semibold font-mono tabular-nums ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>

          {extraPmt > 0 && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-teal-800 mb-2">💰 Extra payment savings</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-teal-700">Interest saved</span>
                  <span className="font-semibold text-teal-800 font-mono">{fmt(saving)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-teal-700">Paid off sooner</span>
                  <span className="font-semibold text-teal-800">{monthsSaved} months earlier</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-teal-700">New payoff</span>
                  <span className="font-semibold text-teal-800">
                    {new Date(Date.now() + monthsEx * 30.44 * 864e5).toLocaleDateString("en-US", { month:"short", year:"numeric" })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Amortization */}
      <details className="border-t border-stone-100 group">
        <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-medium text-stone-600 hover:bg-stone-50 list-none">
          <span>Full Amortization Schedule ({termMonths} months)</span>
          <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
        </summary>
        <div className="overflow-auto max-h-72 border-t border-stone-100">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-stone-50">
              <tr className="text-stone-500 border-b border-stone-200">
                <th className="px-4 py-2.5 text-left font-semibold uppercase tracking-wide">Month</th>
                <th className="px-4 py-2.5 text-right font-semibold uppercase tracking-wide">Principal</th>
                <th className="px-4 py-2.5 text-right font-semibold uppercase tracking-wide">Interest</th>
                <th className="px-4 py-2.5 text-right font-semibold uppercase tracking-wide">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {rows.map(row => (
                <tr key={row.month} className="hover:bg-stone-50">
                  <td className="px-4 py-2 font-mono text-stone-500">{row.month}</td>
                  <td className="px-4 py-2 text-right font-mono text-brand-600">{fmt(row.principal)}</td>
                  <td className="px-4 py-2 text-right font-mono text-stone-400">{fmt(row.interest)}</td>
                  <td className="px-4 py-2 text-right font-mono text-stone-700 font-semibold">{row.balance < 1 ? "$0" : fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
