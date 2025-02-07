import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { FaFilePdf } from 'react-icons/fa6';
import { downloadWeeklyReportsPDF } from '../services/pdf.service';
import { ReportesSemanales } from '../services/weeklyReport.service';

export interface WeeklyReportData {
    semana: string;
    empleados_pagados: Array<number>;
    total_sueldos: number;
    total_prestamos: number;
    total_infonavit: number;
    total_neto: number;
}

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
                    {/* Encabezado de la tabla */}
                    <div className='grid grid-cols-7 bg-gray-200 p-3 text-center font-semibold text-gray-700'>
                        <div>Semana</div>
                        <div>Empleados Pagados</div>
                        <div>Total Sueldos</div>
                        <div>Préstamos</div>
                        <div>Infonavit</div>
                        <div>Total Neto</div>
                        <div>Acciones</div>
                    </div>

                    {/* Filas del reporte */}
                    <div className='divide-y divide-gray-300'>
                        {reportes.map((item, index) => (
                            <div
                                key={index}
                                className='grid grid-cols-7 items-center p-3 text-center text-gray-800 odd:bg-gray-50'>
                                <div>{`Semana ${item.semana}, 2025`}</div>
                                <div>{item.empleados_pagados.length}</div>
                                <div>${item.total_sueldos.toFixed(2)}</div>
                                <div>${item.total_prestamos.toFixed(2)}</div>
                                <div>${item.total_infonavit.toFixed(2)}</div>
                                <div className='font-semibold text-green-600'>${item.total_neto.toFixed(2)}</div>
                                <div className='flex justify-center gap-2'>
                                    <Button
                                        onClick={() => downloadWeeklyReportsPDF(item)}
                                        design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                        <span className='relative pt-0.5'>
                                            <FaFilePdf size={17} />
                                        </span>
                                        Generar PDF
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WeeklyReport;
