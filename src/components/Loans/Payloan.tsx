import { useMemo } from 'react';

import { MdPayments } from 'react-icons/md';

import Modal from '../Modal';
import Form from '../Form';

import { FormField } from '../../types/extras';
import { PaymentInterface } from '../../types/entities';
import { useGlobalContext } from '../../context/GlobalContext';

interface PayloanProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id_prestamo: number, monto_abonado: number) => void;
}

const PayLoan: React.FC<PayloanProps> = ({ isOpen, onClose, onSubmit }) => {
    const { selectedEntities, loading } = useGlobalContext();

    const emptyPayment = {
        id_prestamo: 0,
        monto_abonado: 0,
    };

    const handleSubmit = (values: Partial<PaymentInterface>) => {
        if (!values.monto_abonado) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const updatedLoan: Partial<PaymentInterface> = {
            ...emptyPayment,
            ...values,
        };

        onSubmit(selectedEntities.selectedLoan?.id_prestamo ?? 0, updatedLoan.monto_abonado ?? 0);
        onClose();
    };

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'monto_abonado',
                label: 'Monto a abonar',
                type: 'number',
                placeholder: 'Ingrese el monto a abonar',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
        ],
        []
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Abonar a préstamo' containerClassName='max-w-xl'>
            <Form
                fields={fields}
                data={emptyPayment}
                onSubmit={handleSubmit}
                submitIcon={<MdPayments size={17} />}
                submitLabel='Abonar'
                variant='save'
                direction='end'
                columns={1}
                loadingButton={loading['updateLoan']}
                labelLoadingButton='Abonando...'
            />
        </Modal>
    );
};

export default PayLoan;
