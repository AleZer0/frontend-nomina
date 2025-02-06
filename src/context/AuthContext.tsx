import { createContext, useContext, useEffect, useState } from 'react';

import Autenticacion from '../services/autenticacion.service';
import { AuthContextType, UsuarioType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState<UsuarioType | null>(null);

    const checkAuthStatus = async () => {
        setLoading(true);

        const data = await Autenticacion.usuarioVerify();
        if (data && data.success) {
            setIsAuthenticated(true);
            setUsuario(data.usuario);
        } else {
            setIsAuthenticated(false);
            setUsuario(null);
        }

        setLoading(false);
    };

    const login = async (credentials: { nombre_usuario: string; contrasena: string }) => {
        setLoading(true);

        const data = await Autenticacion.usuarioLogin(credentials);
        if (data && data.success) {
            setIsAuthenticated(true);
            setUsuario(data.usuario);
        } else {
            setIsAuthenticated(false);
            setUsuario(null);
        }

        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);

        const data = await Autenticacion.usuarioLogout();
        if (data && data.success) {
            setIsAuthenticated(false);
            setUsuario(null);
        }

        setLoading(false);
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, usuario, login, logout }}>
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
