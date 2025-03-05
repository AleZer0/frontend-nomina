import { useMemo } from 'react';

import { FaRegSave } from 'react-icons/fa';

import Modal from '../components/Modal';
import Form from '../components/Form';

import { EmployeeInterface } from '../types';
import { FormField } from '../types/extras';

interface CreateEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => void;
}

const NewEmployee: React.FC<CreateEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const emptyEmployee: Omit<EmployeeInterface, 'id_empleado'> = {
        nombre: '',
        apellido: '',
        fecha_incorporacion: '',
        departamento: '',
        puesto: '',
        sueldo: 0,
        nomina: [],
    };

    const handleSubmit = (values: Partial<EmployeeInterface>) => {
        if (!values.nombre || !values.apellido || !values.puesto) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newEmployee: Omit<EmployeeInterface, 'id_empleado'> = { ...emptyEmployee, ...values };
        onSubmit(newEmployee);
    };

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                placeholder: 'Ingrese el nombre',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'apellido',
                label: 'Apellido',
                type: 'text',
                placeholder: 'Ingrese el apellido',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'fecha_incorporacion',
                label: 'Fecha Incorporacion',
                type: 'date',
                placeholder: 'Seleccione una fecha',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'departamento',
                label: 'Departamento',
                type: 'text',
                placeholder: 'Ingrese el departamento',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'puesto',
                label: 'Puesto',
                type: 'text',
                placeholder: 'Ingrese el puesto',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'sueldo',
                label: 'Sueldo',
                type: 'number',
                placeholder: 'Ingrese el sueldo',
                variant: 'default',
                inputSize: 'md',
            },
        ],
        []
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Añadir un nuevo empleado' containerClassName='max-w-3xl'>
            <Form
                fields={fields}
                data={emptyEmployee}
                onSubmit={handleSubmit}
                submitIcon={<FaRegSave size={17} />}
                submitLabel='Guardar empleado'
                variant='add'
                direction='end'
                columns={2}
            />
        </Modal>
    );
};

export default NewEmployee;
