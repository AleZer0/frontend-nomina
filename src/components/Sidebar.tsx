import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../routes';
import Button from './Button';
import { PiUsersThreeFill } from 'react-icons/pi';
import { IoDocuments } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { GiEntryDoor } from 'react-icons/gi';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className='fixed flex h-screen w-64 flex-col bg-slate-800 bg-gradient-to-r to-slate-600 text-white'>
            <h1 className='h-20 p-5 text-xl font-bold'>Nombre y Logo de Empresa</h1>
            <nav className='flex-grow p-4'>
                <ul>
                    {routes.map((route, index) => (
                        <li key={index} className='mb-2'>
                            <Button
                                onClick={() => navigate(route.path)}
                                design='cursor-pointer w-full rounded px-4 py-2 text-md font-medium text-white hover:bg-blue-300'>
                                <span className='relative pt-0.5'>
                                    {route.name != 'Empleados' ? (
                                        route.name != 'Nominas' ? (
                                            route.name === 'Reportes semanales' && <BiSolidReport size={17} />
                                        ) : (
                                            <IoDocuments size={17} />
                                        )
                                    ) : (
                                        <PiUsersThreeFill size={17} />
                                    )}
                                </span>
                                {route.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
            <Button
                onClick={handleLogout}
                design='bg-red-900 w-60 cursor-pointer flex justify-center items-center rounded p-2 absolute bottom-5 left-2'
                disabled={false}>
                <span className='relative'>
                    <GiEntryDoor />
                </span>
                Cerrar sesión
            </Button>
        </div>
    );
};

export default Sidebar;
