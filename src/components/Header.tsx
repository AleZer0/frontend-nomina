import React, { ReactNode } from 'react';

interface HeaderProps {
    children?: ReactNode;
    tittle?: string;
}

const Header: React.FC<HeaderProps> = ({ children, tittle }) => {
    return (
        <header className='text-lef flex items-center justify-between bg-gradient-to-r bg-gray-800 to-blue-400 p-5 text-white shadow-md'>
            <h1 className='text-4xl font-bold tracking-wider'>{tittle}</h1>
            {children}
        </header>
    );
};

export default Header;
