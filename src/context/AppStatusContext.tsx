import { createContext, useContext, useState, ReactNode } from 'react';

interface AppStatusContextType {
    errors: Record<string, string>;
    setError: (field: string, label: string, message?: string) => void;
    clearError: (field: string) => void;
    clearAllErrors: () => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const AppStatusContext = createContext<AppStatusContextType | undefined>(undefined);

export const AppStatusProvider = ({ children }: { children: ReactNode }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);

    const setError = (field: string, label: string, message?: string) => {
        setErrors(prev => ({
            ...prev,
            [field]: message || `El campo ${label.toLowerCase()} es obligatorio`,
        }));
    };

    const clearError = (field: string) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    const clearAllErrors = () => {
        setErrors({});
    };

    return (
        <AppStatusContext.Provider value={{ errors, setError, clearError, clearAllErrors, loading, setLoading }}>
            {children}
        </AppStatusContext.Provider>
    );
};

export const useAppStatus = () => {
    const context = useContext(AppStatusContext);
    if (!context) {
        throw new Error('useAppStatus debe usarse dentro de un AppStatusProvider');
    }
    return context;
};
