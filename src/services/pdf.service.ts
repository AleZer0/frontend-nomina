import { WeeklyReportData } from '../types';

const previewPayrollPDF = async (folio: number) => {
    const backendURL = 'https://app-nomina-141e425e046a.herokuapp.com/api';
    const pdfUrl = `${backendURL}/pdf/nomina/${folio}`;

    window.open(pdfUrl, '_blank');
};

const previewWeeklyReportsPDF = async (year: number, data: WeeklyReportData) => {
    const backendURL = 'https://app-nomina-141e425e046a.herokuapp.com/api';
    const pdfUrl = `${backendURL}/pdf/reporte_semanal/${year}?semana=${data.semana}&empleados_pagados=${data.empleados_pagados}&total_sueldos=${data.total_sueldos}&total_vacaciones=${data.total_vacaciones}&total_aguinaldos=${data.total_aguinaldos}&total_finiquitos=${data.total_finiquitos}&total_prestamos=${data.total_prestamos}&total_infonavit=${data.total_infonavit}&total_neto=${data.total_neto}`;

    window.open(pdfUrl, '_blank');
};

export { previewPayrollPDF, previewWeeklyReportsPDF };
