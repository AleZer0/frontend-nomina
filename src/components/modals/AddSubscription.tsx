import { useEffect, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

interface CreateSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id_prestamo: number, monto_abonado: number) => void;
    id_prestamo: number;
}

const CreateSubscriptionModal: React.FC<CreateSubscriptionModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    id_prestamo,
}) => {
    const [montoAbonado, setMontoAbonado] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            setMontoAbonado(0);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (montoAbonado <= 0) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        onSubmit(id_prestamo, montoAbonado);

        setMontoAbonado(0);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Registrar Abono'>
            <label className='mb-2 block text-gray-700'>Monto Abonado</label>
            <input
                type='number'
                name='monto_abonado'
                value={montoAbonado || ''}
                onChange={e => setMontoAbonado(parseFloat(e.target.value) || 0)}
                className='mb-4 w-full rounded-lg border p-2'
                placeholder='Ingrese el monto abonado'
            />
            <div className='flex justify-end gap-2'>
                <Button
                    onClick={handleSubmit}
                    design='rounded-2xl cursor-pointer bg-green-500 text-white hover:bg-green-600'>
                    Abonar
                </Button>
            </div>
        </Modal>
    );
};

export default CreateSubscriptionModal;
