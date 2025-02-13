import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface InputProps {
    type: 'text' | 'number' | 'email' | 'password';
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    variant?: 'normal' | 'required' | 'verify';
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange, variant }) => {
    const inputClasses = clsx(
        'w-full rounded border p-2 text-blue-950 hover:shadow focus:shadow focus:ring-1 focus:ring-blue-300 focus:outline-none',
        {
            'border-gray-300 hover:shadow-blue-300 focus:shadow-blue-300 hover:border-blue-300': variant === 'normal',
            'border-red-300 hover:border-red-500': variant === 'required',
            'hover:border-green-300': variant === 'verify',
        }
    );

    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={inputClasses}
            />
        </>
    );
};

export default Input;
