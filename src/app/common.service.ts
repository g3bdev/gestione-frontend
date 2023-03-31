import {Injectable} from '@angular/core';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  printTable() {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(22)
    doc.setTextColor(100)
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.getWidth();
    const pageHeight = pageSize.getHeight();
    doc.text('ITW srl', pageWidth - 30, pageHeight - 10);
    doc.text('Interventi', 14, 10);
    let str = `Totale ore: `;
    autoTable(doc, {
      html: '#table', headStyles: {fillColor: [155, 89, 182]}, didDrawPage: function (data) {
        doc.setTextColor(40)
        doc.setFontSize(10)
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10)
      }, startY: 20,
    });
    window.open(doc.output('bloburl'), '_blank');
  }
}
