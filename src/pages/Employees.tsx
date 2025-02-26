import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosPersonAdd } from 'react-icons/io';
import { CgDetailsMore } from 'react-icons/cg';

import Header from '../components/Header';
import Button from '../components/Button';
import TableData from '../components/TableData';
import Loader from '../components/Loader';

import EmployeeServices from '../services/employees.service';
import PayrollServices from '../services/payroll.service';

import CreateEmployeeModal from '../components/modals/CreateNewEmployee';
import EditEmployeeModal from '../components/modals/EditEmployee';
import CreatePayrollModal from '../components/modals/CreateNewPayrroll';
import ViewEmployeeModal from '../components/modals/ViewEmployee';

import { EmployeeInterface, PayrollInterface } from '../types';

const Employees: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInterface | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPayrollOpen, setIsModalPayrollOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<EmployeeInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await EmployeeServices.getEmployees(1);
                setEmployees(data || []);
            } catch (error) {
                console.error('Error al obtener empleados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleAddEmployee = (newEmployee: EmployeeInterface) => {
        EmployeeServices.createEmployee(newEmployee).then(() => {
            EmployeeServices.getEmployees(1).then(data => setEmployees(data.empleados || []));
        });
        setIsModalOpen(false);
    };

    const handleSaveEdit = (updatedEmployee: EmployeeInterface) => {
        EmployeeServices.updateEmployee(updatedEmployee.id_empleado, updatedEmployee).then(() =>
            EmployeeServices.getEmployees(1).then(data => setEmployees(data.empleados || []))
        );
        setIsEditModalOpen(false);
    };

    // Abre el modal de vista (Detalles)
    const handleViewEmployee = (employee: EmployeeInterface) => {
        setSelectedEmployee(employee);
        setIsViewModalOpen(true);
    };

    // Al hacer clic en generar PDF
    const handleCreatePayroll = (employee: EmployeeInterface) => {
        setSelectedEmployee(employee);
        setIsModalPayrollOpen(true);
    };

    // Al hacer clic en "Editar" desde el modal
    const handleEdit = (employee: EmployeeInterface) => {
        setEditingEmployee(employee);
        setIsEditModalOpen(true);
    };

    // Al hacer clic en "Eliminar" desde el modal
    const handleDelete = (id_empleado: number) => {
        EmployeeServices.deleteEmployee(id_empleado).then(() => {
            EmployeeServices.getEmployees(1).then(data => setEmployees(data.empleados || []));
        });
    };

    const handleSubmitPayroll = (newNomina: Omit<PayrollInterface, 'folio'>) => {
        PayrollServices.createPayroll(newNomina)
            .then(response => {
                if (!response && !response.nomina) {
                    alert('Error al crear la nómina.');
                }
                setIsModalPayrollOpen(false);
            })
            .catch(() => alert('Error al crear la nómina.'));
    };

    return (
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de Empleados'>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    disabled={false}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 rounded-2xl cursor-pointer text-black'
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
                    fields={['No. Empleado', 'Nombre', 'Apellidos', 'Puesto', 'Sueldo', 'Última Nómina', 'Acciones']}
                    data={employees}
                    renderRow={item => (
                        <>
                            <div>{item.id_empleado}</div>
                            <div>{item.nombre}</div>
                            <div>{item.apellido}</div>
                            <div>{item.puesto}</div>
                            <div className='font-semibold text-green-600'>
                                {item.sueldo ? `$${item.sueldo.toFixed(2)}` : 'No definido'}
                            </div>
                            <div>
                                {'Folio: '}
                                <Link to='/payroll' className='text-blue-600 underline'>
                                    {item.ultima_nomina ? `NOM${item.ultima_nomina}` : 'No tiene nominas'}
                                </Link>
                            </div>
                            <div className='flex justify-center gap-2'>
                                <Button
                                    design='cursor-pointer rounded-2xl bg-blue-500 border-blue-700 text-white hover:bg-blue-700'
                                    onClick={() => handleViewEmployee(item)}>
                                    <span className='relative pt-1'>
                                        <CgDetailsMore size={17} />
                                    </span>
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
                    employee={selectedEmployee}
                    onCreatePayroll={handleCreatePayroll}
                    onEdit={handleEdit}
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
                    empleadoSeleccionado={selectedEmployee}
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
