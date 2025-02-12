import { ReactNode } from 'react';

import Employees from '../pages/Employees';
import Payroll from '../pages/Payroll';
import WeeklyReport from '../pages/WeeklyReport';

interface Route {
    path: string;
    element: ReactNode;
    name?: string;
}

export const routes: Route[] = [
    { path: 'employees', element: <Employees />, name: 'Empleados' },
    { path: 'payroll', element: <Payroll />, name: 'Nominas' },
    { path: 'weekly_report', element: <WeeklyReport />, name: 'Reportes semanales' },
];
