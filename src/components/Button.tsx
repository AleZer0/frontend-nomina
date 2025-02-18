import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
    children: ReactNode;
    type: 'submit' | 'button';
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
};

const Button: React.FC<ButtonProps> = ({ children, type, onClick, disabled, variant = 'primary' }) => {
    const buttonClasses = clsx(
        'flex items-center justify-center gap-2 px-4 py-2 font-sans font-bold transition duration-500 hover:shadow-2xl rounded cursor-pointer',
        {
            'bg-blue-500 text-white hover:bg-blue-700 shadow-blue-500': variant === 'primary',
            'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
            'opacity-50 cursor-not-allowed': disabled,
        }
    );

    return (
        <button className={buttonClasses} onClick={onClick} disabled={disabled} type={type}>
            {children}
        </button>
    );
};

export default Button;
