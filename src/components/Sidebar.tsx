import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import logotransportes from '../assets/logotransportes.png';

import { IoDocuments } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { PiUsersThreeFill } from 'react-icons/pi';
import { BsCash } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';

import Button from './Button';

import { routes } from '../routes';
import { useAuth } from '../context/AuthContext';
import { useGlobalContext } from '../context/GlobalContext';

import { Route } from '../types/extras';

const Sidebar: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<Route>(routes[0]);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showText, setShowText] = useState(false);
    const { setPagination, setActiveEntity, isSidebarOpen } = useGlobalContext();

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
            const timeout = setTimeout(() => setShowText(true), 300);
            return () => clearTimeout(timeout);
        } else {
            setShowText(false);
        }
    }, [isSidebarOpen]);

    return (
        <>
            {/* <button
                className='fixed top-4 left-2 z-50 cursor-pointer p-2 text-black hover:text-gray-400'
                onClick={toggleSidebar}>
                <IoMenu size={22} />
            </button> */}
            <nav
                className={`fixed z-40 flex h-screen flex-col bg-white pt-20 text-black transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'w-64' : 'w-20'
                }`}>
                <ul className='flex flex-col'>
                    {routes.map((route, index) => (
                        <li
                            key={index}
                            onClick={() => handleClickPage(route)}
                            className={`m-3 flex cursor-pointer items-center gap-3 border-y border-gray-500 bg-gradient-to-r px-4 py-2 transition-all hover:border-l-8 hover:border-blue-500 ${route.name === selectedPage?.name && 'to-blue-300'} hover:to-blue-400`}>
                            {route.name === 'Empleados' ? (
                                <PiUsersThreeFill size={20} />
                            ) : route.name === 'Operadores' ? (
                                <FaTruck size={20} />
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
                                <span className='text-sm font-medium opacity-100 transition-opacity duration-300'>
                                    {route.name}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                <div className='mt-auto'>
                    <Button
                        variant='ghost'
                        size='md'
                        icon={<CiLogout size={17} />}
                        onClick={handleLogout}
                        className='w-full rounded-none border-y bg-gradient-to-r px-4 py-2 transition-all duration-200 hover:to-blue-500'>
                        {showText && 'Cerrar sesión'}
                    </Button>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
