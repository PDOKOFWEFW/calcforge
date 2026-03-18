import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-600 font-mono mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Try
        browsing our mortgage calculators below.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="bg-brand-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-brand-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/mortgage"
          className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          Mortgage Calculators
        </Link>
      </div>
    </div>
  );
}
