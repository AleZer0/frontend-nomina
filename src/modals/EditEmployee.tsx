import React, { useMemo } from 'react';
import { FaRegSave } from 'react-icons/fa';

import Modal from '../components/Modal';
import Form from '../components/Form';

import { EmployeeInterface } from '../types';
import { FormField } from '../types/extras';

interface EditEmployeeModalProps {
    isOpen: boolean;
    employee: Partial<EmployeeInterface> | null;
    onClose: () => void;
    onSubmit: (updatedEmployee: Partial<EmployeeInterface>) => void;
}

const EditEmployee: React.FC<EditEmployeeModalProps> = ({ isOpen, employee, onClose, onSubmit }) => {
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
        [employee]
    );

    const handleSubmit = (values: Partial<EmployeeInterface>) => {
        if (!values.nombre && !employee?.nombre) {
            alert('El campo Nombre es obligatorio.');
            return;
        }
        if (!values.apellido && !employee?.apellido) {
            alert('El campo Apellido es obligatorio.');
            return;
        }
        if (!values.puesto && !employee?.puesto) {
            alert('El campo Puesto es obligatorio.');
            return;
        }

        const updatedEmployee: Partial<EmployeeInterface> = {
            id_empleado: employee?.id_empleado ?? 0,
            ...employee,
            ...values,
        };

        onSubmit(updatedEmployee);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Editar Empleado'>
            <Form
                fields={fields}
                data={
                    employee ?? {
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
