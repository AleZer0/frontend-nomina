export interface UsuarioType {
    id_usuario: number;
    nombre_usuario: string;
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

export interface LoanType {
    id_prestamo: number;
    id_empleado: number;
    monto_total: number;
    saldo_pendiente: number;
    estado?: number;
    created_at?: string;
    updated_at?: string;
    empleado: string;
    abonos: Array<any>;
    ultimo_abono?: number;
}

export interface PrestamoAbono {
    id_prestamo: number;
    monto_abonado: number;
}

export interface Employee {
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
    nomina: PayrollType[];
    ultima_nomina?: number;
    prestamos?: LoanType[];
}

export interface PayrollType {
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
    empleado?: Employee;
    prestamos?: number;
    ids_prestamos?: PrestamoAbono[];
}

export interface WeeklyReportData {
    semana: number;
    empleados_pagados: Array<number>;
    total_sueldos: number;
    total_prestamos: number;
    total_infonavit: number;
    total_neto: number;
}
