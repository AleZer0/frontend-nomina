import axiosInstance from '.';
import { AuthResponse } from '../types';

export class Autenticacion {
    static usuarioVerify = async (): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.get('usuario/verify');
            return response.data;
        } catch (error) {
            throw new Error(`Error verificando autenticación: ${error}`);
        }
    };

    static usuarioLogin = async (credentials: { nombre_usuario: string; contrasena: string }) => {
        try {
            const response = await axiosInstance.post('usuario/login', credentials);
            return response.data;
        } catch (error) {
            throw new Error(`Error al iniciar sesión ${error}`);
        }
    };

    static usuarioLogout = async () => {
        try {
            const response = await axiosInstance.get('usuario/logout');
            return response.data;
        } catch (error) {
            throw new Error(`Error al cerrar sesión ${error}`);
        }
    };
}

export default Autenticacion;
