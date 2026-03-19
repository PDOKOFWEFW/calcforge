import type { Metadata } from "next";
import LoanCalculatorClient from "@/components/LoanCalculatorClient";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Loan Calculator — Monthly Payments for Any Loan",
  description: "Free loan payment calculator for auto loans, personal loans, student loans, and more. See monthly payments, total interest, and full amortization schedule.",
  alternates: { canonical: "https://calcforge.com/loan-calculator" },
};

export default function LoanCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
        <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
        <span className="text-stone-300">/</span>
        <span className="text-stone-700 font-medium">Loan Calculator</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-900 mb-3">Loan Calculator</h1>
        <p className="text-stone-500 text-base max-w-2xl leading-relaxed">
          Calculate monthly payments, total interest, and payoff date for any loan — auto, personal, student, or business. See how extra payments can save you thousands.
        </p>
      </header>

      <AdBanner slot="8888888888" format="horizontal" minHeight={90} className="mb-8" />

      <LoanCalculatorClient />

      <section className="mt-12 grid md:grid-cols-3 gap-6">
        {[
          { title: "Auto Loans", desc: "Typical auto loan rates range from 5–12% depending on credit score and whether the car is new or used. Most auto loans have 36–72 month terms." },
          { title: "Personal Loans", desc: "Personal loan rates range from 6–36%. With good credit (720+), you can often find rates below 10%. Terms typically range from 2–7 years." },
          { title: "Student Loans", desc: "Federal student loan rates for 2024–25 are 6.53% for undergrad, 8.08% for grad. Private student loans vary widely based on credit history." },
        ].map(item => (
          <div key={item.title} className="bg-white border border-stone-200 rounded-2xl p-5">
            <h2 className="font-semibold text-stone-800 mb-2">{item.title}</h2>
            <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <AdBanner slot="9999999999" format="auto" minHeight={250} className="mt-10" />
    </div>
  );
}
