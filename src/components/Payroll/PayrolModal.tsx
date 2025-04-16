import { useGlobalContext } from '../../context/GlobalContext';

import { PayrollInterface } from '../../types/entities';

import Modal from '../Modal';
import PayrollForm from './PayrollForm';

type TPayrollModal = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mode: 'create' | 'edit' | 'view';
    setMode: React.Dispatch<React.SetStateAction<'create' | 'view' | 'edit'>>;
    onCreate: (data: Omit<PayrollInterface, 'folio'>) => void;
    onUpdate: (id: number, data: Partial<PayrollInterface>) => void;
    onDelete: (id: number) => void;
};

const PayrollModal: React.FC<TPayrollModal> = ({ isOpen, setIsOpen, mode, setMode, onCreate, onUpdate, onDelete }) => {
    const { setSelectedEntities } = useGlobalContext();

    const getTitle = () => {
        switch (mode) {
            case 'create':
                return 'Generar una nueva nómina';
            case 'edit':
                return 'Editar nómina';
            case 'view':
                return 'Detalles de nómina';
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
                setSelectedEntities(prev => ({ ...prev, selectedPayroll: null }));
            }}
            title={getTitle()}
            containerClassName='max-w-3xl'>
            <PayrollForm
                mode={mode}
                setMode={setMode}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onClose={() => setIsOpen(false)}></PayrollForm>
        </Modal>
    );
};

export default PayrollModal;
