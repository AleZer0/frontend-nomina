import { useEffect, useMemo, useState } from 'react';

import { CgDetailsMore } from 'react-icons/cg';
import { FaSortAmountDown, FaUserPlus } from 'react-icons/fa';

import Table from '../components/Table';
import Button from '../components/Button';
import Pagination from '../components/Pagination';

import ViewEmployee from '../components/modals/ViewEmployee';
import NewEmployee from '../components/modals/NewEmployee';
import EditEmployee from '../components/modals/EditEmployee';
import NewPayroll from '../components/modals/NewPayroll';
import Search from '../components/Search';
import Popup from '../components/Popup';

import { EmployeeInterface, PayrollInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';
import Utils from '../utils';

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
        isSidebarOpen,
        setContentHeader,
        fetchSearchEmployees,
    } = useGlobalContext();

    const [isOpenViewEmployee, setIsOpenViewEmployee] = useState(false);
    const [isOpenCreateEmployee, setIsOpenCreateEmployee] = useState(false);
    const [isOpenEditEmployee, setIsOpenEditEmployee] = useState(false);
    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [query, setQuery] = useState('');
    const [sortKey, setSortKey] = useState<string>('nombre');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleCreateEmployee = async (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        await addEmployee(newEmployee);
        setIsOpenCreateEmployee(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
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

    const total_sueldo = (sueldo: number | undefined | null | '') => {
        if (sueldo === undefined || sueldo === null || sueldo === '') {
            return (
                <span className='inline-block rounded-full border border-red-300 bg-red-100 px-3 py-1 font-semibold text-red-500'>
                    Sin sueldo asignado
                </span>
            );
        }
        return (
            <span
                className={`${sueldo <= 0 ? 'inline-block rounded-full border border-red-300 bg-red-100 px-3 py-1 font-semibold text-red-500' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${sueldo.toFixed(2)}
            </span>
        );
    };

    const columns: Column<EmployeeInterface>[] = useMemo(
        () => [
            {
                key: 'id_empleado',
                header: 'No. Empleado',
            },
            {
                key: 'nombre',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                const newDirection = sortKey === 'nombre' && sortDirection === 'asc' ? 'desc' : 'asc';
                                setSortKey('nombre');
                                setSortDirection(newDirection);
                                fetchSearchEmployees(query, 'nombre', newDirection);
                            }}>
                            <FaSortAmountDown
                                size={17}
                                className={`transition-transform duration-200 ${
                                    sortKey === 'nombre' && sortDirection === 'desc' ? 'rotate-180' : ''
                                } text-gray-500 hover:text-gray-700`}
                            />
                        </button>
                        <span>Nombre</span>
                    </div>
                ),
            },
            {
                key: 'apellido',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                const newDirection = sortKey === 'apellido' && sortDirection === 'asc' ? 'desc' : 'asc';
                                setSortKey('apellido');
                                setSortDirection(newDirection);
                                fetchSearchEmployees(query, 'apellido', newDirection);
                            }}>
                            <FaSortAmountDown
                                size={17}
                                className={`transition-transform duration-200 ${sortKey === 'apellido' && sortDirection === 'desc' ? 'rotate-180' : ''} text-gray-500 hover:text-gray-700`}
                            />
                        </button>
                        <span>Apellido</span>
                    </div>
                ),
            },
            {
                key: 'puesto',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                const newDirection = sortKey === 'puesto' && sortDirection === 'asc' ? 'desc' : 'asc';
                                setSortKey('puesto');
                                setSortDirection(newDirection);
                                fetchSearchEmployees(query, 'puesto', newDirection);
                            }}>
                            <FaSortAmountDown
                                size={17}
                                className={`transition-transform duration-200 ${sortKey === 'puesto' && sortDirection === 'desc' ? 'rotate-180' : ''} text-gray-500 hover:text-gray-700`}
                            />
                        </button>
                        <span>Puesto</span>
                    </div>
                ),
                render: (_, row) => (
                    <span className='inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700'>
                        {row.puesto}
                    </span>
                ),
            },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => total_sueldo(row.sueldo),
            },
            {
                key: 'ultima_nomina',
                header: 'Última Nómina',
                render: (_, row) => (
                    <span
                        className={
                            row.ultima_nomina
                                ? 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold text-gray-500'
                                : 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold text-gray-500'
                        }>
                        {row.ultima_nomina ? `NOM${row.ultima_nomina.toString().padStart(4, '0')}` : 'Sin nóminas'}
                    </span>
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

    useEffect(() => {
        setContentHeader(
            <div className='flex w-full items-center justify-between px-4'>
                <h1
                    className={`text-start text-3xl font-bold tracking-wider duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
                    Listado de Empleados
                </h1>
                <Button
                    variant='add'
                    size='md'
                    icon={<FaUserPlus size={17} />}
                    onClick={() => setIsOpenCreateEmployee(true)}>
                    Nuevo empleado
                </Button>
            </div>
        );
    }, [isSidebarOpen]);

    return (
        <section
            className={`mb-20 flex-auto p-6 transition-all duration-600 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            {showSuccess && (
                <div className='mb-4 flex justify-center'>
                    <Popup>¡Empleado registrado con éxito!</Popup>
                </div>
            )}
            <Search
                query={query}
                onChangeQuery={setQuery}
                onSearch={() => fetchSearchEmployees(query, sortKey, sortDirection)}
                onClear={() => fetchSearchEmployees('', sortKey, sortDirection)}
            />

            <Table
                columns={columns}
                data={Utils.orderForDate(entitiesState.employees, 'nombre', 'desc')}
                loading={loading['employees']}
            />

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
