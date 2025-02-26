import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GlobalContextInterface, EmployeeInterface, PayrollInterface } from '../types';
import EmployeeServices from '../services/employees.service';
import PayrollServices from '../services/payroll.service';

const defaultParams = { estado: 1, page: 9, limit: 10 };

const GlobalContext = createContext<GlobalContextInterface | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [payrolls, setPayrolls] = useState<PayrollInterface[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empleadosData = await EmployeeServices.getEmployees(defaultParams);
                const nominasData = await PayrollServices.getPayrolls(1);
                setEmployees(empleadosData);
                setPayrolls(nominasData);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addEmployee = async (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        try {
            const createdEmployee = await EmployeeServices.createEmployee(newEmployee);
            setEmployees([...employees, createdEmployee]);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const updateEmployee = async (id: number, updatedData: Partial<EmployeeInterface>) => {
        try {
            await EmployeeServices.updateEmployee(id, updatedData);
            setEmployees(prev => prev.map(emp => (emp.id_empleado === id ? { ...emp, ...updatedData } : emp)));
        } catch (error: any) {
            setError(error.message);
        }
    };

    const removeEmployee = async (id: number) => {
        try {
            await EmployeeServices.deleteEmployee(id);
            setEmployees(prev => prev.filter(emp => emp.id_empleado !== id));
        } catch (error: any) {
            setError(error.message);
        }
    };

    const addPayroll = async (newPayroll: Omit<PayrollInterface, 'id_nomina'>) => {
        try {
            const createdPayroll = await PayrollServices.createPayroll(newPayroll);
            setPayrolls([...payrolls, createdPayroll]);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const updatePayroll = async (folio: number, updatedData: Partial<PayrollInterface>) => {
        try {
            await PayrollServices.updatePayroll(folio, updatedData);
            setPayrolls(prev => prev.map(nomina => (nomina.folio === folio ? { ...nomina, ...updatedData } : nomina)));
        } catch (error: any) {
            setError(error.message);
        }
    };

    const removePayroll = async (folio: number) => {
        try {
            await PayrollServices.deletePayroll(folio);
            setPayrolls(prev => prev.filter(nomina => nomina.folio !== folio)); // ✅ Filtra la nómina eliminada
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                employees,
                payrolls,
                loading,
                error,
                addEmployee,
                updateEmployee,
                removeEmployee,
                addPayroll,
                updatePayroll,
                removePayroll,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextInterface => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useEmployees debe ser utilizado dentro de un EmployeeProvider');
    }
    return context;
};
