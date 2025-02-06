import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../routes';
import Button from './Button';

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
            <Button
                onClick={handleLogout}
                children='Cerrar sesión'
                design='bg-red-400 w-60 cursor-pointer flex justify-center items-center rounded p-2 absolute bottom-5 left-2'
                disabled={false}
            />
        </div>
    );
};

export default Sidebar;
