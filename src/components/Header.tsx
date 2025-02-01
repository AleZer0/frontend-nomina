import React, { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
  tittle?: string;
}
 
const Header: React.FC<HeaderProps> = ({children, tittle}) => {
  return (
    <header className="bg-blue-600 flex items-center justify-between text-white p-5 text-lef shadow-md">
        <h1 className='text-4xl font-bold'>{tittle}</h1>
        {children}
    </header>
  );
};

export default Header;