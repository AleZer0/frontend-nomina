import { useEffect, useState } from 'react';
import Button from '../Button';
import { Employee } from '../../pages/Employees';
import Modal from '../Modal';

interface CreateLoanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newNomina: {
        fecha: string;
        dias_trabajados: number;
        prestamos: number;
        infonavit: number;
        sueldo: number;
        id_empleado: number;
        monto_total: number;
        saldo_pendiente: number;
    }) => void;
    empleados: Employee[];
    empleadoSeleccionado?: Employee | null;
}

const emptyPayroll = {
    fecha: new Date().toISOString(),
    dias_trabajados: 0,
    prestamos: 0,
    infonavit: 0,
    sueldo: 0,
    id_empleado: 0,
    monto_total: 0,
    saldo_pendiente: 0,
};

const CreatePayrollModal: React.FC<CreateLoanModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    empleados,
    empleadoSeleccionado,
}) => {
    // Estado para la nueva nómina
    const [newNomina, setNewNomina] = useState(emptyPayroll);
    // Estado para controlar si el saldo ha sido editado manualmente
    const [isSaldoModified, setIsSaldoModified] = useState(false);

    const handleMontoTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setNewNomina(prevNomina => ({
            ...prevNomina,
            monto_total: value,
            // Solo actualiza saldo_pendiente con el mismo valor de monto_total
            // si NO ha sido modificado manualmente
            saldo_pendiente: isSaldoModified ? prevNomina.saldo_pendiente : value,
        }));
    };

    const handleSaldoPendienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setNewNomina(prevNomina => ({
            ...prevNomina,
            saldo_pendiente: value,
        }));
        setIsSaldoModified(true); // Marcar que se editó manualmente
    };

    useEffect(() => {
        if (empleadoSeleccionado) {
            setNewNomina(prevNomina => ({
                ...prevNomina,
                sueldo: empleadoSeleccionado.sueldo,
                id_empleado: empleadoSeleccionado.id_empleado,
            }));
        }
    }, [empleadoSeleccionado]);

    const handleSubmit = () => {
        if (!newNomina.id_empleado || newNomina.sueldo <= 0) {
            alert('Por favor, selecciona un empleado y verifica el sueldo.');
            return;
        }
        onSubmit(newNomina);
        // Resetear campos
        setNewNomina(emptyPayroll);
        setIsSaldoModified(false);
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Añadir un préstamo'>
            {/* Selección de Empleado */}
            <label className='mb-2 block text-gray-700'>Empleado:</label>
            <select
                name='id_empleado'
                value={newNomina.id_empleado}
                onChange={e => {
                    const selectedEmployee = empleados.find(emp => emp.id_empleado === parseInt(e.target.value));
                    setNewNomina(prevNomina => ({
                        ...prevNomina,
                        id_empleado: selectedEmployee?.id_empleado || 0,
                        sueldo: selectedEmployee?.sueldo || 0,
                    }));
                    // Si cambiamos de empleado, podemos decidir resetear o no el estado del saldo:
                    setIsSaldoModified(false);
                }}
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
                value={newNomina.monto_total}
                onChange={handleMontoTotalChange}
                className='mb-4 w-full rounded-lg border p-2'
            />

            {/* Campo de Saldo Pendiente (Editable) */}
            <label className='mb-2 block text-gray-700'>Saldo Pendiente</label>
            <input
                type='number'
                name='saldo_pendiente'
                value={newNomina.saldo_pendiente}
                onChange={handleSaldoPendienteChange}
                className='mb-4 w-full rounded-lg border p-2'
            />

            <div className='flex justify-end gap-2'>
                <Button
                    onClick={handleSubmit}
                    design='rounded cursor-pointer bg-green-500 text-white hover:bg-green-600'>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreatePayrollModal;
