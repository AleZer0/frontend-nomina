import { useMemo } from 'react';

import { Oval } from 'react-loader-spinner';
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

    const totalNeto = (total: number) => {
        return <span className={`$ {total < 0 ? 'text-red-500' : 'text-green-500'}`}>${total.toFixed(2)}</span>;
    };

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
                render: (_, row) => `$${(row.total_vacaciones ?? 0).toFixed(2)}`,
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
                        icon={
                            loading ? (
                                <Oval
                                    height='20'
                                    width='20'
                                    color='#1646db'
                                    strokeWidth={4}
                                    secondaryColor='#88a3f5'
                                    ariaLabel='oval-loading'
                                />
                            ) : (
                                <FaFilePdf size={15} />
                            )
                        }
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
