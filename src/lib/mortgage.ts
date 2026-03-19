import type { MortgageInputs, MortgageResult } from "./types";

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const { homePrice, downPaymentPct, interestRate, loanTermYears, propertyTaxRate, monthlyHOA } = inputs;
  const loanAmount = homePrice * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;

  let monthlyPI: number;
  if (monthlyRate === 0) {
    monthlyPI = loanAmount / numPayments;
  } else {
    monthlyPI = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyHOA;

  const amortization = [];
  let balance = loanAmount;
  let totalInterest = 0;

  for (let year = 1; year <= loanTermYears; year++) {
    let yearlyPrincipal = 0, yearlyInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPI - interest;
      yearlyInterest += interest;
      yearlyPrincipal += principal;
      balance = Math.max(0, balance - principal);
      totalInterest += interest;
    }
    amortization.push({ year, principalPaid: yearlyPrincipal, interestPaid: yearlyInterest, endingBalance: balance });
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

export function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  }).format(value);
}
