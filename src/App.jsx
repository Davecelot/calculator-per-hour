import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PRESETS, retainerSuggestion, CLIENT_MULT, COMPLEXITY_MULT } from './presets.js';

// Import components
<<<<<<< HEAD
import RegionSelector from '@/components/RegionSelector';
import DebouncedInput from '@/components/DebouncedInput';
import AccessibleSelect from '@/components/AccessibleSelect';
import { BrandButton } from '@/components/brand/BrandButton';
import { BrandCard } from '@/components/brand/BrandCard';
import DevelopmentTimePanel from '@/components/DevelopmentTimePanel';
import ModeToggle from '@/components/ModeToggle';
import ThemeToggle from '@/components/ThemeToggle';
import ProjectControls from '@/components/ProjectControls';
import ProjectResultCard from '@/components/ProjectResultCard';

// Import hooks
import { useRateCalculation } from '@/hooks/useRateCalculation';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { pdfExport } from '@/utils/pdfExport';
import { formatCurrency } from '@/utils/format';
import { computeAnnualTarget } from '@/lib/pricing/annual';
import {
  computeProjectByHours,
  computeProjectByProrate,
  roundTo,
} from '@/lib/pricing/project';

=======
import RegionSelector from './components/RegionSelector';
import DebouncedInput from './components/DebouncedInput';
import AccessibleSelect from './components/AccessibleSelect';
import UtilizationBar from './components/UtilizationBar';
import OverheadManager from './components/OverheadManager';
import MarketTelemetry from './components/MarketTelemetry';
// ThemeToggle is removed as we are enforcing dark mode

// Import hooks
import { useRateCalculation } from './hooks/useRateCalculation';
import { pdfExport } from './utils/pdfExport';
import { fetchRates } from './services/currency';

/**
 * Format a numeric value as a currency string.
 */
function fmtMoney(value, currency) {
  if (!Number.isFinite(value)) return '—';
  const symbol =
    currency === 'EUR'
      ? '€'
      : currency === 'ARS'
        ? '$'
        : currency === 'GBP'
          ? '£'
          : '$';
  const rounded = Math.round(value * 100) / 100;
  return symbol + rounded.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)

/**
 * The main component renders a responsive form on the left and
 * calculation results on the right. All inputs are fully editable
 * and update the results in real time.
 */
export default function App() {
  // Global selectors
  const [region, setRegion] = useState('LATAM');
  const [currency, setCurrency] = useState('USD');
<<<<<<< HEAD
  const rates = useExchangeRates();
  const prevCurrency = useRef('USD');
=======
  const [rates, setRates] = useState(null);
  const [marketRateRange, setMarketRateRange] = useState(null);
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)

  // Business assumptions
  const [uiIncome, setUiIncome] = useState(0);
  const [uxrIncome, setUxrIncome] = useState(0);
  const [overhead, setOverhead] = useState(0);
  const [weeks, setWeeks] = useState(48);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [billablePct, setBillablePct] = useState(50);
  const [marginPct, setMarginPct] = useState(20);
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

  // Mode and project-specific state
  const [mode, setMode] = useState('annual');
  const [mesesProyecto, setMesesProyecto] = useState(4);
  const [dedicacionPct, setDedicacionPct] = useState(50);
  const [bufferPct, setBufferPct] = useState(20);
  const [roundingStep, setRoundingStep] = useState(0);

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

  // Convert numeric values when the currency changes
  useEffect(() => {
    const from = prevCurrency.current;
    const to = currency;
    if (from === to || !rates[from] || !rates[to]) {
      prevCurrency.current = to;
      return;
    }
    const factor = rates[to] / rates[from];
    setUiIncome((v) => v * factor);
    setUxrIncome((v) => v * factor);
    setOverhead((v) => v * factor);
    prevCurrency.current = to;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, rates]);

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
    // If base is USD, rate is rates[newCurrency]
    // If current is not USD, we convert to USD first then to newCurrency
    // But our base is USD, so:
    // USD -> EUR = rates['EUR']
    // EUR -> GBP = (1/rates['EUR']) * rates['GBP']

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

