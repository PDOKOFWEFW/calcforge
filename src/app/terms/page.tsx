import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "CalcForge terms of use.",
};

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display text-4xl text-stone-900 mb-2">Terms of Use</h1>
      <p className="text-sm text-stone-400 mb-10">Last updated: {new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })}</p>
      <div className="space-y-8 text-stone-600 text-sm leading-relaxed">
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Acceptance</h2>
          <p>By using CalcForge, you agree to these terms. If you disagree, please do not use the site.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Disclaimer</h2>
          <p>All calculators on CalcForge are for informational and educational purposes only. Results are estimates and should not be construed as financial, legal, or professional advice. Always consult a licensed professional before making financial decisions.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Accuracy</h2>
          <p>We strive to keep data accurate and up-to-date. However, home prices, tax rates, interest rates, and other figures change frequently. We make no warranty about the accuracy of any calculation result.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Affiliate Disclosure</h2>
          <p>CalcForge may earn commissions from affiliate links on this site. These are clearly marked. This does not affect the content or calculators we provide.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Contact</h2>
          <p><a href="mailto:hello@calcforge.com" className="text-brand-600 hover:underline">hello@calcforge.com</a></p>
        </section>
      </div>
    </div>
  );
}
