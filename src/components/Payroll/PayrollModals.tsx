import ViewPayroll from './ViewPayroll';
import NewPayroll from './NewPayroll';
import EditPayroll from './EditPayroll';
import { useGlobalContext } from '../../context/GlobalContext';
import { PayrollInterface } from '../../types/entities';

type TPayrollModals = {
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: Partial<PayrollInterface>) => void;
    onCreate: (data: Omit<PayrollInterface, 'folio'>) => void;
    showSuccessEdit: boolean;
    openView: boolean;
    setOpenView: React.Dispatch<React.SetStateAction<boolean>>;
    openCreate: boolean;
    setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const PayrollModals: React.FC<TPayrollModals> = ({
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
            <ViewPayroll
                isOpen={openView}
                onClose={() => {
                    setOpenView(false);
                    setSelectedEntities(prev => ({ ...prev, selectedPayroll: null }));
                }}
                handleClickEdit={() => setOpenEdit(true)}
                handleClickDelete={async () => {
                    if (selectedEntities.selectedPayroll) {
                        await onDelete(selectedEntities.selectedPayroll.folio);
                        setOpenView(false);
                    }
                }}
                showSuccess={showSuccessEdit}
            />

            <NewPayroll isOpen={openCreate} onClose={() => setOpenCreate(false)} onSubmit={onCreate} />
            <EditPayroll isOpen={openEdit} onClose={() => setOpenEdit(false)} onSubmit={onUpdate} />
        </>
    );
};

export default PayrollModals;