<<<<<<< HEAD
  const maxRate = Math.max(rateUI, rateUXR, adjustedRate);
  const maxHours = 52 * 40;

  // Annual target and project price calculations
  const { ingresoAnualRequerido, tarifaHora } = useMemo(
    () =>
      computeAnnualTarget({
        sueldos: uiIncome + uxrIncome,
        overhead,
        margenProfitPct: marginPct,
        semanasAnio: weeks,
        horasSemana: hoursPerWeek,
        utilizacion: billablePct,
      }),
    [uiIncome, uxrIncome, overhead, marginPct, weeks, hoursPerWeek, billablePct]
  );

  const projectHours = useMemo(
    () =>
      computeProjectByHours({
        tarifaHora,
        semanasAnio: weeks,
        horasSemana: hoursPerWeek,
        meses: mesesProyecto,
        dedicacion: dedicacionPct,
        buffer: bufferPct,
      }),
    [tarifaHora, weeks, hoursPerWeek, mesesProyecto, dedicacionPct, bufferPct]
  );

  const projectProrate = useMemo(
    () =>
      computeProjectByProrate({
        ingresoAnualRequerido,
        meses: mesesProyecto,
        dedicacion: dedicacionPct,
        utilizacion: billablePct,
        buffer: bufferPct,
      }),
    [ingresoAnualRequerido, mesesProyecto, dedicacionPct, billablePct, bufferPct]
  );

  const precioFinal = roundTo(projectProrate.precioFinal, roundingStep);
  const tarifaEfectiva =
    projectHours.horasProyecto > 0
      ? precioFinal / projectHours.horasProyecto
      : 0;

  // Export the current estimation to a JSON file for download
=======
  // Export to JSON
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
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
    { value: 'micro', label: 'Micro / Startup' },
    { value: 'smb', label: 'PyME' },
    { value: 'mid', label: 'Empresa mediana' },
    { value: 'enterprise', label: 'Empresa grande / Corporación' },
  ];

  const complexityOptions = [
    { value: 'basic', label: 'Básico' },
    { value: 'standard', label: 'Estándar / Promedio' },
    { value: 'complex', label: 'Complejo / Avanzado' },
    { value: 'extreme', label: 'Extremo / Crítico' },
  ];

  const engagementOptions = [
    { value: 'freelance', label: 'Freelance / Proyecto' },
    { value: 'retainer', label: 'In‑house partner / Retainer mensual' },
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
    <div className="min-h-screen flex flex-col bg-background text-text font-sans selection:bg-white selection:text-black">
      {/* Dithering Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-dither mix-blend-overlay"></div>

      {/* Header */}
<<<<<<< HEAD
      <header
        className="p-5 border-b flex items-center justify-between"
        style={{
          borderColor: 'var(--border)',
          background: 'linear-gradient(180deg, rgba(124,92,255,0.12), transparent)',
        }}
      >
        <div className="flex items-center gap-4">
          <h1 className="m-0 text-xl sm:text-2xl md:text-3xl font-bold">
            Conversor de tarifas (editable) — No‑Code / UI &amp; Research
          </h1>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>
        <ThemeToggle />
      </header>

      <div className="flex-grow p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Left: Development time and form */}
          <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
            <DevelopmentTimePanel
              weeks={weeks}
              setWeeks={setWeeks}
              hoursPerWeek={hoursPerWeek}
              setHoursPerWeek={setHoursPerWeek}
            />
            <section>
              <BrandCard>
                <div className="grid grid-cols-12 gap-3">
              {/* Region and currency selectors */}
              <RegionSelector
                region={region}
                setRegion={setRegion}
                currency={currency}
                setCurrency={setCurrency}
              />
=======
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <h1 className="text-lg font-bold tracking-tight uppercase">
              Rate<span className="text-textMuted">Calculator</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 border border-border rounded text-textMuted font-mono">v2.0</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-textMuted">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)

          {/* Left Column: Controls */}
          <div className="lg:col-span-7 space-y-6">

            {/* Region & Currency */}
            <section className="card">
              <div className="absolute top-0 right-0 p-2 opacity-20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                <span className="w-1 h-4 bg-white"></span>
                Configuration
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
                Business Logic
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DebouncedInput
                  label="Annual Income (UI Senior)"
                  initialValue={uiIncome}
                  onValueChange={setUiIncome}
                  min={0}
                  step={1000}
                  type="number"
                />
                <DebouncedInput
                  label="Annual Income (Research Senior)"
                  initialValue={uxrIncome}
                  onValueChange={setUxrIncome}
                  min={0}
                  step={1000}
                  type="number"
                />

