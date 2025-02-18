import React from 'react';

interface TableDataProps<T> {
    fields: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
}

function TableData<T>({ fields, data, renderRow }: TableDataProps<T>) {
    // 1. Calcula cuántas columnas necesitas
    const colCount = fields.length;

    // 2. Según cuántas columnas, asigna una clase de Tailwind
    const colClass =
        colCount === 8
            ? 'grid-cols-8'
            : colCount === 6
              ? 'grid-cols-6'
              : colCount === 7
                ? 'grid-cols-7'
                : 'grid-cols-7'; // Fallback si no coincide

    return (
        <div className='overflow-visible rounded-lg bg-white shadow-lg'>
            {/* Encabezados */}
            <div className={`grid ${colClass} bg-gray-200 p-3 text-center font-semibold text-gray-700`}>
                {fields.map((field, index) => (
                    <div key={index}>{field}</div>
                ))}
            </div>

            {/* Contenido */}
            <div className='divide-y divide-gray-300'>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`grid ${colClass} items-center p-3 text-center text-gray-800 odd:bg-gray-50`}>
                        {renderRow(item, index)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TableData;
