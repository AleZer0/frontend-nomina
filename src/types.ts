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
