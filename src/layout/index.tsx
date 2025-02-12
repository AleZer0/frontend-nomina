import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Layout: React.FC = () => {
    return (
        <div className='flex h-screen bg-blue-500'>
            <Sidebar />

            <div className='flex flex-1 flex-col bg-red-500 p-4 md:ml-16'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
