// ============================================================
// Core domain types
// ============================================================

export interface City {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  medianHomePrice: number;
  propertyTaxRate: number; // annual percentage (e.g. 1.8 = 1.8%)
  avgHOA: number;          // monthly dollars
  avgRate30yr: number;     // annual percentage (e.g. 7.18 = 7.18%)
  population: number;
  description: string;
}

// ============================================================
// Mortgage calculation types
// ============================================================

export interface MortgageInputs {
  homePrice: number;
  downPaymentPct: number;   // percentage 0–100
  interestRate: number;     // annual percentage
  loanTermYears: number;
  propertyTaxRate: number;  // annual percentage
  monthlyHOA: number;
}

export interface MortgageResult {
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  loanAmount: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
  amortization: AmortizationRow[];
}

export interface AmortizationRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}
