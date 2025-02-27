import { useMemo } from 'react';

import { FaRegSave } from 'react-icons/fa';
import { LiaPiggyBankSolid } from 'react-icons/lia';

import Modal from '../components/Modal';
import Form from '../components/Form';
import Input from '../components/Input';

import { useGlobalContext } from '../context/GlobalContext';

import { Column, FormField } from '../types/extras';
import { LoanInterface, PayrollInterface, PrestamoAbono } from '../types';
import Table from '../components/Table';

interface CreatePayrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newPayroll: Omit<PayrollInterface, 'folio'>) => void;
}

const NewPayroll: React.FC<CreatePayrollModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { employees, selectedEmployee, selectEmployee } = useGlobalContext();

    const emptyPayroll: Omit<PayrollInterface, 'folio'> = {
        fecha: '',
        dias_trabajados: 0,
        infonavit: 0,
        sueldo: 0,
        finiquito: 0,
        vacaciones: 0,
        aguinaldo: 0,
        id_empleado: 0,
        ids_prestamos: [] as PrestamoAbono[],
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
                name: 'fecha',
                label: 'Fecha',
                type: 'date',
                placeholder: 'Seleccione una fecha',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'dias_trabajados',
                label: 'Días laborados',
                type: 'number',
                placeholder: 'Ingrese los días laborados',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'infonavit',
                label: 'Infonavit',
                type: 'number',
                placeholder: 'Ingrese la cantidad a infonavit',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'vacaciones',
                label: 'Vacaciones',
                type: 'number',
                placeholder: 'Ingrese la cantidad a vacaciones',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'aguinaldo',
                label: 'Aguinaldo',
                type: 'number',
                placeholder: 'Ingrese la cantidad a aguinaldo',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'finiquito',
                label: 'Finiquito',
                type: 'number',
                placeholder: 'Ingrese la cantidad a finiquito',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'sueldo',
                label: 'Sueldo',
                type: 'number',
                placeholder: 'Ingrese la cantidad a sueldo',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
        ],
        [selectedEmployee]
    );

    const columns: Column<LoanInterface>[] = useMemo(
        () => [
            { key: 'id_prestamo', header: 'No. Prestamo' },
            { key: 'monto_total', header: 'Monto total', render: (_, row) => `$${row.monto_total.toFixed(2)}` },
            {
                key: 'saldo_pendiente',
                header: 'Saldo pendiente',
                render: (_, row) => `$${row.saldo_pendiente.toFixed(2)}`,
            },
            {
                key: 'monto_abonado',
                header: 'Monto a abonar',
                render: (_, row) => (
                    <Input
                        variant='default'
                        inputSize='md'
                        leftIcon={<LiaPiggyBankSolid size={17} />}
                        type='number'
                        placeholder={`$${row.saldo_pendiente.toFixed(2)}`}
                    />
                ),
            },
        ],
        []
    );

    const handleSubmit = (values: Partial<PayrollInterface>) => {
        if (
            !values.fecha ||
            !values.dias_trabajados ||
            !values.sueldo ||
            !values.id_empleado ||
            !values.ids_prestamos
        ) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newPayroll: PayrollInterface = { folio: 0, ...emptyPayroll, ...values };

        onSubmit(newPayroll);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Crear una nueva nómina' containerClassName='max-w-3xl'>
            <Form
                fields={fields}
                data={emptyPayroll}
                onSubmit={handleSubmit}
                submitIcon={<FaRegSave size={17} />}
                submitLabel='Guardar nómina'
                variant='add'
                direction='end'
                columns={2}
                extra={(id: number) => selectEmployee(id)}>
                <Table columns={columns} data={selectedEmployee?.prestamos ?? []} />
            </Form>
        </Modal>
    );
};

export default NewPayroll;
