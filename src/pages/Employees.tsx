import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employees.service';
import DropdownMenu from '../components/DropdownMenu';

interface Employee {
    id_empleado: number;
    nombre: string;
    apellido: string;
    puesto: string;
    sueldo: number;
}

const Employees: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ nombre: '', apellido: '', puesto: '', sueldo: '' });

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]); // ✅ Se usa un ref global para los botones

    useEffect(() => {
        (async () => {
            const data = await getEmployees(1);
            setEmployees(data.empleados);
        })();
    }, []);

    // Función para manejar cambios en los inputs del modal
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    // Función para crear un nuevo empleado
    const handleSubmit = () => {
        if (!newEmployee.nombre || !newEmployee.apellido || !newEmployee.puesto || !newEmployee.sueldo) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        createEmployee({
            nombre: newEmployee.nombre,
            apellido: newEmployee.apellido,
            puesto: newEmployee.puesto,
            sueldo: parseFloat(newEmployee.sueldo),
        }).then(() => {
            getEmployees(1).then(data => setEmployees(data.empleados));
        });

        setIsModalOpen(false);
    };

    return (
        <div className='ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de Empleados' />
            <main className='p-6'>
                <button onClick={() => setIsModalOpen(true)} className='mb-4 rounded bg-green-500 px-3 py-2 text-white'>
                    ➕ Nuevo empleado
                </button>

                <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
                    <div className='grid grid-cols-6 bg-gray-200 p-3 text-center font-semibold text-gray-700'>
                        <div>Nombre</div>
                        <div>Apellidos</div>
                        <div>Puesto</div>
                        <div>Sueldo</div>
                        <div>Última Nómina</div>
                        <div>Opciones</div>
                    </div>

                    <div className='divide-y divide-gray-300'>
                        {employees.map((item, index) => {
                            const handleEdit = () => {
                                updateEmployee(item.id_empleado, {
                                    nombre: item.nombre,
                                    apellido: item.apellido,
                                    puesto: item.puesto,
                                    sueldo: item.sueldo,
                                }).then(() => {
                                    getEmployees(1).then(data => setEmployees(data.empleados));
                                });
                            };

                            const handleDelete = () => {
                                deleteEmployee(item.id_empleado).then(() => {
                                    getEmployees(1).then(data => setEmployees(data.empleados));
                                });
                            };

                            return (
                                <div
                                    key={item.id_empleado}
                                    className='grid grid-cols-6 items-center p-3 text-center text-gray-800 odd:bg-gray-50'>
                                    <div>{item.nombre}</div>
                                    <div>{item.apellido}</div>
                                    <div>{item.puesto}</div>
                                    <div>${item.sueldo.toFixed(2)}</div>
                                    <div>
                                        Folio:
                                        <Link to='/payroll' className='text-blue-600 underline'>
                                            {' N/A'}
                                        </Link>
                                    </div>
                                    <div className='flex justify-center gap-2'>
                                        <button
                                            onClick={() => console.log('Generar nómina')}
                                            className='rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600'>
                                            Generar Nómina
                                        </button>
                                        <DropdownMenu
                                            buttonRef={el => (buttonRefs.current[index] = el)}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* MODAL */}
            {isModalOpen && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md'>
                    <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
                        <h2 className='mb-4 text-lg font-semibold'>Añadir Nuevo Empleado</h2>

                        {/* Campos del modal */}
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

                        {/* Botones de acción */}
                        <div className='flex justify-end gap-2'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500'>
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
