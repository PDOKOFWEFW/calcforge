"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { getAllCities, searchCities } from "@/lib/cities";
import type { City } from "@/lib/types";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const topCities = getAllCities().slice(0, 8);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchResults(searchCities(searchQuery));
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleCitySelect(city: City) {
    setSearchQuery("");
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/mortgage/${city.slug}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center shadow-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13V7l5-4 5 4v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 13v-3h4v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-stone-900 text-[15px] leading-none">CalcForge</p>
              <p className="text-[9px] text-stone-400 uppercase tracking-widest leading-none mt-0.5">Financial Calculators</p>
            </div>
          </Link>

          {/* City Search — the main interaction point */}
          <div className="flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search any city... (Austin, Denver, Miami)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setSearchOpen(true)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white focus:border-brand-300 transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              )}
            </div>

            {/* Search dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden z-50 animate-fade-in">
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
                    {searchResults.length} cities found
                  </p>
                </div>
                <div className="max-h-72 overflow-y-auto pb-2">
                  {searchResults.map(city => (
                    <button
                      key={city.slug}
                      onClick={() => handleCitySelect(city)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 mx-1 rounded-xl hover:bg-stone-50 transition-colors text-left"
                      style={{ width: "calc(100% - 8px)" }}
                    >
                      <span className="w-9 h-9 rounded-lg bg-stone-100 text-stone-600 text-xs font-bold flex items-center justify-center font-mono flex-shrink-0">
                        {city.stateAbbr}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-800 truncate">{city.name}, {city.stateAbbr}</p>
                        <p className="text-xs text-stone-400">{city.state} · {city.population.toLocaleString()} residents</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-semibold text-brand-600 font-mono">${(city.medianHomePrice / 1000).toFixed(0)}k</p>
                        <p className="text-[10px] text-stone-400">median</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {searchOpen && searchQuery.length > 1 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-2xl shadow-lg p-4 text-center z-50">
                <p className="text-sm text-stone-500">No cities found for &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-stone-400 mt-1">Try searching by state or abbreviation</p>
              </div>
            )}
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/mortgage", label: "Mortgage" },
              { href: "/compound-interest", label: "Compound" },
              { href: "/loan-calculator", label: "Loans" },
              { href: "/age-calculator", label: "Age" },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname.startsWith(item.href)
                    ? "bg-brand-50 text-brand-600"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-stone-500 hover:bg-stone-100 flex-shrink-0" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-stone-100 py-4 space-y-1 animate-fade-in">
            {[
              { href: "/mortgage", label: "Mortgage Calculator" },
              { href: "/compound-interest", label: "Compound Interest" },
              { href: "/loan-calculator", label: "Loan Calculator" },
              { href: "/age-calculator", label: "Age Calculator" },
            ].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50">
                {item.label}
              </Link>
            ))}
            <div className="px-3 pt-3">
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Top Cities</p>
              <div className="grid grid-cols-2 gap-1.5">
                {topCities.map(city => (
                  <Link key={city.slug} href={`/mortgage/${city.slug}`} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 text-sm text-stone-700 hover:bg-brand-50 hover:text-brand-700 transition-colors">
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
