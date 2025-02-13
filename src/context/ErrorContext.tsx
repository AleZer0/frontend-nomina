import { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextType {
    errors: Record<string, string>;
    setError: (field: string, message: string) => void;
    clearError: (field: string) => void;
    clearAllErrors: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const setError = (field: string, message: string) => {
        setErrors(prev => ({ ...prev, [field]: message }));
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
        <ErrorContext.Provider value={{ errors, setError, clearError, clearAllErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError debe usarse dentro de un ErrorProvider');
    }
    return context;
};
