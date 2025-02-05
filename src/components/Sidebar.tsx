import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../routes';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            throw new Error(`Error al cerrar sesión: ${error}`);
        }
    };

    return (
        <div className='fixed flex h-screen w-64 flex-col bg-gray-800 text-white'>
            <h1 className='h-20 border-b border-gray-700 p-5 text-xl font-bold'>Control de nominas</h1>
            <nav className='flex-grow p-4'>
                <ul>
                    {routes.map((route, index) => (
                        <li key={index} className='mb-2'>
                            <Link to={route.path} className='block rounded p-2 hover:bg-gray-700'>
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <button
                onClick={handleLogout}
                className='absolute right-4 bottom-4 left-4 w-auto cursor-pointer rounded bg-blue-400 p-2 text-left transition-colors hover:bg-blue-500'>
                ❌ Cerrar Sesión
            </button>
        </div>
    );
};

export default Sidebar;
