import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PiUsersThreeFill } from 'react-icons/pi';
import { IoDocuments, IoMenu } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { GiEntryDoor } from 'react-icons/gi';
import { BsCash } from 'react-icons/bs';

import Button from './Button';

import { routes } from '../routes';

import { useAuth } from '../context/AuthContext';
import { Route } from '../types/extras';
import { useGlobalContext } from '../context/GlobalContext';

const Sidebar: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<Route>(routes[0]);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleClickPage = (page: Route) => {
        if (!page) return;
        setSelectedPage(page);
        navigate(page.path);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const { isSidebarOpen, toggleSidebar } = useGlobalContext();

    return (
        <>
            <button className='fixed top-4 left-2 z-50 p-2 text-white' onClick={toggleSidebar}>
                <IoMenu size={22} />
            </button>
            <nav
                className={`transition-width fixed z-40 flex h-screen flex-col bg-slate-900 bg-gradient-to-r to-slate-800 pt-20 text-white duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
                <ul className='flex flex-col'>
                    {routes.map((route, index) => (
                        <li
                            key={index}
                            onClick={() => handleClickPage(route)}
                            className={`flex cursor-pointer items-center gap-3 border-b border-slate-400 bg-gradient-to-r px-4 py-2 transition-all duration-200 ${
                                route.name === selectedPage?.name && 'to-slate-500'
                            } hover:to-slate-500`}>
                            {route.name === 'Empleados' ? (
                                <PiUsersThreeFill size={20} />
                            ) : route.name === 'Nominas' ? (
                                <IoDocuments size={20} />
                            ) : route.name === 'Préstamos' ? (
                                <BsCash size={20} />
                            ) : route.name === 'Reportes semanales' ? (
                                <BiSolidReport size={20} />
                            ) : (
                                <IoDocuments size={20} />
                            )}
                            <span
                                className={`text-sm font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'hidden opacity-0'}`}>
                                {route.name}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className='mt-auto border-t border-slate-400'>
                    <Button
                        variant='ghost'
                        size='md'
                        icon={<GiEntryDoor size={17} />}
                        onClick={handleLogout}
                        className='w-full rounded-none bg-gradient-to-r px-4 py-2 transition-all duration-200 hover:to-slate-500'>
                        {isSidebarOpen && 'Cerrar sesión'}
                    </Button>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
