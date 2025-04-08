import { useEffect, useMemo, useState } from 'react';

import { MdAttachMoney } from 'react-icons/md';

import Modal from '../Modal';
import Form from '../Form';

import { useGlobalContext } from '../../context/GlobalContext';
import { EmployeeInterface, LoanInterface } from '../../types/entities';
import { FormField } from '../../types/extras';
import EmployeeServices from '../../services/employees.service';

interface CreateLoanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newLoan: Omit<LoanInterface, 'id_prestamo'>) => void;
}

const NewLoan: React.FC<CreateLoanModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { entitiesState, selectedEntities, setSelectedEntities, loading } = useGlobalContext();

    const emptyLoan: Omit<LoanInterface, 'id_prestamo'> = {
        id_empleado: selectedEntities['selectedEmployee']?.id_empleado || 0,
        monto_total: 0,
        saldo_pendiente: 0,
    };

    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

    const handleSelectEmployee = (id_empleado: number) =>
        setSelectedEntities(prev => ({
            ...prev,
            ['selectedEmployee']: entitiesState['employees'].find(emp => emp.id_empleado === id_empleado) ?? null,
        }));

    const handleClickClose = () => {
        setSelectedEntities(prev => ({ ...prev, ['selectedEmployee']: null }));
        onClose();
    };

    const handleSubmit = (values: Partial<LoanInterface>) => {
        if (!values.id_empleado || !values.monto_total || !values.saldo_pendiente) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newLoan: LoanInterface = {
            id_prestamo: 0,
            ...emptyLoan,
            ...values,
        };

        onSubmit(newLoan);
        setSelectedEntities(prev => ({ ...prev, ['selectedEmployee']: null }));
        onClose();
    };

    useEffect(() => {
        EmployeeServices.getEmployees({ estado: 1, page: 1, limit: 200 })
            .then(({ data }) => setEmployees(data))
            .catch(err => {
                throw new Error(`Error al obtener todos los empleados ${err}`);
            });
    }, []);

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'id_empleado',
                label: 'Empleado',
                type: 'select',
                data: employees.map(({ id_empleado, nombre, apellido }) => ({
                    id: id_empleado,
                    label: `${nombre} ${apellido}`,
                })),
                default_value: selectedEntities['selectedEmployee']?.id_empleado.toString(),
                placeholder: 'Seleccione un empleado',
                required: true,
            },
            {
                name: 'monto_total',
                label: 'Monto Total',
                type: 'number',
                placeholder: 'Ingrese el monto total',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'saldo_pendiente',
                label: 'Saldo Pendiente',
                type: 'number',
                placeholder: 'Ingrese el saldo pendiente',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
        ],
        [employees, selectedEntities['selectedEmployee']]
    );

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClickClose}
            title='Crear un nuevo préstamo'
            containerClassName='max-w-3xl'>
            <Form
                fields={fields}
                data={emptyLoan}
                onSubmit={handleSubmit}
                submitIcon={<MdAttachMoney size={17} />}
                submitLabel='Registrar préstamo'
                variant='save'
                direction='end'
                columns={1}
                extra={handleSelectEmployee}
                loadingButton={loading['addLoan']}
                labelLoadingButton='Registrando préstamo...'
            />
        </Modal>
    );
};

export default NewLoan;
