import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ButtonProps } from '../types/componentes';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', icon, className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref as any}
                className={clsx(
                    'inline-flex items-center gap-2 rounded-2xl font-bold transition-all duration-300',
                    {
                        'cursor-pointer bg-green-400 text-black hover:bg-green-500 hover:shadow-2xl hover:shadow-green-500':
                            variant === 'add',
                        'cursor-pointer bg-orange-400 text-white hover:bg-orange-500 hover:shadow-2xl hover:shadow-orange-500':
                            variant === 'edit',
                        'cursor-pointer bg-red-500 text-white hover:bg-red-600 hover:shadow-2xl hover:shadow-red-600':
                            variant === 'delete',
                        'cursor-pointer bg-blue-500 text-white hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600':
                            variant === 'details',
                        'cursor-pointer bg-yellow-500 text-black hover:bg-yellow-600 hover:shadow-2xl hover:shadow-yellow-600':
                            variant === 'generate',
                        'cursor-pointer text-blue-950 hover:bg-white': variant === 'ghost',
                        'cursor-not-allowed bg-gray-300 text-black': variant === 'disabled',
                    },
                    {
                        'px-3 py-1 text-sm': size === 'sm',
                        'px-4 py-2 text-base': size === 'md',
                        'px-5 py-3 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}>
                {icon && <span>{icon}</span>}
                {children}
            </Comp>
        );
    }
);

Button.displayName = 'Button';

export default Button;
