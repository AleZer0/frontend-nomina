import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Empleado from '../services/employees.service';
import Button from '../components/Button';
import { createPayroll } from '../services/payroll.service';
import CreateEmployeeModal from '../components/modals/CreateNewEmployee';
import EditEmployeeModal from '../components/modals/EditEmployee';
import { HiDocumentPlus } from 'react-icons/hi2';
import { IoIosPersonAdd } from 'react-icons/io';
import CreatePayrollModal from '../components/modals/CreateNewPayrroll';
import TableData from '../components/TableData';
import Loader from '../components/Loader';
import ViewEmployeeModal from '../components/modals/ViewEmployee';

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
    nomina: number | Array<any>;
}

const Employees: React.FC = () => {
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Employee | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPayrollOpen, setIsModalPayrollOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await Empleado.getEmployees(1);
                setEmployees(data.empleados || []);
            } catch (error) {
                console.error('Error al obtener empleados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
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

    // Abre el modal de vista (Detalles)
    const handleViewEmployee = (employee: Employee) => {
        setEmpleadoSeleccionado(employee);
        setIsViewModalOpen(true);
    };

    // Al hacer clic en "Editar" desde el modal
    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsEditModalOpen(true);
    };

    // Al hacer clic en "Eliminar" desde el modal
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
                                <Link to='/payroll' className='text-blue-600 underline'>
                                    {`NOM${item.nomina.toString().padStart(4, '0') || 'No tienen nominas'}`}
                                </Link>
                            </div>
                            <div className='flex justify-center gap-2'>
                                <Button
                                    onClick={() => {
                                        setEmpleadoSeleccionado(item);
                                        setIsModalPayrollOpen(true);
                                    }}
                                    design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                    <span className='relative pt-0.5'>
                                        <HiDocumentPlus size={17} />
                                    </span>
                                    Generar Nómina
                                </Button>
                                <Button
                                    design='cursor-pointer rounded bg-blue-500 border-blue-700 text-white hover:bg-blue-700'
                                    onClick={() => handleViewEmployee(item)}>
                                    Detalles
                                </Button>
                            </div>
                        </>
                    )}
                />

                {/* MODALES */}
                <ViewEmployeeModal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    employee={empleadoSeleccionado}
                    onEdit={handleEdit} // Agregamos callbacks
                    onDelete={handleDelete}
                />

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
                    empleadoSeleccionado={empleadoSeleccionado}
                />

                <EditEmployeeModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    employee={editingEmployee}
                    onSave={handleSaveEdit}
                />
            </main>
        </div>
    );
};

export default Employees;
