'use client';

import type React from 'react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    closeOnOverlayClick?: boolean;
    containerClassName?: string;
    overlayClassName?: string;
    zIndex?: number;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    closeOnOverlayClick = false,
    containerClassName,
    overlayClassName,
    zIndex = 50,
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [animationClass, setAnimationClass] = useState('opacity-0 scale-95');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const timer = setTimeout(() => {
                setAnimationClass('opacity-100 scale-100');
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setAnimationClass('opacity-0 scale-95');
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === overlayRef.current) {
            onClose();
        }
    };

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    if (!isOpen) return null;

    const modalContent = (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className={`bg-opacity-40 fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            } ${overlayClassName || ''}`}
            style={{ zIndex }}>
            <div
                className={`relative max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ease-out ${animationClass} ${containerClassName || ''}`}
                style={{ zIndex: zIndex + 1 }}>
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <AiOutlineClose className='cursor-pointer text-2xl' onClick={onClose} />
                </div>
                <div>{children}</div>
                {footer && <div className='mt-4'>{footer}</div>}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;
