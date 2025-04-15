import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    variant?: 'default' | 'error' | 'filled';
    inputSize?: 'sm' | 'md' | 'lg';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isPassword?: boolean;
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
    ...props
}) => {
    const { register, formState, getFieldState } = useFormContext();
    const { error } = getFieldState(name, formState);

    return (
        <div>
            {label && (
                <label htmlFor={name} className='text-base font-medium capitalize'>
                    {label} {required && <span className='text-red-500'>*</span>}
                </label>
            )}
            <div className='relative mt-1.5 w-full'>
                {leftIcon && <span className='absolute top-1/2 left-3 -translate-y-1/2'>{leftIcon}</span>}
                <input
                    {...register(name)}
                    {...props}
                    type={isPassword ? 'password' : (type ?? 'text')}
                    className={clsx(
                        'w-full rounded-lg bg-gray-50 transition-all duration-300 hover:shadow focus:ring-1 focus:shadow-xl focus:outline-none',
                        {
                            'border border-gray-300 text-gray-900 hover:border-gray-400 focus:ring-blue-400':
                                variant === 'default',
                            'border-none text-gray-500 focus:ring-gray-500': variant === 'filled',
                            'border border-red-500 text-gray-900 hover:ring-red-600 focus:border-red-700': error,
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
            {error?.message && <span className='text-xs text-red-500'>{error.message}</span>}
        </div>
    );
};

Input.displayName = 'Input';

export default Input;
