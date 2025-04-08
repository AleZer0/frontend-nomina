export const getActiveEntityFromPath = (pathname: string): 'employees' | 'payrolls' | 'loans' | 'weeklyReports' => {
    if (pathname.includes('/employees')) return 'employees';
    if (pathname.includes('/payrolls')) return 'payrolls';
    if (pathname.includes('/loans')) return 'loans';
    if (pathname.includes('/weeklyReports')) return 'weeklyReports';
    return 'employees';
};
