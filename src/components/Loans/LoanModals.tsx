import ViewLoan from './ViewLoan';
import NewLoan from './NewLoan';
import Payloan from './Payloan';
import { useGlobalContext } from '../../context/GlobalContext';
import { LoanInterface } from '../../types/entities';

type TLoanModals = {
    onDelete: (id: number) => void;
    onUpdate: (id: number, monto_abonado: number) => void;
    onCreate: (data: Omit<LoanInterface, 'id_prestamo'>) => void;
    showSuccessEdit: boolean;
    openView: boolean;
    setOpenView: React.Dispatch<React.SetStateAction<boolean>>;
    openCreate: boolean;
    setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoanModals: React.FC<TLoanModals> = ({
    onDelete,
    onUpdate,
    onCreate,
    showSuccessEdit,
    openView,
    setOpenView,
    openCreate,
    setOpenCreate,
    openEdit,
    setOpenEdit,
}) => {
    const { selectedEntities, setSelectedEntities } = useGlobalContext();

    return (
        <>
            <ViewLoan
                isOpen={openView}
                onClose={() => {
                    setOpenView(false);
                    setSelectedEntities(prev => ({ ...prev, selectedLoan: null }));
                }}
                handleClickEdit={() => setOpenEdit(true)}
                handleClickDelete={async () => {
                    if (selectedEntities.selectedLoan) {
                        await onDelete(selectedEntities.selectedLoan.id_prestamo);
                        setOpenView(false);
                    }
                }}
                showSuccess={showSuccessEdit}
            />

            <NewLoan isOpen={openCreate} onClose={() => setOpenCreate(false)} onSubmit={onCreate} />
            <Payloan isOpen={openEdit} onClose={() => setOpenEdit(false)} onSubmit={onUpdate} />
        </>
    );
};

export default LoanModals;
