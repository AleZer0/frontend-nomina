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
    nombre: '',
    apellido: '',
    fecha_incorporacion: '',
    departamento: '',
    puesto: '',
    sueldo: 0,
    nomina: [],
};

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id_empleado'>>(emptyEmployee);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setNewEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
        }));
    };

    const handleSubmit = () => {
        if (!newEmployee.nombre || !newEmployee.apellido || !newEmployee.puesto) {
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
            sueldo: newEmployee.sueldo ?? 0, // 🔹 Asegura que sueldo nunca sea undefined
            nomina: newEmployee.nomina,
        });

        setNewEmployee(emptyEmployee);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={true}
            onClose={() => {
                onClose();
                setNewEmployee(emptyEmployee);
            }}
            title='Añadir un nuevo empleado'>
            <label className='mb-2 block text-gray-700'>Nombre:</label>
            <input
                type='text'
                name='nombre'
                value={newEmployee.nombre}
                onChange={handleChange}
                placeholder='Ingrese el nombre'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Apellido:</label>
            <input
                type='text'
                name='apellido'
                value={newEmployee.apellido}
                onChange={handleChange}
                placeholder='Ingrese el apellido(s)'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
            <input
                type='date'
                name='fecha_incorporacion'
                value={newEmployee.fecha_incorporacion}
                onChange={handleChange}
                placeholder='Ingrese la fecha de incorporación'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Departamento:</label>
            <input
                type='text'
                name='departamento'
                value={newEmployee.departamento}
                onChange={handleChange}
                placeholder='Ingrese el departamento'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Puesto:</label>
            <input
                type='text'
                name='puesto'
                value={newEmployee.puesto}
                onChange={handleChange}
                placeholder='Ingrese el puesto'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Sueldo:</label>
            <input
                type='number'
                name='sueldo'
                value={newEmployee.sueldo || ''}
                onChange={handleChange}
                placeholder='Ingrese el sueldo'
                className='mb-4 w-full rounded-lg border p-2'
            />

            <div className='flex justify-end gap-2'>
                <Button
                    onClick={handleSubmit}
                    disabled={false}
                    design='rounded-2xl bg-green-500 hover:bg-green-600 text-white cursor-pointer'>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreateEmployeeModal;
