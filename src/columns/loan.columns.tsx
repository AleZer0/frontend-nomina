import { CgDetailsMore } from 'react-icons/cg';
import { Column } from '../types/extras';
import { EmployeeInterface, PayrollInterface, LoanInterface, ParamsInterface } from '../types/entities';
import Button from '../components/Button';
import ExtraComponents from '../utils/extraComponentes';
import StyleComponents from '../utils/stylesComponentes';

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
    return [
        {
            key: 'empleado',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Empleado', 'empleado'),
        },
        {
            key: 'created_at',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Fecha', 'created_at'),
            render: (_, row) => StyleComponents.formatDate(row.created_at ?? ''),
        },
        {
            key: 'monto_total',
            header: 'Monto Total',
            render: (_, row) => StyleComponents.formatMoney(row.monto_total ?? 0),
        },
        {
            key: 'saldo_pendiente',
            header: 'Saldo Pendiente',
            render: (_, row) => StyleComponents.formatMoney(row.saldo_pendiente ?? 0),
        },
        {
            key: 'ultimo_abono',
            header: 'Último Abono',
            render: (_, row) => StyleComponents.formatMoney(row.ultimo_abono ?? 0),
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
