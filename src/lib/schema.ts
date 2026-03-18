import type { City } from "./types";

/**
 * Generates FAQ schema for a city mortgage page.
 * FAQ rich results increase CTR significantly in Google SERPs.
 */
export function buildMortgageFAQSchema(city: City, monthlyPayment: number) {
  const loanAmount = city.medianHomePrice * 0.8; // assume 20% down
  const formattedPayment = monthlyPayment.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const formattedPrice = city.medianHomePrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const formattedLoan = loanAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the average mortgage payment in ${city.name}, ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Based on ${city.name}'s median home price of ${formattedPrice} with a 20% down payment (${formattedLoan} loan) and the current 30-year fixed rate of ${city.avgRate30yr}%, the estimated monthly principal and interest payment is approximately ${formattedPayment}. This does not include property taxes or HOA fees.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the property tax rate in ${city.name}, ${city.stateAbbr}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name}, ${city.state} has an effective property tax rate of approximately ${city.propertyTaxRate}% of the assessed home value per year. On a ${formattedPrice} home, this equals roughly ${((city.medianHomePrice * city.propertyTaxRate) / 100 / 12).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} per month.`,
        },
      },
      {
        "@type": "Question",
        name: `How much do I need to earn to afford a home in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The general guideline is that your mortgage payment should not exceed 28% of your gross monthly income. Based on ${city.name}'s median home price of ${formattedPrice}, you would need an annual gross income of approximately ${((monthlyPayment / 0.28) * 12).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} to comfortably afford the estimated monthly payment.`,
        },
      },
      {
        "@type": "Question",
        name: `What are current 30-year mortgage rates in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Current 30-year fixed mortgage rates in ${city.name}, ${city.state} are approximately ${city.avgRate30yr}%. Rates vary by lender, credit score, and down payment. Use our calculator above to see how different rates affect your monthly payment.`,
        },
      },
    ],
  };
}

/**
 * BreadcrumbList schema for SERP breadcrumb display.
 */
export function buildBreadcrumbSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://calcforge.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mortgage Calculator",
        item: "https://calcforge.com/mortgage",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.name}, ${city.stateAbbr} Mortgage Calculator`,
        item: `https://calcforge.com/mortgage/${city.slug}`,
      },
    ],
  };
}

/**
 * WebApplication schema — marks the page as an interactive tool.
 */
export function buildWebAppSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${city.name} Mortgage Calculator`,
    description: `Free mortgage calculator for ${city.name}, ${city.state}. Estimate monthly payments based on local median home prices, property tax rates, and current interest rates.`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `https://calcforge.com/mortgage/${city.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
