import { useMemo } from 'react';

import { FaFilePdf } from 'react-icons/fa6';

import Loader from '../components/Loader';
import Header from '../components/Header';
import Button from '../components/Button';
import Table from '../components/Table';

import { WeeklyReportData } from '../types';

import { previewWeeklyReportsPDF } from '../services/pdf.service';

import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

const WeeklyReport: React.FC = () => {
    const { weeklyReport, loading } = useGlobalContext();
    const columns: Column<WeeklyReportData>[] = useMemo(
        () => [
            { key: 'folio', header: 'Semana' },
            {
                key: 'empleados_pagados',
                header: 'Empleados',
            },
            {
                key: 'total_sueldos',
                header: 'Total Sueldos',
                render: (_, row) => `$${(row.total_sueldos ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_prestamos',
                header: 'Total Prestamos',
                render: (_, row) => `$${(row.total_prestamos ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_infonavit',
                header: 'Total Infonavit',
                render: (_, row) => `$${(row.total_infonavit ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_neto',
                header: 'Total Neto',
                render: (_, row) => `$${(row.total_neto ?? 0).toFixed(2)}`,
            },
            {
                key: 'accion',
                header: 'Acción',
                render: (_, row) => (
                    <Button
                        variant='details'
                        size='md'
                        icon={<FaFilePdf size={15} />}
                        onClick={() => previewWeeklyReportsPDF(2025, row)}>
                        Descargar
                    </Button>
                ),
            },
        ],
        []
    );

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            <Header title='Reportes semanales' />
            {loading && <Loader />}
            <Table columns={columns} data={weeklyReport}></Table>
        </section>
    );
};
export default WeeklyReport;
