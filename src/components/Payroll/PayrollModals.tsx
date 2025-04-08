import ViewPayroll from './ViewPayroll';
import NewPayroll from './NewPayroll';
import EditPayroll from './EditPayroll';
import { useGlobalContext } from '../../context/GlobalContext';
import { useState } from 'react';
import { PayrollInterface } from '../../types/entities';

type TPayrollModals = {
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: Partial<PayrollInterface>) => void;
    onCreate: (data: Omit<PayrollInterface, 'folio'>) => void;
    showSuccessEdit: boolean;
    openView: boolean;
    setOpenView: (val: boolean) => void;
};

const PayrollModals: React.FC<TPayrollModals> = ({
    onDelete,
    onUpdate,
    onCreate,
    showSuccessEdit,
    openView,
    setOpenView,
}) => {
    const { selectedEntities, setSelectedEntities } = useGlobalContext();
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <>
            <ViewPayroll
                isOpen={openView}
                onClose={() => {
                    setOpenView(false);
                    setSelectedEntities(prev => ({ ...prev, selectedPayroll: null }));
                }}
                handleClickEdit={() => setOpenEdit(true)}
                handleClickDelete={() =>
                    selectedEntities.selectedPayroll && onDelete(selectedEntities.selectedPayroll.folio)
                }
                showSuccess={showSuccessEdit}
            />

            <NewPayroll isOpen={openCreate} onClose={() => setOpenCreate(false)} onSubmit={onCreate} />
            <EditPayroll isOpen={openEdit} onClose={() => setOpenEdit(false)} onSubmit={onUpdate} />
        </>
    );
};

export default PayrollModals;
