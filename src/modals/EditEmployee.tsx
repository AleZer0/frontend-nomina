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
    onSubmit: (updatedEmployee: Partial<EmployeeInterface>) => void;
}

const EditEmployee: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { selectedEmployee } = useGlobalContext();

    const fields: FormField[] = useMemo(
        () => [
            { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre', required: true },
            { name: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Ingrese el apellido', required: true },
            {
                name: 'fecha_incorporacion',
                label: 'Fecha Incorporación',
                type: 'date',
                placeholder: 'Seleccione una fecha',
            },
            { name: 'departamento', label: 'Departamento', type: 'text', placeholder: 'Ingrese el departamento' },
            { name: 'puesto', label: 'Puesto', type: 'text', placeholder: 'Ingrese el puesto', required: true },
            { name: 'sueldo', label: 'Sueldo', type: 'number', placeholder: 'Ingrese el sueldo' },
        ],
        [selectedEmployee]
    );

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
            id_empleado: selectedEmployee?.id_empleado ?? 0,
            ...selectedEmployee,
            ...values,
        };

        onSubmit(updatedEmployee);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='Editar Empleado'
            closeOnOverlayClick={true}
            containerClassName='max-w-3xl'
            zIndex={60}>
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
                submitLabel='Guardar empleado'
                variant='add'
                direction='end'
                columns={2}
            />
        </Modal>
    );
};

export default EditEmployee;
