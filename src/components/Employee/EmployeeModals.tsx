import ViewEmployee from './ViewEmployee';
import NewEmployee from './NewEmployee';
import EditEmployee from './EditEmployee';
import { useGlobalContext } from '../../context/GlobalContext';
import { useState } from 'react';
import { EmployeeInterface } from '../../types/entities';

type TEmployeeModals = {
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: Partial<EmployeeInterface>) => void;
    onCreate: (data: Omit<EmployeeInterface, 'id_empleado'>) => void;
    showSuccessEdit: boolean;
    openView: boolean;
    setOpenView: (val: boolean) => void;
};

const EmployeeModals: React.FC<TEmployeeModals> = ({
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
            <ViewEmployee
                isOpen={openView}
                onClose={() => {
                    setOpenView(false);
                    setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
                }}
                handleClickEdit={() => setOpenEdit(true)}
                handleClickDelete={() =>
                    selectedEntities.selectedEmployee && onDelete(selectedEntities.selectedEmployee.id_empleado)
                }
                showSuccess={showSuccessEdit}
            />

            <NewEmployee isOpen={openCreate} onClose={() => setOpenCreate(false)} onSubmit={onCreate} />
            <EditEmployee isOpen={openEdit} onClose={() => setOpenEdit(false)} onSubmit={onUpdate} />
        </>
    );
};

export default EmployeeModals;
