import { useEffect, useRef, useState } from 'react';
import { SlOptions } from 'react-icons/sl';

interface DropdownMenuProps {
    onDelete?: () => void;
    onEdit?: () => void;
    buttonRef: React.RefObject<HTMLButtonElement> | ((el: HTMLButtonElement | null) => void);
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onDelete, onEdit, buttonRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Cerrar el dropdown si se hace clic fuera
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
        <div ref={dropdownRef} className="relative">
            <button
                ref={buttonRef as React.RefObject<HTMLButtonElement>}
                onClick={toggleMenu}
                className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
                type="button"
                title="Opciones"
            >
                <SlOptions className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 w-40 rounded-lg border bg-white shadow-lg">
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <button
                                onClick={onEdit}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                                ✏️ Editar empleado
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={onDelete}
                                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                            >
                                ❌ Eliminar empleado
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
