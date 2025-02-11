import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { Employee } from '../../pages/Employees';
import { emptyEmployee } from './CreateNewEmployee';

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (employee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, employee, onSave }) => {
    const [formData, setFormData] = useState<Employee>(emptyEmployee);

    useEffect(() => {
        if (employee) {
            setFormData({
                ...employee,
                fecha_incorporacion: employee.fecha_incorporacion
                    ? new Date(employee.fecha_incorporacion).toISOString().split('T')[0] // Convertir a YYYY-MM-DD
                    : '',
            });
        }
    }, [employee]);

    const handleSubmit = () => {
        onSave(formData);
        setFormData(emptyEmployee);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md'>
            <div className='w-96 rounded-2xl bg-white p-6 shadow-lg'>
                <h2 className='mb-4 text-lg font-semibold'>Editar Empleado</h2>

                <label className='mb-2 block text-gray-700'>Nombre:</label>
                <input
                    type='text'
                    name='nombre'
                    value={formData.nombre}
                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder='Nombre'
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Apellido:</label>
                <input
                    type='text'
                    name='apellido'
                    value={formData.apellido}
                    onChange={e => setFormData({ ...formData, apellido: e.target.value })}
                    placeholder='Apellido'
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
                <input
                    type='date'
                    name='fecha_incorporacion'
                    value={formData.fecha_incorporacion}
                    onChange={e => setFormData({ ...formData, fecha_incorporacion: e.target.value })}
                    placeholder='Fecha de incorporación'
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Departamento:</label>
                <input
                    type='text'
                    name='departamento'
                    value={formData.departamento}
                    onChange={e => setFormData({ ...formData, departamento: e.target.value })}
                    placeholder='Departamento'
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Puesto:</label>
                <input
                    type='text'
                    name='puesto'
                    value={formData.puesto}
                    onChange={e => setFormData({ ...formData, puesto: e.target.value })}
                    placeholder='Puesto'
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Sueldo:</label>
                <input
                    type='number'
                    name='sueldo'
                    value={formData.sueldo}
                    onChange={e =>
                        setFormData({ ...formData, sueldo: parseFloat(e.target.value ? e.target.value : '0') })
                    }
                    placeholder='Sueldo'
                    className='mb-4 w-full rounded-lg border p-2'
                />
                <div className='flex justify-end gap-2'>
                    <Button onClick={onClose} design=' rounded cursor-pointer bg-red-500 text-white hover:bg-red-600'>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        design='rounded cursor-pointer bg-green-500 text-white hover:bg-green-600'>
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
