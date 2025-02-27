import { useNavigate } from 'react-router-dom';

import { PiUsersThreeFill } from 'react-icons/pi';
import { IoDocuments } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { GiEntryDoor } from 'react-icons/gi';
import { BsCash } from 'react-icons/bs';

import Button from './Button';

import { routes } from '../routes';

import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className='fixed z-40 flex h-screen w-64 flex-auto flex-col bg-slate-900 bg-gradient-to-r to-slate-800 pt-20 text-white'>
            <ul className='flex flex-col'>
                {routes.map((route, index) => (
                    <li
                        key={index}
                        onClick={() => navigate(route.path)}
                        className='flex cursor-pointer items-center gap-3 border-b border-slate-400 bg-gradient-to-r px-4 py-2 transition-all duration-200 hover:to-slate-500'>
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
                    className='w-full rounded-none bg-gradient-to-r px-4 py-2 transition-all duration-200 hover:to-slate-500'>
                    Cerrar sesión
                </Button>
            </div>
        </nav>
    );
};

export default Sidebar;
