import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const useExportPdf = () => {
  const exportToPdf = async (
    element: HTMLElement,
    filename: string = "document.pdf",
  ) => {
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 552,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        hotfixes: ["px_scaling"],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      const x = (pdfWidth - scaledWidth) / 2;
      const y = 10;

      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
      pdf.save(filename);
    } catch {
      // Ошибка обрабатывается тихо
    }
  };

  return { exportToPdf };
};