import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { BsCash } from 'react-icons/bs';

interface CreateLoanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newLoan: { id_empleado: number; monto_total: number; saldo_pendiente: number }) => void;
    empleados: { id_empleado: number; nombre: string; apellido: string }[];
}

const emptyLoan = {
    id_empleado: 0,
    monto_total: 0,
    saldo_pendiente: 0,
};

const CreateLoanModal: React.FC<CreateLoanModalProps> = ({ isOpen, onClose, onSubmit, empleados }) => {
    const [newPrestamo, setNewPrestamo] = useState(emptyLoan);
    const [isSaldoModified, setIsSaldoModified] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setNewPrestamo(emptyLoan);
            setIsSaldoModified(false);
        }
    }, [isOpen]);

    const handleEmpleadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEmployee = empleados.find(emp => emp.id_empleado === parseInt(e.target.value));
        setNewPrestamo(prev => ({
            ...prev,
            id_empleado: selectedEmployee?.id_empleado || 0,
        }));
    };

    const handleMontoTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setNewPrestamo(prev => ({
            ...prev,
            monto_total: value,
            saldo_pendiente: isSaldoModified ? prev.saldo_pendiente : value,
        }));
    };

    const handleSaldoPendienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setNewPrestamo(prev => ({
            ...prev,
            saldo_pendiente: value,
        }));
        setIsSaldoModified(true);
    };

    const handleSubmit = () => {
        if (!newPrestamo.id_empleado || newPrestamo.monto_total <= 0) {
            alert('Por favor, selecciona un empleado y verifica los montos.');
            return;
        }
        onSubmit({
            id_empleado: newPrestamo.id_empleado,
            monto_total: newPrestamo.monto_total,
            saldo_pendiente: newPrestamo.saldo_pendiente,
        });

        setNewPrestamo(emptyLoan);
        setIsSaldoModified(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Nuevo Préstamo'>
            {/* Selección de Empleado */}
            <label className='mb-2 block text-gray-700'>Empleado:</label>
            <select
                name='id_empleado'
                value={newPrestamo.id_empleado}
                onChange={handleEmpleadoChange}
                className='mb-4 w-full rounded-lg border p-2'
                aria-label='Seleccionar Empleado'>
                <option value=''>Seleccione un empleado</option>
                {empleados.map(emp => (
                    <option key={emp.id_empleado} value={emp.id_empleado}>
                        {emp.nombre} {emp.apellido}
                    </option>
                ))}
            </select>

            {/* Campo de Monto Total */}
            <label className='mb-2 block text-gray-700'>Monto Total</label>
            <input
                type='number'
                name='monto_total'
                value={newPrestamo.monto_total || ''}
                onChange={handleMontoTotalChange}
                className='mb-4 w-full rounded-lg border p-2'
                placeholder='Ingrese el monto total'
            />

            {/* Campo de Saldo Pendiente */}
            <label className='mb-2 block text-gray-700'>Saldo Pendiente</label>
            <input
                type='number'
                name='saldo_pendiente'
                value={newPrestamo.saldo_pendiente || ''}
                onChange={handleSaldoPendienteChange}
                className='mb-4 w-full rounded-lg border p-2'
                placeholder='Ingrese el saldo pendiente'
            />

            <div className='flex justify-end gap-2'>
                <Button
                    onClick={handleSubmit}
                    design='rounded-2xl cursor-pointer bg-green-500 text-white hover:bg-green-600'>
                    <span className='relative pt-1'>
                        <BsCash size={17} />
                    </span>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreateLoanModal;
