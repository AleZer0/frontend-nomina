import React, { ReactNode } from 'react';

interface HeaderProps {
    children?: ReactNode;
    tittle?: string;
}

const Header: React.FC<HeaderProps> = ({ children, tittle }) => {
    return (
        <header className='text-lef flex items-center justify-between bg-slate-500 bg-gradient-to-r to-slate-900 p-5 text-white shadow-md'>
            <h1 className='text-3xl font-bold tracking-wider'>{tittle}</h1>
            {children}
        </header>
    );
};

export default Header;
