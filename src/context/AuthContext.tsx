import { createContext, useContext, useEffect, useState } from 'react';
import Autenticacion from '../services/autenticacion.service';
import { AuthContextType, UsuarioType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState<UsuarioType | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para errores

    const checkAuthStatus = async () => {
        setLoading(true);
        setError(null); // Limpiar errores previos

        try {
            const data = await Autenticacion.usuarioVerify();
            if (data && data.success) {
                setUsuario(data.usuario);
                setIsAuthenticated(true);
            } else {
                setUsuario(null);
                setIsAuthenticated(false);
                setError('No estás autenticado.');
            }
        } catch (err) {
            console.error('Error verificando autenticación:', err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: { nombre_usuario: string; contrasena: string }) => {
        setLoading(true);
        setError(null); // Limpiar errores previos

        try {
            const data = await Autenticacion.usuarioLogin(credentials);
            if (data && data.success) {
                setUsuario(data.usuario);
                setIsAuthenticated(true);
            } else {
                setUsuario(null);
                setIsAuthenticated(false);
                setError('Usuario o contraseña incorrectos.');
            }
        } catch (err) {
            setError('Usuario o contraseña incorrectos.');
            console.error('Error en login:', err);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null); // Limpiar errores previos

        try {
            const data = await Autenticacion.usuarioLogout();
            if (data && data.success) {
                setIsAuthenticated(false);
                setUsuario(null);
            } else {
                setError('Error al cerrar sesión.');
            }
        } catch (err) {
            setError('Error al cerrar sesión.');
            console.error('Error en logout:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, usuario, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe ser usado dentro de AuthProvider');
    return context;
};
