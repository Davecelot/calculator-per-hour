import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useRateCalculation } from './useRateCalculation';

describe('useRateCalculation', () => {
  const defaultInputs = {
    uiIncome: 60000,
    uxrIncome: 60000,
    overhead: 10000,
    weeks: 48,
    hoursPerWeek: 40,
    billablePct: 50,
    marginPct: 20,
    hoursResearch: 20,
    hoursUI: 40,
    hoursTotalManual: 0,
    clientType: 'smb',
    complexity: 'standard',
    valueUpliftPct: 0,
    rushPct: 0,
    contingencyPct: 15,
    engagement: 'freelance',
    retainerHours: 60,
    retainerDiscountPct: 18,
  };

  test('calculates billable hours correctly', () => {
    const { result } = renderHook(() => useRateCalculation(defaultInputs));
    expect(result.current.billableHours).toBe(960); // 48 * 40 * 0.5
  });

  test('calculates base rates correctly', () => {
    const { result } = renderHook(() => useRateCalculation(defaultInputs));
    // (60000 + 10000) * 1.2 / 960 = 87.5
    expect(result.current.rateUI).toBeCloseTo(87.5, 1);
    expect(result.current.rateUXR).toBeCloseTo(87.5, 1);
  });

  // Add more tests for other calculations
});
