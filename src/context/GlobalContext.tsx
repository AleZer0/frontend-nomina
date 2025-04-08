import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    EmployeeInterface,
    PayrollInterface,
    LoanInterface,
    WeeklyReportData,
    MetaInterface,
    ParamsInterface,
} from '../types/entities';
import { GlobalContextInterface } from '../types/contexts';
import EmployeeServices from '../services/employees.service';
import PayrollServices from '../services/payroll.service';
import LoanServices from '../services/loan.service';
import WeeklyReports from '../services/weeklyReport.service';
import PDF from '../services/pdf.service';
import {
    defaultEntitiesState,
    defaultMetaData,
    defaultParams,
    defaultSelectedEntities,
} from '../constants/globalContext';
import Utils from '../utils';
import { getActiveEntityFromPath } from '../utils/router';

const GlobalContext = createContext<GlobalContextInterface | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();
    const activeEntity = getActiveEntityFromPath(pathname);

    const [entitiesState, setEntitiesState] = useState(defaultEntitiesState);
    const [selectedEntities, setSelectedEntities] = useState(defaultSelectedEntities);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const [params, setParams] = useState<ParamsInterface>(defaultParams);
    const [metaData, setMetaData] = useState<Record<string, MetaInterface>>(defaultMetaData);

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [contentHeader, setContentHeader] = useState<ReactNode | null>(null);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    useEffect(() => {
        if (activeEntity === 'employees') fetchEmployees();
        else if (activeEntity === 'payrolls') fetchPayrolls();
        else if (activeEntity === 'loans') fetchLoans();
        else if (activeEntity === 'weeklyReports') fetchWeeklyReports();
    }, [params, activeEntity]);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchData = async (
        service: (params: any) => Promise<{ data: any; meta: MetaInterface }>,
        entity: keyof typeof entitiesState
    ) => {
        setLoading(prev => ({ ...prev, [entity]: true }));
        const start = performance.now();
        try {
            const { data, meta } = await service(entity === 'weeklyReports' ? { ...params, year: 2025 } : params);
            setEntitiesState(prev => ({ ...prev, [entity]: Utils.formatDates(data) }));
            setMetaData(prev => ({ ...prev, [entity]: meta }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            const elapsed = performance.now() - start;
            const minDuration = 400;
            const extraWait = Math.max(0, minDuration - elapsed);
            await delay(extraWait);
            setLoading(prev => ({ ...prev, [entity]: false }));
        }
    };

    const fetchEmployees = () => fetchData(EmployeeServices.getEmployees, 'employees');
    const fetchPayrolls = () => fetchData(PayrollServices.getPayrolls, 'payrolls');
    const fetchLoans = () => fetchData(LoanServices.getLoans, 'loans');
    const fetchWeeklyReports = () => fetchData(WeeklyReports.getReportsList, 'weeklyReports');

    const addEmployee = async (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        setLoading(prev => ({ ...prev, addEmployee: true }));
        try {
            const employee = await EmployeeServices.createEmployee(newEmployee);
            if (metaData.employees.currentPage === metaData.employees.totalPages)
                setEntitiesState(prev => ({ ...prev, employees: [...prev.employees, employee] }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, addEmployee: false }));
        }
    };

    const updateEmployee = async (
        id_empleado: number,
        updatedData: Partial<EmployeeInterface>
    ): Promise<EmployeeInterface> => {
        setLoading(prev => ({ ...prev, updateEmployee: true }));
        try {
            console.log(updatedData);
            let updatedEmployee = await EmployeeServices.updateEmployee(id_empleado, updatedData);
            const fecha_incorporacion = updatedEmployee.fecha_incorporacion
                ? updatedEmployee.fecha_incorporacion.split('T')[0]
                : null;
            updatedEmployee = { ...updatedEmployee, fecha_incorporacion };
            setEntitiesState(prev => ({
                ...prev,
                employees: prev.employees.map(item => (item.id_empleado === id_empleado ? updatedEmployee : item)),
            }));
            return updatedEmployee;
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, updateEmployee: false }));
        }
    };

    const statusEmployee = async (id_empleado: number, status: 0 | 1) => {
        setLoading(prev => ({ ...prev, statusEmployee: true }));
        try {
            await EmployeeServices.changeStatusEmployee(id_empleado, status);
            setEntitiesState(prev => ({
                ...prev,
                employees: prev.employees.map(item =>
                    item.id_empleado === id_empleado ? { ...item, estado: status } : item
                ),
            }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, statusEmployee: false }));
        }
    };

    const addPayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        setLoading(prev => ({ ...prev, addPayroll: true }));
        try {
            const payroll = await PayrollServices.createPayroll(newPayroll);
            if (metaData.payrolls.currentPage === metaData.payrolls.totalPages) {
                setEntitiesState(prev => ({
                    ...prev,
                    payrolls: [...prev.payrolls, payroll],
                }));
            }
            setEntitiesState(prev => ({
                ...prev,
                employees: prev.employees.map(emp =>
                    emp.id_empleado === newPayroll.id_empleado
                        ? {
                              ...emp,
                              nomina: [...(emp.nomina || []), payroll],
                              ultima_nomina: payroll.folio,
                          }
                        : emp
                ),
            }));
            setSelectedEntities(prev => ({
                ...prev,
                selectedEmployee: {
                    ...prev.selectedEmployee!,
                    nomina: [...(prev.selectedEmployee?.nomina || []), payroll],
                    ultima_nomina: payroll.folio,
                },
            }));
            await fetchEmployees();
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, addPayroll: false }));
        }
    };

    const updatePayroll = async (folio: number, updatedData: Partial<PayrollInterface>): Promise<PayrollInterface> => {
        setLoading(prev => ({ ...prev, updatePayroll: true }));
        try {
            let updatedPayroll = await PayrollServices.updatePayroll(folio, updatedData);
            const fecha = updatedPayroll.fecha ? updatedPayroll.fecha.split('T')[0] : null;
            updatedPayroll = { ...updatedPayroll, fecha };
            setEntitiesState(prev => ({
                ...prev,
                payrolls: prev.payrolls.map(item => (item.folio === folio ? updatedPayroll : item)),
            }));
            return updatedPayroll;
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, updateEmployee: false }));
        }
    };

    const statusPayroll = async (folio: number, status: 0 | 1) => {
        setLoading(prev => ({ ...prev, statusPayroll: true }));
        try {
            await PayrollServices.changeStatusPayroll(folio, status);
            setEntitiesState(prev => ({
                ...prev,
                payrolls: prev.payrolls.map(item => (item.folio === folio ? { ...item, estado: status } : item)),
            }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, statusPayroll: false }));
        }
    };

    const addLoan = async (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        setLoading(prev => ({ ...prev, addLoan: true }));
        try {
            const loan = await LoanServices.createLoan(newLoan);
            if (metaData.loans.currentPage === metaData.loans.totalPages || metaData.loans.totalPages === 0)
                setEntitiesState(prev => ({ ...prev, loans: [...prev.loans, loan] }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, addLoan: false }));
        }
    };

    const updateLoan = async (id_prestamo: number, monto_abonado: number): Promise<LoanInterface> => {
        setLoading(prev => ({ ...prev, updateLoan: true }));
        try {
            const loanUpdated = await LoanServices.updateLoan(id_prestamo, { monto_abonado });
            setEntitiesState(prev => ({
                ...prev,
                loans: prev.loans.map(item => (item.id_prestamo === id_prestamo ? loanUpdated : item)),
            }));
            return loanUpdated;
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(prev => ({ ...prev, updateLoan: false }));
        }
    };

    const statusLoan = async (id_prestamo: number, status: 0 | 1) => {
        setLoading(prev => ({ ...prev, statusLoans: true }));
        try {
            await LoanServices.changeStatusLoan(id_prestamo, status);
            setEntitiesState(prev => ({
                ...prev,
                loans: prev.loans.map(item => (item.id_prestamo === id_prestamo ? { ...item, estado: status } : item)),
            }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, statusLoans: false }));
        }
    };

    const createPreviewPayrollPDF = (folio: number) => {
        setLoading(prev => ({ ...prev, [folio]: true }));
        try {
            PDF.previewPayrollPDF(folio);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, [folio]: false }));
        }
    };

    const createPreviewWeeklyReportPDF = (year: number, row: WeeklyReportData) => {
        setLoading(prev => ({ ...prev, [row.semana]: true }));
        try {
            PDF.previewWeeklyReportsPDF(year, row);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, [row.semana]: false }));
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                entitiesState,
                selectedEntities,
                setSelectedEntities,
                error,
                setError,
                loading,
                setLoading,
                params,
                setParams,
                metaData,
                setMetaData,
                addEmployee,
                updateEmployee,
                statusEmployee,
                addPayroll,
                updatePayroll,
                statusPayroll,
                addLoan,
                updateLoan,
                statusLoan,
                createPreviewPayrollPDF,
                createPreviewWeeklyReportPDF,
                fetchEmployees,
                fetchPayrolls,
                fetchLoans,
                fetchWeeklyReports,
                isSidebarOpen,
                contentHeader,
                setContentHeader,
                toggleSidebar,
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
