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
            <h1 className='flex h-20 items-center border-b border-slate-500 px-4 text-lg font-bold'>
                Nombre y Logo de Empresa
            </h1>
            <nav className='flex-grow'>
                <ul>
                    {routes.map((route, index) => (
                        <li key={index} className='border-b-1 border-slate-500'>
                            <Button
                                onClick={() => navigate(route.path)}
                                design='cursor-pointer w-full text-md font-medium text-white hover:bg-blue-100 hover:text-black'>
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
            <div className='border-t-1 border-slate-500'>
                <Button
                    onClick={handleLogout}
                    design='cursor-pointer w-full text-md font-medium text-white hover:bg-blue-100 hover:text-black'
                    disabled={false}>
                    <span className='relative pt-1'>
                        <GiEntryDoor />
                    </span>
                    Cerrar sesión
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
