import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { FaRegSave } from 'react-icons/fa';
import { Employee } from '../../types';

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (employee: Employee) => void;
}

const emptyEmployee = {
    id_empleado: 0,
    nombre: '',
    apellido: '',
    fecha_incorporacion: '',
    departamento: '',
    puesto: '',
    sueldo: 0,
    nomina: [],
};

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
        setFormData({
            id_empleado: 0,
            nombre: formData.nombre,
            apellido: formData.apellido,
            fecha_incorporacion: formData.fecha_incorporacion,
            departamento: formData.departamento,
            puesto: formData.puesto,
            sueldo: formData.sueldo ?? 0,
            nomina: formData.nomina,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Editar Empleado'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                    <label className='mb-2 block text-gray-700'>Nombre:</label>
                    <input
                        type='text'
                        name='nombre'
                        value={formData.nombre}
                        onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder='Ingrese el nombre'
                        className='mb-4 w-full rounded-lg border p-2'
                    />
                </div>
                <div>
                    <label className='mb-2 block text-gray-700'>Apellido:</label>
                    <input
                        type='text'
                        name='apellido'
                        value={formData.apellido}
                        onChange={e => setFormData({ ...formData, apellido: e.target.value })}
                        placeholder='Ingrese el apellido'
                        className='mb-4 w-full rounded-lg border p-2'
                    />
                </div>

                <div>
                    <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
                    <input
                        type='date'
                        name='fecha_incorporacion'
                        value={formData.fecha_incorporacion}
                        onChange={e => setFormData({ ...formData, fecha_incorporacion: e.target.value })}
                        placeholder='Ingrese la echa de incorporación'
                        className='mb-4 w-full rounded-lg border p-2'
                    />
                </div>

                <div>
                    <label className='mb-2 block text-gray-700'>Departamento:</label>
                    <input
                        type='text'
                        name='departamento'
                        value={formData.departamento}
                        onChange={e => setFormData({ ...formData, departamento: e.target.value })}
                        placeholder='Ingrese el departamento'
                        className='mb-4 w-full rounded-lg border p-2'
                    />
                </div>

                <div>
                    <label className='mb-2 block text-gray-700'>Puesto:</label>
                    <input
                        type='text'
                        name='puesto'
                        value={formData.puesto}
                        onChange={e => setFormData({ ...formData, puesto: e.target.value })}
                        placeholder='Ingrese el puesto'
                        className='mb-4 w-full rounded-lg border p-2'
                    />
                </div>

                <div>
                    <label className='mb-2 block text-gray-700'>Sueldo:</label>
                    <input
                        type='number'
                        name='sueldo'
                        value={formData.sueldo || ''}
                        onChange={e =>
                            setFormData({ ...formData, sueldo: parseFloat(e.target.value ? e.target.value : '0') })
                        }
                        placeholder='Ingrese el sueldo'
                        className='mb-4 w-full rounded-lg border p-2'
                    />
                </div>
            </div>
            <div className='flex justify-end gap-2'>
                <Button
                    onClick={handleSubmit}
                    design='rounded cursor-pointer bg-green-500 text-white hover:bg-green-600'>
                    <span className='relative pt-1'>
                        <FaRegSave size={17} />
                    </span>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default EditEmployeeModal;
