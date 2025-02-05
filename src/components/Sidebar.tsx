import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../routes';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div className='fixed h-screen w-64 bg-gray-800 text-white flex flex-col'>
            <h1 className='border-b border-gray-700 p-4 text-2xl font-bold'>Nóminas</h1>
            <nav className='p-4 flex-grow'>
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
                onClick={logout}
                className='absolute bottom-4 left-4 right-4 w-auto rounded p-2 text-left bg-blue-400 hover:bg-blue-500 transition-colors cursor-pointer'
            >
                ❌ Cerrar Sesión
            </button>
        </div>
    );
};

export default Sidebar;
