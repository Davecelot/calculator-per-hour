/**
 * Project pricing utilities based on annual targets or hourly rates.
 * @module pricing/project
 */

/**
 * @typedef {Object} ProjectHoursInputs
 * @property {number} tarifaHora   Base hourly rate
 * @property {number} semanasAnio  Weeks per year assumption
 * @property {number} horasSemana  Billable hours per week
 * @property {number} meses        Project duration in months
 * @property {number} dedicacion   Dedicated percentage to the project (0-100)
 * @property {number} buffer       Buffer or risk percentage (0-100)
 */

/**
 * @typedef {Object} ProjectByHoursResult
 * @property {number} semanasProyecto
 * @property {number} horasProyecto
 * @property {number} precioBase
 * @property {number} precioFinal
 */

/**
 * Compute project price using the hours × rate formula (Formula A).
 *
 * @param {ProjectHoursInputs} inputs
 * @returns {ProjectByHoursResult}
 */
export function computeProjectByHours(inputs) {
  const { tarifaHora, semanasAnio, horasSemana, meses, dedicacion, buffer } = inputs;
  const semanasProyecto = semanasAnio * (meses / 12);
  const horasProyecto = semanasProyecto * horasSemana * (dedicacion / 100);
  const precioBase = horasProyecto * tarifaHora;
  const precioFinal = precioBase * (1 + buffer / 100);
  return { semanasProyecto, horasProyecto, precioBase, precioFinal };
}

/**
 * @typedef {Object} ProjectProrateInputs
 * @property {number} ingresoAnualRequerido
 * @property {number} meses
 * @property {number} dedicacion
 * @property {number} utilizacion
 * @property {number} buffer
 */

/**
 * @typedef {Object} ProjectProrateResult
 * @property {number} precioBase
 * @property {number} precioFinal
 */

/**
 * Compute project price by prorating the annual target (Formula B).
 *
 * @param {ProjectProrateInputs} inputs
 * @returns {ProjectProrateResult}
 */
export function computeProjectByProrate(inputs) {
  const { ingresoAnualRequerido, meses, dedicacion, utilizacion, buffer } = inputs;
  const precioBase =
    ingresoAnualRequerido * (meses / 12) * ((dedicacion / 100) / (utilizacion / 100));
  const precioFinal = precioBase * (1 + buffer / 100);
  return { precioBase, precioFinal };
}

/**
 * Round a price to the nearest step (e.g. 100 or 1000).
 *
 * @param {number} price
 * @param {0|100|1000} step
 * @returns {number}
 */
export function roundTo(price, step) {
  if (!step) return price;
  return Math.round(price / step) * step;
}
