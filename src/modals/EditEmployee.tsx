import React, { useMemo } from 'react';
import { FaRegSave } from 'react-icons/fa';

import Modal from '../components/Modal';
import Form from '../components/Form';

import { EmployeeInterface } from '../types';
import { FormField } from '../types/extras';
import { useGlobalContext } from '../context/GlobalContext';

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id_empleado: number, updatedEmployee: Partial<EmployeeInterface>) => void;
}

const EditEmployee: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { selectedEmployee } = useGlobalContext();

    const handleSubmit = (values: Partial<EmployeeInterface>) => {
        if (!values.nombre && !selectedEmployee?.nombre) {
            alert('El campo Nombre es obligatorio.');
            return;
        }
        if (!values.apellido && !selectedEmployee?.apellido) {
            alert('El campo Apellido es obligatorio.');
            return;
        }
        if (!values.puesto && !selectedEmployee?.puesto) {
            alert('El campo Puesto es obligatorio.');
            return;
        }

        const updatedEmployee: Partial<EmployeeInterface> = {
            ...selectedEmployee,
            ...values,
        };

        onSubmit(selectedEmployee?.id_empleado ?? 0, updatedEmployee);
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
        <Modal isOpen={isOpen} onClose={onClose} title='Editar Empleado' containerClassName='max-w-3xl' zIndex={60}>
            <Form
                fields={fields}
                data={
                    selectedEmployee ?? {
                        nombre: '',
                        apellido: '',
                        fecha_incorporacion: '',
                        departamento: '',
                        puesto: '',
                        sueldo: 0,
                    }
                }
                onSubmit={handleSubmit}
                submitIcon={<FaRegSave size={17} />}
                submitLabel='Guardar cambios'
                variant='add'
                direction='end'
                columns={2}
                loadingKey={'updateEmployee'}
            />
        </Modal>
    );
};

export default EditEmployee;
