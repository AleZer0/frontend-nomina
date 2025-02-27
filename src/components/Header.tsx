import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface HeaderProps {
    title?: string;
    children?: ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    gradient?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title = '',
    children,
    className = '',
    align = 'left',
    size = 'lg',
    gradient = true,
}) => {
    return (
        <header
            className={clsx(
                'fixed top-0 left-0 z-50 flex min-h-[var(--header-height)] w-full items-center justify-between p-5 text-white',
                'ml-[var(--sidebar-width)] transition-all duration-300',
                gradient && 'bg-slate-500 bg-gradient-to-r to-slate-900',
                className
            )}>
            {/* Contenedor del título */}
            <h1
                className={clsx(
                    'flex-1 font-bold tracking-wider',
                    align === 'center' && 'text-center',
                    align === 'right' && 'text-right',
                    size === 'sm' && 'text-xl',
                    size === 'md' && 'text-2xl',
                    size === 'lg' && 'text-3xl',
                    size === 'xl' && 'text-4xl'
                )}>
                {title}
            </h1>

            {/* Contenedor de los botones u otros elementos */}
            {children && <div className='flex items-center gap-2'>{children}</div>}
        </header>
    );
};

export default Header;
