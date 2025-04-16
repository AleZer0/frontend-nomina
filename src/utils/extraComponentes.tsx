import {
    EmployeeInterface,
    LoanInterface,
    ParamsInterface,
    PayrollInterface,
    WeeklyReportData,
} from '../types/entities';
import { IconSortDescending } from '@tabler/icons-react';

export class ExtraComponents {
    static createSortableHeader = (
        params: ParamsInterface,
        setParams: React.Dispatch<React.SetStateAction<ParamsInterface>>,
        label: string,
        field: keyof EmployeeInterface | keyof PayrollInterface | keyof LoanInterface | keyof WeeklyReportData
    ) => {
        return (
            <div className='flex items-center justify-center gap-2'>
                <button
                    onClick={() => {
                        const newOrder = params.order === 'asc' ? 'desc' : 'asc';
                        setParams({ ...params, order: newOrder, sort_by: field });
                    }}>
                    <IconSortDescending
                        stroke={2}
                        className={`transition-transform duration-200 ${
                            params.sort_by === field && params.order === 'desc' ? 'rotate-180' : ''
                        } text-gray-500 hover:text-gray-700`}
                    />
                </button>
                <span>{label}</span>
            </div>
        );
    };
}

export default ExtraComponents;
