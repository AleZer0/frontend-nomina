import { useEffect, useState } from 'react';
import Button from '../Button';
import { Employee } from '../../pages/Employees';
import Modal from '../Modal';

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
        finiquito: number;
        dias_vacaciones: number;
        aguinaldo: number;
    }) => void;
    empleados: Employee[];
    empleadoSeleccionado?: Employee | null;
}

const getCurrentDate = () => new Date().toISOString().split('T')[0];

const emptyPayroll = {
    fecha: getCurrentDate(),
    dias_trabajados: 0,
    prestamos: 0,
    infonavit: 0,
    sueldo: 0,
    finiquito: 0,
    dias_vacaciones: 0,
    aguinaldo: 0,
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
    const [visibleFields, setVisibleFields] = useState({
        vacaciones: false,
        finiquito: false,
        aguinaldo: false,
    });

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
        setNewNomina({ ...emptyPayroll, fecha: getCurrentDate() });
    };

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
                                emp => emp.id_empleado === parseInt(e.target.value)
                            );
                            setNewNomina(prevNomina => ({
                                ...prevNomina,
                                id_empleado: selectedEmployee?.id_empleado || 0,
                                sueldo: selectedEmployee?.sueldo || 0,
                            }));
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
                            placeholder={`Ingrese ${field.label.toLowerCase()}`}
                            type='number'
                            name={field.name}
                            value={newNomina[field.name as keyof typeof newNomina] || ''}
                            onChange={e =>
                                setNewNomina({ ...newNomina, [field.name]: parseFloat(e.target.value) || 0 })
                            }
                            className='w-full rounded-lg border p-2'
                        />
                    </div>
                ))}

                {empleadoSeleccionado?.prestamos && empleadoSeleccionado.prestamos.length > 0 && (
                    <div>
                        <label className='mb-2 block text-gray-700'>Abono a préstamo:</label>
                        <input
                            placeholder='Ingrese abono a préstamo'
                            type='number'
                            name='prestamos'
                            value={newNomina.prestamos || ''}
                            onChange={e => setNewNomina({ ...newNomina, prestamos: parseFloat(e.target.value) || 0 })}
                            className='w-full rounded-lg border p-2'
                        />
                    </div>
                )}

                {/* Sección de Toggles con Inputs debajo */}
                {[
                    { label: 'Vacaciones', field: 'vacaciones', inputName: 'dias_vacaciones' },
                    { label: 'Finiquito', field: 'finiquito', inputName: 'finiquito' },
                    { label: 'Aguinaldo', field: 'aguinaldo', inputName: 'aguinaldo' },
                ].map(({ label, field, inputName }) => (
                    <div key={field} className='flex flex-col gap-2'>
                        {/* Toggle y Label alineados */}
                        <div className='flex items-center gap-3'>
                            <label className='inline-flex cursor-pointer items-center'>
                                <input
                                    type='checkbox'
                                    className='peer sr-only'
                                    checked={visibleFields[field as keyof typeof visibleFields]}
                                    onChange={() =>
                                        setVisibleFields(prev => ({
                                            ...prev,
                                            [field]: !prev[field as keyof typeof visibleFields],
                                        }))
                                    }
                                />
                                <div className='relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300'>
                                    <div
                                        className={`absolute start-[2px] top-[2px] h-5 w-5 rounded-full border border-gray-300 bg-white transition-all ${
                                            visibleFields[field as keyof typeof visibleFields] ? 'translate-x-full' : ''
                                        }`}></div>
                                </div>
                            </label>
                            <label className='block text-gray-700'>{label}:</label>
                        </div>

                        {/* Input que aparece debajo del toggle */}
                        {visibleFields[field as keyof typeof visibleFields] && (
                            <div>
                                {/* <label className='mb-2 block text-gray-700'>{label}:</label> */}
                                <input
                                    type='number'
                                    placeholder={`Ingrese ${field.toLowerCase()}`}
                                    name={inputName}
                                    value={newNomina[inputName as keyof typeof newNomina] || ''}
                                    onChange={e =>
                                        setNewNomina({
                                            ...newNomina,
                                            [inputName]: parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    className='w-full rounded-lg border p-2'
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className='mt-6 flex justify-end'>
                <Button
                    onClick={handleSubmit}
                    className='rounded-2xl bg-green-500 px-4 py-2 text-white hover:bg-green-600'>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default CreatePayrollModal;
