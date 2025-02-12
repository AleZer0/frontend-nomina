import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { routes } from '../routes';
import Button from './Button';
import { PiUsersThreeFill } from 'react-icons/pi';
import { IoDocuments } from 'react-icons/io5';
import { BiSolidReport } from 'react-icons/bi';
import { GiEntryDoor } from 'react-icons/gi';
import { FaBars } from 'react-icons/fa';
import xrom_logo_1 from '../assets/xrom_logo_1.png';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(true);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div
            className={`fixed h-screen bg-slate-700 text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
            {/* Toggle Button */}
            <div className='flex items-center justify-between border-b border-slate-400 p-4'>
                {isExpanded && <img src={xrom_logo_1} alt='Logo' className='h-10' />}
                <button onClick={() => setIsExpanded(!isExpanded)} className='text-white focus:outline-none'>
                    <FaBars size={20} />
                </button>
            </div>

            {/* Sidebar Items */}
            <nav className='flex-grow overflow-y-auto'>
                <ul>
                    {routes.map((route, index) => (
                        <li key={index} className='border-b border-slate-500'>
                            <Button onClick={() => navigate(route.path)} type='button' variant='secondary'>
                                <span>
                                    {route.name === 'Empleados' && <PiUsersThreeFill size={20} />}
                                    {route.name === 'Nominas' && <IoDocuments size={20} />}
                                    {route.name === 'Reportes semanales' && <BiSolidReport size={20} />}
                                </span>
                                {isExpanded && <span>{route.name}</span>}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className='border-t border-slate-500 p-2'>
                <Button onClick={handleLogout} type='button' variant='secondary'>
                    <GiEntryDoor size={20} />
                    {isExpanded && <span>Cerrar sesión</span>}
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
