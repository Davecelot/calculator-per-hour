import { useMemo } from 'react';
import { CLIENT_MULT, COMPLEXITY_MULT } from '../presets.js';

export function useRateCalculation({
  uiIncome,
  uxrIncome,
  overhead,
  weeks,
  hoursPerWeek,
  billablePct,
  marginPct,
  hoursResearch,
  hoursUI,
  hoursTotalManual,
  clientType,
  complexity,
  valueUpliftPct,
  rushPct,
  contingencyPct,
  engagement,
  retainerHours,
  retainerDiscountPct,
  taxRate = 0,
}) {
  // Calculate billable hours
  const billableHours = useMemo(() => {
    return Math.max(1, weeks * hoursPerWeek * (billablePct / 100));
  }, [weeks, hoursPerWeek, billablePct]);

  // Calculate base rates
  const { rateUI, rateUXR } = useMemo(() => {
    const marginFactor = 1 + marginPct / 100;
    return {
      rateUI: ((uiIncome + overhead) * marginFactor) / billableHours,
      rateUXR: ((uxrIncome + overhead) * marginFactor) / billableHours,
    };
  }, [uiIncome, uxrIncome, overhead, marginPct, billableHours]);

  // Calculate blended rate
  const blendedRate = useMemo(() => {
    if ((hoursResearch + hoursUI) > 0) {
      return ((hoursResearch * rateUXR + hoursUI * rateUI) / (hoursResearch + hoursUI));
    }
    return (rateUI + rateUXR) / 2;
  }, [hoursResearch, hoursUI, rateUXR, rateUI]);

  // Calculate adjusted rate with multipliers
  const adjustedRate = useMemo(() => {
    const clientK = CLIENT_MULT[clientType] ?? 0;
    const complexityK = COMPLEXITY_MULT[complexity] ?? 0;
    const valueK = valueUpliftPct / 100;
    const rushK = rushPct / 100;
    return blendedRate * (1 + clientK + complexityK + valueK + rushK);
  }, [blendedRate, clientType, complexity, valueUpliftPct, rushPct]);

  // Calculate total project hours
  const totalProjectHours = useMemo(() => {
    return hoursTotalManual > 0 ? hoursTotalManual : hoursResearch + hoursUI;
  }, [hoursTotalManual, hoursResearch, hoursUI]);

  // Calculate fixed price
  const fixedPrice = useMemo(() => {
    return totalProjectHours * adjustedRate * (1 + contingencyPct / 100);
  }, [totalProjectHours, adjustedRate, contingencyPct]);

  // Calculate retainer price
  const retainerPrice = useMemo(() => {
    const retainerDisc = retainerDiscountPct / 100;
    return engagement === 'retainer' && retainerHours > 0
      ? retainerHours * adjustedRate * (1 - retainerDisc)
      : 0;
  }, [engagement, retainerHours, adjustedRate, retainerDiscountPct]);

  // Calculate Net Income stats (Fiscal Protocol)
  const { netIncome, taxAmount } = useMemo(() => {
    // We base this on the blended rate * billable hours to get "Gross Revenue" from time
    // But strictly speaking, the user inputs "Annual Income" as their GOAL.
    // So we should show what the Net Income is based on that Goal + Overhead.
    // However, usually "Net Income" means (Revenue - Expenses) - Taxes.
    // Revenue = (uiIncome + uxrIncome) (simplified goal) or calculated from rate?
    // Let's use the calculated Gross Revenue from the Billable Hours * Blended Rate
    // Gross Revenue = Billable Hours * Blended Rate
    // Taxable Income = Gross Revenue - Overhead
    // Net Income = Taxable Income * (1 - taxRate/100)

    const grossRevenue = billableHours * blendedRate;
    const taxableIncome = Math.max(0, grossRevenue - overhead);
    const taxAmt = taxableIncome * (taxRate / 100);
    const net = taxableIncome - taxAmt;

    return { netIncome: net, taxAmount: taxAmt };
  }, [billableHours, blendedRate, overhead, taxRate]);

  return {
    billableHours,
    rateUI,
    rateUXR,
    blendedRate,
    adjustedRate,
    totalProjectHours,
    fixedPrice,
    retainerPrice,
    netIncome,
    taxAmount,
  };
}