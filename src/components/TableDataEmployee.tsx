import React from 'react';
import { Link } from 'react-router-dom';
import { HiDocumentPlus } from 'react-icons/hi2';
import DropdownMenu from './DropdownMenu';
import Button from './Button';
import { Employee } from '../pages/Employees'; // Ajusta la ruta si es distinta

interface TableDataEmployeeProps {
    fields: string[]; // Encabezados de la tabla
    data: Employee[]; // Lista de empleados
    onGenerateNomina: (employee: Employee) => void; // Callback para generar nómina
    onEdit: (employee: Employee) => void; // Callback para editar
    onDelete: (id_empleado: number) => void; // Callback para eliminar
    buttonRefs?: React.MutableRefObject<(HTMLButtonElement | null)[]>; // refs para DropdownMenu
}

const TableDataEmployee: React.FC<TableDataEmployeeProps> = ({
    fields,
    data,
    onGenerateNomina,
    onEdit,
    onDelete,
    buttonRefs,
}) => {
    return (
        <main className='p-6'>
            <div className='overflow-visible rounded-lg bg-white shadow-lg'>
                {/* Encabezados */}
                <div className='grid grid-cols-6 bg-gray-200 p-3 text-center font-semibold text-gray-700'>
                    {fields.map((field, index) => (
                        <div key={index}>{field}</div>
                    ))}
                </div>

                {/* Contenido */}
                <div className='divide-y divide-gray-300'>
                    {data.map((item, index) => (
                        <div
                            key={item.id_empleado}
                            className='grid grid-cols-6 items-center p-3 text-center text-gray-800 odd:bg-gray-50'>
                            {/* Columna: Nombre */}
                            <div>{item.nombre}</div>

                            {/* Columna: Apellidos */}
                            <div>{item.apellido}</div>

                            {/* Columna: Puesto */}
                            <div>{item.puesto}</div>

                            {/* Columna: Sueldo */}
                            <div>${item.sueldo.toFixed(2)}</div>

                            {/* Columna: Última Nómina (aquí un link de ejemplo) */}
                            <div>
                                Folio:
                                <Link to='/payroll' className='text-blue-600 underline'>
                                    {' N/A'}
                                </Link>
                            </div>

                            {/* Columna: Acciones */}
                            <div className='flex justify-center gap-2'>
                                <Button
                                    onClick={() => onGenerateNomina(item)}
                                    design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                    <span className='relative pt-0.5'>
                                        <HiDocumentPlus size={17} />
                                    </span>
                                    Generar Nómina
                                </Button>

                                <DropdownMenu
                                    // Guardamos la referencia del botón si se necesita en la lógica de Dropdown
                                    buttonRef={el => {
                                        if (buttonRefs) {
                                            buttonRefs.current[index] = el;
                                        }
                                    }}
                                    onDelete={() => onDelete(item.id_empleado)}
                                    onEdit={() => onEdit(item)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default TableDataEmployee;
