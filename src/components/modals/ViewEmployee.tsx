import React, { useState, useEffect } from 'react';
import { Employee } from '../../pages/Employees';
import { emptyEmployee } from './CreateNewEmployee';
import Modal from '../Modal';
import Button from '../Button';

interface ViewEmployeeProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onEdit: (employee: Employee) => void;
    onDelete: (id_empleado: number) => void;
}

const ViewEmployee: React.FC<ViewEmployeeProps> = ({ isOpen, onClose, employee, onEdit, onDelete }) => {
    const [formData, setFormData] = useState<Employee>(emptyEmployee);

    useEffect(() => {
        if (employee) {
            setFormData({
                ...employee,
                fecha_incorporacion: employee.fecha_incorporacion
                    ? new Date(employee.fecha_incorporacion).toISOString().split('T')[0]
                    : '',
            });
        }
    }, [employee]);

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles del Empleado' className='size-40'>
            <label className='mb-2 block text-gray-700'>Nombre:</label>
            <input
                type='text'
                name='nombre'
                value={formData.nombre}
                readOnly
                className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
            />

            <label className='mb-2 block text-gray-700'>Apellido:</label>
            <input
                type='text'
                name='apellido'
                value={formData.apellido}
                readOnly
                className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
            />

            <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
            <input
                type='date'
                name='fecha_incorporacion'
                value={formData.fecha_incorporacion}
                readOnly
                className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
            />

            <label className='mb-2 block text-gray-700'>Departamento:</label>
            <input
                type='text'
                name='departamento'
                value={formData.departamento}
                readOnly
                className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
            />

            <label className='mb-2 block text-gray-700'>Puesto:</label>
            <input
                type='text'
                name='puesto'
                value={formData.puesto}
                readOnly
                className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
            />

            <label className='mb-2 block text-gray-700'>Sueldo:</label>
            <input
                type='number'
                name='sueldo'
                value={formData.sueldo}
                readOnly
                className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
            />
            <div className='flex justify-end gap-2'>
                <Button
                    onClick={() => {
                        if (!employee) return;
                        onEdit(employee); // Llamamos callback para editar
                        onClose(); // Cerramos este modal
                    }}
                    design='rounded-2xl cursor-pointer bg-blue-500 text-white hover:bg-blue-600'>
                    Editar
                </Button>

                <Button
                    onClick={() => {
                        if (!employee) return;
                        onDelete(employee.id_empleado); // Llamamos callback para eliminar
                        onClose();
                    }}
                    design='rounded-2xl cursor-pointer bg-red-500 text-white hover:bg-red-600'>
                    Eliminar
                </Button>
            </div>
        </Modal>
    );
};

export default ViewEmployee;
