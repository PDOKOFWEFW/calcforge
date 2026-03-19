import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-600 font-mono mb-4">404</p>
      <h1 className="font-display text-3xl text-stone-900 mb-3">Page not found</h1>
      <p className="text-stone-500 mb-8">The page you&apos;re looking for doesn&apos;t exist. Try browsing our calculators below.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-brand-700 transition-colors">Go Home</Link>
        <Link href="/mortgage" className="bg-white border border-stone-300 text-stone-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-stone-50 transition-colors">Mortgage Calculators</Link>
        <Link href="/compound-interest" className="bg-white border border-stone-300 text-stone-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-stone-50 transition-colors">Compound Interest</Link>
      </div>
    </div>
  );
}
