import React, { ReactNode } from 'react';
import Button from './Button';
import { MdCancel } from 'react-icons/md';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    name: string;
    children: ReactNode;
    footer?: ReactNode; // Botones personalizados
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className='flex justify-between'>
                <h1>{title}</h1>
                <MdCancel onClick={onClose} />
            </div>
            <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>{children}</div>
        </>
    );
};

export default Modal;
