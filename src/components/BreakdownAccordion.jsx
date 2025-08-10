import React from 'react';

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Collapsible section with calculation details.
 */
export default function BreakdownAccordion({
  semanasProyecto,
  utilizacion,
  precioA,
  precioB,
  currency,
}) {
  return (
    <details className="mt-2">
      <summary className="cursor-pointer text-sm text-[var(--brand)]">Ver desglose</summary>
      <div className="mt-2 text-sm space-y-1">
        <div>Semanas del proyecto: {semanasProyecto.toFixed(2)}</div>
        <div>Utilización asumida: {utilizacion}%</div>
        <div>Fórmula A: {formatCurrency(precioA, currency)}</div>
        <div>Fórmula B: {formatCurrency(precioB, currency)}</div>
        <div>Overhead y margen ya contemplados en la tarifa anual.</div>
      </div>
    </details>
  );
}
