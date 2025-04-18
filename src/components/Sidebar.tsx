import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IoDocuments, IoMenu } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { PiUsersThreeFill } from 'react-icons/pi';
import { BsCash } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';

import Button from './Button';

import { routes } from '../routes';
import { useAuth } from '../context/AuthContext';
import { useGlobalContext } from '../context/GlobalContext';

import { Route } from '../types/extras';

const Sidebar: React.FC = () => {
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showText, setShowText] = useState(false);
    const { setParams, isSidebarOpen, toggleSidebar } = useGlobalContext();

    const handleClickPage = (page: Route) => {
        if (!page) return;
        setParams(prev => ({ ...prev, page: 1, limit: 10 }));
        navigate('/' + page.path);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        if (isSidebarOpen) {
            const timeout = setTimeout(() => setShowText(true), 300);
            return () => clearTimeout(timeout);
        } else {
            setShowText(false);
        }
    }, [isSidebarOpen]);

    return (
        <>
            <button
                className='fixed top-2 left-2 z-20 m-3 cursor-pointer p-2 text-black hover:text-gray-400'
                onClick={toggleSidebar}>
                <IoMenu size={22} />
            </button>
            <nav
                className={`fixed z-10 flex h-screen flex-col bg-white pt-20 text-black inset-shadow-xs shadow-current transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'w-64' : 'w-20'
                }`}>
                <ul role='list' className='flex flex-col'>
                    {routes.map((route, index) => (
                        <li key={route.name}>
                            {index !== 0 && <hr className='mx-4 border-t border-gray-300' />}
                            <div
                                onClick={() => handleClickPage(route)}
                                className={`m-3 flex cursor-pointer items-center gap-3 bg-gradient-to-r px-4 py-2 transition-all hover:border-l-8 hover:border-blue-500 ${
                                    pathname.includes(route.path) ? 'border-l-8 border-blue-500 to-blue-200' : ''
                                } hover:to-blue-300`}>
                                {route.name === 'Empleados' ? (
                                    <PiUsersThreeFill size={20} />
                                ) : route.name === 'Nóminas' ? (
                                    <IoDocuments size={20} />
                                ) : route.name === 'Préstamos' ? (
                                    <BsCash size={20} />
                                ) : route.name === 'Reportes semanales' ? (
                                    <BiSolidReport size={20} />
                                ) : (
                                    <IoDocuments size={20} />
                                )}

                                {showText && (
                                    <span className='text-sm font-medium opacity-100 transition-opacity duration-500'>
                                        {route.name}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className='m-3 mt-auto duration-300'>
                    <hr className='mx-4 border-t border-gray-300' />
                    <Button
                        variant='ghost'
                        size='md'
                        icon={<CiLogout size={17} />}
                        onClick={handleLogout}
                        className='w-full rounded-none bg-gradient-to-r px-4 py-2 transition-all duration-200 hover:border-l-8 hover:border-red-400 hover:to-red-200'>
                        {showText && 'Cerrar sesión'}
                    </Button>
                    <hr className='mx-4 border-t border-gray-300' />
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
