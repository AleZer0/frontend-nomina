import { useEffect, useMemo } from 'react';

import { FaFilePdf } from 'react-icons/fa6';

import Button from '../components/Button';
import Table from '../components/Table';

import { WeeklyReportData } from '../types';

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

    const totalNeto = (total: number) => {
        return (
            <span
                className={`${
                    total <= 0
                        ? 'inline-block rounded-full border border-gray-700 bg-gray-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'
                }`}>
                ${total.toFixed(2)}
            </span>
        );
    };

    const sueldo = (total_sueldos: number) => {
        return (
            <span
                className={`${
                    total_sueldos <= 0
                        ? 'inline-block rounded-full border border-gray-700 bg-gray-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'
                }`}>
                ${total_sueldos.toFixed(2)}
            </span>
        );
    };
    const vacaciones = (total_vacaciones: number) => {
        return (
            <span
                className={`${
                    total_vacaciones <= 0
                        ? 'inline-block rounded-full border border-gray-700 bg-gray-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'
                }`}>
                ${total_vacaciones.toFixed(2)}
            </span>
        );
    };

    const aguinaldo = (total_aguinaldo: number) => {
        return (
            <span
                className={`${
                    total_aguinaldo <= 0
                        ? 'inline-block rounded-full border border-gray-700 bg-gray-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'
                }`}>
                ${total_aguinaldo.toFixed(2)}
            </span>
        );
    };

    const finiquito = (total_finiquito: number) => {
        return (
            <span
                className={`${
                    total_finiquito <= 0
                        ? 'inline-block rounded-full border border-gray-700 bg-gray-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'
                }`}>
                ${total_finiquito.toFixed(2)}
            </span>
        );
    };
    const prestamos = (total_prestamos: number) => {
        return (
            <span
                className={`${
                    total_prestamos <= 0
                        ? 'inline-block rounded-full border border-gray-700 bg-gray-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'
                }`}>
                ${total_prestamos.toFixed(2)}
            </span>
        );
    };
    const infonavit = (total_infonavit: number) => {
        return (
            <span
                className={`${
                    total_infonavit <= 0
                        ? 'inline-block rounded-full border border-gray-700 bg-gray-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'
                }`}>
                ${total_infonavit.toFixed(2)}
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
                render: (_, row) => sueldo(row.total_sueldos ?? 0),
            },
            {
                key: 'total_vacaciones',
                header: 'Vacaciones',
                render: (_, row) => vacaciones(row.total_vacaciones ? row.total_vacaciones : 0),
            },
            {
                key: 'total_aguinaldo',
                header: 'Aguinaldo',
                render: (_, row) => aguinaldo(row.total_aguinaldos ?? 0),
            },
            {
                key: 'total_finiquito',
                header: 'Finiquito',
                render: (_, row) => finiquito(row.total_finiquitos ?? 0),
            },
            {
                key: 'total_prestamos',
                header: 'Prestamos',
                render: (_, row) => prestamos(row.total_prestamos ?? 0),
            },
            {
                key: 'total_infonavit',
                header: 'Infonavit',
                render: (_, row) => infonavit(row.total_infonavit ?? 0),
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
            className={`mb-20 flex-auto p-8 transition-all duration-600 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            <Table columns={columns} data={entitiesState.weeklyReports} loading={loading['weeklyReports']} />
            <Pagination />
        </section>
    );
};

export default WeeklyReport;
