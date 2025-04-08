import ViewEmployee from './ViewEmployee';
import NewEmployee from './NewEmployee';
import EditEmployee from './EditEmployee';
import { useGlobalContext } from '../../context/GlobalContext';
import { EmployeeInterface } from '../../types/entities';

type TEmployeeModals = {
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: Partial<EmployeeInterface>) => void;
    onCreate: (data: Omit<EmployeeInterface, 'id_empleado'>) => void;
    showSuccessEdit: boolean;
    openView: boolean;
    setOpenView: React.Dispatch<React.SetStateAction<boolean>>;
    openCreate: boolean;
    setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployeeModals: React.FC<TEmployeeModals> = ({
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
            <ViewEmployee
                isOpen={openView}
                onClose={() => {
                    setOpenView(false);
                    setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
                }}
                handleClickEdit={() => setOpenEdit(true)}
                handleClickDelete={async () => {
                    if (selectedEntities.selectedEmployee) {
                        await onDelete(selectedEntities.selectedEmployee.id_empleado);
                        setOpenView(false);
                    }
                }}
                showSuccess={showSuccessEdit}
            />

            <NewEmployee isOpen={openCreate} onClose={() => setOpenCreate(false)} onSubmit={onCreate} />
            <EditEmployee isOpen={openEdit} onClose={() => setOpenEdit(false)} onSubmit={onUpdate} />
        </>
    );
};

export default EmployeeModals;
