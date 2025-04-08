import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import Button from './Button';
import { getActiveEntityFromPath } from '../utils/router';

const Pagination: React.FC = () => {
    const { pathname } = useLocation();
    const activeEntity = getActiveEntityFromPath(pathname);

    const { params, setParams, metaData } = useGlobalContext();
    const { page } = params;
    const totalPages = metaData[activeEntity].totalPages;
    const [inputPage, setInputPage] = useState(page);

    useEffect(() => {
        setInputPage(1);
        setParams(prev => {
            if (prev.page !== 1 || prev.limit !== 10) {
                return { ...prev, page: 1, limit: 10 };
            }
            return prev;
        });
    }, [activeEntity]);

    const goToPage = useCallback(
        (newPage: number) => {
            const validPage = Math.max(1, Math.min(newPage, totalPages));
            setParams(prev => ({ ...prev, page: validPage }));
            setInputPage(validPage);
        },
        [totalPages, setParams]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPage = parseInt(event.target.value, 10);
        if (!isNaN(newPage)) {
            setInputPage(newPage);
        }
    };

    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        goToPage(inputPage);
    };

    return (
        <div className='mt-6 flex flex-wrap items-center justify-center gap-4 rounded-xl bg-white p-4 shadow-md'>
            {/* Primera Página */}
            <Button
                variant='details'
                size='md'
                icon={<FaAngleDoubleLeft size={18} />}
                onClick={() => goToPage(1)}
                disabled={page === 1}
            />

            {/* Página Anterior */}
            <Button
                variant='details'
                size='md'
                icon={<FaAngleLeft size={18} />}
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
            />

            {/* Input de Página */}
            <form onSubmit={handleInputSubmit} className='flex items-center gap-2 text-base font-medium text-gray-600'>
                <span className='text-sm text-gray-500'>Ir a</span>
                <input
                    type='number'
                    min={1}
                    max={totalPages}
                    value={inputPage}
                    onChange={handleInputChange}
                    className='w-16 rounded-md border border-gray-300 px-3 py-1 text-center text-gray-700 shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                />
                <span className='text-sm text-gray-500'>de {totalPages}</span>
            </form>

            {/* Página Siguiente */}
            <Button
                variant='details'
                size='md'
                icon={<FaAngleRight size={18} />}
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
            />

            {/* Última Página */}
            <Button
                variant='details'
                size='md'
                icon={<FaAngleDoubleRight size={18} />}
                onClick={() => goToPage(totalPages)}
                disabled={page >= totalPages}
            />
        </div>
    );
};

export default Pagination;
