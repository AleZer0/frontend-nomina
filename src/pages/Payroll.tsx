import { useMemo, useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getPayrollColumns } from '../columns/payroll.columns';
import { usePayrollsHandlers } from '../hooks/usePayrollHandlers';

import Table from '../components/Table';
import Pagination from '../components/Pagination';
import PayrollSearchBar from '../components/Payroll/PayrollSearchBar';
import PayrollModals from '../components/Payroll/PayrollModals';
import PayrollHeader from '../components/Payroll/PayrollHeader';
import Popup from '../components/Popup';

const Payroll: React.FC = () => {
    const { entitiesState, setParams, params, isSidebarOpen, setSelectedEntities, loading, setContentHeader } =
        useGlobalContext();

    const [isOpenViewPayroll, setIsOpenViewPayroll] = useState(false);

    const {
        handleCreatePayroll,
        handleUpdatePayroll,
        handleDeletePayroll,
        showSuccessCreate,
        showSuccessEdit,
        showSuccessDelete,
    } = usePayrollsHandlers();

    useEffect(() => {
        setContentHeader(<PayrollHeader onAdd={() => setIsOpenViewPayroll(true)} />);
    }, [isSidebarOpen]);

    const columns = useMemo(
        () => getPayrollColumns(params, setParams, setSelectedEntities, setIsOpenViewPayroll),
        [params]
    );

    return (
        <section className={`mb-20 flex-auto p-6 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
            {showSuccessCreate && <Popup>¡Nómina registrada con éxito!</Popup>}
            {showSuccessEdit && <Popup>¡Nómina actualizada con éxito!</Popup>}
            {showSuccessDelete && <Popup>¡Nómina eliminada con éxito!</Popup>}
            <PayrollSearchBar />
            <Table columns={columns} data={entitiesState.payrolls} loading={loading['payrolls']} />
            <Pagination />
            <PayrollModals
                onDelete={handleDeletePayroll}
                onCreate={handleCreatePayroll}
                onUpdate={handleUpdatePayroll}
                showSuccessEdit={showSuccessEdit}
                openView={isOpenViewPayroll}
                setOpenView={setIsOpenViewPayroll}
            />
        </section>
    );
};

export default Payroll;
