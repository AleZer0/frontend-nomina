import { useMemo, useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getEmployeeColumns } from '../columns/employee.columns';
import { useEmployeeHandlers } from '../hooks/useEmployeeHandlers';

import Table from '../components/Table';
import Pagination from '../components/Pagination';
import EmployeeSearchBar from '../components/Employee/EmployeeSearchBar';
import EmployeeHeader from '../components/Employee/EmployeeHeader';
import Popup from '../components/Popup';
import EmployeeModal from '../components/Employee/EmployeeModal';

import { EmployeeInterface } from '../types/entities';

const Employees: React.FC = () => {
    const { entitiesState, setParams, params, isSidebarOpen, setSelectedEntities, loading, setContentHeader } =
        useGlobalContext();

    const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
    const [employeeModalMode, setEmployeeModalMode] = useState<'create' | 'view' | 'edit'>('create');

    const {
        handleCreateEmployee,
        handleUpdateEmployee,
        handleDeleteEmployee,
        showSuccessCreate,
        showSuccessEdit,
        showSuccessDelete,
    } = useEmployeeHandlers();

    useEffect(() => {
        setContentHeader(
            <EmployeeHeader
                onAdd={() => {
                    setEmployeeModalMode('create');
                    setEmployeeModalOpen(true);
                }}
            />
        );
    }, [isSidebarOpen]);

    const onClickDetails = (selectedEmployee: EmployeeInterface) => {
        setSelectedEntities(prev => ({ ...prev, selectedEmployee: selectedEmployee }));
        setEmployeeModalMode('view');
        setEmployeeModalOpen(true);
    };

    const columns = useMemo(() => getEmployeeColumns(params, setParams, onClickDetails), [params]);

    return (
        <section className={`mb-20 flex-auto p-6 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
            {showSuccessCreate && <Popup>¡Empleado registrado con éxito!</Popup>}
            {showSuccessEdit && <Popup>¡Empleado actualizado con éxito!</Popup>}
            {showSuccessDelete && <Popup>¡Empleado eliminado con éxito!</Popup>}
            <EmployeeSearchBar />
            <Table columns={columns} data={entitiesState.employees} loading={loading['employees']} />
            <Pagination />
            <EmployeeModal isOpen={employeeModalOpen} setIsOpen={setEmployeeModalOpen} mode={employeeModalMode} />
            {/* <EmployeeModals
                onCreate={handleCreateEmployee}
                onUpdate={handleUpdateEmployee}
                onDelete={handleDeleteEmployee}
                showSuccessEdit={showSuccessEdit}
                openView={isOpenViewEmployee}
                setOpenView={setIsOpenViewEmployee}
                openCreate={isOpenCreateEmployee}
                setOpenCreate={setIsOpenCreateEmployee}
                openEdit={isOpenEditEmployee}
                setOpenEdit={setIsOpenEditEmployee}
            /> */}
        </section>
    );
};

export default Employees;
