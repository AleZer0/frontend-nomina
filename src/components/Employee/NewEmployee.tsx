import { useMemo } from 'react';

import { AiOutlineUserAdd } from 'react-icons/ai';

import Modal from '../Modal';
import Form from '../Form';

import { EmployeeInterface } from '../../types/entities';
import { FormField } from '../../types/extras';
import { useGlobalContext } from '../../context/GlobalContext';

interface CreateEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => void;
}

const NewEmployee: React.FC<CreateEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { loading } = useGlobalContext();

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
        onClose();
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
                submitIcon={<AiOutlineUserAdd size={17} />}
                submitLabel='Registrar empleado'
                variant='save'
                direction='end'
                columns={2}
                loadingButton={loading['addEmployee']}
                labelLoadingButton='Registrando empleado...'
            />
        </Modal>
    );
};

export default NewEmployee;
