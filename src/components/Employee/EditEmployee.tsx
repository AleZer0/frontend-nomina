import React, { useMemo } from 'react';
import { FaUserEdit } from 'react-icons/fa';

import Modal from '../Modal';
import Form from '../Form';

import { EmployeeInterface } from '../../types/entities';
import { FormField } from '../../types/extras';
import { useGlobalContext } from '../../context/GlobalContext';

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id_empleado: number, updatedEmployee: Partial<EmployeeInterface>) => void;
}

const EditEmployee: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { selectedEntities, loading } = useGlobalContext();

    const handleSubmit = (values: Partial<EmployeeInterface>) => {
        let newValues = { ...values };

        if (!values.nombre && !selectedEntities.selectedEmployee?.nombre) {
            alert('El campo Nombre es obligatorio.');
            return;
        }
        if (!values.apellido && !selectedEntities.selectedEmployee?.apellido) {
            alert('El campo Apellido es obligatorio.');
            return;
        }
        if (!values.puesto && !selectedEntities.selectedEmployee?.puesto) {
            alert('El campo Puesto es obligatorio.');
            return;
        }
        if (!values.sueldo && !selectedEntities.selectedEmployee?.sueldo) {
            newValues = { ...values, sueldo: 0 };
        }

        const updatedEmployee: Partial<EmployeeInterface> = {
            ...selectedEntities.selectedEmployee,
            ...newValues,
        };

        onSubmit(selectedEntities.selectedEmployee?.id_empleado ?? 0, updatedEmployee);
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
        <Modal isOpen={isOpen} onClose={onClose} title='Editar Empleado' containerClassName='max-w-3xl' zIndex={60}>
            <Form
                fields={fields}
                data={
                    selectedEntities.selectedEmployee ?? {
                        nombre: '',
                        apellido: '',
                        fecha_incorporacion: '',
                        departamento: '',
                        puesto: '',
                        sueldo: 0,
                    }
                }
                onSubmit={handleSubmit}
                submitIcon={<FaUserEdit size={17} />}
                submitLabel='Guardar cambios'
                variant='edit'
                direction='end'
                columns={2}
                loadingButton={loading['updateEmployee']}
                labelLoadingButton='Guardando cambios...'
            />
        </Modal>
    );
};

export default EditEmployee;
