import { useMemo } from 'react';
import { BsCash } from 'react-icons/bs';

import Modal from '../components/Modal';
import Form from '../components/Form';

import { useGlobalContext } from '../context/GlobalContext';
import { LoanInterface } from '../types';
import { FormField } from '../types/extras';

interface CreateLoanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newLoan: Omit<LoanInterface, 'id_prestamo'>) => void;
}

const NewLoan: React.FC<CreateLoanModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { employees, selectedEmployee, selectEmployee } = useGlobalContext();

    const emptyLoan: Omit<LoanInterface, 'id_prestamo'> = {
        id_empleado: selectedEmployee?.id_empleado || 0,
        monto_total: 0,
        saldo_pendiente: 0,
    };

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
                default_value: selectedEmployee?.id_empleado.toString(),
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
        [employees, selectedEmployee]
    );

    const handleSubmit = (values: Partial<LoanInterface>) => {
        if (!values.id_empleado || !values.monto_total || !values.saldo_pendiente) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newLoan: LoanInterface = { id_prestamo: 0, ...emptyLoan, ...values };
        onSubmit(newLoan);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Crear un nuevo préstamo' containerClassName='max-w-3xl'>
            <Form
                fields={fields}
                data={emptyLoan} // 🔹 `emptyLoan` como estado inicial
                onSubmit={handleSubmit}
                submitIcon={<BsCash size={17} />}
                submitLabel='Guardar préstamo'
                variant='add'
                direction='end'
                columns={1}
                extra={(id: number) => selectEmployee(id)}
            />
        </Modal>
    );
};

export default NewLoan;
