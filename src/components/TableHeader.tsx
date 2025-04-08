import { Column } from '../types/extras';

type TableHeaderProps<T> = {
    columns: Column<T>[];
};

const TableHeader = <T extends object>({ columns }: TableHeaderProps<T>) => {
    return (
        <thead className='bg-gray-300 text-center uppercase'>
            <tr>
                {columns.map(col => (
                    <th key={String(col.key)} className='p-3'>
                        {col.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
