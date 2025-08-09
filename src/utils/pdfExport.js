import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function exportToPdf(data, currency) {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Estimación de Tarifas', 14, 22);
  
  // Add region and date
  doc.setFontSize(12);
  doc.text(`Región: ${data.region}`, 14, 32);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 38);
  
  // Add business assumptions table
  doc.autoTable({
    startY: 45,
    head: [['Supuestos del Negocio', 'Valor']],
    body: [
      ['Ingresos anuales UI', `${currency} ${data.assumptions.uiIncome.toLocaleString()}`],
      ['Ingresos anuales UXR', `${currency} ${data.assumptions.uxrIncome.toLocaleString()}`],
      ['Overhead anual', `${currency} ${data.assumptions.overhead.toLocaleString()}`],
      ['Semanas trabajadas/año', data.assumptions.weeks],
      ['Horas por semana', data.assumptions.hoursPerWeek],
      ['% de horas facturables', `${data.assumptions.billablePct}%`],
      ['Margen de beneficio', `${data.assumptions.marginPct}%`],
      ['Contingencia', `${data.assumptions.contingencyPct}%`],
    ],
  });
  
  // Add rates table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Tarifas', 'Valor']],
    body: [
      ['Tarifa base UI', `${currency} ${data.roleRates.rateUI.toFixed(2)}/h`],
      ['Tarifa base UXR', `${currency} ${data.roleRates.rateUXR.toFixed(2)}/h`],
      ['Tarifa mezclada', `${currency} ${data.roleRates.blendedRate.toFixed(2)}/h`],
      ['Tarifa ajustada', `${currency} ${data.adjustedRate.toFixed(2)}/h`],
    ],
  });
  
  // Add pricing table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Precios', 'Valor']],
    body: [
      ['Precio fijo', `${currency} ${data.pricing.fixed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
      ['Retainer mensual', data.pricing.retainerMonthly > 0 ? 
        `${currency} ${data.pricing.retainerMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'],
      ['Horas retainer', data.pricing.retainerHours],
      ['Descuento retainer', `${data.pricing.retainerDiscountPct}%`],
    ],
  });
  
  // Save the PDF
  doc.save(`estimacion_${data.region.toLowerCase()}_${Date.now()}.pdf`);
}