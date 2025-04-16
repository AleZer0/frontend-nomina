import { CgDetailsMore } from 'react-icons/cg';
import { Column } from '../types/extras';
import { EmployeeInterface, ParamsInterface } from '../types/entities';
import Button from '../components/Button';
import ExtraComponents from '../utils/extraComponentes';
import StyleComponents from '../utils/stylesComponentes';

export const getEmployeeColumns = (
    params: ParamsInterface,
    setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>,
    handleClickDetails: (selectedEmployee: EmployeeInterface) => void
): Column<EmployeeInterface>[] => {
    return [
        {
            key: 'id_empleado',
            header: ExtraComponents.createSortableHeader(params, setParams, 'No. Empleado', 'id_empleado'),
        },
        {
            key: 'nombre',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Nombre', 'nombre'),
        },
        {
            key: 'apellido',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Apellido', 'apellido'),
        },
        {
            key: 'puesto',
            header: ExtraComponents.createSortableHeader(params, setParams, 'Puesto', 'puesto'),
        },
        {
            key: 'sueldo',
            header: 'Sueldo',
            render: (_, row) => StyleComponents.formatMoney(row.sueldo),
        },
        {
            key: 'ultima_nomina',
            header: 'Última Nómina',
            render: (_, row) => StyleComponents.formatFolio(row.ultima_nomina ?? 0),
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
