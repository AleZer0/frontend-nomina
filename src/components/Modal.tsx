import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
    popup?: ReactNode;
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
    popup,
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === overlayRef.current) {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot || !isOpen) return null;

    const modalContent = (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            } ${overlayClassName || ''}`}
            style={{ zIndex }}>
            <div className='px-10 pt-2 pb-6'>{popup && <div className='mb-4 flex justify-center'>{popup}</div>}</div>
            <div
                className={`relative max-h-[80vh] w-full max-w-4xl transform overflow-y-auto rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                } sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 ${containerClassName || ''}`}
                style={{ zIndex: zIndex + 1 }}>
                <div className='sticky top-0 z-50 flex items-center justify-between bg-white px-10 pt-6 pb-2'>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <AiOutlineClose
                        className='cursor-pointer rounded-2xl bg-gray-100 p-0.5 text-2xl hover:bg-gray-200'
                        onClick={handleClose}
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
