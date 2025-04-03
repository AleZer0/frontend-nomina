import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Button from './Button';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

const Pagination: React.FC = () => {
    const { pagination, setPagination, activeEntity, metaData } = useGlobalContext();
    const { page } = pagination;
    const totalPages = metaData[activeEntity].totalPages;
    const [inputPage, setInputPage] = useState(page);

    useEffect(() => {
        setPagination({ page: 1, limit: 10 });
        setInputPage(1);
    }, [activeEntity, setPagination]);

    const goToPage = (newPage: number) => {
        const validPage = Math.max(1, Math.min(newPage, totalPages));
        setPagination(prev => ({ ...prev, page: validPage }));
        setInputPage(validPage); // Mantener sincronizado el input con la paginación
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(Number(event.target.value));
    };

    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        goToPage(inputPage);
    };

    return (
        <div className='mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white p-6'>
            {/* Primera Página */}
            <Button
                variant='ghost'
                size='md'
                icon={<FaAngleDoubleLeft size={17} />}
                onClick={() => goToPage(1)}
                disabled={page === 1}
            />

            {/* Página Anterior */}
            <Button
                variant='ghost'
                size='md'
                icon={<FaAngleLeft size={17} />}
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
            />

            {/* Input de Página */}
            <form onSubmit={handleInputSubmit} className='flex items-center gap-2 text-lg font-medium'>
                {/* <span>Página</span> */}
                <input
                    type='number'
                    value={inputPage}
                    onChange={handleInputChange}
                    className='w-14 rounded-lg border border-gray-300 px-2 py-1 text-center hover:shadow-xl'
                />
                <span> de {totalPages}</span>
            </form>

            {/* Página Siguiente */}
            <Button
                variant='ghost'
                size='md'
                icon={<FaAngleRight size={17} />}
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
            />

            {/* Última Página */}
            <Button
                variant='ghost'
                size='md'
                icon={<FaAngleDoubleRight size={17} />}
                onClick={() => goToPage(totalPages)}
                disabled={page >= totalPages}
            />
        </div>
    );
};

export default Pagination;
