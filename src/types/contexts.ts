import { ReactNode } from 'react';
import {
    EmployeeInterface,
    LoanInterface,
    MetaInterface,
    ParamsInterface,
    PayrollInterface,
    UserInterface,
    WeeklyReportData,
} from './entities';

export interface AuthContextInterface {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    usuario: UserInterface | null;
    login: (credentials: { nombre_usuario: string; contrasena: string }) => Promise<void>;
    logout: () => void;
}

export interface GlobalContextInterface {
    entitiesState: {
        employees: EmployeeInterface[];
        payrolls: PayrollInterface[];
        loans: LoanInterface[];
        weeklyReports: WeeklyReportData[];
    };
    selectedEntities: {
        selectedEmployee: EmployeeInterface | null;
        selectedLoan: LoanInterface | null;
        selectedPayroll: PayrollInterface | null;
    };
    setSelectedEntities: React.Dispatch<
        React.SetStateAction<{
            selectedEmployee: EmployeeInterface | null;
            selectedLoan: LoanInterface | null;
            selectedPayroll: PayrollInterface | null;
        }>
    >;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    loading: { [key: number | string]: boolean };
    setLoading: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
    params: ParamsInterface;
    setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>;
    metaData: Record<string, MetaInterface>;
    setMetaData: React.Dispatch<React.SetStateAction<Record<string, MetaInterface>>>;
    addEmployee: (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => Promise<void>;
    updateEmployee: (id_empleado: number, updatedData: Partial<EmployeeInterface>) => Promise<EmployeeInterface>;
    statusEmployee: (id_empleado: number, status: 0 | 1) => Promise<void>;
    addPayroll: (newPayroll: Omit<PayrollInterface, 'folio'>) => Promise<void>;
    updatePayroll: (folio: number, updatedData: Partial<PayrollInterface>) => Promise<PayrollInterface>;
    statusPayroll: (folio: number, status: 0 | 1) => Promise<void>;
    addLoan: (newLoan: Omit<LoanInterface, 'id_prestamo'>) => Promise<void>;
    updateLoan: (id_prestamo: number, monto_abonado: number) => Promise<LoanInterface>;
    statusLoan: (id_prestamo: number, status: 0 | 1) => Promise<void>;
    createPreviewPayrollPDF: (folio: number) => void;
    createPreviewWeeklyReportPDF: (year: number, row: WeeklyReportData) => void;
    fetchEmployees: () => Promise<void>;
    fetchPayrolls: () => Promise<void>;
    fetchLoans: () => Promise<void>;
    fetchWeeklyReports: () => Promise<void>;
    isSidebarOpen: boolean;
    contentHeader: ReactNode;
    setContentHeader: React.Dispatch<React.SetStateAction<ReactNode>>;
    toggleSidebar: () => void;
}
