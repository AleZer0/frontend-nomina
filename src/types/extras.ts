import { ReactNode } from 'react';
import { UserInterface } from './entities';

export interface Route {
    path: 'employees' | 'payrolls' | 'loans' | 'weeklyReports';
    element: ReactNode;
    name?: string;
    entity?: string;
}

export interface Column<T> {
    key: keyof T | string | 'action';
    header: string | JSX.Element;
    render?: (value: any, row: T) => React.ReactNode;
}

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'multi_select';
    data?: { id: number; label: string }[] | [];
    default_value?: string;
    placeholder?: string;
    required?: boolean;
    variant?: 'default' | 'outline' | 'filled';
    inputSize?: 'sm' | 'md' | 'lg';
    isPassword?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export interface AuthResponse {
    success: boolean;
    mensaje: string;
    usuario: UserInterface;
}
