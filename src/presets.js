/*
 * Preset values for each region along with multipliers and
 * helper functions. These values are drawn from the research
 * performed earlier. They represent typical annual income goals,
 * overheads and margins for senior UI and research designers in
 * different geographic regions.
 */

export const PRESETS = {
  LATAM: {
    uiIncome: 60000, // Suggested annual income (USD) for a senior UI designer
    uxrIncome: 60000, // Suggested annual income (USD) for a senior researcher
    overhead: 10000, // Licenses, equipment, marketing per person
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 50, // ≈ 960–1000 h/year (taking into account non‑billable work)
    marginPct: 20,
    contingencyPct: 15,
    taxRate: 20,
    marketRateRange: { min: 25, max: 60 }, // USD/h
    defaultHours: { research: 20, ui: 40 },
  },
  EU_WEST: {
    uiIncome: 100000,
    uxrIncome: 100000,
    overhead: 15000,
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 55, // ≈ 1056 h/year
    marginPct: 25,
    contingencyPct: 15,
    taxRate: 30,
    marketRateRange: { min: 60, max: 120 }, // EUR/h (approx converted to USD for base)
    defaultHours: { research: 25, ui: 45 },
  },
  EU_EAST: {
    uiIncome: 80000,
    uxrIncome: 80000,
    overhead: 12000,
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 55,
    marginPct: 25,
    contingencyPct: 15,
    taxRate: 25,
    marketRateRange: { min: 40, max: 90 },
    defaultHours: { research: 18, ui: 40 },
  },
  USA: {
    uiIncome: 150000,
    uxrIncome: 150000,
    overhead: 20000,
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 60, // ≈ 1152 h/year
    marginPct: 28,
    contingencyPct: 15,
    taxRate: 30,
    marketRateRange: { min: 80, max: 200 },
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