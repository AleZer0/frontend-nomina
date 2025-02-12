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

    // refs para el DropdownMenu (si lo necesitas)
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        (async () => {
            const data = await Empleado.getEmployees(1);
            setEmployees(data.empleados || []);
        })();
    }, []);

    // Agregar un nuevo empleado
    const handleAddEmployee = (newEmployee: Employee) => {
        Empleado.createEmployee(newEmployee).then(() => {
            Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []));
        });
        setIsModalOpen(false);
    };

    // Guardar cambios en la edición del empleado
    const handleSaveEdit = (updatedEmployee: Employee) => {
        Empleado.updateEmployee(updatedEmployee.id_empleado, updatedEmployee).then(() =>
            Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []))
        );
        setIsEditModalOpen(false);
    };

    // Abrir el modal de edición con los datos actuales del empleado
    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsEditModalOpen(true);
    };

    // Manejar la eliminación de un empleado
    const handleDelete = (id_empleado: number) => {
        Empleado.deleteEmployee(id_empleado).then(() => {
            Empleado.getEmployees(1).then(data => setEmployees(data.empleados || []));
        });
    };

    // Enviar datos para crear una nómina
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

    // Cuando se hace clic en "Generar Nómina"
    const handleGenerateNomina = (employee: Employee) => {
        setIsModalPayrollOpen(true);
        setEmpleadoSeleccionado(employee);
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
                <TableData
                    fields={['Nombre', 'Apellidos', 'Puesto', 'Sueldo', 'Última Nómina', 'Acciones']}
                    data={employees}
                    onGenerateNomina={handleGenerateNomina}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    buttonRefs={buttonRefs}
                />
            </main>

            {/* MODALES */}
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
        </div>
    );
};

export default Employees;
