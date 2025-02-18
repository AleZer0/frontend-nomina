// src/components/DropdownMenu.tsx
import { useEffect, useRef, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Button from './Button';

interface DropdownMenuProps {
    onDelete?: () => void;
    onEdit?: () => void;
    onView?: () => void;
    /**
     * Podemos recibir un ref externo para el botón,
     * o podemos no usarlo. Si no te hace falta, puedes volverlo opcional.
     */
    buttonRef?: React.RefObject<HTMLButtonElement> | ((el: HTMLButtonElement | null) => void);
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onDelete, onEdit, onView, buttonRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className='relative'>
            <Button
                ref={buttonRef} // el 'ref' se pasa a Button, que ya lo maneja con forwardRef
                onClick={toggleMenu}
                className='absolute flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-200'
                type='button'
                title='Opciones'>
                <SlOptions className='h-4 w-4' />
            </Button>

            {isOpen && (
                <div className='absolute top-9 -right-8 z-50 w-48 rounded-lg bg-blue-50 shadow-2xl'>
                    <ul className='py-2 text-sm text-gray-700'>
                        <li>
                            <Button
                                onClick={onView}
                                design='block w-full cursor-pointer px-4 py-2 text-sm  text-left hover:bg-blue-100 hover:font-bold'>
                                <span className='relative pt-0.5'>
                                    <MdEdit size={17} />
                                </span>
                                Editar empleado
                            </Button>
                        </li>
                        <li>
                            <Button
                                onClick={onDelete}
                                design='block w-full cursor-pointer px-4 py-2 text-sm text-left text-red-600 hover:bg-blue-100 hover:font-bold'>
                                <span className='relative pt-0.5'>
                                    <RiDeleteBin6Fill size={17} />
                                </span>
                                Eliminar empleado
                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
