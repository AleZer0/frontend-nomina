import React, { ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa';

interface PopupProps {
    children?: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children }) => {
    return (
        <div
            className='fixed top-4 left-1/2 z-50 flex max-w-xl -translate-x-1/2 transform justify-center rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800 shadow-md transition-transform duration-500 dark:border-green-800 dark:bg-green-200 dark:text-green-800'
            role='alert'>
            <span className='me-2 h-4 w-4'>
                <FaCheck size={17} />
            </span>
            <div>
                <span className='font-medium'>{children}</span>
            </div>
        </div>
    );
};

export default Popup;
