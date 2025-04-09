import { FaSortAmountDown } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';
import { Column } from '../types/extras';
import { EmployeeInterface, PayrollInterface, LoanInterface, ParamsInterface } from '../types/entities';
import Button from '../components/Button';
import Utils from '../utils';

export const getPayrollColumns = (
    params: ParamsInterface,
    setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>,
    setSelectedEntities: React.Dispatch<
        React.SetStateAction<{
            selectedEmployee: EmployeeInterface | null;
            selectedLoan: LoanInterface | null;
            selectedPayroll: PayrollInterface | null;
        }>
    >,
    setIsOpenViewPayroll: React.Dispatch<React.SetStateAction<boolean>>
): Column<PayrollInterface>[] => {
    const createSortableHeader = (label: string, field: keyof PayrollInterface) => (
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

    const calcTotal = (row: PayrollInterface) =>
        (row.sueldo ?? 0) -
        (row.prestamos ?? 0) -
        (row.infonavit ?? 0) +
        (row.vacaciones ?? 0) +
        (row.finiquito ?? 0) +
        (row.aguinaldo ?? 0) -
        (row.pension_alimenticia ?? 0) +
        (row.pago_horas_extras ?? 0) +
        (row.maniobras ?? 0) -
        ((row.sueldo ?? 0) / 7) * (row.faltas ?? 0) +
        (row.otros ?? 0);

    return [
        {
            key: 'folio',
            header: createSortableHeader('Folio', 'folio'),
            render: (_, row) => (
                <span className='inline-block rounded-full border border-gray-300 bg-gray-100 px-3 py-1 font-semibold text-gray-500'>
                    {`NOM${row.folio.toString().padStart(4, '0')}`}
                </span>
            ),
        },
        {
            key: 'empleado',
            header: createSortableHeader('Empleado', 'empleado'),
            render: (_, row) => (row.empleado ? `${row.empleado.nombre} ${row.empleado.apellido}` : ''),
        },
        {
            key: 'fecha',
            header: createSortableHeader('Fecha', 'fecha'),
            render: (_, row) => (row.fecha ? Utils.formatDateDDMMYYYY(row.fecha) : 'Sin fecha'),
        },
        {
            key: 'sueldo',
            header: 'Sueldo Base',
            render: (_, row) => formatMoney(row.sueldo ?? 0),
        },
        {
            key: 'pago_horas_extras',
            header: 'H. Extras',
            render: (_, row) => formatMoney(row.pago_horas_extras ?? 0),
        },
        {
            key: 'pension_alimenticia',
            header: 'Pensión A.',
            render: (_, row) => formatMoney(row.pension_alimenticia ?? 0),
        },
        {
            key: 'infonavit',
            header: 'Infonavit',
            render: (_, row) => formatMoney(row.infonavit ?? 0),
        },
        {
            key: 'prestamos',
            header: 'Préstamos',
            render: (_, row) => formatMoney(row.prestamos ?? 0),
        },
        {
            key: 'faltas',
            header: 'Faltas',
            render: (_, row) => formatMoney(((row.sueldo ?? 0) / 7) * (row.faltas ?? 0)),
        },
        {
            key: 'total_pagar',
            header: 'Total',
            render: (_, row) => formatMoney(calcTotal(row), 'total'),
        },
        {
            key: 'accion',
            header: 'Acción',
            render: (_, row) => (
                <Button
                    variant='details'
                    size='md'
                    icon={<CgDetailsMore size={15} />}
                    onClick={() => {
                        setSelectedEntities(prev => ({ ...prev, selectedPayroll: row }));
                        setIsOpenViewPayroll(true);
                    }}>
                    Detalles
                </Button>
            ),
        },
    ];
};
