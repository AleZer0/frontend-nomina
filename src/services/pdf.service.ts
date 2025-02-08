import axiosInstance from '.';

const downloadPayrollPDF = async (folio: number) => {
    try {
        const response = await axiosInstance.get(`/pdf/nomina/${folio}`, {
            responseType: 'blob',
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = `NOM${folio.toString().padStart(4, '0')}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('❌ Error al descargar la nómina:', error);
    }
};

const downloadWeeklyReportsPDF = async (year: number, semana: number) => {
    try {
        const response = await axiosInstance.get(`pdf/reporte-semanal/${semana}/${year}`, {
            responseType: 'blob',
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = `RS-${semana}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('❌ Error al descargar el reporte semanal:', error);
    }
};

export { downloadPayrollPDF, downloadWeeklyReportsPDF };
