import ViewLoan from './ViewLoan';
import NewLoan from './NewLoan';
import Payloan from './Payloan';
import { useGlobalContext } from '../../context/GlobalContext';
import { useState } from 'react';
import { LoanInterface } from '../../types/entities';

type TLoanModals = {
    onDelete: (id: number) => void;
    onUpdate: (id: number, monto_abonado: number) => void;
    onCreate: (data: Omit<LoanInterface, 'id_prestamo'>) => void;
    showSuccessEdit: boolean;
    openView: boolean;
    setOpenView: (val: boolean) => void;
};

const LoanModals: React.FC<TLoanModals> = ({
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
            <ViewLoan
                isOpen={openView}
                onClose={() => {
                    setOpenView(false);
                    setSelectedEntities(prev => ({ ...prev, selectedLoan: null }));
                }}
                handleClickEdit={() => setOpenEdit(true)}
                handleClickDelete={() =>
                    selectedEntities.selectedLoan && onDelete(selectedEntities.selectedLoan.id_prestamo)
                }
                showSuccess={showSuccessEdit}
            />

            <NewLoan isOpen={openCreate} onClose={() => setOpenCreate(false)} onSubmit={onCreate} />
            <Payloan isOpen={openEdit} onClose={() => setOpenEdit(false)} onSubmit={onUpdate} />
        </>
    );
};

export default LoanModals;
