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

export interface EmpleadoType {
    nombre: string;
    apellido: string;
    puesto: string;
    sueldo: number;
}

export interface PayrollInterface {
    folio: number;
    id_empleado: number;
    fecha: string;
    prestamos: number;
    infonavit: number;
    sueldo: number;
    created_at: string;
    updated_at: string;
    estado: number;
    empleado: {
        id_empleado: number;
        nombre: string;
        apellido: string;
        puesto: string;
        sueldo: number;
        created_at: string;
        updated_at: string;
        estado: number;
    };
}

export interface WeeklyReportData {
    semana: number;
    empleados_pagados: Array<number>;
    total_sueldos: number;
    total_prestamos: number;
    total_infonavit: number;
    total_neto: number;
}
