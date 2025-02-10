import { useState } from 'react';
import Button from '../Button';

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
    empleados: { id_empleado: number; nombre: string; apellido: string }[];
    empleadoSeleccionado?: number;
}

const CreatePayrollModal: React.FC<CreatePayrollModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    empleados,
    empleadoSeleccionado,
}) => {
    const [newNomina, setNewNomina] = useState({
        fecha: new Date().toISOString(),
        dias_trabajados: 0,
        prestamos: 0,
        infonavit: 0,
        sueldo: 0,
        id_empleado: empleadoSeleccionado ? empleadoSeleccionado : 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewNomina({
            ...newNomina,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (!newNomina.id_empleado || !newNomina.sueldo) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        onSubmit(newNomina);
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
                    value={empleadoSeleccionado ? empleadoSeleccionado : newNomina.id_empleado}
                    onChange={handleChange}
                    className='mb-4 w-full rounded-lg border p-2'
                    aria-label='Seleccionar Empleado'>
                    <option value=''>Seleccione un empleado</option>
                    {empleados.map(emp => (
                        <option key={emp.id_empleado} value={emp.id_empleado.toString()}>
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
                    onChange={handleChange}
                    className='mb-4 w-full rounded-lg border p-2'
                    placeholder='Ingrese los días trabajados'
                />

                <label className='mb-2 block text-gray-700'>Sueldo:</label>
                <input
                    type='number'
                    name='sueldo'
                    value={newNomina.sueldo}
                    onChange={handleChange}
                    className='mb-4 w-full rounded-lg border p-2'
                    placeholder='Ingrese el sueldo'
                />

                <label className='mb-2 block text-gray-700'>Préstamos:</label>
                <input
                    type='number'
                    name='prestamos'
                    value={newNomina.prestamos}
                    onChange={handleChange}
                    className='mb-4 w-full rounded-lg border p-2'
                    placeholder='Ingrese los préstamos'
                />

                <label className='mb-2 block text-gray-700'>Infonavit:</label>
                <input
                    type='number'
                    name='infonavit'
                    value={newNomina.infonavit}
                    onChange={handleChange}
                    className='mb-4 w-full rounded-lg border p-2'
                    placeholder='Ingrese el infonavit'
                />

                {/* Botones de acción */}
                <div className='flex justify-end gap-2'>
                    <Button
                        onClick={onClose}
                        children='Cancelar'
                        disabled={false}
                        design='bg-gray-400 text-white cursor-pointer'
                    />
                    <Button
                        onClick={handleSubmit}
                        children='Guardar'
                        disabled={false}
                        design='bg-green-500 text-white cursor-pointer'
                    />
                </div>
            </div>
        </div>
    );
};

export default CreatePayrollModal;
