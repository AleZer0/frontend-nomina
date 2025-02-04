import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { SlOptions } from 'react-icons/sl';

interface DropdownMenuProps {
    onClick?: () => void;
}

const data = [
    {
        nombre: 'Alexis',
        apellidos: 'Diaz',
        puesto: 'Programador Junior',
        sueldo: '1500 MNX',
        ultimaNomina: 'NOM001',
    },
    {
        nombre: 'Hashley',
        apellidos: 'Aquino',
        puesto: 'Programador Junior',
        sueldo: '1500 MNX',
        ultimaNomina: 'NOM002',
    },
    // Otros registros...
];

const Employees: React.FC = () => {
    return (
        <div className='flex-1'>
            {' '}
            {/* Permite que el contenido de la pagina ocupe todo el espacio disponible despues del sidebar */}
            <Header tittle={'Listado de Empleados'}></Header>
            {/* El titulo del header se debe enviar de esta manera */}
            <main className='p-5'>
                {' '}
                {/* Definir un espacio o area para el contenido debajo del header */}
                <div className='space-y-2'>
                    {/* Encabezado */}
                    <ul className='flex flex-col rounded-2xl bg-gray-100 p-1'>
                        <li className='relative mt-1.5 flex flex-row items-center p-1.5 font-semibold tracking-wide after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gray-400'>
                            <div className='flex flex-1'>Nombre</div>
                            <div className='flex flex-1'>Apellidos</div>
                            <div className='flex flex-1'>Puesto de trabajo</div>
                            <div className='flex flex-1'>Sueldo</div>
                            <div className='flex flex-1'>Ultima nomina</div>
                            <div className='flex flex-1'>Opciones</div>
                        </li>
                        {data.map((item, index) => (
                            <li
                                key={index}
                                className='relative flex flex-row items-center p-1.5 text-sm tracking-tight after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gray-300'>
                                <div className='flex flex-1'>{item.nombre}</div>
                                <div className='flex flex-1'>{item.apellidos}</div>
                                <div className='flex flex-1'>{item.puesto}</div>
                                <div className='flex flex-1'>{item.sueldo}</div>
                                <div className='flex flex-1'>
                                    Folio:
                                    <Link to={'/payroll'} className='flex flex-1 text-blue-600 underline'>
                                        {' ' + item.ultimaNomina}
                                    </Link>
                                </div>
                                <button className='flex flex-1 text-blue-600 hover:underline'>Generar Nómina</button>
                                <DropdownMenu />
                            </li>
                        ))}
                    </ul>
                    {/* Filas de datos */}
                </div>
            </main>
        </div>
    );
};
const DropdownMenu: React.FC<DropdownMenuProps> = ({ onClick }) => {
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
            <button
                onClick={toggleMenu}
                className='inline-flex items-center rounded-lg text-sm text-black hover:bg-green-300 focus:bg-green-400'
                type='button'>
                <SlOptions className='absolute right-1.5 bottom-0.5 h-4 w-4 font-thin' />
            </button>

            {isOpen && (
                <div className='absolute top-8 right-0 z-20 w-44 rounded-lg bg-green-50 shadow-md'>
                    <ul className='py-2 text-sm text-black'>
                        <li>
                            <button className='block w-full px-4 py-2 text-left hover:bg-green-100 hover:font-bold'>
                                Editar empleado
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={onClick}
                                className='block w-full px-4 py-2 text-left text-red-600 hover:bg-green-100 hover:font-bold'>
                                Eliminar empleado
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
export default Employees;
