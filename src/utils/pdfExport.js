// ESM correcto para jsPDF + autotable
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency } from '@/utils/format';

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
    ['Tarifa base/hora — UI', formatCurrency(rateUI, currency)],
    ['Tarifa base/hora — Research', formatCurrency(rateUXR, currency)],
    ['Tarifa combinada del proyecto', formatCurrency(blendedRate, currency)],
    ['Tarifa ajustada/hora', formatCurrency(adjustedRate, currency)],
    ['Horas totales del proyecto', totalProjectHours > 0 ? totalProjectHours : '—'],
    [
      'Precio fijo estimado',
      totalProjectHours > 0 ? formatCurrency(fixedPrice, currency) : '—'
    ],
    [
      'Retainer mensual',
      retainerHours > 0 ? formatCurrency(retainerPrice, currency) : '—'
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
