import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FaFilePdf } from 'react-icons/fa6';
import { previewWeeklyReportsPDF } from '../services/pdf.service';
import { ReportesSemanales } from '../services/weeklyReport.service';
import { WeeklyReportData } from '../types';
import TableData from '../components/TableData';
import Loader from '../components/Loader';
import LoadingButton from '../components/LoadingButton';

const WeeklyReport: React.FC = () => {
    const [reportes, setReportes] = useState<WeeklyReportData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ReportesSemanales.getReportsList()
            .then(response => {
                if (response && Array.isArray(response.data)) setReportes(response.data);
                else setReportes([]);
            })
            .catch(() => setReportes([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='ml-64 min-h-screen flex-1 bg-gray-100'>
            {/* <Header tittle='Reportes Semanales' /> */}
            <main className='p-6'>
                {loading && <Loader />}
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
                                    <LoadingButton onClick={() => previewWeeklyReportsPDF(2025, item)}>
                                        <span className='relative'>
                                            <FaFilePdf size={17} />
                                        </span>
                                        Generar PDF
                                    </LoadingButton>
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
