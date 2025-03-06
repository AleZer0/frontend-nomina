import { TableProps } from '../types/componentes';
import { useGlobalContext } from '../context/GlobalContext';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';

const Table = <T extends object>({ columns, data, onRowClick }: TableProps<T>) => {
    const { loading } = useGlobalContext();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (!loading && data.length > 0) {
            setIsDataLoaded(true);
        } else if (!loading && data.length === 0) {
            setTimeout(() => setIsDataLoaded(true), 300); // Pequeño retraso para evitar parpadeos
        } else {
            setIsDataLoaded(false);
        }
    }, [loading, data]);

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-2xl'>
            <table className='text-md w-full text-blue-950'>
                <thead className='bg-gray-200 text-center uppercase'>
                    <tr className='flex flex-row items-center justify-between'>
                        {columns.map(col => (
                            <th scope='col' key={String(col.key)} className='flex-1 p-3'>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan={columns.length} className='bg-white p-6 text-center'>
                                <Loader />
                            </td>
                        </tr>
                    </tbody>
                ) : !isDataLoaded ? null : data.length === 0 ? (
                    <tbody className='text-center'>
                        <tr>
                            <td colSpan={columns.length} className='bg-white p-4'>
                                No hay registros disponibles
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody className='text-center'>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className='flex flex-row items-center justify-between border-b border-gray-200 odd:bg-white even:bg-gray-50'
                                onClick={() => onRowClick && onRowClick(row)}>
                                {columns.map(col => (
                                    <td key={String(col.key)} className='flex flex-1 justify-center p-3'>
                                        {col.render
                                            ? col.render(col.key in row ? row[col.key as keyof T] : undefined, row)
                                            : col.key in row
                                              ? String(row[col.key as keyof T])
                                              : null}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default Table;
