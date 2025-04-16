import { useMemo, useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getPayrollColumns } from '../columns/payroll.columns';
import { usePayrollsHandlers } from '../hooks/usePayrollHandlers';

import Table from '../components/Table';
import Pagination from '../components/Pagination';
import PayrollSearchBar from '../components/Payroll/PayrollSearchBar';
import PayrollHeader from '../components/Payroll/PayrollHeader';
import Popup from '../components/Popup';
import PayrollModal from '../components/Payroll/PayrolModal';

import { PayrollInterface } from '../types/entities';

const Payroll: React.FC = () => {
    const { entitiesState, setParams, params, isSidebarOpen, setSelectedEntities, loading, setContentHeader } =
        useGlobalContext();

    const [payrollModalOpen, setPayrollModalOpen] = useState(false);
    const [payrollModalMode, setPayrollModalMode] = useState<'create' | 'view' | 'edit'>('create');

    const {
        handleCreatePayroll,
        handleUpdatePayroll,
        handleDeletePayroll,
        showSuccessCreate,
        showSuccessEdit,
        showSuccessDelete,
    } = usePayrollsHandlers();

    useEffect(() => {
        setContentHeader(
            <PayrollHeader
                onAdd={() => {
                    setPayrollModalMode('create');
                    setPayrollModalOpen(true);
                }}
            />
        );
    }, [isSidebarOpen]);

    const onClickDetails = (selectedPayroll: PayrollInterface) => {
        setSelectedEntities(prev => ({ ...prev, selectedPayroll }));
        setPayrollModalMode('view');
        setPayrollModalOpen(true);
    };

    const columns = useMemo(() => getPayrollColumns(params, setParams, onClickDetails), [params]);

    return (
        <section className={`mb-20 flex-auto p-6 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
            {showSuccessCreate && <Popup>¡Nómina registrada con éxito!</Popup>}
            {showSuccessEdit && <Popup>¡Nómina actualizada con éxito!</Popup>}
            {showSuccessDelete && <Popup>¡Nómina eliminada con éxito!</Popup>}
            <PayrollSearchBar />
            <Table columns={columns} data={entitiesState.payrolls} loading={loading['payrolls']} />
            <Pagination />
            <PayrollModal
                isOpen={payrollModalOpen}
                setIsOpen={setPayrollModalOpen}
                mode={payrollModalMode}
                setMode={setPayrollModalMode}
                onCreate={handleCreatePayroll}
                onUpdate={handleUpdatePayroll}
                onDelete={handleDeletePayroll}
            />
        </section>
    );
};

export default Payroll;
