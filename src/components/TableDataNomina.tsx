import React from 'react';
import { FaFilePdf } from 'react-icons/fa6';
import Button from './Button';
import { PayrollInterface } from '../types';
import { downloadPayrollPDF } from '../services/pdf.service';

interface TableDataNominaProps {
    fields: string[];
    data: PayrollInterface[];
}

const TableDataNomina: React.FC<TableDataNominaProps> = ({ fields, data }) => {
    return (
        <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
            {/* Encabezados */}
            <div
                className='grid bg-gray-200 p-3 text-center font-semibold text-gray-700'
                style={{ gridTemplateColumns: `repeat(${fields.length + 1}, 1fr)` }}>
                {fields.map((field, index) => (
                    <div key={index}>{field}</div>
                ))}
                <div>Acciones</div>
            </div>

            {/* Contenido */}
            <div className='divide-y divide-gray-300'>
                {data.length > 0 ? (
                    data.map(item => (
                        <div
                            key={item.folio}
                            className='grid grid-cols-8 items-center p-3 text-center text-gray-800 odd:bg-gray-50'>
                            {/* Datos dinámicos según los fields */}
                            <div>{`NOM${item.folio.toString().padStart(4, '0')}`}</div>
                            <div>{`${item.empleado?.nombre} ${item.empleado?.apellido}`}</div>
                            <div>{new Date(item.fecha).toLocaleDateString()}</div>
                            <div>${item.sueldo.toFixed(2)}</div>
                            <div>${item.prestamos.toFixed(2)}</div>
                            <div>${item.infonavit.toFixed(2)}</div>
                            <div className='font-semibold text-green-600'>
                                ${(item.sueldo - item.prestamos - item.infonavit).toFixed(2)}
                            </div>

                            {/* Acciones */}
                            <div className='flex justify-center gap-2'>
                                <Button
                                    onClick={() => downloadPayrollPDF(item.folio)}
                                    design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                    <span className='relative pt-0.5'>
                                        <FaFilePdf size={17} />
                                    </span>
                                    Generar PDF
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='p-3 text-center text-gray-500'>No hay nóminas disponibles</div>
                )}
            </div>
        </div>
    );
};

export default TableDataNomina;
