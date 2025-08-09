// ESM correcto para jsPDF + autotable
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Named export con el NOMBRE EXACTO que importas en App.jsx
export async function pdfExport({ rows = [], columns = [], filename = 'estimate.pdf' } = {}) {
  const doc = new jsPDF();

  // v3 de jspdf-autotable: se invoca como función
  autoTable(doc, {
    head: [columns],
    body: rows,
    styles: { fontSize: 10 },
    theme: 'grid'
  });

  doc.save(filename);
}