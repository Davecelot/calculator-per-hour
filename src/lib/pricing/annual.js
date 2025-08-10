/**
 * Utilities for annual pricing calculations.
 * @module pricing/annual
 */

/**
 * @typedef {Object} AnnualInputs
 * @property {number} sueldos           Total annual salaries or desired income
 * @property {number} overhead          Annual overhead costs
 * @property {number} margenProfitPct   Profit margin percentage (0-100)
 * @property {number} semanasAnio       Working weeks per year
 * @property {number} horasSemana       Billable hours per week
 * @property {number} utilizacion       Utilization percentage of billable hours (0-100)
 */

/**
 * @typedef {Object} AnnualResult
 * @property {number} ingresoAnualRequerido Required annual revenue to cover costs and profit
 * @property {number} tarifaHora            Base hourly rate derived from annual target
 */

/**
 * Compute the required annual revenue and base hourly rate.
 *
 * Ingreso_Anual_Requerido = (Sueldos + Overhead) / (1 - Margen_Profit)
 * Tarifa_Hora = Ingreso_Anual_Requerido / (Semanas_Año * Horas_Facturables_Semana * Utilización)
 *
 * @param {AnnualInputs} inputs
 * @returns {AnnualResult}
 */
export function computeAnnualTarget(inputs) {
  const {
    sueldos,
    overhead,
    margenProfitPct,
    semanasAnio,
    horasSemana,
    utilizacion,
  } = inputs;
  const margen = margenProfitPct / 100;
  const ingresoAnualRequerido = (sueldos + overhead) / (1 - margen);
  const horasAnuales = semanasAnio * horasSemana * (utilizacion / 100);
  const tarifaHora = ingresoAnualRequerido / horasAnuales;
  return { ingresoAnualRequerido, tarifaHora };
}
