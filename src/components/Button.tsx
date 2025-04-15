import { forwardRef, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Oval } from 'react-loader-spinner';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'add' | 'save' | 'save' | 'edit' | 'delete' | 'details' | 'generate' | 'ghost' | 'disabled';
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
    asChild?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'save',
            size = 'md',
            icon,
            className,
            asChild,
            isLoading = false,
            disabled = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref}
                className={clsx(
                    'inline-flex items-center gap-2 rounded-2xl font-semibold transition-all duration-500',
                    {
                        'bg cursor-pointer bg-green-400 bg-linear-to-r to-emerald-500 text-black hover:scale-110 hover:bg-green-500 hover:shadow-2xl hover:shadow-green-500':
                            variant === 'add' && !isLoading && !disabled,
                        'bg cursor-pointer bg-green-400 bg-linear-to-r to-emerald-500 text-white hover:scale-110 hover:bg-green-500 hover:shadow-2xl hover:shadow-green-500':
                            variant === 'save' && !isLoading && !disabled,
                        'cursor-pointer bg-amber-500 bg-linear-to-r to-orange-500 text-white hover:scale-110 hover:bg-amber-500 hover:shadow-2xl hover:shadow-orange-500':
                            variant === 'edit' && !isLoading && !disabled,
                        'cursor-pointer bg-red-400 bg-linear-to-r to-red-600 text-white hover:scale-110 hover:bg-red-500 hover:shadow-2xl hover:shadow-red-600':
                            variant === 'delete' && !isLoading && !disabled,
                        'cursor-pointer bg-sky-500 bg-linear-to-r to-indigo-500 text-white hover:scale-110 hover:bg-sky-600 hover:shadow-2xl hover:shadow-indigo-600':
                            variant === 'details' && !isLoading && !disabled,
                        'cursor-pointer bg-yellow-500 text-black hover:scale-110 hover:bg-yellow-600 hover:shadow-2xl hover:shadow-yellow-600':
                            variant === 'generate' && !isLoading && !disabled,
                        'cursor-not-allowed bg-gray-300 text-black disabled:opacity-50': isLoading || disabled,
                        'cursor-pointer font-medium hover:shadow-xl': variant === 'ghost' && !isLoading && !disabled,
                    },
                    {
                        'px-3 py-1 text-sm': size === 'sm',
                        'px-4 py-2 text-base': size === 'md',
                        'px-5 py-3 text-lg': size === 'lg',
                    },
                    className
                )}
                disabled={disabled || isLoading}
                {...props}>
                {isLoading ? (
                    <>
                        <Oval
                            height={20}
                            width={20}
                            color='#000000'
                            strokeWidth={4}
                            secondaryColor='#88a3f5'
                            ariaLabel='loading'
                        />
                        {children}
                    </>
                ) : (
                    <>
                        {icon && <span>{icon}</span>}
                        {children}
                    </>
                )}
            </Comp>
        );
    }
);

Button.displayName = 'Button';

export default Button;
