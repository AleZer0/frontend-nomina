import {
    EmployeeInterface,
    LoanInterface,
    MetaInterface,
    ParamsInterface,
    PayrollInterface,
    WeeklyReportData,
} from '../types/entities';

export const defaultEntitiesState = {
    employees: [] as EmployeeInterface[],
    payrolls: [] as PayrollInterface[],
    loans: [] as LoanInterface[],
    weeklyReports: [] as WeeklyReportData[],
};

export const defaultSelectedEntities = {
    selectedEmployee: null as EmployeeInterface | null,
    selectedLoan: null as LoanInterface | null,
    selectedPayroll: null as PayrollInterface | null,
};

export const defaultParams: ParamsInterface = {
    estado: 1,
    page: 1,
    limit: 10,
    order: 'asc',
};

export const defaultMetaData: Record<string, MetaInterface> = {
    employees: {
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        recordsPerPage: 10,
        order: 'desc',
        sortBy: 'nombre',
    },
    payrolls: {
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        recordsPerPage: 10,
        order: 'desc',
        sortBy: 'fecha',
    },
    loans: { totalRecords: 0, totalPages: 1, currentPage: 1, recordsPerPage: 10, order: 'desc', sortBy: 'fecha' },
    weeklyReports: { totalRecords: 0, totalPages: 1, currentPage: 1, recordsPerPage: 10 },
};
