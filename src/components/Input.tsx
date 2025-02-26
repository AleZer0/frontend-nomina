import { forwardRef } from 'react';
import clsx from 'clsx';
import { InputProps } from '../types/componentes';

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type, className, variant = 'default', inputSize = 'md', leftIcon, rightIcon, isPassword, ...props }, ref) => {
        return (
            <div className='relative w-full'>
                {leftIcon && <span className='absolute top-1/2 left-3 -translate-y-1/2'>{leftIcon}</span>}
                <input
                    ref={ref}
                    type={type === 'password' ? (isPassword ? 'text' : 'password') : type}
                    className={clsx(
                        'w-full rounded-lg transition-all duration-300 hover:shadow focus:ring-1 focus:shadow-xl focus:outline-none',
                        {
                            'border border-gray-300 bg-gray-50 text-gray-900 hover:border-gray-400 focus:ring-blue-400':
                                variant === 'default',
                            'border border-gray-400 bg-gray-50 text-gray-900 hover:border-gray-500 focus:ring-blue-500':
                                variant === 'outline',
                            'border-none bg-gray-100 text-gray-900 focus:ring-gray-500': variant === 'filled',
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
                    {...props}
                />
                {rightIcon && (
                    <span className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700'>
                        {rightIcon}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
