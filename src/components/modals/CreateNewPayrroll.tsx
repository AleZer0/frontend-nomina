import { useEffect, useState } from 'react';
import Button from '../Button';
import { Employee } from '../../pages/Employees';
import Modal from '../Modal';
import { FaRegSave } from 'react-icons/fa';

interface CreatePayrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newNomina: {
        fecha: string;
        dias_trabajados: number;
        prestamos: number;
        infonavit: number;
        sueldo: number;
        id_empleado: number;
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
};

const CreatePayrollModal: React.FC<CreatePayrollModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    empleados,
    empleadoSeleccionado,
}) => {
    const [newNomina, setNewNomina] = useState(emptyPayroll);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [showMessageModal, setShowMessageModal] = useState(false);

    useEffect(() => {
        if (empleadoSeleccionado) {
            setNewNomina(prevNomina => ({
                ...prevNomina,
                sueldo: empleadoSeleccionado.sueldo ?? 0,
                id_empleado: empleadoSeleccionado.id_empleado,
            }));
        }
    }, [empleadoSeleccionado]);

    const handleSubmit = () => {
        if (!newNomina.id_empleado || newNomina.sueldo <= 0) {
            setMessage('Por favor, selecciona un empleado y verifica el sueldo.');
            setMessageType('error');
            setShowMessageModal(true);
            return;
        }

        onSubmit(newNomina);
        setNewNomina(emptyPayroll);

        // Mostrar mensaje de éxito
        setMessage('Nómina generada correctamente.');
        setMessageType('success');
        setShowMessageModal(true);

        // Cerrar automáticamente después de 3 segundos
        setTimeout(() => {
            setShowMessageModal(false);
            onClose();
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <>
            <Modal isOpen={true} onClose={onClose} title='Añadir una nómina'>
                <label className='mb-2 block text-gray-700'>Empleado:</label>
                <select
                    value={newNomina.id_empleado}
                    onChange={e => {
                        const selectedEmployee = empleados.find(emp => emp.id_empleado === parseInt(e.target.value));
                        setNewNomina(prevNomina => ({
                            ...prevNomina,
                            id_empleado: selectedEmployee?.id_empleado || 0,
                            sueldo: selectedEmployee?.sueldo || 0,
                        }));
                    }}
                    className='mb-4 w-full rounded-lg border p-2'>
                    <option value=''>Seleccione un empleado</option>
                    {empleados.map(emp => (
                        <option key={emp.id_empleado} value={emp.id_empleado}>
                            {emp.nombre} {emp.apellido}
                        </option>
                    ))}
                </select>

                <label className='mb-2 block text-gray-700'>Días laborados:</label>
                <input
                    type='number'
                    value={newNomina.dias_trabajados || ''}
                    onChange={e => setNewNomina({ ...newNomina, dias_trabajados: parseInt(e.target.value) || 0 })}
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Sueldo:</label>
                <input
                    type='number'
                    value={newNomina.sueldo || ''}
                    onChange={e => setNewNomina({ ...newNomina, sueldo: parseFloat(e.target.value) || 0 })}
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <div className='flex justify-end gap-2'>
                    <Button
                        onClick={handleSubmit}
                        design='rounded-2xl bg-green-500 hover:bg-green-600 text-white cursor-pointer'>
                        <span className='relative pt-1'>
                            <FaRegSave size={17} />
                        </span>
                        Guardar
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default CreatePayrollModal;
