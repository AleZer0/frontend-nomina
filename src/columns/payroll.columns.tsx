import { CgDetailsMore } from 'react-icons/cg';
import { Column } from '../types/extras';
import { PayrollInterface, ParamsInterface } from '../types/entities';
import Button from '../components/Button';
import Utils from '../utils';
import StyleComponents from '../utils/stylesComponentes';
import ExtraComponents from '../utils/extraComponentes';

export const getPayrollColumns = (
    params: ParamsInterface,
    setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>,
    handleClickDetails: (selectedPayroll: PayrollInterface) => void
): Column<PayrollInterface>[] => {
    return [
        {
            key: 'folio',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Folio', 'folio'),
            render: (_, row) => StyleComponents.formatFolio(row.folio),
        },
        {
            key: 'empleado',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Empleado', 'empleado'),
            render: (_, row) => (row.empleado ? `${row.empleado.nombre} ${row.empleado.apellido}` : ''),
        },
        {
            key: 'fecha',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Fecha', 'fecha'),
            render: (_, row) => StyleComponents.formatDate(row.fecha ?? ''),
        },
        {
            key: 'sueldo',
            header: 'Sueldo Base',
            render: (_, row) => StyleComponents.formatMoney(row.sueldo ?? 0),
        },
        {
            key: 'pago_horas_extras',
            header: 'H. Extras',
            render: (_, row) => StyleComponents.formatMoney(row.pago_horas_extras ?? 0),
        },
        {
            key: 'pension_alimenticia',
            header: 'Pensión A.',
            render: (_, row) => StyleComponents.formatMoney(row.pension_alimenticia ?? 0),
        },
        {
            key: 'infonavit',
            header: 'Infonavit',
            render: (_, row) => StyleComponents.formatMoney(row.infonavit ?? 0),
        },
        {
            key: 'prestamos',
            header: 'Préstamos',
            render: (_, row) => StyleComponents.formatMoney(row.prestamos ?? 0),
        },
        {
            key: 'faltas',
            header: 'Faltas',
            render: (_, row) => StyleComponents.formatMoney(((row.sueldo ?? 0) / 7) * (row.faltas ?? 0)),
        },
        {
            key: 'total_pagar',
            header: 'Total',
            render: (_, row) => StyleComponents.formatMoney(Utils.calcTotal(row), 'total'),
        },
        {
            key: 'accion',
            header: 'Acción',
            render: (_, row) => (
                <Button
                    variant='details'
                    size='md'
                    icon={<CgDetailsMore size={15} />}
                    onClick={() => handleClickDetails(row)}>
                    Detalles
                </Button>
            ),
        },
    ];
};
