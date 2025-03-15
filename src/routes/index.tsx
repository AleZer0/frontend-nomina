import Employees from '../pages/Employees';
// import Operator from '../pages/Operator';
import Payroll from '../pages/Payroll';
import Loans from '../pages/Loans';
import WeeklyReport from '../pages/WeeklyReport';

import { Route } from '../types/extras';

export const routes: Route[] = [
    { path: 'employees', element: <Employees />, name: 'Empleados' },
    //{ path: 'operator', element: <Operator />, name: 'Operadores' },
    { path: 'payrolls', element: <Payroll />, name: 'Nominas' },
    { path: 'loans', element: <Loans />, name: 'Préstamos' },
    { path: 'weeklyReports', element: <WeeklyReport />, name: 'Reportes semanales' },
];
