import type { MortgageInputs, MortgageResult, AmortizationRow } from "./types";

/**
 * Calculates full mortgage details from the given inputs.
 * Uses standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const { homePrice, downPaymentPct, interestRate, loanTermYears, propertyTaxRate, monthlyHOA } = inputs;

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;

  // Monthly principal + interest (standard amortization formula)
  let monthlyPI: number;
  if (monthlyRate === 0) {
    monthlyPI = loanAmount / numPayments;
  } else {
    monthlyPI =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyHOA;

  // Build yearly amortization schedule
  const amortization: AmortizationRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;

  for (let year = 1; year <= loanTermYears; year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let month = 0; month < 12; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      yearlyInterest += interestPayment;
      yearlyPrincipal += principalPayment;
      balance = Math.max(0, balance - principalPayment);
      totalInterest += interestPayment;
    }

    amortization.push({
      year,
      principalPaid: yearlyPrincipal,
      interestPaid: yearlyInterest,
      endingBalance: balance,
    });
  }

  return {
    monthlyPrincipalAndInterest: monthlyPI,
    monthlyPropertyTax,
    monthlyHOA,
    totalMonthlyPayment: totalMonthly,
    loanAmount,
    totalInterestPaid: totalInterest,
    totalCostOfLoan: loanAmount + totalInterest,
    amortization,
  };
}

// ============================================================
// Formatting helpers
// ============================================================

export function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}
