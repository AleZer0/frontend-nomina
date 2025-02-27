import { useEffect, useState } from 'react';
import Button from '../Button';
import { Employee } from '../../pages/Employees';
import Modal from '../Modal';

interface CreatePayrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newNomina: {
        fecha: string; // 🔹 Se mantiene la propiedad correcta
        dias_trabajados: number;
        prestamos: number;
        infonavit: number;
        sueldo: number;
        id_empleado: number;
    }) => void;
    empleados: Employee[];
    empleadoSeleccionado?: Employee | null;
}

// 🔹 Función para obtener la fecha actual en formato YYYY-MM-DD sin cambiar la zona horaria
const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Se obtiene solo la parte de la fecha (YYYY-MM-DD)
};

const emptyPayroll = {
    fecha: getCurrentDate(), // 🔹 Ahora se inicializa correctamente
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
            alert('Por favor, selecciona un empleado y verifica el sueldo.');
            return;
        }
        onSubmit(newNomina);
        setNewNomina({ ...emptyPayroll, fecha: getCurrentDate() }); // 🔹 Resetea con la fecha correcta
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Añadir una nómina'>
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

            {/* Campo de fecha de nómina */}
            <label className='mb-2 block text-gray-700'>Fecha de Nómina:</label>
            <input
                type='date'
                name='fecha'
                value={newNomina.fecha}
                onChange={e => setNewNomina({ ...newNomina, fecha: e.target.value })}
                className='mb-4 w-full rounded-lg border p-2'
            />

            {/* Campos de sueldo, préstamos, infonavit */}
            <label className='mb-2 block text-gray-700'>Días laborados:</label>
            <input
                placeholder='Ingrese los días laborados'
                type='number'
                name='dias_trabajados'
                value={newNomina.dias_trabajados || ''}
                onChange={e => setNewNomina({ ...newNomina, dias_trabajados: parseInt(e.target.value) || 0 })}
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Sueldo:</label>
            <input
                placeholder='Ingrese el sueldo del empleado o seleccione un empleado'
                type='number'
                name='sueldo'
                value={newNomina.sueldo || ''}
                onChange={e => setNewNomina({ ...newNomina, sueldo: parseFloat(e.target.value) || 0 })}
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Abono a préstamo:</label>
            <input
                placeholder='Ingrese el abono al préstamo del empleado'
                type='number'
                name='prestamos'
                value={newNomina.prestamos || ''}
                onChange={e => setNewNomina({ ...newNomina, prestamos: parseFloat(e.target.value) || 0 })}
                className='mb-4 w-full rounded-lg border p-2'
            />

            <label className='mb-2 block text-gray-700'>Infonavit:</label>
            <input
                placeholder='Ingrese el monto a infonavit'
                type='number'
                name='infonavit'
                value={newNomina.infonavit || ''}
                onChange={e => setNewNomina({ ...newNomina, infonavit: parseFloat(e.target.value) || 0 })}
                className='mb-4 w-full rounded-lg border p-2'
            />

            {/* Botones de acción */}
            <div className='flex justify-end gap-2'>
                <Button
                    onClick={handleSubmit}
                    disabled={false}
                    design='rounded-2xl bg-green-500 hover:bg-green-600 text-white cursor-pointer'>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreatePayrollModal;
