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
