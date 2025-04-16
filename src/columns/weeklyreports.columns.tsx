import { FaFilePdf } from 'react-icons/fa';
import { Column } from '../types/extras';
import { WeeklyReportData } from '../types/entities';
import Button from '../components/Button';
import StyleComponents from '../utils/stylesComponentes';

export const getWeeklyReportColumns = (
    loading: {
        [key: string]: boolean;
        [key: number]: boolean;
    },
    createPreviewWeeklyReportPDF: (year: number, row: WeeklyReportData) => void
): Column<WeeklyReportData>[] => {
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
            render: (_, row) => StyleComponents.formatMoney(row.total_sueldos ?? 0, 'total'),
        },
        {
            key: 'total_vacaciones',
            header: 'Vacaciones',
            render: (_, row) => StyleComponents.formatMoney(row.total_vacaciones ? row.total_vacaciones : 0, 'total'),
        },
        {
            key: 'total_aguinaldo',
            header: 'Aguinaldo',
            render: (_, row) => StyleComponents.formatMoney(row.total_aguinaldos ?? 0, 'total'),
        },
        {
            key: 'total_finiquito',
            header: 'Finiquito',
            render: (_, row) => StyleComponents.formatMoney(row.total_finiquitos ?? 0, 'total'),
        },
        {
            key: 'total_prestamos',
            header: 'Prestamos',
            render: (_, row) => StyleComponents.formatMoney(row.total_prestamos ?? 0, 'total'),
        },
        {
            key: 'total_infonavit',
            header: 'Infonavit',
            render: (_, row) => StyleComponents.formatMoney(row.total_infonavit ?? 0, 'total'),
        },
        {
            key: 'total_neto',
            header: 'Neto',
            render: (_, row) => StyleComponents.formatMoney(row.total_neto ?? 0, 'total'),
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
