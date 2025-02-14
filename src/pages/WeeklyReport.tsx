import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { FaFilePdf } from 'react-icons/fa6';
import { downloadWeeklyReportsPDF } from '../services/pdf.service';
import { ReportesSemanales } from '../services/weeklyReport.service';
import { WeeklyReportData } from '../types';
import TableData from '../components/TableData';

const WeeklyReport: React.FC = () => {
    const [reportes, setReportes] = useState<WeeklyReportData[]>([]);

    useEffect(() => {
        ReportesSemanales.getReportsList()
            .then(response => {
                if (response && Array.isArray(response.data)) setReportes(response.data);
                else setReportes([]);
            })
            .catch(() => setReportes([]));
    }, []);

    return (
        <div className='ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Reportes Semanales' />

            <main className='p-6'>
                <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
                    <TableData
                        // Encabezados para la tabla
                        fields={[
                            'Semana',
                            'Empleados',
                            'Total Sueldos',
                            'Préstamos',
                            'Infonavit',
                            'Total Neto',
                            'Acciones',
                        ]}
                        // Datos de la tabla
                        data={reportes}
                        renderRow={item => (
                            <>
                                <div>{`Semana ${item.semana}, 2025`}</div>
                                <div>{item.empleados_pagados.length}</div>
                                <div>${item.total_sueldos.toFixed(2)}</div>
                                <div>${item.total_prestamos.toFixed(2)}</div>
                                <div>${item.total_infonavit.toFixed(2)}</div>
                                <div className='font-semibold text-green-600'>${item.total_neto.toFixed(2)}</div>
                                <div className='flex justify-center gap-2'>
                                    <Button
                                        onClick={() => downloadWeeklyReportsPDF(2025, item)}
                                        design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                        <span className='relative pt-0.5'>
                                            <FaFilePdf size={17} />
                                        </span>
                                        Generar PDF
                                    </Button>
                                </div>
                            </>
                        )}
                    />
                </div>
            </main>
        </div>
    );
};

export default WeeklyReport;
