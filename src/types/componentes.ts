import { ReactNode } from 'react';
import { Column, FormField } from './extras';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'outline' | 'filled';
    inputSize?: 'sm' | 'md' | 'lg';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isPassword?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'add' | 'save' | 'save' | 'edit' | 'delete' | 'details' | 'generate' | 'ghost' | 'disabled';
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
    asChild?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}

export interface TableProps<T> {
    loading: boolean;
    columns: Column<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
}

export interface FormProps {
    fields: FormField[];
    data?: Record<string, any>;
    onSubmit?: (values: Record<string, string>) => void;
    submitIcon?: ReactNode;
    submitLabel?: string;
    variant?: 'add' | 'save' | 'edit' | 'delete' | 'details' | 'generate' | 'disabled';
    direction?: 'start' | 'center' | 'end';
    disabled?: boolean;
    columns?: 1 | 2;
    extra?: (id_empleado: number) => void;
    children?: ReactNode;
    loadingButton?: boolean;
    labelLoadingButton?: string;
}
