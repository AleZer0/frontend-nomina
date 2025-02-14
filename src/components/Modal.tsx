import React from 'react';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    name: string;
    children: React.ReactNode;
    footer?: React.ReactNode; // Botones personalizados
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-md'>
            <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
                <div className='flex items-center justify-between border-b pb-2'>
                    <h2 className='text-lg font-semibold'>{title}</h2>
                    <Button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
                        &times;
                    </Button>
                </div>
                <div className='mt-4'>{children}</div> {/* Contenido dinámico */}
                {/* Si hay footer, lo muestra */}
                <div className='mt-4 flex justify-end gap-2'>{footer}</div>
            </div>
        </div>
    );
};

export default Modal;
