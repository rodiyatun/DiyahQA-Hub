import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate a PDF report for a table of data.
 * 
 * @param {string} title The title of the PDF document
 * @param {Array<string>} headers The column headers
 * @param {Array<Array<any>>} body The data rows
 * @param {string} filename The output filename
 */
export function exportToPDF(title, headers, body, filename) {
  // A4 size, landscape orientation for better table fit if many columns
  const doc = new jsPDF({ orientation: 'landscape', format: 'a4' });

  // Add Document Title
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(title, 14, 22);

  // Add Generation Date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString('id-ID')}`, 14, 30);

  // Add Table
  doc.autoTable({
    startY: 36,
    head: [headers],
    body: body,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [99, 102, 241], // var(--accent)
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // light grey alternate
    },
    margin: { top: 36, right: 14, bottom: 20, left: 14 },
    didDrawPage: function (data) {
      // Footer with page numbers
      let str = 'Page ' + doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
  });

  doc.save(filename || 'report.pdf');
}
