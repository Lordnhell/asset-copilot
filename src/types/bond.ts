export type BondQuote = {
  id: string;
  source: "email" | "pdf" | "api";
  bank: string;
  issuer: string;
  security_name: string;
  category: "Corporate" | "Sovereign";
  isin?: string;
  cusip?: string;
  currency: "SGD" | "USD" | "AUD" | "GBP" | string;
  notional: number;
  price_clean?: number;
  yield_to_maturity?: number;
  coupon_rate?: number;
  coupon_type: "Fixed" | "Floating" | "Zero";
  coupon_freq: "Annual" | "Semiannual" | "Quarterly";
  issue_date?: string;
  maturity_date: string;
  tenor_years?: number;
  rating_agency?: "S&P" | "Moody's" | "Fitch";
  rating?: string;
  oas_bps?: number;
  dv01_per_1mm?: number;
  creditInterestScore?: number; // 0 to 100 - combines credit quality and interest rate risk
  risk_score?: number | null;
  notes?: string;
  attachments?: string[];
};
