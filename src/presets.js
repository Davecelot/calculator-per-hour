/*
 * Preset values for each region along with multipliers and
 * helper functions. These values are drawn from real-world research
 * from 2024/2025 market data for senior UI and UX designers in
 * different geographic regions.
 */

export const PRESETS = {
  LATAM: {
    uiIncome: 48000, // ~$4k/month - Senior average in top tech hubs (Source: Glassdoor/LinkedIn 2024)
    uxrIncome: 54000, // slightly higher demand for specialized UXR
    overhead: 8000, // Reduced overhead estimate for LATAM region
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 60, // Higher utilization typical for contractors
    marginPct: 20,
    contingencyPct: 10,
    taxRate: 15, // Effective tax rate for export services (e.g. Monotributo Tech in AR, RESICO in MX)
    marketRateRange: { min: 20, max: 55 }, // USD/h - Validated via Upwork/Toptal for Senior LATAM talent
    defaultHours: { research: 20, ui: 40 },
  },
  EU_WEST: {
    uiIncome: 95000, // ~€85k-90k EUR
    uxrIncome: 98000,
    overhead: 15000,
    weeks: 47, // More holidays typical in EU
    hoursPerWeek: 38,
    billablePct: 55,
    marginPct: 25,
    contingencyPct: 15,
    taxRate: 35, // Higher tax burden
    marketRateRange: { min: 65, max: 130 }, // EUR/h (approx USD equivalent for base) - Source: Malt/YunoJuno 2024 reports
    defaultHours: { research: 25, ui: 45 },
  },
  EU_EAST: {
    uiIncome: 65000,
    uxrIncome: 65000,
    overhead: 10000,
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 60,
    marginPct: 25,
    contingencyPct: 15,
    taxRate: 18, // Competitive tax rates (e.g. Poland B2B, Romania)
    marketRateRange: { min: 35, max: 75 }, // USD/h - Source: Pangea.ai/Clutch 2024
    defaultHours: { research: 20, ui: 40 },
  },
  USA: {
    uiIncome: 145000, // Senior Product Designer avg (Source: BuiltIn/Levels.fyi 2024)
    uxrIncome: 155000,
    overhead: 25000, // Higher cost of living/healthcare/insurance
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 55,
    marginPct: 30,
    contingencyPct: 20,
    taxRate: 28, // Effective self-employment tax + income tax
    marketRateRange: { min: 85, max: 180 }, // USD/h - Source: AIGA/Robert Half 2025 Salary Guide
    defaultHours: { research: 30, ui: 50 },
  },
};

// Multipliers to adjust the blended hourly rate based on client type.
export const CLIENT_MULT = {
  micro: 0.0,
  smb: 0.05,
  mid: 0.12,
  enterprise: 0.25,
};

// Multipliers to adjust the blended hourly rate based on project complexity.
export const COMPLEXITY_MULT = {
  basic: 0.0,
  standard: 0.15,
  complex: 0.35,
  extreme: 0.60,
};

/**
 * Suggest a discount for retainer contracts based on the number of
 * committed hours per month. These ranges follow industry practices
 * where larger commitments justify greater discounts.
 * @param {number} hours Hours per month
 * @returns {number} Suggested discount as a fraction (0.10 = 10%)
 */
export function retainerSuggestion(hours) {
  if (hours >= 80) return 0.20;
  if (hours >= 60) return 0.18;
  if (hours >= 40) return 0.15;
  return 0.10;
}