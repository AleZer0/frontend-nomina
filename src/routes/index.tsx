import Employees from '../pages/Employees';
import Payroll from '../pages/Payroll';
import Loans from '../pages/Loans';
import WeeklyReport from '../pages/WeeklyReport';

import { Route } from '../types/extras';

export const routes: Route[] = [
    { path: '/employees', element: <Employees />, name: 'Empleados' },
    { path: '/payroll', element: <Payroll />, name: 'Nominas' },
    { path: '/loans', element: <Loans />, name: 'Préstamos' },
    { path: '/weekly_report', element: <WeeklyReport />, name: 'Reportes semanales' },
];
