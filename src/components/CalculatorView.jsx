import React, { useState, useEffect } from 'react';
import { PRESETS, retainerSuggestion, CLIENT_MULT, COMPLEXITY_MULT } from '../presets.js';

// Import components
import RegionSelector from './RegionSelector';
import DebouncedInput from './DebouncedInput';
import AccessibleSelect from './AccessibleSelect';
import UtilizationBar from './UtilizationBar';
import OverheadManager from './OverheadManager';
import MarketTelemetry from './MarketTelemetry';

// Import hooks and services
import { useRateCalculation } from '../hooks/useRateCalculation';
import { fetchRates } from '../services/currency';
import { formatCurrency as fmtMoney } from '../utils/format';
import { pdfExport } from '../utils/pdfExport';

export default function CalculatorView({ t, language }) {
  // Core State
  const [region, setRegion] = useState('LATAM');
  const [currency, setCurrency] = useState('USD');
  const [rates, setRates] = useState(null);

  const [uiIncome, setUiIncome] = useState(120000);
  const [uxrIncome, setUxrIncome] = useState(130000);

  const [overhead, setOverhead] = useState(0);
  const [weeks, setWeeks] = useState(48);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [billablePct, setBillablePct] = useState(50);
  const [marginPct, setMarginPct] = useState(20);
  const [marketRateRange, setMarketRateRange] = useState(null);

  const [contingencyPct, setContingencyPct] = useState(15);
  const [taxRate, setTaxRate] = useState(20);

  // Project hours mix
  const [hoursResearch, setHoursResearch] = useState(0);
  const [hoursUI, setHoursUI] = useState(0);
  const [hoursTotalManual, setHoursTotalManual] = useState(0);

  // Adjusters
  const [clientType, setClientType] = useState('smb');
  const [complexity, setComplexity] = useState('standard');
  const [valueUpliftPct, setValueUpliftPct] = useState(0);
  const [rushPct, setRushPct] = useState(0);

  // Engagement options
  const [engagement, setEngagement] = useState('freelance');
  const [retainerHours, setRetainerHours] = useState(60);
  const [retainerDiscountPct, setRetainerDiscountPct] = useState(18);

  // Ensure selected adjusters are valid keys
  useEffect(() => {
    if (CLIENT_MULT[clientType] === undefined) {
      setClientType('smb');
    }
  }, [clientType]);

  useEffect(() => {
    if (COMPLEXITY_MULT[complexity] === undefined) {
      setComplexity('standard');
    }
  }, [complexity]);

  /**
   * Apply the preset values for a given region.
   */
  function applyPreset(key) {
    const p = PRESETS[key] ?? PRESETS.LATAM;
    let ui = p.uiIncome;
    let uxr = p.uxrIncome;
    let oh = p.overhead;
    if (currency !== 'USD' && rates[currency]) {
      const factor = rates[currency];
      ui *= factor;
      uxr *= factor;
      oh *= factor;
    }
    setUiIncome(ui);
    setUxrIncome(uxr);
    setOverhead(oh);
    setWeeks(p.weeks);
    setHoursPerWeek(p.hoursPerWeek);
    setBillablePct(p.billablePct);
    setMarginPct(p.marginPct);
    setContingencyPct(p.contingencyPct);
    setTaxRate(p.taxRate ?? 20);
    setMarketRateRange(p.marketRateRange);
    // Set default mix values
    setHoursResearch(p.defaultHours.research);
    setHoursUI(p.defaultHours.ui);
    setHoursTotalManual(0);
    // Reset adjusters and retainer defaults
    setClientType('smb');
    setComplexity('standard');
    setValueUpliftPct(0);
    setRushPct(0);
    setEngagement('freelance');
    setRetainerHours(60);
    setRetainerDiscountPct(18);
  }

  // Initialise values when the component mounts and whenever region or rates change
  useEffect(() => {
    applyPreset(region);
  }, [region, rates]);

  // Fetch currency rates on mount
  useEffect(() => {
    async function loadRates() {
      const fetchedRates = await fetchRates('USD');
      if (fetchedRates) {
        setRates(fetchedRates);
      }
    }
    loadRates();
  }, []);

  // Handle currency change with conversion
  const handleCurrencyChange = (newCurrency) => {
    if (!rates || currency === newCurrency) {
      setCurrency(newCurrency);
      return;
    }

    // Calculate conversion rate
    let rate = 1;
    if (currency === 'USD') {
      rate = rates[newCurrency] || 1;
    } else if (newCurrency === 'USD') {
      rate = 1 / (rates[currency] || 1);
    } else {
      // Cross rate: Old -> USD -> New
      const toUsd = 1 / (rates[currency] || 1);
      const toNew = rates[newCurrency] || 1;
      rate = toUsd * toNew;
    }

    setUiIncome(prev => Math.round(prev * rate));
    setUxrIncome(prev => Math.round(prev * rate));
    setOverhead(prev => Math.round(prev * rate));
    setCurrency(newCurrency);
  };

  // Auto-suggest a discount when the retainer hours change
  useEffect(() => {
    if (engagement === 'retainer' && retainerHours > 0) {
      if (retainerDiscountPct === 0) {
        const suggestion = retainerSuggestion(retainerHours);
        setRetainerDiscountPct(Math.round(suggestion * 100));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retainerHours, engagement]);

  // Use the rate calculation hook
  const {
    billableHours,
    rateUI,
    rateUXR,
    blendedRate,
    adjustedRate,
    totalProjectHours,
    fixedPrice,
    retainerPrice,
    netIncome,
    taxAmount
  } = useRateCalculation({
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
    taxRate,
  });

  // Export to JSON
  function exportJson() {
    const data = {
      region,
      currency,
      assumptions: {
        uiIncome,
        uxrIncome,
        overhead,
        weeks,
        hoursPerWeek,
        billablePct,
        marginPct,
        contingencyPct,
      },
      mix: {
        hoursResearch,
        hoursUI,
        totalProjectHours,
      },
      roleRates: {
        rateUI,
        rateUXR,
        blendedRate,
      },
      adjusters: {
        clientType,
        complexity,
        valueUpliftPct,
        rushPct,
      },
      adjustedRate,
      pricing: {
        fixed: fixedPrice,
        retainerMonthly: retainerPrice,
        retainerHours,
        retainerDiscountPct,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const ts = Date.now();
    a.download = `estimacion_${region.toLowerCase()}_${ts}.json`;
    a.click();
  }

  // Export to PDF
  function handleExportPDF() {
    pdfExport({
      region,
      currency,
      billableHours,
      rateUI,
      rateUXR,
      blendedRate,
      adjustedRate,
      totalProjectHours,
      fixedPrice,
      retainerPrice,
      retainerHours,
      retainerDiscountPct
    });
  }

  // Options for selects
  const clientTypeOptions = [
    { value: 'micro', label: t.clientOptions.micro },
    { value: 'smb', label: t.clientOptions.smb },
    { value: 'mid', label: t.clientOptions.mid },
    { value: 'enterprise', label: t.clientOptions.enterprise },
  ];

  const complexityOptions = [
    { value: 'basic', label: t.complexityOptions.basic },
    { value: 'standard', label: t.complexityOptions.standard },
    { value: 'complex', label: t.complexityOptions.complex },
    { value: 'extreme', label: t.complexityOptions.extreme },
  ];

  const engagementOptions = [
    { value: 'freelance', label: t.engagementOptions.freelance },
    { value: 'retainer', label: t.engagementOptions.retainer },
  ];

  // Validate select changes
  function handleClientTypeChange(value) {
    if (CLIENT_MULT[value] !== undefined) {
      setClientType(value);
    }
  }

  function handleComplexityChange(value) {
    if (COMPLEXITY_MULT[value] !== undefined) {
      setComplexity(value);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Controls */}
      <div className="lg:col-span-7 space-y-6">

        {/* Region & Currency */}
        <section className="card">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>
          </div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
            <span className="w-1 h-4 bg-white"></span>
            {t.configuration}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RegionSelector
              region={region}
              setRegion={setRegion}
              currency={currency}
              setCurrency={handleCurrencyChange}
            />
          </div>
        </section>

        {/* Business Assumptions */}
        <section className="card">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
            <span className="w-1 h-4 bg-white"></span>
            {t.businessLogic}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DebouncedInput
              label={t.annualIncomeUI}
              initialValue={uiIncome}
              onValueChange={setUiIncome}
              min={0}
              step={1000}
              type="number"
            />
            <DebouncedInput
              label={t.annualIncomeUXR}
              initialValue={uxrIncome}
              onValueChange={setUxrIncome}
              min={0}
              step={1000}
              type="number"
            />

            <OverheadManager
              totalOverhead={overhead}
              setTotalOverhead={setOverhead}
              currency={currency}
              region={region}
            />
            <div className="grid grid-cols-2 gap-4">
              <DebouncedInput
                label={t.weeksYear}
                initialValue={weeks}
                onValueChange={setWeeks}
                min={1}
                max={52}
                type="number"
              />
              <DebouncedInput
                label={t.hoursWeek}
                initialValue={hoursPerWeek}
                onValueChange={setHoursPerWeek}
                min={1}
                max={80}
                type="number"
              />
            </div>
            <DebouncedInput
              label={t.billablePct}
              initialValue={billablePct}
              onValueChange={setBillablePct}
              min={1}
              max={100}
              type="number"
              helpText={t.billableHelp}
            />
            <div className="col-span-1 md:col-span-2">
              <UtilizationBar
                billablePct={billablePct}
                weeks={weeks}
                hoursPerWeek={hoursPerWeek}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DebouncedInput
                label={t.marginPct}
                initialValue={marginPct}
                onValueChange={setMarginPct}
                min={0}
                max={100}
                type="number"
              />
              <DebouncedInput
                label={t.contingencyPct}
                initialValue={contingencyPct}
                onValueChange={setContingencyPct}
                min={0}
                max={100}
                type="number"
              />
            </div>
            <DebouncedInput
              label={t.taxRate}
              initialValue={taxRate}
              onValueChange={setTaxRate}
              min={0}
              max={100}
              type="number"
              helpText={t.taxHelp}
            />
          </div>
        </section>

        {/* Project Scope */}
        <section className="card">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
            <span className="w-1 h-4 bg-white"></span>
            {t.scopeMix}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DebouncedInput
              label={t.researchHours}
              initialValue={hoursResearch}
              onValueChange={setHoursResearch}
              min={0}
              step={1}
              type="number"
            />
            <DebouncedInput
              label={t.uiHours}
              initialValue={hoursUI}
              onValueChange={setHoursUI}
              min={0}
              step={1}
              type="number"
            />
            <DebouncedInput
              label={t.manualHours}
              initialValue={hoursTotalManual}
              onValueChange={setHoursTotalManual}
              min={0}
              step={1}
              type="number"
              helpText={t.manualHelp}
            />
          </div>
        </section>

        {/* Adjusters */}
        <section className="card">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
            <span className="w-1 h-4 bg-white"></span>
            {t.adjusters}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AccessibleSelect
              id="client-type"
              label={t.clientType}
              value={clientType}
              onChange={handleClientTypeChange}
              options={clientTypeOptions}
            />
            <AccessibleSelect
              id="complexity"
              label={t.complexity}
              value={complexity}
              onChange={handleComplexityChange}
              options={complexityOptions}
            />
            <DebouncedInput
              label={t.valueUplift}
              initialValue={valueUpliftPct}
              onValueChange={setValueUpliftPct}
              min={0}
              max={200}
              type="number"
            />
            <DebouncedInput
              label={t.rushFee}
              initialValue={rushPct}
              onValueChange={setRushPct}
              min={0}
              max={100}
              type="number"
            />
          </div>
        </section>

        {/* Engagement */}
        <section className="card">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
            <span className="w-1 h-4 bg-white"></span>
            {t.engagementModel}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AccessibleSelect
              id="engagement"
              label={t.type}
              value={engagement}
              onChange={(e) => setEngagement(e.target.value)}
              options={engagementOptions}
            />
            {engagement === 'retainer' && (
              <>
                <DebouncedInput
                  label={t.hoursMonth}
                  initialValue={retainerHours}
                  onValueChange={setRetainerHours}
                  min={0}
                  step={1}
                  type="number"
                />
                <DebouncedInput
                  label={t.retainerDiscount}
                  initialValue={retainerDiscountPct}
                  onValueChange={setRetainerDiscountPct}
                  min={0}
                  max={60}
                  type="number"
                  helpText={t.retainerHelp}
                />
              </>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="btn" onClick={() => applyPreset(region)}>
            {t.resetPreset}
          </button>
          <button className="btn btn-secondary" onClick={() => exportJson()}>
            {t.exportJson}
          </button>
          <button className="btn btn-secondary" onClick={() => handleExportPDF()}>
            {t.exportPdf}
          </button>
        </div>

      </div>

      {/* Right Column: Results (Sticky) */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 space-y-6">

          {/* Main Output */}
          <div className="card border-white/20 bg-surfaceHighlight/10">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-textMuted">{t.telemetry}</h2>

            <div className="space-y-4">
              <div className="kpi">
                <span className="text-xs uppercase text-textMuted font-mono">{t.adjustedRate}</span>
                <div className="text-4xl font-bold font-mono tracking-tighter mt-1">
                  {fmtMoney(adjustedRate, currency)}<span className="text-lg text-textMuted font-sans">/h</span>
                </div>
                <MarketTelemetry
                  currentRate={adjustedRate}
                  marketRange={marketRateRange}
                  currency={currency}
                />
              </div>

              <div className="kpi">
                <span className="text-xs uppercase text-textMuted font-mono">{t.netIncome}</span>
                <div className="text-2xl font-bold font-mono tracking-tighter mt-1 text-green-400">
                  {fmtMoney(netIncome, currency)}<span className="text-sm text-textMuted font-sans">/yr</span>
                </div>
                <div className="text-xs text-textMuted font-mono mt-1">
                  {t.tax}: {fmtMoney(taxAmount, currency)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="kpi">
                  <span className="text-xs uppercase text-textMuted font-mono">{t.fixedPrice}</span>
                  <div className="text-xl font-bold font-mono mt-1">
                    {totalProjectHours > 0 ? fmtMoney(fixedPrice, currency) : '—'}
                  </div>
                </div>
                <div className="kpi">
                  <span className="text-xs uppercase text-textMuted font-mono">{t.retainer}</span>
                  <div className="text-xl font-bold font-mono mt-1">
                    {engagement === 'retainer' && retainerHours > 0
                      ? fmtMoney(retainerPrice, currency)
                      : '—'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="card">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-textMuted">{t.dataStream}</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-textMuted">{t.billableHoursYear}</span>
                <span>{Math.round(billableHours)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-textMuted">{t.baseRateUI}</span>
                <span>{fmtMoney(rateUI, currency)}/h</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-textMuted">{t.baseRateUXR}</span>
                <span>{fmtMoney(rateUXR, currency)}/h</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-textMuted">{t.blendedRate}</span>
                <span>{fmtMoney(blendedRate, currency)}/h</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-textMuted">{t.totalProjectHours}</span>
                <span className="font-bold">{totalProjectHours > 0 ? totalProjectHours : '—'}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded bg-surfaceHighlight/20 text-xs text-textMuted font-mono">
            <p>{t.systemTip}</p>
          </div>

        </div>
      </div>

    </div>
  );
}
