// src/components/Button.tsx
import React, { forwardRef, ReactNode } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Clases extras o diseño especial */
    design?: string;
    /** Ícono opcional */
    icon?: ReactNode;
}

/**
 * Usamos `forwardRef` para que podamos pasar `ref` y que apunte al <button> interno.
 * Extendemos de `React.ButtonHTMLAttributes<HTMLButtonElement>` para aceptar
 * todas las props nativas de un botón.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, design, icon, className, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            className={`flex gap-2 px-4 py-2 font-sans text-base font-bold transition duration-500 ${design ?? ''} ${className ?? ''}`}
            {...rest} // incluye onClick, disabled, title, type, etc.
        >
            {icon}
            {children}
        </button>
    );
});

Button.displayName = 'Button'; // Evita el "Anonymous" en las devtools

export default Button;
