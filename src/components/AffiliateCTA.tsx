interface Props {
  cityName: string;
  monthlyPayment: number;
  variant?: "inline" | "sidebar";
}

export default function AffiliateCTA({ cityName, monthlyPayment, variant = "inline" }: Props) {
  const formatted = monthlyPayment.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  if (variant === "sidebar") {
    return (
      <div className="bg-gradient-to-br from-navy to-navy-mid rounded-2xl p-5 text-white">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="font-semibold text-sm leading-snug mb-1">
          Ready for a real rate in {cityName}?
        </h3>
        <p className="text-white/60 text-xs leading-relaxed mb-4">
          Compare lenders in 2 minutes. See if you qualify for a lower monthly payment.
        </p>
        <a
          href="https://www.lendingtree.com/"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full bg-white text-navy text-sm font-semibold text-center py-2.5 rounded-xl hover:bg-stone-100 transition-colors"
        >
          Compare Rates →
        </a>
        <p className="text-white/30 text-[10px] text-center mt-2">No credit score impact</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-teal-50 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-stone-800">
              Get a real rate for {formatted}/mo in {cityName}
            </p>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed pl-7">
            Compare offers from top lenders. Takes 2 minutes. No impact to your credit score.
          </p>
        </div>
        <a
          href="https://www.lendingtree.com/"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-shrink-0 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-blue hover:shadow-blue-lg duration-200 whitespace-nowrap"
        >
          Compare Lenders →
        </a>
      </div>
    </div>
  );
}
