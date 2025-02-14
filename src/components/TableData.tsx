import React from 'react';

interface TableDataProps<T> {
    fields: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
}

function TableData<T>({ fields, data, renderRow }: TableDataProps<T>) {
    const gridCols = `grid-cols-${fields.length}`; // Ajusta dinámicamente el número de columnas

    return (
        <div className='overflow-visible rounded-lg bg-white shadow-lg'>
            {/* Encabezados */}
            <div className={`grid ${gridCols} bg-gray-200 p-3 text-center font-semibold text-gray-700`}>
                {fields.map((field, index) => (
                    <div key={index}>{field}</div>
                ))}
            </div>

            {/* Contenido */}
            <div className='divide-y divide-gray-300'>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`grid ${gridCols} items-center p-3 text-center text-gray-800 odd:bg-gray-50`}>
                        {renderRow(item, index)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TableData;
