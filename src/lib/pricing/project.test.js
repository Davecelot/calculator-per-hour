import test from 'node:test';
import assert from 'node:assert/strict';
import { computeAnnualTarget } from './annual.js';
import {
  computeProjectByHours,
  computeProjectByProrate,
  roundTo,
} from './project.js';

test('formula A and B align with sanity example', () => {
  const annual = computeAnnualTarget({
    sueldos: 30000,
    overhead: 15000,
    margenProfitPct: 20,
    semanasAnio: 52,
    horasSemana: 30,
    utilizacion: 60,
  });
  assert.ok(Math.abs(annual.ingresoAnualRequerido - 56250) < 1e-5);
  assert.ok(Math.abs(annual.tarifaHora - 60.096153846) < 1e-5);

  const horas = computeProjectByHours({
    tarifaHora: annual.tarifaHora,
    semanasAnio: 52,
    horasSemana: 30,
    meses: 4,
    dedicacion: 50,
    buffer: 20,
  });
  assert.ok(Math.abs(horas.semanasProyecto - 17.3333) < 1e-3);
  assert.ok(Math.abs(horas.horasProyecto - 260) < 1e-3);
  assert.ok(Math.abs(horas.precioBase - 15625) < 1e-2);
  assert.ok(Math.abs(horas.precioFinal - 18750) < 1e-2);

  const prorate = computeProjectByProrate({
    ingresoAnualRequerido: annual.ingresoAnualRequerido,
    meses: 4,
    dedicacion: 50,
    utilizacion: 60,
    buffer: 20,
  });
  assert.ok(Math.abs(prorate.precioBase - 15625) < 1e-2);
  assert.ok(Math.abs(prorate.precioFinal - horas.precioFinal) < 1e-2);
});

test('roundTo rounds correctly', () => {
  assert.equal(roundTo(18750, 100), 18800);
  assert.equal(roundTo(18750, 1000), 19000);
  assert.equal(roundTo(18750, 0), 18750);
});
