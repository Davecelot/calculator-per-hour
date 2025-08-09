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

  return {
    billableHours,
    rateUI,
    rateUXR,
    blendedRate,
    adjustedRate,
    totalProjectHours,
    fixedPrice,
    retainerPrice,
  };
}