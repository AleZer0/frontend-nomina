import React, { ReactNode } from 'react';
import { MdCancel } from 'react-icons/md';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode; // Botones personalizados
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md'>
            <div className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-4 flex items-center justify-between'>
                    <h1 className='text-xl font-bold'>{title}</h1>
                    <MdCancel className='cursor-pointer text-2xl' onClick={onClose} />
                </div>
                <div>{children}</div>
                {footer && <div className='mt-4'>{footer}</div>}
            </div>
        </div>
    );
};

export default Modal;
