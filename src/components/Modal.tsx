import React, { ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export interface ModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className='bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
            <div className='relative max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-8 shadow-lg sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2'>
                <div className='mb-4 flex items-center justify-between'>
                    <h1 className='text-xl font-bold'>{title}</h1>
                    <AiOutlineClose className='cursor-pointer text-2xl' onClick={onClose} />
                </div>
                <div>{children}</div>
                {footer && <div className='mt-4'>{footer}</div>}
            </div>
        </div>
    );
};

export default Modal;
