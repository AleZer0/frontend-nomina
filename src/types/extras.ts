import { ReactNode } from 'react';

export interface Route {
    path: string;
    element: ReactNode;
    name?: string;
}

export interface Column<T> {
    key: keyof T | string;
    header: string;
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
