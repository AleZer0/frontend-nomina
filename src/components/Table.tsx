import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { TableProps } from '../types/componentes';

const Table = <T extends object>({ columns, data = [], onRowClick, loading }: TableProps<T>) => {
    return (
        <div className='relative overflow-x-auto shadow-2xl sm:rounded-2xl'>
            <table className='w-full table-fixed text-base text-black'>
                <TableHeader columns={columns} />
                <TableBody columns={columns} data={data} loading={loading} onRowClick={onRowClick} />
            </table>
        </div>
    );
};

export default Table;
