import { ReactNode } from 'react';
import { useFormContext, FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    variant?: 'default' | 'filled';
    inputSize?: 'sm' | 'md' | 'lg';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isPassword?: boolean;
    register?: UseFormRegisterReturn;
    error?: FieldError;
    onRemove?: () => void;
}

const Input: React.FC<IInput> = ({
    name,
    label,
    variant = 'default',
    inputSize = 'md',
    leftIcon,
    rightIcon,
    isPassword,
    type,
    required,
    className,
    register,
    error: externalError,
    onRemove,
    ...props
}) => {
    let fieldRegister = register;
    let fieldError = externalError;

    try {
        const form = useFormContext();
        const { register: contextRegister, getFieldState, formState } = form;

        if (!fieldRegister) {
            fieldRegister = contextRegister(name);
        }

        if (!fieldError) {
            const { error } = getFieldState(name, formState);
            fieldError = error;
        }
    } catch (e) {}

    return (
        <div>
            {label && (
                <div className='group mb-1.5 flex items-center justify-between'>
                    <label
                        htmlFor={name}
                        className={`text-base font-medium ${required && "after:ml-0.5 after:text-red-500 after:content-['*']"}`}>
                        {label}
                    </label>

                    {onRemove && (
                        <button
                            type='button'
                            onClick={onRemove}
                            className='invisible ml-2 cursor-pointer text-sm text-red-500 duration-250 group-hover:visible hover:scale-110 hover:rotate-90 hover:text-red-700 focus:outline-none'>
                            <IconX stroke={2} />
                        </button>
                    )}
                </div>
            )}
            <div className='relative mt-1.5 w-full'>
                {leftIcon && <span className='absolute top-1/2 left-3 -translate-y-1/2'>{leftIcon}</span>}
                <input
                    {...fieldRegister}
                    {...props}
                    type={isPassword ? 'password' : (type ?? 'text')}
                    className={clsx(
                        'w-full rounded-lg transition-all duration-300 placeholder:text-gray-400 placeholder:italic invalid:border-red-500 hover:shadow focus:shadow-xl focus:outline-none disabled:shadow-none',
                        {
                            'border border-gray-300 bg-gray-50 text-gray-900 hover:border-gray-400 focus:border-sky-500':
                                variant === 'default' && !fieldError,
                            'border border-red-500 text-gray-900 hover:border-red-500 focus:border-red-500':
                                variant === 'default' && fieldError,
                            'border-none bg-gray-100 text-gray-500 focus:ring-gray-500': variant === 'filled',
                        },
                        {
                            'p-1 text-sm': inputSize === 'sm',
                            'p-2 text-base': inputSize === 'md',
                            'p-4 text-lg': inputSize === 'lg',
                        },
                        leftIcon && 'pl-10',
                        (rightIcon || isPassword) && 'pr-10',
                        className
                    )}
                />
                {rightIcon && (
                    <span className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'>{rightIcon}</span>
                )}
            </div>
            <span className={`${fieldError?.message ? 'visible' : 'invisible'} text-xs text-red-500`}>
                {(fieldError?.message && fieldError.message) || 'Sin errores'}
            </span>
        </div>
    );
};

Input.displayName = 'Input';

export default Input;
