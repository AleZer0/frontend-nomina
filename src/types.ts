export interface LoginResponse {
    success: boolean;
    massage: string;
    token?: string;
    usuario?: {
        id_usuario: number;
        nombre_usuario: string;
    };
}
