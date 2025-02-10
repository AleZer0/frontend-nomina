import React, { useState, useEffect } from 'react';
import Button from '../Button';

// Definir el tipo de Employee aquí (si no está en un archivo compartido)
interface Employee {
    id_empleado: number;
    nombre: string;
    fecha_incorporacion: string;
    departamento: string;
    apellido: string;
    puesto: string;
    sueldo: number;
}

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (employee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, employee, onSave }) => {
    const [formData, setFormData] = useState<Employee>({
        id_empleado: 0,
        nombre: '',
        apellido: '',
        fecha_incorporacion: '',
        departamento: '',
        puesto: '',
        sueldo: 0,
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md'>
            <div className='w-96 rounded-2xl bg-white p-6 shadow-lg'>
                <h2 className='mb-4 text-lg font-semibold'>Editar Empleado</h2>
                <input
                    type='text'
                    name='nombre'
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder='Nombre'
                    className='mb-2 w-full border p-2'
                />
                <input
                    type='text'
                    name='apellido'
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder='Apellido'
                    className='mb-2 w-full border p-2'
                />
                <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
                <input
                    type='date'
                    name='fecha_incorporacion'
                    value={formData.fecha_incorporacion}
                    onChange={handleChange}
                    placeholder='Fecha de incorporación'
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Departamento:</label>
                <input
                    type='text'
                    name='departamento'
                    value={formData.departamento}
                    onChange={handleChange}
                    placeholder='Departamento'
                    className='mb-4 w-full rounded-lg border p-2'
                />
                <input
                    type='text'
                    name='puesto'
                    value={formData.puesto}
                    onChange={handleChange}
                    placeholder='Puesto'
                    className='mb-2 w-full border p-2'
                />
                <input
                    type='number'
                    name='sueldo'
                    value={formData.sueldo}
                    onChange={handleChange}
                    placeholder='Sueldo'
                    className='mb-4 w-full border p-2'
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
