import { useMemo } from 'react';

import { FaFilePdf } from 'react-icons/fa6';

import Loader from '../components/Loader';
import Header from '../components/Header';
import Button from '../components/Button';
import Table from '../components/Table';

import { WeeklyReportData } from '../types';

import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

const totalNeto = (total: number) => {
    return <span className={`${total < 0 ? 'text-red-500' : 'text-green-500'}`}>${total.toFixed(2)}</span>;
};

const WeeklyReport: React.FC = () => {
    const { entitiesState, createPreviewWeeklyReportPDF, loading, isSidebarOpen } = useGlobalContext();

    const columns: Column<WeeklyReportData>[] = useMemo(
        () => [
            { key: 'semana', header: 'Semana' },
            {
                key: 'empleados_pagados',
                header: 'Empleados',
            },
            {
                key: 'total_sueldos',
                header: 'Sueldos',
                render: (_, row) => `$${(row.total_sueldos ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_vacaciones',
                header: 'Vacaciones',
                render: (_, row) => `$${(row.total_vacaciones ? row.total_vacaciones : 0).toFixed(2)}`,
            },
            {
                key: 'total_aguinaldo',
                header: 'Aguinaldo',
                render: (_, row) => `$${(row.total_aguinaldos ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_finiquito',
                header: 'Finiquito',
                render: (_, row) => `$${(row.total_finiquitos ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_prestamos',
                header: 'Prestamos',
                render: (_, row) => `$${(row.total_prestamos ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_infonavit',
                header: 'Infonavit',
                render: (_, row) => `$${(row.total_infonavit ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_neto',
                header: 'Neto',
                render: (_, row) => totalNeto(row.total_neto ?? 0),
            },
            {
                key: 'accion',
                header: 'Acción',
                render: (_, row) => (
                    <Button
                        variant='details'
                        size='md'
                        icon={<FaFilePdf size={15} />}
                        isLoading={loading[row.semana]}
                        disabled={loading[row.semana]}
                        onClick={() => createPreviewWeeklyReportPDF(2025, row)}>
                        Descargar
                    </Button>
                ),
            },
        ],
        [loading]
    );

    return (
        <section
            className={`mb-20 flex-auto p-8 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            <Header title='Reportes semanales' />
            {loading['loadingReports'] ? <Loader /> : <Table columns={columns} data={entitiesState.weeklyReports} />}
        </section>
    );
};

export default WeeklyReport;
