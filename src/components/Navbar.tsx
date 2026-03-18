"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAllCities } from "@/lib/cities";

export default function Navbar() {
  const pathname = usePathname();
  const cities = getAllCities();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-brand-600 transition-colors">
              CalcForge
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <Link
                href="/mortgage"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  pathname.startsWith("/mortgage")
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Mortgage
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 py-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Cities
                </div>
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/mortgage/${city.slug}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">
                      {city.stateAbbr}
                    </span>
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile menu placeholder */}
          <button className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
