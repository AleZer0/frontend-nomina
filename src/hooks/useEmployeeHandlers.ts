import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { EmployeeInterface } from '../types/entities';

export const useEmployeeHandlers = () => {
    const { setSelectedEntities, addEmployee, updateEmployee, statusEmployee } = useGlobalContext();

    const [showSuccessCreate, setShowSuccessCreate] = useState(false);
    const [showSuccessEdit, setShowSuccessEdit] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);

    const handleCreateEmployee = async (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        await addEmployee(newEmployee);
        setShowSuccessCreate(true);
        setTimeout(() => setShowSuccessCreate(false), 3000);
    };

    const handleUpdateEmployee = async (id: number, updated: Partial<EmployeeInterface>) => {
        const newEmp = await updateEmployee(id, updated);
        setSelectedEntities(prev => ({ ...prev, selectedEmployee: newEmp }));
        setShowSuccessEdit(true);
        setTimeout(() => setShowSuccessEdit(false), 3000);
    };

    const handleDeleteEmployee = async (id: number) => {
        await statusEmployee(id, 0);
        setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
        setShowSuccessDelete(true);
        setTimeout(() => setShowSuccessDelete(false), 3000);
    };

    return {
        handleCreateEmployee,
        handleUpdateEmployee,
        handleDeleteEmployee,
        showSuccessCreate,
        showSuccessEdit,
        showSuccessDelete,
    };
};
