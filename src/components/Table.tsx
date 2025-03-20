import { TableProps } from '../types/componentes';
import Loader from '../components/Loader'; // Asegúrate de importar Loader

const Table = <T extends object>({ columns, data = [], onRowClick, loading }: TableProps<T>) => {
    return (
        <div className='relative overflow-x-auto shadow-2xl sm:rounded-2xl'>
            <table className='text-md w-full text-black'>
                <thead className='bg-gray-200 text-center uppercase'>
                    <tr className='flex flex-row items-center justify-between'>
                        {columns.map(col => (
                            <th scope='col' key={String(col.key)} className='flex-1 p-3'>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className='text-center'>
                    {loading ? (
                        <td colSpan={columns.length} className='bg-white p-4'>
                            <div className='flex justify-center'>
                                <Loader />
                            </div>
                        </td>
                    ) : Array.isArray(data) && data.length > 0 ? (
                        data.map((row, rowIndex) => (
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className='bg-white p-4'>
                                No hay registros disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
