import { FaFilePdf, FaSortAmountDown } from 'react-icons/fa';
import { Column } from '../types/extras';
import { ParamsInterface, WeeklyReportData } from '../types/entities';
import Button from '../components/Button';

export const getWeeklyReportColumns = (
    params: ParamsInterface,
    setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>,
    loading: {
        [key: string]: boolean;
        [key: number]: boolean;
    },
    createPreviewWeeklyReportPDF: (year: number, row: WeeklyReportData) => void
): Column<WeeklyReportData>[] => {
    const createSortableHeader = (label: string, field: keyof WeeklyReportData) => (
        <div className='flex items-center justify-center gap-2'>
            <button
                onClick={() => {
                    const newOrder = params.order === 'asc' ? 'desc' : 'asc';
                    setParams({ ...params, order: newOrder, sort_by: field });
                }}>
                <FaSortAmountDown
                    size={17}
                    className={`transition-transform duration-200 ${
                        params.sort_by === field && params.order === 'desc' ? 'rotate-180' : ''
                    } text-gray-500 hover:text-gray-700`}
                />
            </button>
            <span>{label}</span>
        </div>
    );

    const formatMoney = (cantidad: number, tipo: 'normal' | 'total' = 'normal') => {
        const classes = {
            normal: !cantidad
                ? 'border-gray-300 bg-gray-100 text-gray-500'
                : cantidad < 0
                  ? 'border-red-400 bg-red-200 text-red-700'
                  : 'border-green-200 bg-green-50 text-green-700',
            total: cantidad < 0 ? 'border-red-700 bg-red-500 text-red-700' : 'border-blue-400 bg-blue-50 text-blue-500',
        };

        return (
            <span
                className={`inline-block rounded-full border px-3 py-1 font-semibold ${
                    tipo === 'total' ? classes.total : classes.normal
                }`}>
                ${cantidad.toFixed(2)}
            </span>
        );
    };

    return [
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
            render: (_, row) => formatMoney(row.total_sueldos ?? 0, 'total'),
        },
        {
            key: 'total_vacaciones',
            header: 'Vacaciones',
            render: (_, row) => formatMoney(row.total_vacaciones ? row.total_vacaciones : 0, 'total'),
        },
        {
            key: 'total_aguinaldo',
            header: 'Aguinaldo',
            render: (_, row) => formatMoney(row.total_aguinaldos ?? 0, 'total'),
        },
        {
            key: 'total_finiquito',
            header: 'Finiquito',
            render: (_, row) => formatMoney(row.total_finiquitos ?? 0, 'total'),
        },
        {
            key: 'total_prestamos',
            header: 'Prestamos',
            render: (_, row) => formatMoney(row.total_prestamos ?? 0, 'total'),
        },
        {
            key: 'total_infonavit',
            header: 'Infonavit',
            render: (_, row) => formatMoney(row.total_infonavit ?? 0, 'total'),
        },
        {
            key: 'total_neto',
            header: 'Neto',
            render: (_, row) => formatMoney(row.total_neto ?? 0, 'total'),
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
    ];
};
