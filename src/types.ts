export interface Usuario {
    id_usuario: number;
    nombre_usuario: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    usuario: Usuario | null;
    login: (credentials: { nombre_usuario: string; contrasena: string }) => Promise<void>;
    logout: () => void;
}

export interface AuthResponse {
    success: boolean;
    mensaje: string;
    usuario: Usuario;
}

export interface Empleado {
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

