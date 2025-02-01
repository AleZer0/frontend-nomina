import { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    design?: string;
    icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, design, icon }) => {
    return (
        <button
            className={`rounded px-4 py-2 font-sans text-base font-medium tracking-tight ${design}`}
            onClick={onClick}
            disabled={disabled}>
            {icon}
            {children}
        </button>
    );
};

export default Button;
