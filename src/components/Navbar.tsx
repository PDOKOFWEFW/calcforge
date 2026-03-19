"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getAllCities } from "@/lib/cities";

export default function Navbar() {
  const pathname = usePathname();
  const cities = getAllCities();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center shadow-sm group-hover:shadow-blue transition-shadow duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13V7l5-4 5 4v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 13v-3h4v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <span className="font-semibold text-stone-900 text-[15px] tracking-tight leading-none">
                CalcForge
              </span>
              <span className="hidden sm:block text-[10px] text-stone-400 leading-none mt-0.5 tracking-wide">
                FINANCIAL CALCULATORS
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === "/"
                  ? "bg-brand-50 text-brand-600"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              Home
            </Link>

            {/* Mortgage dropdown */}
            <div className="relative group">
              <Link
                href="/mortgage"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname.startsWith("/mortgage")
                    ? "bg-brand-50 text-brand-600"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                Mortgage
                <svg className="w-3.5 h-3.5 opacity-50 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Dropdown panel */}
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <div className="w-56 bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="px-3 pt-3 pb-2">
                    <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest px-2">
                      Calculator by City
                    </p>
                  </div>
                  <div className="pb-2">
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/mortgage/${city.slug}`}
                        className="flex items-center gap-3 px-3 py-2 mx-1 rounded-xl hover:bg-stone-50 transition-colors group/item"
                      >
                        <span className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 text-xs font-bold flex items-center justify-center font-mono flex-shrink-0 group-hover/item:bg-brand-100 group-hover/item:text-brand-700 transition-colors">
                          {city.stateAbbr}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-stone-800 leading-none">
                            {city.name}
                          </p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {city.state}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-stone-100 px-3 py-2.5">
                    <Link
                      href="/mortgage"
                      className="flex items-center gap-1.5 text-xs text-brand-600 font-medium hover:text-brand-700 px-2"
                    >
                      View all calculators
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/mortgage"
              className="hidden sm:flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-blue hover:shadow-blue-lg duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculate Now
            </Link>

            <button
              className="md:hidden p-2 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-stone-100 py-3 space-y-1 animate-fade-in">
            <Link href="/" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/mortgage" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50" onClick={() => setMobileOpen(false)}>
              All Mortgage Calculators
            </Link>
            <div className="px-3 pt-2 pb-1">
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">By City</p>
              <div className="grid grid-cols-2 gap-1.5">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/mortgage/${city.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 text-sm text-stone-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    <span className="text-xs font-mono font-bold text-stone-400">{city.stateAbbr}</span>
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
