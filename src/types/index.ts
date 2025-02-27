export interface UsuarioType {
    id_usuario: number;
    nombre_usuario: string;
}

export interface GlobalContextInterface {
    employees: EmployeeInterface[];
    payrolls: PayrollInterface[];
    loading: boolean;
    error: string | null;
    selectedEmployee: EmployeeInterface | null;
    selectEmployee: (id?: number, updatedEmployee?: EmployeeInterface | null) => void;
    addEmployee: (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => Promise<void>;
    updateEmployee: (id: number, updatedData: Partial<EmployeeInterface>) => Promise<void>;
    removeEmployee: (id: number) => Promise<void>;
    addPayroll: (newPayroll: Omit<PayrollInterface, 'folio'>) => Promise<void>;
    updatePayroll: (id: number, updatedData: Partial<PayrollInterface>) => Promise<void>;
    removePayroll: (id: number) => Promise<void>;
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
    ultima_nomina?: number;
    prestamos?: LoanInterface[];
}

export interface PayrollInterface {
    folio: number;
    fecha: string;
    dias_trabajados: number;
    infonavit?: number;
    vacaciones?: number;
    aguinaldo?: number;
    finiquito?: number;
    sueldo: number;
    id_empleado: number;
    created_at?: string;
    updated_at?: string;
    estado?: number;
    empleado?: EmployeeInterface;
    nominaAbonos?: PaymentPayrollInterface;
    prestamos?: number;
    ids_prestamos?: PrestamoAbono[];
}

export interface LoanInterface {
    id_prestamo: number;
    id_empleado: number;
    monto_total: number;
    saldo_pendiente: number;
    estado?: number;
    created_at?: string;
    updated_at?: string;
    empleado?: string;
    abonos?: Array<any>;
    ultimo_abono?: number;
}

export interface PaymentInterface {
    id_abono: number;
    id_prestamo: number;
    fecha: string;
    created_at?: string;
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
    empleados_pagados: Array<number>;
    total_sueldos: number;
    total_prestamos: number;
    total_infonavit: number;
    total_neto: number;
}
