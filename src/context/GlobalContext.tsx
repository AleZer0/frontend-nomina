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
    const [loadingButtons, setLoadingButtons] = useState<{ [key: number | string]: boolean }>({});
    const [error, setError] = useState<string | null>(null);

    const addEmployee = async (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        setLoadingButtons(prev => ({ ...prev, addEmployee: true }));
        try {
            const employee = await EmployeeServices.createEmployee(newEmployee);
            setEmployees([...employees, employee]);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoadingButtons(prev => ({ ...prev, addEmployee: false }));
        }
    };

    const updateEmployee = async (
        id_empleado: number,
        updatedData: Partial<EmployeeInterface>
    ): Promise<EmployeeInterface> => {
        try {
            let updatedEmployee = await EmployeeServices.updateEmployee(id_empleado, updatedData);
            const fecha_incorporacion = updatedEmployee.fecha_incorporacion.split('T')[0];
            updatedEmployee = { ...updatedEmployee, fecha_incorporacion };
            setEmployees(prev =>
                prev.map(emp => (emp.id_empleado === id_empleado ? { ...emp, ...updatedEmployee } : emp))
            );
            return updatedEmployee;
        } catch (error: any) {
            setError(error.message);
            throw error;
        }
    };

    const statusEmployee = async (id_empleado: number, status: 0 | 1) => {
        try {
            await EmployeeServices.changeStatusEmployee(id_empleado, status);
            setEmployees(prev => prev.map(emp => (emp.id_empleado === id_empleado ? { ...emp, estado: status } : emp)));
        } catch (error: any) {
            setError(error.message);
        }
    };

    const selectEmployee = (employee?: EmployeeInterface) => {
        if (employee) setSelectedEmployee(employee);
        else setSelectedEmployee(null);
    };

    const addPayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        try {
            const payroll = await PayrollServices.createPayroll(newPayroll);
            const employees = await EmployeeServices.getEmployees(defaultParams);
            const loans = await LoanServices.getLoans(defaultParams);
            setPayrolls([...payrolls, payroll]);
            setEmployees(employees);
            setLoans(loans);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const addLoan = async (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        try {
            const createdLoan = await LoanServices.createLoan(newLoan);
            const employees = await EmployeeServices.getEmployees(defaultParams);
            setLoans([...loans, createdLoan]);
            setEmployees(employees);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const updateLoan = async (id_prestamo: number, monto_abonado: number): Promise<LoanInterface> => {
        try {
            const loanUpdated = await LoanServices.updateLoan(id_prestamo, { monto_abonado });
            const employees = await EmployeeServices.getEmployees(defaultParams);
            setLoans(prev => prev.map(loan => (loan.id_prestamo === id_prestamo ? loanUpdated : loan)));
            setEmployees(employees);
            return loanUpdated;
        } catch (error: any) {
            setError(error.message);
            throw error;
        }
    };

    const selectLoan = async (loan?: LoanInterface) => {
        if (loan) setSelectedLoan(loan);
        else setSelectedLoan(null);
    };

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

    return (
        <GlobalContext.Provider
            value={{
                employees,
                selectedEmployee,
                payrolls,
                loans,
                selectedLoan,
                weeklyReport,
                loading,
                loadingButtons,
                setLoadingButtons,
                error,
                addEmployee,
                updateEmployee,
                statusEmployee,
                selectEmployee,
                addPayroll,
                addLoan,
                updateLoan,
                selectLoan,
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
