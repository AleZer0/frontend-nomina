import { ReactNode } from 'react';

export interface UsuarioType {
    id_usuario: number;
    nombre_usuario: string;
}

export interface GlobalContextInterface {
    entitiesState: {
        employees: EmployeeInterface[];
        operators: OperatorInterface[];
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
    pagination: { page: number; limit: number };
    setPagination: React.Dispatch<React.SetStateAction<{ page: number; limit: number }>>;
    activeEntity: 'employees' | 'operators' | 'payrolls' | 'loans' | 'weeklyReports';
    setActiveEntity: React.Dispatch<
        React.SetStateAction<'employees' | 'operators' | 'payrolls' | 'loans' | 'weeklyReports'>
    >;
    metaData: Record<string, MetaInterface>;
    setMetaData: React.Dispatch<React.SetStateAction<Record<string, MetaInterface>>>;
    addEmployee: (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => Promise<void>;
    updateEmployee: (id_empleado: number, updatedData: Partial<EmployeeInterface>) => Promise<EmployeeInterface>;
    statusEmployee: (id_empleado: number, status: 0 | 1) => Promise<void>;
    addPayroll: (newPayroll: Omit<PayrollInterface, 'folio'>) => Promise<void>;
    addLoan: (newLoan: Omit<LoanInterface, 'id_prestamo'>) => Promise<void>;
    updateLoan: (id_prestamo: number, monto_abonado: number) => Promise<LoanInterface>;
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
    fetchSearchEmployees: (query: string, sortKey?: string, sortDirection?: 'asc' | 'desc') => Promise<void>;
    updatePayroll: (folio: number, updatedData: Partial<PayrollInterface>) => Promise<PayrollInterface>;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    usuario: UsuarioType | null;
    login: (credentials: { nombre_usuario: string; contrasena: string }) => Promise<void>;
    logout: () => void;
}

export interface AuthResponse {
    success: boolean;
    mensaje: string;
    usuario: UsuarioType;
}

export interface ParamsInterface {
    estado: number;
    page: number;
    limit: number;
    year?: number;
    q?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface EmployeeInterface {
    id_empleado: number;
    nombre: string;
    apellido: string;
    fecha_incorporacion?: string;
    departamento?: string;
    puesto: string;
    sueldo?: number;
    created_at?: string;
    updated_at?: string;
    estado?: number;
    nomina?: PayrollInterface[];
    prestamos?: LoanInterface[];
    ultima_nomina?: number;
}

export interface OperatorInterface {
    id_operador: number;
    estado: number;
    pension_alimenticia?: number;
    horas_extras?: number;
    maniobras?: number;
    diesel?: number;
    precio_viaje?: number;
    viaticos?: number;
    casetas?: number;
    otros?: number;
}

export interface PaymentInterface {
    id_abono: number;
    id_prestamo: number;
    monto_abonado: number;
    fecha: string;
    created_at?: string;
}

export interface LoanInterface {
    id_prestamo: number;
    id_empleado: number;
    monto_total: number;
    saldo_pendiente: number;
    estado?: number;
    created_at?: string;
    updated_at?: string;
    abonos?: PaymentInterface[];
    empleado?: string;
    ultimo_abono?: number;
}

export interface PayrollInterface {
    folio: number;
    fecha: string | null;
    dias_trabajados: number;
    infonavit?: number;
    vacaciones?: number;
    aguinaldo?: number;
    finiquito?: number;
    sueldo: number;
    pension_alimenticia: number;
    horas_extras: number;
    pago_horas_extras: number;
    maniobras: number;
    otros: number;
    id_empleado: number;
    created_at?: string;
    updated_at?: string;
    estado?: number;
    empleado?: EmployeeInterface;
    nominaAbonos?: PaymentPayrollInterface;
    prestamos?: number;
    ids_prestamos?: PrestamoAbono[];
}

export interface PaymentPayrollInterface {
    id_nomina: number;
    id_abono: number;
    monto: number;
    abono: PaymentInterface;
}

export interface PrestamoAbono {
    id_prestamo: number;
    monto_abonado: number;
}

export interface WeeklyReportData {
    semana: number;
    empleados_pagados: number;
    total_sueldos: number;
    total_vacaciones: number;
    total_aguinaldos: number;
    total_finiquitos: number;
    total_prestamos: number;
    total_infonavit: number;
    total_pension_alimenticia: number;
    total_pago_horas_extras: number;
    total_maniobras: number;
    total_otros: number;
    total_neto: number;
}

export interface MetaInterface {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    recordsPerPage?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}
