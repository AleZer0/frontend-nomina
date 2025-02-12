import { useEffect, useState } from 'react';
import Button from '../Button';
import { Employee } from '../../pages/Employees';

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

    // 👇 Se actualiza el estado cuando cambia el empleado seleccionado
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
        setNewNomina(emptyPayroll);
    };

    if (!isOpen) return null;

    return (
        <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md'>
            <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
                <h2 className='mb-4 text-lg font-semibold'>Añadir Nueva Nómina</h2>

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

                {/* Campos de sueldo, préstamos, infonavit */}
                <label className='mb-2 block text-gray-700'>Días trabajados:</label>
                <input
                    type='number'
                    name='dias_trabajados'
                    value={newNomina.dias_trabajados}
                    onChange={e => setNewNomina({ ...newNomina, dias_trabajados: parseInt(e.target.value) || 0 })}
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Sueldo:</label>
                <input
                    type='number'
                    name='sueldo'
                    value={newNomina.sueldo}
                    onChange={e => setNewNomina({ ...newNomina, sueldo: parseFloat(e.target.value) || 0 })}
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Préstamos:</label>
                <input
                    type='number'
                    name='prestamos'
                    value={newNomina.prestamos}
                    onChange={e => setNewNomina({ ...newNomina, prestamos: parseFloat(e.target.value) || 0 })}
                    className='mb-4 w-full rounded-lg border p-2'
                />

                <label className='mb-2 block text-gray-700'>Infonavit:</label>
                <input
                    type='number'
                    name='infonavit'
                    value={newNomina.infonavit}
                    onChange={e => setNewNomina({ ...newNomina, infonavit: parseFloat(e.target.value) || 0 })}
                    className='mb-4 w-full rounded-lg border p-2'
                />

                {/* Botones de acción */}
                <div className='flex justify-end gap-2'>
                    <Button onClick={onClose} children='Cancelar' design='bg-gray-400 text-white cursor-pointer' />
                    <Button onClick={handleSubmit} children='Guardar' design='bg-green-500 text-white cursor-pointer' />
                </div>
            </div>
        </div>
    );
};

export default CreatePayrollModal;
