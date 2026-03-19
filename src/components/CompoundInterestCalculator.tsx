"use client";

import { useState, useEffect, useRef } from "react";

function formatCurrency(v: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
}

interface YearData {
  year: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}

function calculate(principal: number, monthlyContrib: number, annualRate: number, years: number): YearData[] {
  const r = annualRate / 100 / 12;
  const data: YearData[] = [];
  let balance = principal;
  let totalContribs = principal;

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthlyContrib;
      totalContribs += monthlyContrib;
    }
    data.push({
      year: y,
      balance: Math.round(balance),
      totalContributions: Math.round(totalContribs),
      totalInterest: Math.round(balance - totalContribs),
    });
  }
  return data;
}

export default function CompoundInterestCalculator() {
  const [principal,      setPrincipal]      = useState(10000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [annualRate,     setAnnualRate]     = useState(8);
  const [years,          setYears]          = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<any>(null);

  const data    = calculate(principal, monthlyContrib, annualRate, years);
  const final   = data[data.length - 1];
  const totalIn = principal + monthlyContrib * years * 12;
  const interest = final ? final.balance - totalIn : 0;

  useEffect(() => {
    if (!canvasRef.current) return;

    import("chart.js").then(({ Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend }) => {
      Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

      if (chartRef.current) chartRef.current.destroy();

      const labels = data.map(d => `Yr ${d.year}`);
      const skip   = years > 20 ? 5 : years > 10 ? 2 : 1;
      const filteredLabels = labels.filter((_, i) => (i + 1) % skip === 0 || i === data.length - 1);
      const filteredData   = data.filter((_, i)  => (i + 1) % skip === 0 || i === data.length - 1);

      chartRef.current = new Chart(canvasRef.current!, {
        type: "bar",
        data: {
          labels: filteredLabels,
          datasets: [
            {
              label: "Contributions",
              data: filteredData.map(d => d.totalContributions),
              backgroundColor: "#d6d3d1",
              borderRadius: 4,
              stack: "a",
            },
            {
              label: "Interest Earned",
              data: filteredData.map(d => d.totalInterest),
              backgroundColor: "#1a56db",
              borderRadius: 4,
              stack: "a",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw as number)}`,
                footer: items => ` Total: ${formatCurrency(items.reduce((s, i) => s + (i.raw as number), 0))}`,
              },
            },
          },
          scales: {
            x: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 }, color: "#a8a29e" } },
            y: {
              stacked: true,
              grid: { color: "rgba(0,0,0,0.04)" },
              ticks: {
                font: { size: 11 },
                color: "#a8a29e",
                callback: (v: any) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`,
              },
            },
          },
        },
      });
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [principal, monthlyContrib, annualRate, years]);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-navy-gradient px-6 py-4">
        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Compound Interest</p>
        <h2 className="text-white font-semibold">Investment Growth Calculator</h2>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr]">
        {/* Inputs */}
        <div className="p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-stone-100">

          {[
            { label: "Initial Investment", value: principal,      setter: setPrincipal,      min: 0,    max: 1000000, step: 500,  prefix: "$", suffix: "" },
            { label: "Monthly Contribution", value: monthlyContrib, setter: setMonthlyContrib, min: 0,    max: 10000,   step: 50,   prefix: "$", suffix: "" },
            { label: "Annual Return Rate",  value: annualRate,     setter: setAnnualRate,     min: 0.5,  max: 30,      step: 0.5,  prefix: "",  suffix: "%" },
            { label: "Time Horizon",        value: years,          setter: setYears,          min: 1,    max: 50,      step: 1,    prefix: "",  suffix: " yrs" },
          ].map(field => (
            <div key={field.label}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">{field.label}</label>
                <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                  {field.prefix && <span className="text-stone-400 text-sm">{field.prefix}</span>}
                  <input
                    type="number"
                    min={field.min} max={field.max} step={field.step}
                    value={field.value}
                    onChange={e => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v)) field.setter(Math.min(field.max, Math.max(field.min, v)) as any);
                    }}
                    className="w-20 text-sm font-semibold text-stone-800 bg-transparent outline-none text-right tabular-nums"
                  />
                  {field.suffix && <span className="text-stone-400 text-sm">{field.suffix}</span>}
                </div>
              </div>
              <input
                type="range" min={field.min} max={field.max} step={field.step}
                value={field.value}
                onChange={e => field.setter(parseFloat(e.target.value) as any)}
                className="w-full"
              />
            </div>
          ))}

          {/* Summary cards */}
          <div className="space-y-2 pt-2">
            <div className="bg-stone-50 rounded-xl p-3.5">
              <p className="text-xs text-stone-400 mb-1">Total invested</p>
              <p className="text-lg font-semibold font-mono text-stone-800">{formatCurrency(totalIn)}</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-3.5">
              <p className="text-xs text-brand-600 mb-1">Interest earned</p>
              <p className="text-lg font-semibold font-mono text-brand-700">{formatCurrency(Math.max(0, interest))}</p>
            </div>
            <div className="bg-navy rounded-xl p-3.5">
              <p className="text-xs text-white/50 mb-1">Final balance after {years} years</p>
              <p className="text-2xl font-display text-white">{final ? formatCurrency(final.balance) : "$0"}</p>
            </div>
          </div>
        </div>

        {/* Chart + table */}
        <div className="p-6">
          {/* Legend */}
          <div className="flex gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-xs text-stone-500">
              <span className="w-3 h-3 rounded bg-stone-300" />Contributions
            </span>
            <span className="flex items-center gap-1.5 text-xs text-stone-500">
              <span className="w-3 h-3 rounded bg-brand-600" />Interest earned
            </span>
          </div>

          <div style={{ height: 260 }}>
            <canvas ref={canvasRef} />
          </div>

          {/* Year-by-year table */}
          <div className="mt-6 overflow-auto max-h-64 rounded-xl border border-stone-100">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-stone-50">
                <tr className="text-stone-500 border-b border-stone-200">
                  <th className="text-left px-3 py-2.5 font-semibold uppercase tracking-wide">Year</th>
                  <th className="text-right px-3 py-2.5 font-semibold uppercase tracking-wide">Invested</th>
                  <th className="text-right px-3 py-2.5 font-semibold uppercase tracking-wide">Interest</th>
                  <th className="text-right px-3 py-2.5 font-semibold uppercase tracking-wide">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {data.map(row => (
                  <tr key={row.year} className="hover:bg-stone-50">
                    <td className="px-3 py-2 font-mono text-stone-500">{row.year}</td>
                    <td className="px-3 py-2 text-right font-mono text-stone-500">{formatCurrency(row.totalContributions)}</td>
                    <td className="px-3 py-2 text-right font-mono text-brand-600 font-medium">{formatCurrency(row.totalInterest)}</td>
                    <td className="px-3 py-2 text-right font-mono text-stone-800 font-semibold">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
