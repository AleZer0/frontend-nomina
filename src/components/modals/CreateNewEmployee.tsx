import { useState } from 'react';
import Button from '../Button';
import { Employee } from '../../pages/Employees';
import Modal from '../Modal';

interface CreateEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newEmployee: Employee) => void;
}

export const emptyEmployee = {
    id_empleado: 0,
    nombre: '',
    apellido: '',
    fecha_incorporacion: '',
    departamento: '',
    puesto: '',
    sueldo: 0,
};

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [newEmployee, setNewEmployee] = useState({
        nombre: '',
        apellido: '',
        fecha_incorporacion: '',
        departamento: '',
        puesto: '',
        sueldo: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!newEmployee.nombre || !newEmployee.apellido || !newEmployee.puesto || !newEmployee.sueldo) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        onSubmit({
            id_empleado: 0,
            nombre: newEmployee.nombre,
            apellido: newEmployee.apellido,
            fecha_incorporacion: newEmployee.fecha_incorporacion,
            departamento: newEmployee.departamento,
            puesto: newEmployee.puesto,
            sueldo: parseFloat(newEmployee.sueldo),
        });
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Añadir un nuevo empleado'>
            <label className='mb-2 block text-gray-700'>Nombre:</label>
            <input
                type='text'
                name='nombre'
                value={newEmployee.nombre}
                onChange={handleChange}
                placeholder='Nombre'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Apellido:</label>
            <input
                type='text'
                name='apellido'
                value={newEmployee.apellido}
                onChange={handleChange}
                placeholder='Apellido'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
            <input
                type='date'
                name='fecha_incorporacion'
                value={newEmployee.fecha_incorporacion}
                onChange={handleChange}
                placeholder='Fecha de incorporación'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Departamento:</label>
            <input
                type='text'
                name='departamento'
                value={newEmployee.departamento}
                onChange={handleChange}
                placeholder='Departamento'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Puesto:</label>
            <input
                type='text'
                name='puesto'
                value={newEmployee.puesto}
                onChange={handleChange}
                placeholder='Puesto'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Sueldo:</label>
            <input
                type='number'
                name='sueldo'
                value={newEmployee.sueldo}
                onChange={handleChange}
                placeholder='Sueldo'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <div className='flex justify-end gap-2'>
                <Button
                    onClick={onClose}
                    disabled={false}
                    design='rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer'>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={false}
                    design='rounded bg-green-500 hover:bg-green-600 text-white cursor-pointer'>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreateEmployeeModal;
