import { useMemo, useState } from 'react';

import { FaUserPlus } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';

import Header from '../components/Header';
import Table from '../components/Table';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

import ViewEmployee from '../modals/ViewEmployee';
import NewEmployee from '../modals/NewEmployee';
import EditEmployee from '../modals/EditEmployee';
import NewPayroll from '../modals/NewPayroll';

import { EmployeeInterface, PayrollInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

const Employees: React.FC = () => {
    const {
        entitiesState,
        selectedEntities,
        setSelectedEntities,
        addEmployee,
        updateEmployee,
        statusEmployee,
        addPayroll,
        loading,
    } = useGlobalContext();

    const [isOpenViewEmployee, setIsOpenViewEmployee] = useState(false);
    const [isOpenCreateEmployee, setIsOpenCreateEmployee] = useState(false);
    const [isOpenEditEmployee, setIsOpenEditEmployee] = useState(false);
    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState(false);

    const handleCreateEmployee = async (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        await addEmployee(newEmployee);
        setIsOpenCreateEmployee(false);
    };

    const handleUpdateEmployee = async (id_empleado: number, updatedEmployee: Partial<EmployeeInterface>) => {
        const newSelectedEmployee = await updateEmployee(id_empleado, updatedEmployee);
        setSelectedEntities(prev => ({ ...prev, selectedEmployee: newSelectedEmployee }));
        setIsOpenEditEmployee(false);
    };

    const handleDeleteEmployee = async (id_empleado: number) => {
        await statusEmployee(id_empleado, 0);
        setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
        setIsOpenViewEmployee(false);
    };

    const handleCreatePayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        if (!selectedEntities.selectedEmployee) return;
        await addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
    };

    const columns: Column<EmployeeInterface>[] = useMemo(
        () => [
            { key: 'id_empleado', header: 'No. Empleado' },
            { key: 'nombre', header: 'Nombre' },
            { key: 'apellido', header: 'Apellido' },
            { key: 'puesto', header: 'Puesto' },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => (row.sueldo ? `$${row.sueldo.toFixed(2)}` : 'Sin sueldo'),
            },
            {
                key: 'ultima_nomina',
                header: 'Última Nómina',
                render: (_, row) =>
                    row.ultima_nomina ? `NOM${row.ultima_nomina.toString().padStart(4, '0')}` : 'Sin nóminas',
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
                            setSelectedEntities(prev => ({ ...prev, selectedEmployee: row }));
                            setIsOpenViewEmployee(true);
                        }}>
                        Detalles
                    </Button>
                ),
            },
        ],
        [entitiesState.employees]
    );

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            <Header title='Listado de Empleados'>
                <Button
                    variant='add'
                    size='md'
                    icon={<FaUserPlus size={17} />}
                    onClick={() => setIsOpenCreateEmployee(true)}>
                    Nuevo empleado
                </Button>
            </Header>

            {loading['employees'] ? (
                <div className='my-4 flex justify-center'>
                    <Loader />
                </div>
            ) : (
                <Table columns={columns} data={entitiesState.employees.filter(employee => employee.estado !== 0)} />
            )}

            <Pagination />

            <ViewEmployee
                isOpen={isOpenViewEmployee}
                onClose={() => {
                    setIsOpenViewEmployee(false);
                    setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
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
