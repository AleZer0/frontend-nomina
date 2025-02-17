import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Empleado from '../services/employees.service';
import DropdownMenu from '../components/DropdownMenu';
import Button from '../components/Button';
import { createPayroll } from '../services/payroll.service';
import CreateEmployeeModal from '../components/modals/CreateNewEmployee';
import EditEmployeeModal from '../components/modals/EditEmployee';
import { HiDocumentPlus } from 'react-icons/hi2';
import { IoIosPersonAdd } from 'react-icons/io';
import CreatePayrollModal from '../components/modals/CreateNewPayrroll';
import TableData from '../components/TableData';
import Loader from '../components/Loader';

export interface Employee {
    id_empleado: number;
    nombre: string;
    apellido: string;
    fecha_incorporacion: string;
    departamento: string;
    puesto: string;
    sueldo: number;
    created_at?: string;
    updated_at?: string;
    estado?: number;
}

const Employees: React.FC = () => {
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Employee>();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPayrollOpen, setIsModalPayrollOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        (async () => {
            const data = await Empleado.getEmployees(1);
            setEmployees(data.empleados || []);
            setLoading(false);
        })();
    }, []);

    const handleAddEmployee = (newEmployee: Employee) => {
        Empleado.createEmployee(newEmployee).then(() => {
            Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []));
        });
        setIsModalOpen(false);
    };

    const handleSaveEdit = (updatedEmployee: Employee) => {
        Empleado.updateEmployee(updatedEmployee.id_empleado, updatedEmployee).then(() =>
            Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []))
        );
        setIsEditModalOpen(false);
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id_empleado: number) => {
        Empleado.deleteEmployee(id_empleado).then(() => {
            Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []));
        });
    };

    const handleSubmitPayroll = (newNomina: {
        fecha: string;
        dias_trabajados: number;
        prestamos: number;
        infonavit: number;
        sueldo: number;
        id_empleado: number;
    }) => {
        createPayroll(newNomina)
            .then(response => {
                if (response && response.nomina) {
                    alert('Nómina creada correctamente.');
                    setIsModalPayrollOpen(false);
                } else {
                    alert('Error al crear la nómina.');
                }
            })
            .catch(() => alert('Error al crear la nómina.'));
    };

    return (
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
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

            <main className='overflow-visible p-6'>
                {loading && <Loader />}
                <TableData
                    fields={['Nombre', 'Apellidos', 'Puesto', 'Sueldo', 'Última Nómina', 'Acciones']}
                    data={employees}
                    renderRow={(item, index) => (
                        <>
                            <div>{item.nombre}</div>
                            <div>{item.apellido}</div>
                            <div>{item.puesto}</div>
                            <div className='font-semibold text-green-600'>${item.sueldo.toFixed(2)}</div>
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
                                        setEmpleadoSeleccionado(item);
                                    }}
                                    design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                    <span className='relative pt-0.5'>
                                        <HiDocumentPlus size={17} />
                                    </span>
                                    Generar Nómina
                                </Button>
                                <DropdownMenu
                                    buttonRef={el => (buttonRefs.current[index] = el)}
                                    onDelete={() => handleDelete(item.id_empleado)}
                                    onEdit={() => handleEdit(item)}
                                />
                            </div>
                        </>
                    )}
                />
                <CreateEmployeeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddEmployee}
                />
            </main>
            <CreatePayrollModal
                empleados={employees}
                isOpen={isModalPayrollOpen}
                onClose={() => setIsModalPayrollOpen(false)}
                onSubmit={handleSubmitPayroll}
                empleadoSeleccionado={empleadoSeleccionado}
            />
            <EditEmployeeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                employee={editingEmployee}
                onSave={handleSaveEdit}
            />
        </div>
    );
};

export default Employees;
