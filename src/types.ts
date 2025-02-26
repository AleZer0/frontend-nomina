export interface UsuarioType {
    id_usuario: number;
    nombre_usuario: string;
}

export interface GlobalContextInterface {
    employees: EmployeeInterface[];
    payrolls: PayrollInterface[];
    loading: boolean;
    error: string | null;
    addEmployee: (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => Promise<void>;
    updateEmployee: (id: number, updatedData: Partial<EmployeeInterface>) => Promise<void>;
    removeEmployee: (id: number) => Promise<void>;
    addPayroll: (newPayroll: Omit<PayrollInterface, 'id_nomina'>) => Promise<void>;
    updatePayroll: (id: number, updatedData: Partial<PayrollInterface>) => Promise<void>;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    usuario: UsuarioType | null;
    login: (credentials: { nombre_usuario: string; contrasena: string }) => Promise<void>;
    logout: () => void;
}

export interface AuthResponse {
    success: boolean;
    mensaje: string;
    usuario: UsuarioType;
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
    nomina: PayrollInterface[];
    ultima_nomina?: number;
    prestamos?: LoanInterface[];
}

export interface PayrollInterface {
    folio: number;
    fecha: string;
    dias_trabajados: number;
    infonavit: number;
    vacaciones: number;
    aguinaldo: number;
    finiquito: number;
    sueldo: number;
    id_empleado: number;
    created_at?: string;
    updated_at?: string;
    estado?: number;
    empleado?: EmployeeInterface;
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

export interface PaymentInterface {}

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
