export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
}

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'date';
    placeholder?: string;
    required?: boolean;
    variant?: 'default' | 'outline' | 'filled';
    inputSize?: 'sm' | 'md' | 'lg';
    isPassword?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
