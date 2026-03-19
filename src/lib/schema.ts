import type { City } from "./types";
import { formatCurrency } from "./mortgage";

export function buildMortgageFAQSchema(city: City, monthlyPayment: number, totalMonthly: number) {
  const requiredIncome = (totalMonthly / 0.28) * 12;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the average mortgage payment in ${city.name}, ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Based on ${city.name}'s median home price of ${formatCurrency(city.medianHomePrice)} with a 20% down payment and ${city.avgRate30yr}% rate, the estimated total monthly payment is ${formatCurrency(totalMonthly)}, including property tax and HOA.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the property tax rate in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name}, ${city.state} has an effective property tax rate of approximately ${city.propertyTaxRate}% per year, equaling ${formatCurrency((city.medianHomePrice * city.propertyTaxRate) / 100 / 12)}/month on a ${formatCurrency(city.medianHomePrice)} home.`,
        },
      },
      {
        "@type": "Question",
        name: `How much income do I need to buy a home in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Using the 28% debt-to-income rule, you'd need approximately ${formatCurrency(requiredIncome)}/year in gross income to afford the estimated payment on a median-priced home in ${city.name}.`,
        },
      },
      {
        "@type": "Question",
        name: `What are current 30-year mortgage rates in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Current 30-year fixed rates in ${city.name} are approximately ${city.avgRate30yr}%. The 15-year fixed rate is typically 0.5% lower, around ${(city.avgRate30yr - 0.5).toFixed(2)}%. Rates vary by lender and borrower profile.`,
        },
      },
    ],
  };
}

export function buildBreadcrumbSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://calcforge.com" },
      { "@type": "ListItem", position: 2, name: "Mortgage Calculator", item: "https://calcforge.com/mortgage" },
      { "@type": "ListItem", position: 3, name: `${city.name}, ${city.stateAbbr} Mortgage Calculator`, item: `https://calcforge.com/mortgage/${city.slug}` },
    ],
  };
}

export function buildWebAppSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${city.name} Mortgage Calculator`,
    description: `Free mortgage calculator for ${city.name}, ${city.state}. Pre-filled with local data.`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `https://calcforge.com/mortgage/${city.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
