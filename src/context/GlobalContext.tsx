import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GlobalContextInterface, EmployeeInterface, PayrollInterface, LoanInterface, WeeklyReportData } from '../types';
import EmployeeServices from '../services/employees.service';
import PayrollServices from '../services/payroll.service';
import LoanServices from '../services/loan.service';
import WeeklyReports from '../services/weeklyReport.service';
import Utils from '../utils';

const defaultParams = { estado: 1, page: 1, limit: 100 };

const GlobalContext = createContext<GlobalContextInterface | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInterface | null>(null);

    const [payrolls, setPayrolls] = useState<PayrollInterface[]>([]);

    const [loans, setLoans] = useState<LoanInterface[]>([]);
    const [selectedLoan, setSelectedLoan] = useState<LoanInterface | null>(null);

    const [weeklyReport, setWeeklyReport] = useState<WeeklyReportData[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const employeesData = await EmployeeServices.getEmployees(defaultParams);
            setEmployees(Utils.formatDates(employeesData));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPayrolls = async () => {
        setLoading(true);
        try {
            const payrollsData = await PayrollServices.getPayrolls(defaultParams);
            setPayrolls(Utils.formatDates(payrollsData));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLoans = async () => {
        setLoading(true);
        try {
            const loanData = await LoanServices.getLoans(defaultParams);
            setLoans(Utils.formatDates(loanData));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeeklyReports = async () => {
        setLoading(true);
        try {
            const WeeklyReportsData = await WeeklyReports.getReportsList({ page: 1, limit: 100, year: 2025 });
            setWeeklyReport(Utils.formatDates(WeeklyReportsData));
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
        if (updatedEmployee) {
            setSelectedEmployee(updatedEmployee);
        } else if (id) {
            const employee = employees.find(emp => emp.id_empleado === id) || null;
            setSelectedEmployee(employee);
        } else {
            setSelectedEmployee(null);
        }
    };

    const updateEmployees = (id: number, updatedData: Partial<EmployeeInterface>) => {
        try {
            setEmployees(prev => prev.map(emp => (emp.id_empleado === id ? { ...emp, ...updatedData } : emp)));
        } catch (error: any) {
            setError(error.message);
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
            setPayrolls(prev => prev.filter(nomina => nomina.folio !== folio));
        } catch (error: any) {
            setError(error.message);
        }
    };

    const selectLoan = async (id?: number, newSelectedLoan?: LoanInterface | null) => {
        if (id) {
            const loan = loans.find(emp => emp.id_prestamo === id) || null;
            setSelectedLoan(loan);
        } else {
            setSelectedLoan(newSelectedLoan ?? null);
        }
    };

    const addLoan = async (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        try {
            const createdLoan = await LoanServices.createLoan(newLoan);
            setLoans([...loans, createdLoan]);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const updateLoan = async (id_prestamo: number, monto_abonado: number) => {
        try {
            const loanUpdated = await LoanServices.payLoan(id_prestamo, { monto_abonado });
            setLoans(prev => prev.map(loan => (loan.id_prestamo === id_prestamo ? loanUpdated : loan)));
            setSelectedLoan(prev => (prev?.id_prestamo === id_prestamo ? loanUpdated : prev));
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
                selectedLoan,
                weeklyReport,
                loading,
                error,
                selectedEmployee,
                selectEmployee,
                updateEmployees,
                addEmployee,
                updateEmployee,
                removeEmployee,
                addPayroll,
                updatePayroll,
                removePayroll,
                selectLoan,
                addLoan,
                updateLoan,
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
