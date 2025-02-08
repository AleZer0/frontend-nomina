import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Empleado from '../services/employees.service';
import DropdownMenu from '../components/DropdownMenu';
import Button from '../components/Button';
import { createPayroll } from '../services/payroll.service';
import CreateEmployeeModal from '../components/modals/CreateNewEmployee';
import { HiDocumentPlus } from 'react-icons/hi2';

import { IoIosPersonAdd } from 'react-icons/io';
import CreatePayrollModal from '../components/modals/CreateNewPayrroll';

interface Employee {
    id_empleado: number;
    nombre: string;
    apellido: string;
    puesto: string;
    sueldo: number;
}

const Employees: React.FC = () => {
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(0);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPayrollOpen, setIsModalPayrollOpen] = useState(false);

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        (async () => {
            const data = await Empleado.getEmployees(1);
            setEmployees(data.empleados || []);
        })();
    }, []);

    const handleAddEmployee = (newEmployee: { nombre: string; apellido: string; puesto: string; sueldo: number }) => {
        Empleado.createEmployee(newEmployee).then(() => {
            Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []));
        });
        setIsModalOpen(false);
    };

    const handleSubmitPayroll = (newNomina: any) => {
        createPayroll(newNomina)
            .then(response => {
                if (response && response.data && response.data.nomina) {
                    alert('Nómina creada correctamente.');
                    setIsModalOpen(false);
                } else {
                    alert('Error al crear la nómina.');
                }
            })
            .catch(() => alert('Error al crear la nómina.'));
    };

    return (
        <div className='ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de Empleados'>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    disabled={false}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 rounded cursor-pointer text-black'
                    icon={null}>
                    <span className='relative pt-1'>
                        <IoIosPersonAdd size={17} />
                    </span>
                    Nuevo empleado
                </Button>
            </Header>
            <main className='p-6'>
                <div className='rounded-lg shadow-lg'>
                    <div className='grid grid-cols-6 bg-gray-200 p-3 text-center font-semibold text-gray-700'>
                        <div>Nombre</div>
                        <div>Apellidos</div>
                        <div>Puesto</div>
                        <div>Sueldo</div>
                        <div>Última Nómina</div>
                        <div>Acciones</div>
                    </div>

                    <div className='divide-y divide-gray-300'>
                        {employees.map((item, index) => {
                            const handleEdit = () => {
                                Empleado.updateEmployee(item.id_empleado, {
                                    nombre: item.nombre,
                                    apellido: item.apellido,
                                    puesto: item.puesto,
                                    sueldo: item.sueldo,
                                }).then(() => {
                                    Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []));
                                });
                            };

                            const handleDelete = () => {
                                Empleado.deleteEmployee(item.id_empleado).then(() => {
                                    Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []));
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
                                        <Button
                                            onClick={() => {
                                                setIsModalPayrollOpen(true);
                                                setEmpleadoSeleccionado(item.id_empleado);
                                            }}
                                            design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                            <span className='relative pt-0.5'>
                                                <HiDocumentPlus size={17} />
                                            </span>
                                            Generar Nómina
                                        </Button>
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
            <CreateEmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddEmployee}
            />
            <CreatePayrollModal
                empleados={employees}
                isOpen={isModalPayrollOpen}
                onClose={() => setIsModalPayrollOpen(false)}
                onSubmit={handleSubmitPayroll}
                defaultEmpleado={empleadoSeleccionado}
            />
        </div>
    );
};

export default Employees;
