import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: { nombre_usuario: string; contrasena: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Verificar si el usuario tiene una sesión activa
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('https://app-nomina-141e425e046a.herokuapp.com/api/usuario/verify', {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setIsAuthenticated(true);
                    navigate('/employees');
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    // Función de inicio de sesión
    const login = async (credentials: { nombre_usuario: string; contrasena: string }) => {
        try {
            await axios.post('https://app-nomina-141e425e046a.herokuapp.com/api/usuario/login', credentials, {
                withCredentials: true,
            });
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw new Error('Credenciales incorrectas');
        }
    };

    // Función de cierre de sesión
    const logout = () => {
        axios.post('https://app-nomina-141e425e046a.herokuapp.com/api/usuario/logout', {}, { withCredentials: true });
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe ser usado dentro de AuthProvider');
    return context;
};
