import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { BsCash } from 'react-icons/bs';
import { LoanType } from '../types';

interface PayloanProps {
    isOpen: boolean;
    onClose: () => void;
    selectLoan: LoanType | null;
    onSubmit: (id_prestamo: number, monto_abonado: number) => void;
}

const Payloan: React.FC<PayloanProps> = ({ isOpen, onClose, onSubmit, selectLoan }) => {
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
        if (selectLoan) {
            onSubmit(selectLoan.id_prestamo, montoAbonado);
            setMontoAbonado(0);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Añadir un abono'>
            <label className='mb-2 block text-gray-700'>Monto Abonado</label>
            <input
                type='number'
                name='monto_abonado'
                value={montoAbonado || ''}
                onChange={e => setMontoAbonado(parseFloat(e.target.value) || 0)}
                className='mb-4 w-full rounded-lg border p-2'
                placeholder='Ingrese el monto abonado'
            />

            {/* Botón para abonar */}
            <div className='mt-4 flex justify-end'>
                <Button
                    onClick={handleSubmit}
                    design='rounded-2xl cursor-pointer bg-green-500 mt-4 text-white hover:bg-green-600'>
                    <span className='relative pt-1'>
                        <BsCash size={17} />
                    </span>
                    Abonar
                </Button>
            </div>
        </Modal>
    );
};

export default Payloan;
