export interface Preset {
  uiIncome: number;
  uxrIncome: number;
  overhead: number;
  weeks: number;
  hoursPerWeek: number;
  billablePct: number;
  marginPct: number;
  contingencyPct: number;
  defaultHours: {
    research: number;
    ui: number;
  };
}

export interface CalculationInputs {
  uiIncome: number;
  uxrIncome: number;
  overhead: number;
  weeks: number;
  hoursPerWeek: number;
  billablePct: number;
  marginPct: number;
  contingencyPct: number;
  hoursResearch: number;
  hoursUI: number;
  hoursTotalManual: number;
  clientType: 'micro' | 'smb' | 'mid' | 'enterprise';
  complexity: 'basic' | 'standard' | 'complex' | 'extreme';
  valueUpliftPct: number;
  rushPct: number;
  engagement: 'freelance' | 'retainer';
  retainerHours: number;
  retainerDiscountPct: number;
}

export interface CalculationResults {
  billableHours: number;
  rateUI: number;
  rateUXR: number;
  blendedRate: number;
  adjustedRate: number;
  totalProjectHours: number;
  fixedPrice: number;
  retainerPrice: number;
}