<<<<<<< HEAD
                {/* Semanas y horas por semana se gestionan en el panel de tiempo de desarrollo */}
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="% de horas facturables"
=======
                <OverheadManager
                  totalOverhead={overhead}
                  setTotalOverhead={setOverhead}
                  currency={currency}
                  region={region}
                />
                <div className="grid grid-cols-2 gap-4">
                  <DebouncedInput
                    label="Weeks/Year"
                    initialValue={weeks}
                    onValueChange={setWeeks}
                    min={1}
                    max={52}
                    type="number"
                  />
                  <DebouncedInput
                    label="Hours/Week"
                    initialValue={hoursPerWeek}
                    onValueChange={setHoursPerWeek}
                    min={1}
                    max={80}
                    type="number"
                  />
                </div>
                <DebouncedInput
                  label="Billable %"
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
                  initialValue={billablePct}
                  onValueChange={setBillablePct}
                  min={1}
                  max={100}
                  type="number"
                  helpText="Time spent on billable work"
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
                    label="Margin %"
                    initialValue={marginPct}
                    onValueChange={setMarginPct}
                    min={0}
                    max={100}
                    type="number"
                  />
                  <DebouncedInput
                    label="Contingency %"
                    initialValue={contingencyPct}
                    onValueChange={setContingencyPct}
                    min={0}
                    max={100}
                    type="number"
                  />
                </div>
                <DebouncedInput
                  label="Fiscal Tax Rate %"
                  initialValue={taxRate}
                  onValueChange={setTaxRate}
                  min={0}
                  max={100}
                  type="number"
                  helpText="Estimated effective tax rate"
                />
              </div>
            </section>

            {/* Project Scope */}
            <section className="card">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                <span className="w-1 h-4 bg-white"></span>
                Scope & Mix
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DebouncedInput
                  label="Research Hours"
                  initialValue={hoursResearch}
                  onValueChange={setHoursResearch}
                  min={0}
                  step={1}
                  type="number"
                />
                <DebouncedInput
                  label="UI/Build Hours"
                  initialValue={hoursUI}
                  onValueChange={setHoursUI}
                  min={0}
                  step={1}
                  type="number"
                />
                <DebouncedInput
                  label="Total Manual Hours"
                  initialValue={hoursTotalManual}
                  onValueChange={setHoursTotalManual}
                  min={0}
                  step={1}
                  type="number"
                  helpText="Overrides sum if > 0"
                />
              </div>
            </section>

            {/* Adjusters */}
            <section className="card">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                <span className="w-1 h-4 bg-white"></span>
                Adjusters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AccessibleSelect
                  id="client-type"
                  label="Client Type"
                  value={clientType}
                  onChange={handleClientTypeChange}
                  options={clientTypeOptions}
                />
                <AccessibleSelect
                  id="complexity"
                  label="Complexity"
                  value={complexity}
                  onChange={handleComplexityChange}
                  options={complexityOptions}
                />
                <DebouncedInput
                  label="Value Uplift %"
                  initialValue={valueUpliftPct}
                  onValueChange={setValueUpliftPct}
                  min={0}
                  max={200}
                  type="number"
                />
