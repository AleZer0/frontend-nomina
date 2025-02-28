import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GlobalContextInterface, EmployeeInterface, PayrollInterface, LoanInterface, WeeklyReportData } from '../types';
import EmployeeServices from '../services/employees.service';
import PayrollServices from '../services/payroll.service';
import { Loans } from '../services/prestamos.service';
import { WeeklyReports } from '../services/weeklyReport.service';

const defaultParams = { estado: 1, page: 1, limit: 100 };

const GlobalContext = createContext<GlobalContextInterface | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInterface | null>(null);

    const [payrolls, setPayrolls] = useState<PayrollInterface[]>([]);
    const [loans, setLoans] = useState<LoanInterface[]>([]);
    const [weeklyReport, setWeeklyReport] = useState<WeeklyReportData[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        try {
            const employeesData = await EmployeeServices.getEmployees(defaultParams);
            setEmployees(employeesData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPayrolls = async () => {
        try {
            const payrollsData = await PayrollServices.getPayrolls(defaultParams);
            setPayrolls(payrollsData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLoans = async () => {
        try {
            const loanData = await Loans.getLoans(defaultParams);
            setLoans(loanData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchWeeklyReports = async () => {
        try {
            const WeeklyReportsData = await WeeklyReports.getReportsList({ page: 1, limit: 100, year: 2025 });
            setWeeklyReport(WeeklyReportsData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchPayrolls();
        fetchLoans();
        fetchWeeklyReports();
    }, []);

    const selectEmployee = (id?: number, updatedEmployee?: EmployeeInterface | null) => {
        if (id) {
            const employee = employees.find(emp => emp.id_empleado === id) || null;
            setSelectedEmployee(employee);
        } else {
            setSelectedEmployee(updatedEmployee ?? null);
        }
    };

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

            setSelectedEmployee(prev => (prev?.id_empleado === id ? { ...prev, ...updatedData } : prev));
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

    const addPayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
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

    const addLoan = async (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        try {
            const createdLoan = await Loans.createLoan(newLoan);
            setLoans([...loans, createdLoan]);
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                employees,
                payrolls,
                loans,
                weeklyReport,
                loading,
                error,
                selectedEmployee,
                selectEmployee,
                addEmployee,
                updateEmployee,
                removeEmployee,
                addPayroll,
                updatePayroll,
                removePayroll,
                addLoan,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextInterface => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext debe ser utilizado dentro de un EmployeeProvider');
    }
    return context;
};
