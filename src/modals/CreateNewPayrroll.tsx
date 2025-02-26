import { useEffect, useMemo, useState } from 'react';

import { FaRegSave } from 'react-icons/fa';

import Modal from '../components/Modal';
import Form from '../components/Form';

import { FormField } from '../types/extras';

import { EmployeeInterface, PayrollInterface, LoanInterface } from '../types';

interface PrestamoAbono {
    id_prestamo: number;
    monto_abonado: number;
}

interface CreatePayrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newNomina: Omit<PayrollInterface, 'folio'>) => void;
    empleados: EmployeeInterface[];
    empleadoSeleccionado?: EmployeeInterface | null;
}

const NewNomina: React.FC<CreatePayrollModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const emptyPayroll: Omit<PayrollInterface, 'folio'> = {
        fecha: getCurrentDate(),
        dias_trabajados: 0,
        infonavit: 0,
        sueldo: 0,
        finiquito: 0,
        vacaciones: 0,
        aguinaldo: 0,
        id_empleado: 0,
        ids_prestamos: [] as PrestamoAbono[],
    };

    const fields: FormField[] = useMemo(() => []);

    useEffect(() => {
        if (empleadoSeleccionado) {
            setNewNomina(prevNomina => ({
                ...emptyPayroll,
                id_empleado: empleadoSeleccionado.id_empleado,
                sueldo: empleadoSeleccionado.sueldo ?? 0,
                // Reiniciamos el array de prestamos seleccionados
                prestamos: [],
            }));
        }
    }, [empleadoSeleccionado]);

    // Función para manejar la selección múltiple de préstamos
    const handleSelectPrestamos = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedIds = selectedOptions.map(option => parseInt(option.value, 10));

        setNewNomina(prev => {
            // Construimos un nuevo array de préstamos seleccionados
            // Si un préstamo ya existe en prev.prestamos, conservamos su monto_abonado
            const newPrestamos = selectedIds.map(id => {
                const existing = prev.prestamos.find(p => p.id_prestamo === id);
                return existing || { id_prestamo: id, monto_abonado: 0 };
            });
            return { ...prev, prestamos: newPrestamos };
        });
    };

    // Función para cambiar el monto de abono en un préstamo seleccionado
    const handleChangeMontoAbonado = (id_prestamo: number, monto_abonado: number) => {
        setNewNomina(prev => ({
            ...prev,
            prestamos: prev.prestamos.map(prestamo =>
                prestamo.id_prestamo === id_prestamo ? { ...prestamo, monto_abonado } : prestamo
            ),
        }));
    };

    // Enviamos la nómina al padre
    const handleSubmit = () => {
        if (!newNomina.id_empleado || newNomina.sueldo <= 0) {
            alert('Por favor, selecciona un empleado y verifica el sueldo.');
            return;
        }
        onSubmit(newNomina);
        setNewNomina({ ...emptyPayroll, fecha: getCurrentDate() });
    };

    // Empleado seleccionado localmente según el ID en newNomina
    const selectedEmployeeLocal = empleados.find(emp => emp.id_empleado === newNomina.id_empleado);

    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onClose} title='Añadir una nómina'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {/* Selección de Empleado */}
                <div className='md:col-span-2'>
                    <label className='mb-2 block text-gray-700'>Empleado:</label>
                    <select
                        name='id_empleado'
                        value={newNomina.id_empleado}
                        onChange={e => {
                            const selectedEmployee = empleados.find(
                                emp => emp.id_empleado === parseInt(e.target.value, 10)
                            );
                            setNewNomina({
                                ...emptyPayroll,
                                id_empleado: selectedEmployee?.id_empleado || 0,
                                sueldo: selectedEmployee?.sueldo || 0,
                                prestamos: [],
                            });
                        }}
                        className='w-full rounded-lg border p-2'>
                        <option value=''>Seleccione un empleado</option>
                        {empleados.map(emp => (
                            <option key={emp.id_empleado} value={emp.id_empleado}>
                                {emp.nombre} {emp.apellido}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha de Nómina */}
                <div>
                    <label className='mb-2 block text-gray-700'>Fecha de Nómina:</label>
                    <input
                        type='date'
                        name='fecha'
                        value={newNomina.fecha}
                        onChange={e => setNewNomina({ ...newNomina, fecha: e.target.value })}
                        className='w-full rounded-lg border p-2'
                    />
                </div>

                {/* Campos numéricos generales */}
                {[
                    { label: 'Días laborados', name: 'dias_trabajados' },
                    { label: 'Sueldo', name: 'sueldo' },
                    { label: 'Infonavit', name: 'infonavit' },
                ].map(field => (
                    <div key={field.name}>
                        <label className='mb-2 block text-gray-700'>{field.label}:</label>
                        <input
                            type='number'
                            name={field.name}
                            value={newNomina[field.name as keyof typeof newNomina] || ''}
                            onChange={e =>
                                setNewNomina({
                                    ...newNomina,
                                    [field.name]: parseFloat(e.target.value) || 0,
                                })
                            }
                            className='w-full rounded-lg border p-2'
                        />
                    </div>
                ))}

                {/* Selección múltiple de préstamos (si el empleado tiene) */}
                {selectedEmployeeLocal?.prestamos && selectedEmployeeLocal.prestamos.length > 0 && (
                    <div className='md:col-span-2'>
                        <label className='mb-2 block text-gray-700'>Préstamos (seleccione uno o varios):</label>
                        <select
                            multiple
                            className='w-full rounded-lg border p-2'
                            onChange={handleSelectPrestamos}
                            // Arma un array de ID_prestamo seleccionados
                            value={newNomina.prestamos.map(p => p.id_prestamo.toString())}>
                            {selectedEmployeeLocal.prestamos.map(prestamo => (
                                <option key={prestamo.id_prestamo} value={prestamo.id_prestamo}>
                                    {`Préstamo #${prestamo.id_prestamo}`}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Inputs para abonar a cada préstamo seleccionado */}
                {newNomina.prestamos.length > 0 &&
                    newNomina.prestamos.map((p, idx) => (
                        <div key={p.id_prestamo} className='flex items-center gap-4 md:col-span-2'>
                            <label className='w-1/2 text-gray-700'>Monto a abonar en préstamo #{p.id_prestamo}:</label>
                            <input
                                type='number'
                                placeholder='Ingrese abono'
                                value={p.monto_abonado || ''}
                                onChange={e => handleChangeMontoAbonado(p.id_prestamo, parseFloat(e.target.value) || 0)}
                                className='w-1/2 rounded-lg border p-2'
                            />
                        </div>
                    ))}
            </div>

            <div className='mt-6 flex justify-end'>
                <Button
                    onClick={handleSubmit}
                    className='rounded-2xl bg-green-500 px-4 py-2 text-white hover:bg-green-600'>
                    <span className='relative pt-1'>
                        <FaRegSave size={17} />
                    </span>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreatePayrollModal;