<<<<<<< HEAD
              </div>

              {/* Engagement model */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Modelo de contratación</h2>
              </div>
              <div className="col-span-12 md:col-span-6">
                <AccessibleSelect
                  id="engagement"
                  label="Tipo"
                  value={engagement}
                  onChange={setEngagement}
                  options={engagementOptions}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
=======
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
                <DebouncedInput
                  label="Rush Fee %"
                  initialValue={rushPct}
                  onValueChange={setRushPct}
                  min={0}
                  max={100}
                  type="number"
                />
              </div>
            </section>

<<<<<<< HEAD
              {/* Buttons */}
              <div className="col-span-12 flex flex-wrap gap-2 mt-2">
                <BrandButton onClick={() => applyPreset(region)}>
                  Restablecer presets de la región
                </BrandButton>
                <BrandButton variant="secondary" onClick={() => exportJson()}>
                  Exportar estimación (JSON)
                </BrandButton>
                <BrandButton variant="secondary" onClick={() => handleExportPDF()}>
                  Exportar PDF
                </BrandButton>
              </div>
              </div>
              </BrandCard>
          </section>
        {mode === 'project' && (
            <section className="md:col-span-2">
              <ProjectControls
                meses={mesesProyecto}
                setMeses={setMesesProyecto}
                dedicacion={dedicacionPct}
                setDedicacion={setDedicacionPct}
                buffer={bufferPct}
                setBuffer={setBufferPct}
                roundingStep={roundingStep}
                setRoundingStep={setRoundingStep}
              />
              <ProjectResultCard
                currency={currency}
                tarifaHora={tarifaHora}
                horasProyecto={projectHours.horasProyecto}
                precioFinal={precioFinal}
                tarifaEfectiva={tarifaEfectiva}
                semanasProyecto={projectHours.semanasProyecto}
                utilizacion={billablePct}
                precioBaseA={projectHours.precioBase}
                precioBaseB={projectProrate.precioBase}
              />
            </section>
        )}
      </div>

        {/* Right: Results */}
        <aside className="md:col-span-1">
          <BrandCard className="md:sticky md:top-4">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12">
                <h2 className="text-lg font-bold mb-3">Resultados</h2>
              </div>

              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Horas facturables/año</h3>
                <div className="text-2xl font-bold">{Math.round(billableHours)}</div>
                <div className="w-full bg-[var(--panel)] rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min((billableHours / maxHours) * 100, 100)}%`,
                      background: 'var(--brand)',
                    }}
                  />
                </div>
                <div className="small muted">
                  {weeks} semanas × {hoursPerWeek} horas × {billablePct}% facturable
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Tarifa base/hora — UI</h3>
                <div className="text-2xl font-bold">{formatCurrency(rateUI, currency)}/h</div>
                <div className="w-full bg-[var(--panel)] rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min((rateUI / maxRate) * 100, 100)}%`,
                      background: 'var(--brand)',
                    }}
                  />
                </div>
                <div className="small muted">
                  (Ingresos + overhead) × (1 + margen) ÷ horas facturables
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Tarifa base/hora — Research</h3>
                <div className="text-2xl font-bold">{formatCurrency(rateUXR, currency)}/h</div>
                <div className="w-full bg-[var(--panel)] rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min((rateUXR / maxRate) * 100, 100)}%`,
                      background: 'var(--brand)',
                    }}
                  />
                </div>
                <div className="small muted">
                  (Ingresos + overhead) × (1 + margen) ÷ horas facturables
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Tarifa combinada del proyecto</h3>
                <div className="text-2xl font-bold">{formatCurrency(blendedRate, currency)}/h</div>
                <div className="w-full bg-[var(--panel)] rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min((blendedRate / maxRate) * 100, 100)}%`,
                      background: 'var(--brand)',
                    }}
                  />
                </div>
                <div className="small muted">
                  Promedio ponderado según mix de horas UI/Research
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Tarifa ajustada/hora</h3>
                <div className="text-2xl font-bold">
                  {formatCurrency(adjustedRate, currency)}/h
                </div>
                <div className="w-full bg-[var(--panel)] rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min((adjustedRate / maxRate) * 100, 100)}%`,
                      background: 'var(--brand)',
                    }}
                  />
                </div>
                <div className="small muted">
                  Aplica cliente, complejidad, valor, urgencia
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Precio fijo estimado</h3>
                <div className="text-2xl font-bold">
                  {totalProjectHours > 0 ? formatCurrency(fixedPrice, currency) : '—'}
                </div>
                <div className="small muted">
                  (Horas de proyecto) × tarifa ajustada × (1 + contingencia)
                </div>
              </div>

              <div className="col-span-12 kpi">
                <h3 className="text-sm font-medium mb-1">Retainer mensual (si corresponde)</h3>
                <div className="text-2xl font-bold">
                  {engagement === 'retainer' && retainerHours > 0
                    ? `${formatCurrency(retainerPrice, currency)}  (${Math.round((1 - retainerDiscountPct/100) * 100)}% de la tarifa)`
                    : '—'}
                </div>
                <div className="small muted">
                  (Horas/mes) × tarifa ajustada × (1 – descuento)
                </div>
              </div>

              <div className="col-span-12">
                <div className="border-t pt-3 mt-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-sm font-medium mb-1">Horas totales del proyecto</div>
                  <div className="text-xl font-bold">
                    {totalProjectHours > 0 ? totalProjectHours : '—'}
