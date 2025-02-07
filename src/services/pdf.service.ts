import axiosInstance from '.';
import { WeeklyReportData } from '../pages/WeeklyReport';

const downloadPayrollPDF = async (folio: number) => {
    try {
        const response = await axiosInstance.get(`/pdf/nomina/${folio}`, {
            responseType: 'blob',
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = `nomina_${folio}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('❌ Error al descargar la nómina:', error);
    }
};

const downloadWeeklyReportsPDF = async (data: WeeklyReportData) => {
    try {
        const response = await axiosInstance.post('/pdf/weekly-report', data, {
            responseType: 'blob',
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = `RS-${data.semana}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('❌ Error al descargar el reporte semanal:', error);
    }
};

export { downloadPayrollPDF, downloadWeeklyReportsPDF };
