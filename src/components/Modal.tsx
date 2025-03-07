import React, { ReactNode, useEffect, useRef } from 'react';
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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
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

    const modalContent = (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className={`bg-opacity-40 fixed inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ${overlayClassName || ''}`}
            style={{ zIndex }}>
            <div
                className={`relative max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-lg transition-transform duration-300 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 ${containerClassName || ''}`}
                style={{ zIndex: zIndex + 1 }}>
                <div className='sticky top-0 z-10 flex items-center justify-between bg-white px-10 pt-6 pb-2'>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <AiOutlineClose
                        className='cursor-pointer rounded-2xl bg-gray-100 p-0.5 text-2xl hover:bg-gray-200'
                        onClick={onClose}
                        size={25}
                    />
                </div>
                <div className='px-10 pt-2 pb-6'>{children}</div>
                {footer && <div className='mt-4'>{footer}</div>}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;
