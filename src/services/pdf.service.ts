import axiosInstance from '.';
import { WeeklyReportData } from '../types';

const previewPayrollPDF = async (folio: number) => {
    try {
        const response = await axiosInstance.get(`/pdf/nomina/${folio}`, {
            responseType: 'blob',
            withCredentials: true,
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const fileName = `NOM${folio.toString().padStart(4, '0')}.pdf`;

        // Abre una nueva ventana con HTML para pr|evisualizar el PDF y un botón de descarga
        setTimeout(() => {
            const newWindow = window.open('');
            if (newWindow) {
                newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>Vista Previa del PDF</title>
            <style>
              body, html {
                margin: 0;
                height: 100%;
              }
              .download-btn {
                position: fixed;
                top: 10px;
                right: 10px;
                background: #fff;
                padding: 10px 15px;
                border: 1px solid #000;
                text-decoration: none;
                color: #000;
                z-index: 1000;
              }
              iframe {
                width: 100%;
                height: 100%;
                border: none;
              }
            </style>
          </head>
          <body>
            <a class="download-btn" href="${url}" download="${fileName}">
              Descargar PDF
            </a>
            <iframe src="${url}"></iframe>
          </body>
        </html>
      `);
            }
        }, 1000);
    } catch (error) {
        console.error('❌ Error al previsualizar la nómina:', error);
    }
};

const previewWeeklyReportsPDF = async (year: number, data: WeeklyReportData) => {
    try {
        const response = await axiosInstance.post(`pdf/reporte-semanal/${year}`, data, {
            responseType: 'blob',
            withCredentials: true,
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const fileName = `RS_${data.semana}.pdf`;

        // Abre una nueva ventana con HTML para previsualizar el PDF y un botón de descarga
        setTimeout(() => {
            const newWindow = window.open('');
            if (newWindow) {
                newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>Vista Previa del PDF</title>
            <style>
              body, html {
                margin: 0;
                height: 100%;
              }
              .download-btn {
                position: fixed;
                top: 10px;
                right: 10px;
                background: #fff;
                padding: 10px 15px;
                border: 1px solid #000;
                text-decoration: none;
                color: #000;
                z-index: 1000;
              }
              iframe {
                width: 100%;
                height: 100%;
                border: none;
              }
            </style>
          </head>
          <body>
            <a class="download-btn" href="${url}" download="${fileName}">
              Descargar PDF
            </a>
            <iframe src="${url}"></iframe>
          </body>
        </html>
      `);
            }
        }, 1000);
    } catch (error) {
        console.error('❌ Error al previsualizar el reporte semanal:', error);
    }
};

export { previewPayrollPDF, previewWeeklyReportsPDF };
