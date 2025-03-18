import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { IoMenu } from 'react-icons/io5';
import { useGlobalContext } from '../context/GlobalContext';
import logotransportes from '../assets/logotransportes.png';

interface HeaderProps {
    title?: string;
    children?: ReactNode;
    align?: 'left' | 'center' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Header: React.FC<HeaderProps> = ({ title = '', children, align = 'left', size = 'lg' }) => {
    const { toggleSidebar, isSidebarOpen } = useGlobalContext();
    return (
        <header className='fixed top-0 left-0 z-40 flex min-h-20 w-full items-center text-black shadow-xl'>
            <div className='flex h-16 w-32 items-center justify-center pl-4 md:h-20 md:w-64'>
                <button
                    className='fixed top-4 left-2 z-50 cursor-pointer p-2 text-black hover:text-gray-400'
                    onClick={toggleSidebar}>
                    <IoMenu size={22} />
                </button>
                <img
                    src={logotransportes}
                    alt='Logo'
                    className={clsx(
                        'h-12 object-contain transition-opacity duration-600 md:h-16',
                        isSidebarOpen ? 'opacity-100' : 'opacity-0'
                    )}
                />
            </div>
            <div className={`flex flex-1 justify-start duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
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
