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
    colCount === 8 ? 'grid-cols-8' : colCount === 6 ? 'grid-cols-6' : colCount === 7 ? 'grid-cols-7' : 'grid-cols-7'; // Fallback si no coincide

    // const [currentPage, setCurrentPage] = useState(1);
    // const totalPages = Math.ceil(data.length / itemsPerPage); // Total de páginas disponibles

    // // 4. Obtener los datos para la página actual
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const currentPageData = data.slice(startIndex, startIndex + itemsPerPage);

    // // 5. Cambiar la página
    // const handlePreviousPage = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    // const handleNextPage = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    return (
        <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
            {/* Encabezados */}
            <div className={`grid auto-cols-fr grid-flow-col bg-gray-200 p-3 text-center font-semibold text-gray-700`}>
                {fields.map((field, index) => (
                    <div key={index} className=''>
                        {field}
                    </div>
                ))}
            </div>

            {/* Contenido */}
            <div className='divide-y divide-gray-300'>
                {/* {currentPageData.length > 0 ? (
                    currentPageData.map((item, index) => ( */}
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div
                            key={index}
                            className={`grid auto-cols-fr grid-flow-col items-center p-3 text-center text-gray-800 odd:bg-gray-50`}>
                            {renderRow(item, index)}
                        </div>
                    ))
                ) : (
                    <div className='grid items-center p-6 text-center text-gray-500'>No hay registros disponibles</div>
                )}
            </div>
        </div>
        //
        //         currentPage={currentPage}
        //         totalPages={totalPages}
        //         onPrevious={handlePreviousPage}
        //         onNext={handleNextPage}
        //     />
        // </div>
    );
}

export default TableData;
