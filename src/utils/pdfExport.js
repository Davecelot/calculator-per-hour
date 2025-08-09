// src/utils/pdfExport.js
export async function exportPDF(rows = [], columns = []) {
  const [{ jsPDF }, autoTableMod] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable')
  ]);

  const autoTable = autoTableMod.default || autoTableMod.autoTable; // compat
  const doc = new jsPDF();

  autoTable(doc, {
    head: [columns],
    body: rows,
    styles: { fontSize: 10 },
    theme: 'grid'
  });

  doc.save('estimate.pdf');
}