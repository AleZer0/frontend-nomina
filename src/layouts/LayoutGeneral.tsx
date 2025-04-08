import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { ReactNode } from 'react';

interface LayoutType {
    children: ReactNode;
}

const LayoutGeneral: React.FC<LayoutType> = ({ children }) => {
    return (
        <div className='flex h-screen w-screen flex-col overflow-hidden transition-all duration-300'>
            <Sidebar />
            <main className='relative top-20 min-h-screen flex-1 overflow-y-auto bg-gray-100 bg-gradient-to-r to-gray-200'>
                <Header />
                {children}
            </main>
        </div>
    );
};

export default LayoutGeneral;
