import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosPersonAdd } from 'react-icons/io';
import { CgDetailsMore } from 'react-icons/cg';

import Header from '../components/Header';
import Table from '../components/Table';
import Button from '../components/Button';
import Loader from '../components/Loader';

import ViewEmployee from '../modals/ViewEmployee';
import NewEmployee from '../modals/NewEmployee';
import EditEmployee from '../modals/EditEmployee';

import { EmployeeInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

const Employees: React.FC = () => {
    const { employees, selectedEmployee, selectEmployee, addEmployee, updateEmployee, loading } = useGlobalContext();

    const [isOpenViewEmployee, setIsOpenViewEmployee] = useState(false);
    const [isOpenCreateEmployee, setIsOpenCreateEmployee] = useState(false);
    const [isOpenEditEmployee, setIsOpenEditEmployee] = useState(false);

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
                        {row.ultima_nomina ? `NOM${row.ultima_nomina}` : 'No tiene nóminas'}
                    </Link>
                ),
            },
            {
                key: 'accion',
                header: 'Acción',
                render: (_, row) => (
                    <Button
                        variant='details'
                        size='md'
                        icon={<CgDetailsMore size={15} />}
                        onClick={() => {
                            selectEmployee(undefined, row);
                            setIsOpenViewEmployee(true);
                        }}>
                        Detalles
                    </Button>
                ),
            },
        ],
        []
    );

    const handleCreateEmployee = (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        addEmployee(newEmployee);
        setIsOpenCreateEmployee(false);
    };

    const handleUpdateEmployee = (updatedEmployee: Partial<EmployeeInterface>) => {
        if (!selectedEmployee) return;
        updateEmployee(selectedEmployee.id_empleado ?? 0, updatedEmployee);
        setIsOpenEditEmployee(false);
    };

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            <Header title='Listado de Empleados'>
                <Button
                    variant='add'
                    size='md'
                    icon={<IoIosPersonAdd size={17} />}
                    onClick={() => setIsOpenCreateEmployee(true)}>
                    Nuevo empleado
                </Button>
            </Header>

            {loading && <Loader />}
            <Table columns={columns} data={employees} />

            <ViewEmployee
                isOpen={isOpenViewEmployee}
                onClose={() => {
                    setIsOpenViewEmployee(false);
                    selectEmployee();
                }}
                handleClickEdit={() => setIsOpenEditEmployee(true)}
            />

            <NewEmployee
                isOpen={isOpenCreateEmployee}
                onClose={() => setIsOpenCreateEmployee(false)}
                onSubmit={handleCreateEmployee}
            />

            <EditEmployee
                isOpen={isOpenEditEmployee}
                onClose={() => setIsOpenEditEmployee(false)}
                onSubmit={handleUpdateEmployee}
            />
        </section>
    );
};

export default Employees;
