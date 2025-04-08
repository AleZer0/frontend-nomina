import { FaSortAmountDown } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';
import { Column } from '../types/extras';
import { EmployeeInterface, PayrollInterface, LoanInterface, ParamsInterface } from '../types/entities';
import Button from '../components/Button';

export const getEmployeeColumns = (
    params: ParamsInterface,
    setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>,
    setSelectedEntities: React.Dispatch<
        React.SetStateAction<{
            selectedEmployee: EmployeeInterface | null;
            selectedLoan: LoanInterface | null;
            selectedPayroll: PayrollInterface | null;
        }>
    >,
    setIsOpenViewEmployee: React.Dispatch<React.SetStateAction<boolean>>
): Column<EmployeeInterface>[] => {
    const createSortableHeader = (label: string, field: keyof EmployeeInterface) => (
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

    const formatSalary = (sueldo?: number | null) => {
        if (sueldo === undefined || sueldo === null || sueldo === 0) {
            return (
                <span className='inline-block rounded-full border border-red-300 bg-red-100 px-3 py-1 font-semibold text-red-500'>
                    Sin sueldo asignado
                </span>
            );
        }

        return (
            <span className='inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'>
                ${sueldo.toFixed(2)}
            </span>
        );
    };

    const formatBadge = (text: string) => (
        <span className='inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold text-gray-500'>
            {text}
        </span>
    );

    return [
        {
            key: 'id_empleado',
            header: createSortableHeader('No. Empleado', 'id_empleado'),
        },
        {
            key: 'nombre',
            header: createSortableHeader('Nombre', 'nombre'),
        },
        {
            key: 'apellido',
            header: createSortableHeader('Apellido', 'apellido'),
        },
        {
            key: 'puesto',
            header: createSortableHeader('Puesto', 'puesto'),
            render: (_, row) => (
                <span className='inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'>
                    {row.puesto}
                </span>
            ),
        },
        {
            key: 'sueldo',
            header: 'Sueldo',
            render: (_, row) => formatSalary(row.sueldo),
        },
        {
            key: 'ultima_nomina',
            header: 'Última Nómina',
            render: (_, row) =>
                formatBadge(row.ultima_nomina ? `NOM${row.ultima_nomina.toString().padStart(4, '0')}` : 'Sin nóminas'),
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
                        setSelectedEntities(prev => ({ ...prev, selectedEmployee: row }));
                        setIsOpenViewEmployee(true);
                    }}>
                    Detalles
                </Button>
            ),
        },
    ];
};
