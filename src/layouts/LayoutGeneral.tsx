import Sidebar from '../components/Sidebar';
import { ReactNode } from 'react';

interface LayoutType {
    children: ReactNode;
}

const Layout: React.FC<LayoutType> = ({ children }) => {
    return (
        <div className='flex h-screen w-screen flex-col overflow-hidden transition-all duration-300'>
            <Sidebar />
            <main className='relative top-20 min-h-screen flex-1 overflow-y-auto bg-slate-200 bg-gradient-to-r to-slate-300'>
                {children}
            </main>
        </div>
    );
};

export default Layout;
