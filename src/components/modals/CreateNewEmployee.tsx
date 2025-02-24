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
            sueldo: newEmployee.sueldo ?? 0,
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
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {/* Nombre */}
                <div>
                    <label className='mb-2 block text-gray-700'>Nombre:</label>
                    <input
                        type='text'
                        name='nombre'
                        value={newEmployee.nombre}
                        onChange={handleChange}
                        placeholder='Ingrese el nombre'
                        className='w-full rounded-lg border p-2'
                    />
                </div>

                {/* Apellido */}
                <div>
                    <label className='mb-2 block text-gray-700'>Apellido:</label>
                    <input
                        type='text'
                        name='apellido'
                        value={newEmployee.apellido}
                        onChange={handleChange}
                        placeholder='Ingrese el apellido'
                        className='w-full rounded-lg border p-2'
                    />
                </div>

                {/* Fecha de Incorporación */}
                <div>
                    <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
                    <input
                        type='date'
                        name='fecha_incorporacion'
                        value={newEmployee.fecha_incorporacion}
                        onChange={handleChange}
                        placeholder='Ingrese la fecha de incorporación'
                        className='w-full rounded-lg border p-2'
                    />
                </div>

                {/* Departamento */}
                <div>
                    <label className='mb-2 block text-gray-700'>Departamento:</label>
                    <input
                        type='text'
                        name='departamento'
                        value={newEmployee.departamento}
                        onChange={handleChange}
                        placeholder='Ingrese el departamento'
                        className='w-full rounded-lg border p-2'
                    />
                </div>

                {/* Puesto */}
                <div>
                    <label className='mb-2 block text-gray-700'>Puesto:</label>
                    <input
                        type='text'
                        name='puesto'
                        value={newEmployee.puesto}
                        onChange={handleChange}
                        placeholder='Ingrese el puesto'
                        className='w-full rounded-lg border p-2'
                    />
                </div>

                {/* Sueldo */}
                <div>
                    <label className='mb-2 block text-gray-700'>Sueldo:</label>
                    <input
                        type='number'
                        name='sueldo'
                        value={newEmployee.sueldo || ''}
                        onChange={handleChange}
                        placeholder='Ingrese el sueldo'
                        className='w-full rounded-lg border p-2'
                    />
                </div>
            </div>

            {/* Botón de acción */}
            <div className='mt-6 flex justify-end'>
                <Button
                    onClick={handleSubmit}
                    disabled={false}
                    className='rounded-2xl bg-green-500 px-4 py-2 text-white hover:bg-green-600'>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreateEmployeeModal;
