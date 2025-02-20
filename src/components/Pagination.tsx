import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrevious, onNext }) => {
    return (
        <div className='flex justify-between p-4'>
            <button
                className='rounded bg-blue-500 px-4 py-2 text-white'
                onClick={onPrevious}
                disabled={currentPage === 1}>
                Anterior
            </button>
            <span>
                Página {currentPage} de {totalPages}
            </span>
            <button
                className='rounded bg-blue-500 px-4 py-2 text-white'
                onClick={onNext}
                disabled={currentPage === totalPages}>
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
