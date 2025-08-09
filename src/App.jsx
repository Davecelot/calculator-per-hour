import React, { useState, useEffect } from 'react';
import { PRESETS, CLIENT_MULT, COMPLEXITY_MULT, retainerSuggestion } from './presets.js';
import clsx from 'clsx';

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

  // Derived computations
  const billableHours = Math.max(1, weeks * hoursPerWeek * (billablePct / 100));
  const marginFactor = 1 + marginPct / 100;
  const rateUI = ((uiIncome + overhead) * marginFactor) / billableHours;
  const rateUXR = ((uxrIncome + overhead) * marginFactor) / billableHours;
  // Determine the number of hours to use for pricing; if the user
  // specifies a total manually, override the sum of research/UI hours.
  const totalProjectHours = hoursTotalManual > 0 ? hoursTotalManual : hoursResearch + hoursUI;
  // Compute blended rate as a weighted average. If no hours
  // specified at all, use a simple average of the two rates.
  const blendedRate = (hoursResearch + hoursUI) > 0
    ? ((hoursResearch * rateUXR + hoursUI * rateUI) / (hoursResearch + hoursUI))
    : (rateUI + rateUXR) / 2;
  // Apply adjusters
  const clientK = CLIENT_MULT[clientType] ?? 0;
  const complexityK = COMPLEXITY_MULT[complexity] ?? 0;
  const valueK = valueUpliftPct / 100;
  const rushK = rushPct / 100;
  const adjustedRate = blendedRate * (1 + clientK + complexityK + valueK + rushK);
  // Fixed price estimate including contingency
  const fixedPrice = totalProjectHours * adjustedRate * (1 + contingencyPct / 100);
  // Retainer price
  const retainerDisc = retainerDiscountPct / 100;
  const retainerPrice = engagement === 'retainer' && retainerHours > 0
    ? retainerHours * adjustedRate * (1 - retainerDisc)
    : 0;

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="p-5 border-b"
        style={{
          borderColor: 'var(--border)',
          background: 'linear-gradient(180deg, rgba(124,92,255,0.12), transparent)',
        }}
      >
        <h1 className="m-0 text-xl sm:text-2xl md:text-3xl font-bold">
          Conversor de tarifas (editable) — No‑Code / UI &amp; Research
        </h1>
        <p className="text-sm muted mt-2">
          Configura los presets por región y obtén: tarifa/hora base por rol,
          tarifa ajustada por cliente/alcance, precio por proyecto y
          retainer mensual. Todo es <strong>100% editable</strong>; los valores por
          defecto provienen de referencias 2025.
        </p>
      </header>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-4 p-4 flex-1">
        {/* Left: Inputs */}
        <section className="w-full md:w-7/12">
          <div className="card">
            <div className="grid grid-cols-12 gap-3">
              {/* Region and currency selectors */}
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Región (preset)</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="LATAM">Latinoamérica (preset)</option>
                  <option value="EU_WEST">Europa Occidental (preset)</option>
                  <option value="EU_EAST">Europa del Este (preset)</option>
                  <option value="USA">USA / Canadá (preset)</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Moneda (solo visual)</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="ARS">ARS ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              {/* Business assumptions */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Supuestos del negocio (por persona)</h2>
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Ingresos anuales deseados — UI Senior</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={uiIncome}
                  onChange={(e) => setUiIncome(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Ingresos anuales deseados — Research Senior</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={uxrIncome}
                  onChange={(e) => setUxrIncome(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Overhead anual (licencias, equipo, marketing) — por persona</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={overhead}
                  onChange={(e) => setOverhead(Number(e.target.value))}
                />
              </div>

              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Semanas trabajadas/año</label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={weeks}
                  onChange={(e) => setWeeks(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Horas por semana</label>
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">% de horas facturables (descontando reuniones, ventas, admin)</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={billablePct}
                  onChange={(e) => setBillablePct(Number(e.target.value))}
                />
                <div className="muted small mt-1">
                  Esto calcula automáticamente las <em>horas facturables/año</em>.
                </div>
              </div>

              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Margen de beneficio (%)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={marginPct}
                  onChange={(e) => setMarginPct(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Reserva para contingencias del proyecto (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={contingencyPct}
                  onChange={(e) => setContingencyPct(Number(e.target.value))}
                />
              </div>

              {/* Project scope */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Alcance del proyecto y mezcla de horas</h2>
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Horas de Research (entrevistas, tests, análisis)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={hoursResearch}
                  onChange={(e) => setHoursResearch(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Horas de UI / Build (wireframes, UI, No‑Code)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={hoursUI}
                  onChange={(e) => setHoursUI(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">¿Horas totales del proyecto?</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={hoursTotalManual}
                  onChange={(e) => setHoursTotalManual(Number(e.target.value))}
                />
                <div className="muted small mt-1">
                  Dejar en 0 para usar <em>Research + UI</em>.
                </div>
              </div>

              {/* Adjusters for client and complexity */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Ajustes por tipo de cliente y complejidad</h2>
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Tipo de cliente</label>
                <select value={clientType} onChange={(e) => setClientType(e.target.value)}>
                  <option value="micro">Micro / Emprendedor</option>
                  <option value="smb">PYME / Small Business</option>
                  <option value="mid">Empresa mediana</option>
                  <option value="enterprise">Gran empresa / Enterprise</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Complejidad</label>
                <select value={complexity} onChange={(e) => setComplexity(e.target.value)}>
                  <option value="basic">Básico</option>
                  <option value="standard">Estándar</option>
                  <option value="complex">Complejo</option>
                  <option value="extreme">Muy complejo / Regulado</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs muted">Uplift por valor percibido (%)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={valueUpliftPct}
                  onChange={(e) => setValueUpliftPct(Number(e.target.value))}
                />
              </div>

              {/* Engagement model */}
              <div className="col-span-12 mt-2">
                <h2 className="text-base font-semibold">Modelo de contratación</h2>
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Tipo</label>
                <select value={engagement} onChange={(e) => setEngagement(e.target.value)}>
                  <option value="freelance">Freelance / Proyecto</option>
                  <option value="retainer">In‑house partner / Retainer mensual</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Horas/mes (solo retainer)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={retainerHours}
                  onChange={(e) => setRetainerHours(Number(e.target.value))}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Descuento retainer (%)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={retainerDiscountPct}
                  onChange={(e) => setRetainerDiscountPct(Number(e.target.value))}
                />
                <div className="muted small mt-1">
                  Guía: 40h ≈ 10‑15%, 60h ≈ 15‑20%, 80h ≈ 18‑25%.
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs muted">Recargo por urgencia (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={rushPct}
                  onChange={(e) => setRushPct(Number(e.target.value))}
                />
              </div>

              {/* Buttons */}
              <div className="col-span-12 flex flex-wrap gap-2 mt-2">
                <button className="btn" onClick={() => applyPreset(region)}>
                  Restablecer presets de la región
                </button>
                <button className="btn btn-secondary" onClick={() => exportJson()}>
                  Exportar estimación (JSON)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Results */}
        <aside className="w-full md:w-5/12">
          <div className="card md:sticky md:top-4">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12">
                <h2 className="text-base font-semibold">Resultados</h2>
              </div>
              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Horas facturables/año</h3>
                <div className="text-2xl font-bold">
                  {Math.round(billableHours)}
                </div>
                <div className="small muted">Calculado: semanas × horas/semana × % facturable</div>
              </div>
              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Tarifa base/hora (UI · Research)</h3>
                <div className="text-2xl font-bold">
                  {fmtMoney(rateUI, currency)}/h · {fmtMoney(rateUXR, currency)}/h
                </div>
                <div className="small muted">
                  Fórmula: (ingresos + overhead) × (1 + margen) ÷ horas facturables
                </div>
              </div>

              <div className="col-span-12 kpi">
                <h3 className="text-sm font-medium mb-1">Tarifa mezclada del proyecto</h3>
                <div className="text-2xl font-bold">
                  {fmtMoney(blendedRate, currency)}/h
                </div>
                <div className="small muted">
                  Promedio ponderado por horas de Research vs UI
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 kpi">
                <h3 className="text-sm font-medium mb-1">Tarifa ajustada/hora</h3>
                <div className="text-2xl font-bold">
                  {fmtMoney(adjustedRate, currency)}/h
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
                    ? `${fmtMoney(retainerPrice, currency)}  (${Math.round((1 - retainerDisc) * 100)}% de la tarifa)`
                    : '—'}
                </div>
                <div className="small muted">
                  (Horas/mes) × tarifa ajustada × (1 – descuento)
                </div>
              </div>

              <div className="col-span-12">
                <p className="small muted">
                  Rangos guía por región (personalizables en presets): LATAM ~ 60–100/h · EU Oeste ~ 80–150/h · EU Este ~ 40–80/h · USA ~ 100–200/h.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer
        className="p-4 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="pill mr-2">Sugerencia</span>
        <span className="small muted">
          Cambia región y luego ajusta ingresos/overhead/margen según tu operación. Usa “Exportar estimación” para guardar tu escenario.
        </span>
      </footer>
    </div>
  );
}