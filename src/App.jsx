import React, { useState, useEffect } from 'react';
import { PRESETS, retainerSuggestion, CLIENT_MULT, COMPLEXITY_MULT } from './presets.js';

// Import components
import RegionSelector from './components/RegionSelector';
import DebouncedInput from './components/DebouncedInput';
import AccessibleSelect from './components/AccessibleSelect';
import ThemeToggle from './components/ThemeToggle';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import MarketTrends from './components/MarketTrends';
import DevelopmentTimePanel from './components/DevelopmentTimePanel';

// Import hooks
import { useRateCalculation } from './hooks/useRateCalculation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { pdfExport } from './utils/pdfExport';

/**
 * Format a numeric value as a currency string. Uses the chosen
 * currency to select an appropriate symbol and rounds to two
 * decimal places. Thousands separators are inserted for
 * readability.
 *
 * @param {number} value The numeric value to format
 * @param {string} currency The currency code (USD, EUR, ARS, GBP)
 * @returns {string} A formatted currency string
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

/**
 * The main component renders a responsive form on the left and
 * calculation results on the right. All inputs are fully editable
 * and update the results in real time.
 */
export default function App() {
  // Global selectors
  const [region, setRegion] = useState('LATAM');
  const [currency, setCurrency] = useState('USD');

  // Business assumptions
  const [uiIncome, setUiIncome] = useState(0);
  const [uxrIncome, setUxrIncome] = useState(0);
  const [overhead, setOverhead] = useState(0);
  const [weeks, setWeeks] = useState(48);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [billablePct, setBillablePct] = useState(50);
  const [marginPct, setMarginPct] = useState(20);
  const [contingencyPct, setContingencyPct] = useState(15);

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
   * Apply the preset values for a given region. This function
   * initializes incomes, overhead, productivity assumptions and
   * recommended project hours. It should be called whenever the
   * region selector changes.
   *
   * @param {string} key The key of the PRESETS object
   */
  function applyPreset(key) {
    const p = PRESETS[key] ?? PRESETS.LATAM;
    setUiIncome(p.uiIncome);
    setUxrIncome(p.uxrIncome);
    setOverhead(p.overhead);
    setWeeks(p.weeks);
    setHoursPerWeek(p.hoursPerWeek);
    setBillablePct(p.billablePct);
    setMarginPct(p.marginPct);
    setContingencyPct(p.contingencyPct);
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

  // Initialise values when the component mounts and whenever region changes
  useEffect(() => {
    applyPreset(region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  // Auto-suggest a discount when the retainer hours change and no manual discount was entered
  useEffect(() => {
    if (engagement === 'retainer' && retainerHours > 0) {
      if (retainerDiscountPct === 0) {
        const suggestion = retainerSuggestion(retainerHours);
        setRetainerDiscountPct(Math.round(suggestion * 100));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retainerHours, engagement]);

  // Use the rate calculation hook instead of inline calculations
  const {
    billableHours,
    rateUI,
    rateUXR,
    blendedRate,
    adjustedRate,
    totalProjectHours,
    fixedPrice,
    retainerPrice
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
  });

  const maxRate = Math.max(rateUI, rateUXR, adjustedRate);
  const maxHours = 52 * 40;

  // Export the current estimation to a JSON file for download
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

  // Client type options for AccessibleSelect
  const clientTypeOptions = [
    { value: 'micro', label: 'Micro / Startup' },
    { value: 'smb', label: 'PyME' },
    { value: 'mid', label: 'Empresa mediana' },
    { value: 'enterprise', label: 'Empresa grande / Corporación' },
  ];

  // Complexity options for AccessibleSelect
  const complexityOptions = [
    { value: 'basic', label: 'Básico' },
    { value: 'standard', label: 'Estándar / Promedio' },
    { value: 'complex', label: 'Complejo / Avanzado' },
    { value: 'extreme', label: 'Extremo / Crítico' },
  ];

  // Engagement options for AccessibleSelect
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="p-5 border-b flex justify-between items-center"
        style={{
          borderColor: 'var(--border)',
          background: 'linear-gradient(180deg, rgba(124,92,255,0.12), transparent)',
        }}
      >
        <h1 className="m-0 text-xl sm:text-2xl md:text-3xl font-bold">
          Conversor de tarifas (editable) — No‑Code / UI &amp; Research
        </h1>
        <ThemeToggle />
      </header>

      <div className="flex-grow p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Left: Form */}
          <section>
            <Card>
              <div className="grid grid-cols-12 gap-3">
              {/* Region and currency selectors */}
              <RegionSelector 
                region={region} 
                setRegion={setRegion} 
                currency={currency} 
                setCurrency={setCurrency} 
              />

              {/* Business assumptions */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Supuestos del negocio (por persona)</h2>
              </div>
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="Ingresos anuales deseados — UI Senior"
                  initialValue={uiIncome}
                  onValueChange={setUiIncome}
                  min={0}
                  step={1000}
                  type="number"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="Ingresos anuales deseados — Research Senior"
                  initialValue={uxrIncome}
                  onValueChange={setUxrIncome}
                  min={0}
                  step={1000}
                  type="number"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="Overhead anual (licencias, equipo, marketing) — por persona"
                  initialValue={overhead}
                  onValueChange={setOverhead}
                  min={0}
                  step={500}
                  type="number"
                />
              </div>

                {/* Semanas y horas por semana se gestionan en el panel de tiempo de desarrollo */}
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="% de horas facturables"
                  initialValue={billablePct}
                  onValueChange={setBillablePct}
                  min={1}
                  max={100}
                  type="number"
                  helpText="Porcentaje de tiempo dedicado a trabajo facturable"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <DebouncedInput
                  label="Margen de ganancia (%)"
                  initialValue={marginPct}
                  onValueChange={setMarginPct}
                  min={0}
                  max={100}
                  type="number"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <DebouncedInput
                  label="Reserva de contingencia (%)"
                  initialValue={contingencyPct}
                  onValueChange={setContingencyPct}
                  min={0}
                  max={100}
                  type="number"
                />
              </div>

              {/* Project scope */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Alcance del proyecto y mezcla de horas</h2>
              </div>
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="Horas de Research (entrevistas, tests, análisis)"
                  initialValue={hoursResearch}
                  onValueChange={setHoursResearch}
                  min={0}
                  step={1}
                  type="number"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="Horas de UI / Build (wireframes, UI, No‑Code)"
                  initialValue={hoursUI}
                  onValueChange={setHoursUI}
                  min={0}
                  step={1}
                  type="number"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="¿Horas totales del proyecto?"
                  initialValue={hoursTotalManual}
                  onValueChange={setHoursTotalManual}
                  min={0}
                  step={1}
                  type="number"
                  helpText="Opcional. Sobreescribe la suma de horas."
                />
              </div>

              {/* Adjusters */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Ajustes por cliente y complejidad</h2>
              </div>
              <div className="col-span-12 md:col-span-6">
                <AccessibleSelect
                  id="client-type"
                  label="Tipo de cliente"
                  value={clientType}
                  onChange={handleClientTypeChange}
                  options={clientTypeOptions}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <AccessibleSelect
                  id="complexity"
                  label="Complejidad del proyecto"
                  value={complexity}
                  onChange={handleComplexityChange}
                  options={complexityOptions}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <DebouncedInput
                  label="Uplift por valor percibido (%)"
                  initialValue={valueUpliftPct}
                  onValueChange={setValueUpliftPct}
                  min={0}
                  max={200}
                  type="number"
                />
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
                <DebouncedInput
                  label="Horas/mes (solo retainer)"
                  initialValue={retainerHours}
                  onValueChange={setRetainerHours}
                  min={0}
                  step={1}
                  type="number"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <DebouncedInput
                  label="Descuento retainer (%)"
                  initialValue={retainerDiscountPct}
                  onValueChange={setRetainerDiscountPct}
                  min={0}
                  max={60}
                  type="number"
                  helpText="Guía: 40h ≈ 10‑15%, 60h ≈ 15‑20%, 80h ≈ 18‑25%."
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <DebouncedInput
                  label="Recargo por urgencia (%)"
                  initialValue={rushPct}
                  onValueChange={setRushPct}
                  min={0}
                  max={100}
                  type="number"
                />
              </div>

              {/* Buttons */}
              <div className="col-span-12 flex flex-wrap gap-2 mt-2">
                <Button onClick={() => applyPreset(region)}>
                  Restablecer presets de la región
                </Button>
                <Button variant="secondary" onClick={() => exportJson()}>
                  Exportar estimación (JSON)
                </Button>
                <Button variant="secondary" onClick={() => handleExportPDF()}>
                  Exportar PDF
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Right: Results */}
        <aside className="w-full md:w-5/12">
          <Card className="md:sticky md:top-4">
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
                <div className="text-2xl font-bold">{fmtMoney(rateUI, currency)}/h</div>
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
                <div className="text-2xl font-bold">{fmtMoney(rateUXR, currency)}/h</div>
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
                <div className="text-2xl font-bold">{fmtMoney(blendedRate, currency)}/h</div>
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
                  {fmtMoney(adjustedRate, currency)}/h
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
                  {totalProjectHours > 0 ? fmtMoney(fixedPrice, currency) : '—'}
                </div>
                <div className="small muted">
                  (Horas de proyecto) × tarifa ajustada × (1 + contingencia)
                </div>
              </div>

              <div className="col-span-12 kpi">
                <h3 className="text-sm font-medium mb-1">Retainer mensual (si corresponde)</h3>
                <div className="text-2xl font-bold">
                  {engagement === 'retainer' && retainerHours > 0
                    ? `${fmtMoney(retainerPrice, currency)}  (${Math.round((1 - retainerDiscountPct/100) * 100)}% de la tarifa)`
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
                  </div>
                  <div className="small muted">
                    {hoursTotalManual > 0
                      ? 'Valor ingresado manualmente'
                      : `${hoursResearch} horas Research + ${hoursUI} horas UI`}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </aside>
        <div className="flex flex-col gap-4">
          <MarketTrends />
          <DevelopmentTimePanel
            weeks={weeks}
            setWeeks={setWeeks}
            hoursPerWeek={hoursPerWeek}
            setHoursPerWeek={setHoursPerWeek}
          />
        </div>
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
    </div>
  );
}