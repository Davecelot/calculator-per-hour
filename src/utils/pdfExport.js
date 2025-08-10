// ESM correcto para jsPDF + autotable
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Formatea un número como moneda, replicando la lógica utilizada en
 * la aplicación principal. Devuelve un guion si el valor no es
 * válido.
 *
 * @param {number} value   Valor numérico a formatear
 * @param {string} currency Código de moneda (USD, EUR, ARS, GBP)
 * @returns {string} Cadena formateada
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
  return (
    symbol +
    rounded.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

// Exporta la estimación en formato PDF, incluyendo todas las cifras
// y resultados clave del cálculo.
export async function pdfExport({
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
} = {}) {
  const doc = new jsPDF();

  const rows = [
    ['Región', region],
    ['Moneda', currency],
    ['Horas facturables/año', Math.round(billableHours)],
    ['Tarifa base/hora — UI', fmtMoney(rateUI, currency)],
    ['Tarifa base/hora — Research', fmtMoney(rateUXR, currency)],
    ['Tarifa combinada del proyecto', fmtMoney(blendedRate, currency)],
    ['Tarifa ajustada/hora', fmtMoney(adjustedRate, currency)],
    ['Horas totales del proyecto', totalProjectHours > 0 ? totalProjectHours : '—'],
    [
      'Precio fijo estimado',
      totalProjectHours > 0 ? fmtMoney(fixedPrice, currency) : '—'
    ],
    [
      'Retainer mensual',
      retainerHours > 0 ? fmtMoney(retainerPrice, currency) : '—'
    ],
    ['Horas de retainer/mes', retainerHours > 0 ? retainerHours : '—'],
    [
      'Descuento de retainer (%)',
      retainerHours > 0 ? retainerDiscountPct : '—'
    ]
  ];

  autoTable(doc, {
    head: [['Dato', 'Valor']],
    body: rows,
    styles: { fontSize: 10 },
    theme: 'grid'
  });

  const ts = Date.now();
  const filename = `estimacion_${(region || 'region').toLowerCase()}_${ts}.pdf`;
  doc.save(filename);
}
