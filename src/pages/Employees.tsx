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

import { EmployeeInterface, PayrollInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';
import NewPayroll from '../modals/NewPayroll';

const Employees: React.FC = () => {
    const {
        employees,
        selectedEmployee,
        selectEmployee,
        addEmployee,
        updateEmployee,
        removeEmployee,
        addPayroll,
        loading,
    } = useGlobalContext();

    const [isOpenViewEmployee, setIsOpenViewEmployee] = useState(false);
    const [isOpenCreateEmployee, setIsOpenCreateEmployee] = useState(false);
    const [isOpenEditEmployee, setIsOpenEditEmployee] = useState(false);
    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState(false);

    const columns: Column<EmployeeInterface>[] = useMemo(
        () => [
            { key: 'id_empleado', header: 'No. Empleado' },
            { key: 'nombre', header: 'Nombre' },
            { key: 'apellido', header: 'Apellido' },
            { key: 'puesto', header: 'Puesto' },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => (row.sueldo ? `$${row.sueldo.toFixed(2)}` : 'Sin sueldo definido'),
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

    const handleDeleteEmployee = async (id: number) => {
        if (!selectedEmployee) return;
        removeEmployee(id);
        setIsOpenViewEmployee(false);
    };

    const handleCreatePayroll = (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
    };

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            {/* 📌 Header con botón para nuevo empleado */}
            <Header title='Listado de Empleados'>
                <Button
                    variant='add'
                    size='md'
                    icon={<IoIosPersonAdd size={17} />}
                    onClick={() => setIsOpenCreateEmployee(true)}>
                    Nuevo empleado
                </Button>
            </Header>

            {/* 📌 Loader debajo del Header */}
            {loading && (
                <div className='my-4 flex justify-center'>
                    <Loader />
                </div>
            )}

            {/* 📌 Tabla con validación para cuando no haya empleados */}
            <div className='relative min-h-[200px]'>
                {employees.length > 0 ? (
                    <Table columns={columns} data={employees} />
                ) : (
                    !loading && <div className='mt-10 text-center text-gray-500'>No hay registros disponibles.</div>
                )}
            </div>

            {/* 📌 Modales */}
            <ViewEmployee
                isOpen={isOpenViewEmployee}
                onClose={() => {
                    setIsOpenViewEmployee(false);
                    selectEmployee();
                }}
                handleClickCreatePayroll={() => setIsOpenCreatePayroll(true)}
                handleClickEdit={() => setIsOpenEditEmployee(true)}
                handleClickDelate={handleDeleteEmployee}
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

            <NewPayroll
                isOpen={isOpenCreatePayroll}
                onClose={() => setIsOpenCreatePayroll(false)}
                onSubmit={handleCreatePayroll}
            />
        </section>
    );
};

export default Employees;
