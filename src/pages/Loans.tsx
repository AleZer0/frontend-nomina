import { useEffect, useMemo, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getLoanColumns } from '../columns/loan.columns';
import { useLoansHandlers } from '../hooks/useLoanHandlers';

import Table from '../components/Table';
import Pagination from '../components/Pagination';
import LoanSearchBar from '../components/Loans/LoanSearchBar';
import LoanModals from '../components/Loans/LoanModals';
import LoanHeader from '../components/Loans/LoanHeader';
import Popup from '../components/Popup';

const Loans: React.FC = () => {
    const { entitiesState, setParams, params, isSidebarOpen, setSelectedEntities, loading, setContentHeader } =
        useGlobalContext();

    const [isOpenViewLoan, setIsOpenViewLoan] = useState(false);
    const [isOpenCreateLoan, setIsOpenCreateLoan] = useState(false);
    const [isOpenPayLoan, setIsOpenPayLoan] = useState(false);

    const {
        handleCreateLoan,
        handleUpdateLoan,
        handleDeleteLoan,
        showSuccessCreate,
        showSuccessEdit,
        showSuccessDelete,
    } = useLoansHandlers();

    useEffect(() => {
        setContentHeader(<LoanHeader onAdd={() => setIsOpenCreateLoan(true)} />);
    }, [isSidebarOpen]);

    const columns = useMemo(() => getLoanColumns(params, setParams, setSelectedEntities, setIsOpenViewLoan), [params]);

    return (
        <section className={`mb-20 flex-auto p-6 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
            {showSuccessCreate && <Popup>¡Préstamo registrado con éxito!</Popup>}
            {showSuccessEdit && <Popup>Abono realizado con éxito!</Popup>}
            {showSuccessDelete && <Popup>¡Préstamo eliminada con éxito!</Popup>}
            <LoanSearchBar />
            <Table columns={columns} data={entitiesState.loans} loading={loading['loans']} />
            <Pagination />
            <LoanModals
                onDelete={handleDeleteLoan}
                onCreate={handleCreateLoan}
                onUpdate={handleUpdateLoan}
                showSuccessEdit={showSuccessEdit}
                openView={isOpenViewLoan}
                setOpenView={setIsOpenViewLoan}
                openCreate={isOpenCreateLoan}
                setOpenCreate={setIsOpenCreateLoan}
                openEdit={isOpenPayLoan}
                setOpenEdit={setIsOpenPayLoan}
            />
        </section>
    );
};

export default Loans;
