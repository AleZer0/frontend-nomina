import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
    GlobalContextInterface,
    EmployeeInterface,
    OperatorInterface,
    PayrollInterface,
    LoanInterface,
    WeeklyReportData,
    MetaInterface,
} from '../types';
import EmployeeServices from '../services/employees.service';
import PayrollServices from '../services/payroll.service';
import LoanServices from '../services/loan.service';
import WeeklyReports from '../services/weeklyReport.service';
import Utils from '../utils';
import PDF from '../services/pdf.service';

const GlobalContext = createContext<GlobalContextInterface | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [entitiesState, setEntitiesState] = useState({
        employees: [] as EmployeeInterface[],
        operators: [] as OperatorInterface[],
        payrolls: [] as PayrollInterface[],
        loans: [] as LoanInterface[],
        weeklyReports: [] as WeeklyReportData[],
    });
    const [selectedEntities, setSelectedEntities] = useState({
        selectedEmployee: null as EmployeeInterface | null,
        selectedLoan: null as LoanInterface | null,
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });
    const [activeEntity, setActiveEntity] = useState<
        'employees' | 'operators' | 'payrolls' | 'loans' | 'weeklyReports'
    >('employees');
    const [metaData, setMetaData] = useState<Record<string, MetaInterface>>({
        employees: { totalRecords: 0, totalPages: 1, currentPage: 1, recordsPerPage: 10 },
        operators: { totalRecords: 0, totalPages: 1, currentPage: 1, recordsPerPage: 10 },
        payrolls: { totalRecords: 0, totalPages: 1, currentPage: 1, recordsPerPage: 10 },
        loans: { totalRecords: 0, totalPages: 1, currentPage: 1, recordsPerPage: 10 },
        weeklyReports: { totalRecords: 0, totalPages: 1, currentPage: 1, recordsPerPage: 10 },
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [contentHeader, setContentHeader] = useState<ReactNode | null>(null);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const fetchData = async (
        service: (params: any) => Promise<{ data: any; meta: MetaInterface }>,
        entity: keyof typeof entitiesState
    ) => {
        setLoading(prev => ({ ...prev, [entity]: true }));
        try {
            const { data, meta } = await service(
                entity === 'weeklyReports' ? { estado: 1, ...pagination, year: 2025 } : { estado: 1, ...pagination }
            );
            setEntitiesState(prev => ({ ...prev, [entity]: Utils.formatDates(data) }));
            setMetaData(prev => ({ ...prev, [entity]: meta }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, [entity]: false }));
        }
    };

    const fetchSearchEmployees = async (q: string) => {
        setLoading(prev => ({ ...prev, ['employees']: true }));
        try {
            const { data, meta } = await EmployeeServices.searchEmployees(q, { estado: 1, ...pagination });
            setEntitiesState(preview => ({ ...preview, ['employees']: Utils.formatDates(data) }));
            setMetaData(prev => ({ ...prev, ['employees']: meta }));
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(prev => ({ ...prev, ['employees']: false }));
        }
    };

    const fetchEmployees = () => fetchData(EmployeeServices.getEmployees, 'employees');
    const fetchOperators = () => fetchData(EmployeeServices.getEmployees, 'operators');
    const fetchPayrolls = () => fetchData(PayrollServices.getPayrolls, 'payrolls');
    const fetchLoans = () => fetchData(LoanServices.getLoans, 'loans');
    const fetchWeeklyReports = () => fetchData(WeeklyReports.getReportsList, 'weeklyReports');

    useEffect(() => {
        fetchEmployees();
        fetchOperators();
        fetchPayrolls();
        fetchLoans();
        fetchWeeklyReports();
    }, []);

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

    useEffect(() => {
        setLoading(prev => ({ ...prev, loadingAllData: true }));

        const fetchData = async () => {
            if (activeEntity === 'employees') await fetchEmployees();
            if (activeEntity === 'operators') await fetchOperators();
            if (activeEntity === 'payrolls') await fetchPayrolls();
            if (activeEntity === 'loans') await fetchLoans();
            if (activeEntity === 'weeklyReports') await fetchWeeklyReports();
        };

        fetchData().finally(() => {
            setLoading(prev => ({ ...prev, loadingAllData: false }));
        });
    }, [pagination, activeEntity]);

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
                pagination,
                setPagination,
                activeEntity,
                setActiveEntity,
                metaData,
                setMetaData,
                addEmployee,
                updateEmployee,
                statusEmployee,
                addPayroll,
                addLoan,
                updateLoan,
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
                fetchSearchEmployees,
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
