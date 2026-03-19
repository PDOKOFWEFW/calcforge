export interface City {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  medianHomePrice: number;
  propertyTaxRate: number;
  avgHOA: number;
  avgRate30yr: number;
  population: number;
  description: string;
}

export interface MortgageInputs {
  homePrice: number;
  downPaymentPct: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
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
