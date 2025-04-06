import React, { ReactNode } from 'react';

import logotransportes from '../assets/logotransportes.png';

import { useGlobalContext } from '../context/GlobalContext';

import clsx from 'clsx';

interface HeaderProps {
    children?: ReactNode;
}

const Header: React.FC<HeaderProps> = () => {
    const { contentHeader, isSidebarOpen } = useGlobalContext();
    return (
        <header className='fixed top-0 left-0 z-10 flex min-h-20 w-full items-center text-black shadow-xl'>
            <div className='flex h-16 w-32 items-center justify-center pl-10 md:h-20 md:w-64'>
                <img
                    src={logotransportes}
                    alt='Logo'
                    className={clsx(
                        'h-12 object-contain transition-opacity duration-600 md:h-16',
                        isSidebarOpen ? 'opacity-100' : 'opacity-0'
                    )}
                />
            </div>
            <div className='flex w-full items-center justify-between px-4'>{contentHeader}</div>
        </header>
    );
};

export default Header;
