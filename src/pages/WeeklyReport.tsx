import { useEffect, useMemo } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getWeeklyReportColumns } from '../columns/weeklyreports.columns';

import Table from '../components/Table';
import Pagination from '../components/Pagination';
import WeeklyReportHeader from '../components/WeeklyReport/WeeklyReportHeader';

const WeeklyReport: React.FC = () => {
    const { entitiesState, setParams, params, isSidebarOpen, loading, setContentHeader, createPreviewWeeklyReportPDF } =
        useGlobalContext();

    useEffect(() => {
        setContentHeader(<WeeklyReportHeader />);
    }, [isSidebarOpen]);

    const columns = useMemo(
        () => getWeeklyReportColumns(params, setParams, loading, createPreviewWeeklyReportPDF),
        [params]
    );

    return (
        <section className={`mb-20 flex-auto p-6 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
            <Table columns={columns} data={entitiesState.weeklyReports} loading={loading['weeklyReports']} />
            <Pagination />
        </section>
    );
};

export default WeeklyReport;
