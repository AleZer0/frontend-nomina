import { EmployeeInterface } from '../../types/entities';
import EmployeeForm from './EmployeeForm';
import Modal from '../Modal';

type TEmployeeModal = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mode?: 'create' | 'edit' | 'view';
    // onDelete: (id: number) => void;
    // onUpdate: (id: number, data: Partial<EmployeeInterface>) => void;
    // onCreate: (data: Omit<EmployeeInterface, 'id_empleado'>) => void;
    // showSuccessEdit: boolean;
    // openView: boolean;
    // setOpenView: React.Dispatch<React.SetStateAction<boolean>>;
    // openCreate: boolean;
    // setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
    // openEdit: boolean;
    // setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployeeModals: React.FC<TEmployeeModal> = ({ isOpen, setIsOpen, mode = 'create' }) => {
    const getTitle = () => {
        switch (mode) {
            case 'create':
                return 'Añadir un nuevo empleado';
            case 'edit':
                return 'Editar empleado';
            case 'view':
                return 'Detalles del empleado';
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
            }}
            title={getTitle()}
            containerClassName='max-w-3xl'>
            <EmployeeForm mode={mode} />
        </Modal>
    );
};

export default EmployeeModals;
