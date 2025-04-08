import { FaSortAmountDown } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';
import { Column } from '../types/extras';
import { EmployeeInterface, PayrollInterface, LoanInterface, ParamsInterface } from '../types/entities';
import Button from '../components/Button';
import Utils from '../utils';

export const getLoanColumns = (
    params: ParamsInterface,
    setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>,
    setSelectedEntities: React.Dispatch<
        React.SetStateAction<{
            selectedEmployee: EmployeeInterface | null;
            selectedLoan: LoanInterface | null;
            selectedPayroll: PayrollInterface | null;
        }>
    >,
    setIsOpenViewLoan: React.Dispatch<React.SetStateAction<boolean>>
): Column<LoanInterface>[] => {
    const createSortableHeader = (label: string, field: keyof LoanInterface) => (
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
            key: 'empleado',
            header: createSortableHeader('Empleado', 'empleado'),
        },
        {
            key: 'created_at',
            header: createSortableHeader('Fecha', 'created_at'),
            render: (_, row) => (row.created_at ? Utils.formatDateDDMMYYYY(row.created_at) : 'Sin fecha'),
        },
        {
            key: 'monto_total',
            header: 'Monto Total',
            render: (_, row) => formatMoney(row.monto_total ?? 0),
        },
        {
            key: 'saldo_pendiente',
            header: 'Saldo Pendiente',
            render: (_, row) => formatMoney(row.saldo_pendiente ?? 0),
        },
        {
            key: 'ultimo_abono',
            header: 'Último Abono',
            render: (_, row) => formatMoney(row.ultimo_abono ?? 0),
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
                        setSelectedEntities(prev => ({ ...prev, selectedLoan: row }));
                        setIsOpenViewLoan(true);
                    }}>
                    Detalles
                </Button>
            ),
        },
    ];
};