=======
            {/* Engagement */}
            <section className="card">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-textMuted flex items-center gap-2">
                <span className="w-1 h-4 bg-white"></span>
                Engagement Model
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AccessibleSelect
                  id="engagement"
                  label="Type"
                  value={engagement}
                  onChange={(e) => setEngagement(e.target.value)}
                  options={engagementOptions}
                />
                {engagement === 'retainer' && (
                  <>
                    <DebouncedInput
                      label="Hours/Month"
                      initialValue={retainerHours}
                      onValueChange={setRetainerHours}
                      min={0}
                      step={1}
                      type="number"
                    />
                    <DebouncedInput
                      label="Retainer Discount %"
                      initialValue={retainerDiscountPct}
                      onValueChange={setRetainerDiscountPct}
                      min={0}
                      max={60}
                      type="number"
                      helpText="Suggested: 15-20%"
                    />
                  </>
                )}
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="btn" onClick={() => applyPreset(region)}>
                Reset Preset
              </button>
              <button className="btn btn-secondary" onClick={() => exportJson()}>
                Export JSON
              </button>
              <button className="btn btn-secondary" onClick={() => handleExportPDF()}>
                Export PDF
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
                <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-textMuted">Telemetry / Output</h2>

                <div className="space-y-4">
                  <div className="kpi">
                    <span className="text-xs uppercase text-textMuted font-mono">Adjusted Rate</span>
                    <div className="text-4xl font-bold font-mono tracking-tighter mt-1">
                      {fmtMoney(adjustedRate, currency)}<span className="text-lg text-textMuted font-sans">/h</span>
                    </div>
                    <MarketTelemetry
                      currentRate={adjustedRate}
                      marketRange={marketRateRange}
                      currency={currency}
                    />
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
                  </div>

                  <div className="kpi">
                    <span className="text-xs uppercase text-textMuted font-mono">Net Income (Est.)</span>
                    <div className="text-2xl font-bold font-mono tracking-tighter mt-1 text-green-400">
                      {fmtMoney(netIncome, currency)}<span className="text-sm text-textMuted font-sans">/yr</span>
                    </div>
                    <div className="text-xs text-textMuted font-mono mt-1">
                      Tax: {fmtMoney(taxAmount, currency)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="kpi">
                      <span className="text-xs uppercase text-textMuted font-mono">Fixed Price</span>
                      <div className="text-xl font-bold font-mono mt-1">
                        {totalProjectHours > 0 ? fmtMoney(fixedPrice, currency) : '—'}
                      </div>
                    </div>
                    <div className="kpi">
                      <span className="text-xs uppercase text-textMuted font-mono">Retainer</span>
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
                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-textMuted">Data Stream</h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-textMuted">Billable Hours/Year</span>
                    <span>{Math.round(billableHours)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-textMuted">Base Rate (UI)</span>
                    <span>{fmtMoney(rateUI, currency)}/h</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-textMuted">Base Rate (UXR)</span>
                    <span>{fmtMoney(rateUXR, currency)}/h</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-textMuted">Blended Rate</span>
                    <span>{fmtMoney(blendedRate, currency)}/h</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-textMuted">Total Project Hours</span>
                    <span className="font-bold">{totalProjectHours > 0 ? totalProjectHours : '—'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-border rounded bg-surfaceHighlight/20 text-xs text-textMuted font-mono">
                <p>&gt; SYSTEM_TIP: Adjust region presets to calibrate baseline metrics. Export configuration for persistence.</p>
              </div>

            </div>
<<<<<<< HEAD
          </BrandCard>
        </aside>
      </div>
      </div>

    <footer
      className="p-4 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
        <span className="pill mr-2">Sugerencia</span>
        <span className="small muted">
          Cambia región y luego ajusta ingresos/overhead/margen según tu operación. Usa "Exportar estimación" para guardar tu escenario.
        </span>
      </footer>
=======
          </div>

        </div>
      </main>
>>>>>>> 1230d17 (UI Overhaul: Tech/AI aesthetic + Currency, Fiscal, Utilization, System Loadout, Market Telemetry features)
    </div>
  );
}