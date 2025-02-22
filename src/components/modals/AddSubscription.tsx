import { useEffect, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { BsCash } from 'react-icons/bs';
import { Employee } from '../../pages/Employees';
import TableData from '../TableData';

interface CreateSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSubmit: (id_prestamo: number, monto_abonado: number) => void;
    id_prestamo: number;
}

const CreateSubscriptionModal: React.FC<CreateSubscriptionModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    id_prestamo,
    employee,
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
            <div className='flex justify-end gap-2'>
                <Button
                    onClick={handleSubmit}
                    design='rounded-2xl cursor-pointer bg-green-500 text-white hover:bg-green-600'>
                    <span className='relative pt-1'>
                        <BsCash size={17} />
                    </span>
                    Abonar
                </Button>
            </div>

            {/* Tabla de todos los abonos */}
            <div className='mt-6'>
                <h2 className='mb-2 text-lg font-semibold text-gray-800'>Historial de Abonos</h2>
                <TableData
                    fields={['No. Abono', 'Fecha', 'Monto Abonado']}
                    data={employee?.abonos ?? []}
                    renderRow={abono => (
                        <>
                            <div className='p-2'>{`ABN${abono.id_abono.toString().padStart(4, '0')}`}</div>
                            <div className='p-2'>{new Date(abono.created_at).toLocaleDateString()}</div>
                            <div className='p-2 font-semibold text-green-600'>${abono.monto_abonado.toFixed(2)}</div>
                        </>
                    )}
                />
            </div>
        </Modal>
    );
};

export default CreateSubscriptionModal;
