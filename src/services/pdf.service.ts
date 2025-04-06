import { WeeklyReportData } from '../types/entities';
export class PDF {
    static previewPayrollPDF = (folio: number) => {
        const backendURL = 'https://transportesgodoy-nomina.xrom.cc/api';
        const pdfUrl = `${backendURL}/pdf/nomina/${folio}`;

        window.open(pdfUrl, '_blank');
    };

    static previewWeeklyReportsPDF = (year: number, data: WeeklyReportData) => {
        const backendURL = 'https://transportesgodoy-nomina.xrom.cc/api';
        const pdfUrl = `${backendURL}/pdf/reporte_semanal/${year}?semana=${data.semana}&empleados_pagados=${data.empleados_pagados}&total_sueldos=${data.total_sueldos}&total_vacaciones=${data.total_vacaciones}&total_aguinaldos=${data.total_aguinaldos}&total_finiquitos=${data.total_finiquitos}&total_prestamos=${data.total_prestamos}&total_infonavit=${data.total_infonavit}&total_pension_alimenticia=${data.total_pension_alimenticia}&total_pago_horas_extras=${data.total_pago_horas_extras}&total_maniobras=${data.total_maniobras}&total_otros=${data.total_otros}&total_neto=${data.total_neto}`;

        window.open(pdfUrl, '_blank');
    };
}

export default PDF;
