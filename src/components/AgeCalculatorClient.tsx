"use client";

import { useState, useEffect } from "react";

const ZODIAC = [
  { sign: "Capricorn", dates: "Dec 22 – Jan 19", emoji: "♑" },
  { sign: "Aquarius",  dates: "Jan 20 – Feb 18", emoji: "♒" },
  { sign: "Pisces",    dates: "Feb 19 – Mar 20", emoji: "♓" },
  { sign: "Aries",     dates: "Mar 21 – Apr 19", emoji: "♈" },
  { sign: "Taurus",    dates: "Apr 20 – May 20", emoji: "♉" },
  { sign: "Gemini",    dates: "May 21 – Jun 20", emoji: "♊" },
  { sign: "Cancer",    dates: "Jun 21 – Jul 22", emoji: "♋" },
  { sign: "Leo",       dates: "Jul 23 – Aug 22", emoji: "♌" },
  { sign: "Virgo",     dates: "Aug 23 – Sep 22", emoji: "♍" },
  { sign: "Libra",     dates: "Sep 23 – Oct 22", emoji: "♎" },
  { sign: "Scorpio",   dates: "Oct 23 – Nov 21", emoji: "♏" },
  { sign: "Sagittarius",dates:"Nov 22 – Dec 21", emoji: "♐" },
];

function getZodiac(month: number, day: number) {
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC[0];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC[1];
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return ZODIAC[2];
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC[3];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC[4];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC[5];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC[6];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC[7];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC[8];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC[9];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC[10];
  return ZODIAC[11];
}

function calcAge(dob: Date, target: Date) {
  let years = target.getFullYear() - dob.getFullYear();
  let months = target.getMonth() - dob.getMonth();
  let days = target.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  const totalDays = Math.floor((target.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));

  // Next birthday
  let nextBday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBday <= target) nextBday.setFullYear(target.getFullYear() + 1);
  const daysUntilBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  const birthDayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dob.getDay()];

  return { years, months, days, totalDays, daysUntilBday, nextBday, birthDayOfWeek };
}

export default function AgeCalculatorClient({ defaultYear }: { defaultYear?: number }) {
  const today = new Date();
  const defaultDOB = defaultYear
    ? `${defaultYear}-06-15`
    : `${today.getFullYear() - 25}-${String(today.getMonth() + 1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  const [dob,    setDob]    = useState(defaultDOB);
  const [target, setTarget] = useState(today.toISOString().split("T")[0]);

  const dobDate    = new Date(dob + "T00:00:00");
  const targetDate = new Date(target + "T00:00:00");
  const valid      = !isNaN(dobDate.getTime()) && !isNaN(targetDate.getTime()) && dobDate < targetDate;

  const result  = valid ? calcAge(dobDate, targetDate) : null;
  const zodiac  = valid ? getZodiac(dobDate.getMonth() + 1, dobDate.getDate()) : null;
  const decades = result ? Math.floor(result.years / 10) : 0;

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
      <div className="bg-navy-gradient px-6 py-4">
        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Age Calculator</p>
        <h2 className="text-white font-semibold">Exact Age in Years, Months & Days</h2>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr]">
        {/* Inputs */}
        <div className="p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-stone-100">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={dob}
              max={target}
              onChange={e => setDob(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Calculate Age On</label>
            <input
              type="date"
              value={target}
              min={dob}
              onChange={e => setTarget(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <button
              onClick={() => setTarget(today.toISOString().split("T")[0])}
              className="mt-2 text-xs text-brand-600 hover:text-brand-700 font-medium"
            >
              Reset to today
            </button>
          </div>

          {zodiac && (
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <p className="text-xs text-stone-400 mb-2">Zodiac Sign</p>
              <p className="text-2xl mb-1">{zodiac.emoji}</p>
              <p className="font-semibold text-stone-800">{zodiac.sign}</p>
              <p className="text-xs text-stone-400">{zodiac.dates}</p>
            </div>
          )}

          {result && (
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <p className="text-xs text-stone-400 mb-2">Born on a</p>
              <p className="font-semibold text-stone-800">{result.birthDayOfWeek}</p>
              <p className="text-xs text-stone-400 mt-1">{decades > 0 ? `${decades} decade${decades > 1 ? "s" : ""} old` : "Less than a decade old"}</p>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="p-6">
          {!valid ? (
            <div className="h-full flex items-center justify-center text-stone-400 text-sm">
              Enter a valid date of birth to see your age
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main result */}
              <div className="bg-navy rounded-2xl p-6 text-white text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Your Age</p>
                <div className="flex items-baseline justify-center gap-4 flex-wrap">
                  {[
                    { value: result!.years,  label: result!.years === 1 ? "year" : "years" },
                    { value: result!.months, label: result!.months === 1 ? "month" : "months" },
                    { value: result!.days,   label: result!.days === 1 ? "day" : "days" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="font-display text-5xl text-white tabular-nums leading-none">{item.value}</p>
                      <p className="text-white/50 text-xs mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Days lived",           value: result!.totalDays.toLocaleString(),         icon: "📅" },
                  { label: "Hours lived",           value: (result!.totalDays * 24).toLocaleString(),  icon: "⏰" },
                  { label: "Next birthday in",      value: `${result!.daysUntilBday} days`,            icon: "🎂" },
                  { label: "Next birthday date",    value: result!.nextBday.toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }), icon: "🗓️" },
                  { label: "Weeks lived",           value: Math.floor(result!.totalDays / 7).toLocaleString(), icon: "📆" },
                  { label: "Months lived",          value: (result!.years * 12 + result!.months).toLocaleString(), icon: "🗓" },
                ].map(stat => (
                  <div key={stat.label} className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
                    <p className="text-lg mb-0.5">{stat.icon}</p>
                    <p className="text-xs text-stone-400 mb-1">{stat.label}</p>
                    <p className="font-semibold text-stone-800 font-mono tabular-nums text-sm">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
