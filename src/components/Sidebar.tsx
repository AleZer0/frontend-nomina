import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUsers } from 'react-icons/fa';
import { IoDocuments, IoMenu } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { FaHandHoldingUsd } from 'react-icons/fa';

import Button from './Button';

import { routes } from '../routes';
import { useAuth } from '../context/AuthContext';
import { useGlobalContext } from '../context/GlobalContext';
import { Route } from '../types/extras';

const Sidebar: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<Route>(routes[0]);
    const [showText, setShowText] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { setPagination, setActiveEntity, toggleSidebar, isSidebarOpen } = useGlobalContext();

    const handleClickPage = (page: Route) => {
        if (!page) return;
        setSelectedPage(page);
        setPagination({ page: 1, limit: 10 });
        setActiveEntity(page.path);
        navigate('/' + page.path);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        if (isSidebarOpen) {
            const timeout = setTimeout(() => setShowText(true), 200); // Aparece después de la animación
            return () => clearTimeout(timeout);
        } else {
            setShowText(false);
        }
    }, [isSidebarOpen]);

    return (
        <>
            <button className='fixed top-4 left-2 z-50 p-2 text-white' onClick={toggleSidebar}>
                <IoMenu size={22} />
            </button>
            <nav
                className={`fixed z-40 flex h-screen flex-col bg-slate-900 bg-gradient-to-r to-slate-800 pt-20 text-white transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'w-64' : 'w-16'
                }`}>
                <ul className='flex flex-col'>
                    {routes.map((route, index) => (
                        <li
                            key={index}
                            onClick={() => handleClickPage(route)}
                            className={`flex cursor-pointer items-center gap-3 border-b border-slate-400 bg-gradient-to-r px-4 py-2 transition-all duration-200 ${route.name === selectedPage?.name && 'to-slate-500'} hover:to-slate-500`}>
                            {route.name === 'Empleados' ? (
                                <FaUsers size={17} />
                            ) : route.name === 'Nominas' ? (
                                <IoDocuments size={17} />
                            ) : route.name === 'Préstamos' ? (
                                <FaHandHoldingUsd size={17} />
                            ) : route.name === 'Reportes semanales' ? (
                                <BiSolidReport size={17} />
                            ) : (
                                <IoDocuments size={17} />
                            )}
                            {showText && (
                                <span className='text-sm font-medium opacity-100 transition-opacity duration-300'>
                                    {route.name}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                <div className='mt-auto border-t border-slate-400'>
                    <Button
                        variant='ghost'
                        size='md'
                        icon={<CiLogout size={17} />}
                        onClick={handleLogout}
                        className='w-full rounded-none bg-gradient-to-r px-4 py-2 transition-all duration-200 hover:to-slate-500'>
                        {showText && 'Cerrar sesión'}
                    </Button>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
