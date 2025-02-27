import { useNavigate } from 'react-router-dom';

import { PiUsersThreeFill } from 'react-icons/pi';
import { IoDocuments } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { GiEntryDoor } from 'react-icons/gi';
import { BsCash } from 'react-icons/bs';

import Button from './Button';

import { routes } from '../routes';

import { useAuth } from '../context/AuthContext';

import xrom_logo_1 from '../assets/xrom_logo_1.png';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className='fixed flex h-screen w-64 flex-col bg-slate-600 bg-gradient-to-r to-slate-500 text-white'>
            <div className='flex h-20 items-center justify-center border-b border-slate-400'>
                <img src={xrom_logo_1} alt='Logo' className='h-10' />
            </div>

            <ul className='flex flex-col'>
                {routes.map((route, index) => (
                    <li
                        key={index}
                        onClick={() => navigate(route.path)}
                        className='flex cursor-pointer items-center gap-3 border-b border-slate-400 px-4 py-2 transition-all duration-200 hover:bg-slate-600'>
                        {route.name === 'Empleados' ? (
                            <PiUsersThreeFill size={17} />
                        ) : route.name === 'Nominas' ? (
                            <IoDocuments size={17} />
                        ) : route.name === 'Préstamos' ? (
                            <BsCash size={17} />
                        ) : route.name === 'Reportes semanales' ? (
                            <BiSolidReport size={17} />
                        ) : (
                            <IoDocuments size={17} />
                        )}
                        <span className='text-sm font-medium'>{route.name}</span>
                    </li>
                ))}
            </ul>

            <div className='mt-auto border-t border-slate-400'>
                <Button
                    variant='ghost'
                    size='md'
                    icon={<GiEntryDoor size={17} />}
                    onClick={handleLogout}
                    className='w-full rounded-none px-4 py-2 transition-all duration-200 hover:bg-slate-600'>
                    Cerrar sesión
                </Button>
            </div>
        </nav>
    );
};

export default Sidebar;
