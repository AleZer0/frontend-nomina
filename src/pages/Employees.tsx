import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosPersonAdd } from 'react-icons/io';
import { CgDetailsMore } from 'react-icons/cg';

import Header from '../components/Header';
import Table from '../components/Table';
import Button from '../components/Button';
import Loader from '../components/Loader';

import EmployeeDetails from '../modals/ViewEmployee';
import NewEmployee from '../modals/NewEmployee';
import EditEmployee from '../modals/EditEmployee';

import { EmployeeInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/DataContext';

const Employees: React.FC = () => {
    const { employees, addEmployee, updateEmployee, loading } = useGlobalContext();

    const [selectedEmployee, setSelectedEmployee] = useState<Partial<EmployeeInterface> | null>(null);

    const [isOpenViewEmployee, setIsOpenViewEmployee] = useState<boolean>(false);
    const [isOpenCreateEmployee, setIsOpenCreateEmployee] = useState<boolean>(false);
    const [isOpenEditEmployee, setIsOpenEditEmployee] = useState<boolean>(false);

    const columns: Column<EmployeeInterface>[] = useMemo(
        () => [
            { key: 'id_empleado', header: 'No. Empleado' },
            { key: 'nombre', header: 'Nombre' },
            { key: 'apellido', header: 'Apellido' },
            { key: 'puesto', header: 'Puesto' },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => (
                    <span className='text-green-600'>
                        {row.sueldo ? `$${row.sueldo.toFixed(2)}` : 'Sin sueldo definido'}
                    </span>
                ),
            },
            {
                key: 'ultima_nomina',
                header: 'Última Nómina',
                render: (_, row) => (
                    <Link to='/payroll' className='text-blue-600 underline'>
                        {row.ultima_nomina ? `NOM${row.ultima_nomina}` : 'No tiene nominas'}
                    </Link>
                ),
            },
            {
                key: 'acciones',
                header: 'Accion',
                render: (_, row) => (
                    <Button
                        variant='details'
                        size='sm'
                        icon={<CgDetailsMore size={15} />}
                        onClick={() => {
                            setSelectedEmployee(row);
                            setIsOpenViewEmployee(true);
                        }}>
                        Detalles
                    </Button>
                ),
            },
        ],
        []
    );

    const handleCreateEmployee = (newEmployee: EmployeeInterface) => {
        addEmployee(newEmployee);
        setIsOpenCreateEmployee(false);
    };

    const handleUpdateEmployee = (updatedEmployee: Partial<EmployeeInterface>) => {
        updateEmployee(selectedEmployee?.id_empleado ?? 0, updatedEmployee);
        setSelectedEmployee({ ...selectedEmployee, ...updateEmployee });
        setIsOpenEditEmployee(false);
    };

    return (
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de Empleados'>
                <Button
                    variant='add'
                    size='md'
                    icon={<IoIosPersonAdd size={17} />}
                    onClick={() => setIsOpenCreateEmployee(true)}>
                    Nuevo empleado
                </Button>
            </Header>

            <main className='p-6'>
                {loading && <Loader />}
                <Table columns={columns} data={employees}></Table>
            </main>

            <EmployeeDetails
                isOpen={isOpenViewEmployee}
                onClose={() => {
                    setIsOpenViewEmployee(false);
                    setSelectedEmployee(null);
                }}
                employee={selectedEmployee}
                hancleClickEdit={() => setIsOpenEditEmployee(true)}
            />

            <NewEmployee
                isOpen={isOpenCreateEmployee}
                onClose={() => setIsOpenCreateEmployee(false)}
                onSubmit={handleCreateEmployee}
            />

            <EditEmployee
                isOpen={isOpenEditEmployee}
                employee={selectedEmployee ?? {}}
                onClose={() => setIsOpenEditEmployee(false)}
                onSubmit={handleUpdateEmployee}
            />
        </div>
    );
};

export default Employees;
