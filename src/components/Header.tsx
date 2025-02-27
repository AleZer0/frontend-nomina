import React, { ReactNode } from 'react';
import clsx from 'clsx';
import xrom_logo_1 from '../assets/xrom_logo_1.png';

interface HeaderProps {
    title?: string;
    children?: ReactNode;
    align?: 'left' | 'center' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Header: React.FC<HeaderProps> = ({ title = '', children, align = 'left', size = 'lg' }) => {
    return (
        <header className='fixed top-0 left-0 z-40 flex min-h-20 w-full items-center bg-slate-900 bg-gradient-to-r to-slate-500 text-white'>
            <div className='flex h-20 w-64 items-center justify-center border-b border-slate-400'>
                <img src={xrom_logo_1} alt='Logo' className='h-12' />
            </div>

            <div className='flex flex-1 justify-start'>
                <h1
                    className={clsx(
                        'font-bold tracking-wider',
                        align === 'center' && 'text-center',
                        align === 'right' && 'text-right',
                        size === 'sm' && 'text-xl',
                        size === 'md' && 'text-2xl',
                        size === 'lg' && 'text-3xl',
                        size === 'xl' && 'text-4xl'
                    )}>
                    {title}
                </h1>
            </div>

            <div className='mr-4 flex items-center justify-end'>{children}</div>
        </header>
    );
};

export default Header;
