import { useEffect, useMemo } from 'react';

import { FaFilePdf } from 'react-icons/fa6';

import Button from '../components/Button';
import Table from '../components/Table';

import { WeeklyReportData } from '../types/entities';

import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';
import Pagination from '../components/Pagination';

const WeeklyReport: React.FC = () => {
    const { entitiesState, createPreviewWeeklyReportPDF, loading, isSidebarOpen, setContentHeader } =
        useGlobalContext();

    useEffect(() => {
        setContentHeader(
            <>
                <div className='flex w-full items-center justify-between px-4'>
                    <h1
                        className={`text-start text-3xl font-bold tracking-wider duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
                        Reportes semanales
                    </h1>
                </div>
            </>
        );
    }, [isSidebarOpen]);

    const styleMoney = (cantidad: number) => {
        return (
            <span
                className={`inline-block rounded-full border px-1.5 py-1 font-semibold ${!cantidad ? 'border-gray-300 bg-gray-100 text-gray-500' : cantidad && cantidad < 0 ? 'border-red-400 bg-red-200 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
                ${cantidad.toFixed(2)}
            </span>
        );
    };

    const columns: Column<WeeklyReportData>[] = useMemo(
        () => [
            {
                key: 'semana',
                header: 'Semana',
            },
            {
                key: 'empleados_pagados',
                header: 'Empleados',
            },
            {
                key: 'total_sueldos',
                header: 'Sueldos',
                render: (_, row) => styleMoney(row.total_sueldos ?? 0),
            },
            {
                key: 'total_vacaciones',
                header: 'Vacaciones',
                render: (_, row) => styleMoney(row.total_vacaciones ? row.total_vacaciones : 0),
            },
            {
                key: 'total_aguinaldo',
                header: 'Aguinaldo',
                render: (_, row) => styleMoney(row.total_aguinaldos ?? 0),
            },
            {
                key: 'total_finiquito',
                header: 'Finiquito',
                render: (_, row) => styleMoney(row.total_finiquitos ?? 0),
            },
            {
                key: 'total_prestamos',
                header: 'Prestamos',
                render: (_, row) => styleMoney(row.total_prestamos ?? 0),
            },
            {
                key: 'total_infonavit',
                header: 'Infonavit',
                render: (_, row) => styleMoney(row.total_infonavit ?? 0),
            },
            {
                key: 'total_neto',
                header: 'Neto',
                render: (_, row) => styleMoney(row.total_neto ?? 0),
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
                        PDF
                    </Button>
                ),
            },
        ],
        [loading]
    );

    return (
        <section
            className={`mb-20 flex-auto p-8 transition-all duration-600 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            <Table columns={columns} data={entitiesState.weeklyReports} loading={loading['weeklyReports']} />
            <Pagination />
        </section>
    );
};

export default WeeklyReport;
