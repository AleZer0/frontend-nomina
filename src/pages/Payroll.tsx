import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { downloadPayrollPDF } from '../services/pdf.service';
import { createPayroll, getPayrolls } from '../services/payroll.service';
import { PayrollInterface } from '../types';
import Empleado from '../services/employees.service';

const Payroll: React.FC = () => {
    const [nominas, setNominas] = useState<PayrollInterface[]>([]);
    const [empleados, setEmpleados] = useState<PayrollInterface['empleado'][]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNomina, setNewNomina] = useState({
        fecha: Date.now.toString,
        prestamos: '',
        infonavit: '',
        sueldo: '',
        id_empleado: '',
    });

    useEffect(() => {
        Empleado.getEmployees(1)
            .then(response => {
                console.log('Respuesta de getEmployees:', response); // Para depuración
                if (response && Array.isArray(response.empleados)) {
                    setEmpleados(response.empleados);
                } else {
                    console.error('Formato inesperado en la respuesta:', response);
                    setEmpleados([]);
                }
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                setEmpleados([]);
            });

        getPayrolls(1)
            .then(response => {
                console.log('Respuesta de getPayrolls:', response); // Para depuración
                if (response && Array.isArray(response.nominas)) {
                    setNominas(response.nominas);
                } else {
                    console.error('Formato inesperado en la respuesta:', response);
                    setNominas([]);
                }
            })
            .catch(error => {
                console.error('Error fetching payrolls:', error);
                setNominas([]);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewNomina({ ...newNomina, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!newNomina.id_empleado || !newNomina.sueldo) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const empleadoSeleccionado = empleados.find(emp => emp.id_empleado === Number(newNomina.id_empleado));

        const nuevaNomina: PayrollInterface = {
            folio: nominas.length + 1,
            fecha: new Date().toISOString(),
            prestamos: Number(newNomina.prestamos) || 0,
            infonavit: Number(newNomina.infonavit) || 0,
            sueldo: Number(newNomina.sueldo),
            id_empleado: Number(newNomina.id_empleado),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            estado: 1,
            empleado: {
                id_empleado: empleadoSeleccionado?.id_empleado || 0,
                nombre: empleadoSeleccionado?.nombre || '',
                apellido: empleadoSeleccionado?.apellido || '',
                puesto: empleadoSeleccionado?.puesto || '',
                sueldo: empleadoSeleccionado?.sueldo || 0,
                created_at: empleadoSeleccionado?.created_at || '',
                updated_at: empleadoSeleccionado?.updated_at || '',
                estado: empleadoSeleccionado?.estado || 1,
            },
        };
        createPayroll({
            fecha: new Date().toISOString(),
            prestamos: Number(newNomina.prestamos) || 0,
            infonavit: Number(newNomina.infonavit) || 0,
            sueldo: Number(newNomina.sueldo),
            id_empleado: parseInt(newNomina.id_empleado),
        })
            .then(response => {
                console.log('Respuesta de createPayroll:', response); // Para depuración
                if (response && response.data && response.data.nomina) {
                    setNominas([...nominas, response.data.nomina]);
                    setIsModalOpen(false);
                } else {
                    console.error('Formato inesperado en la respuesta:', response);
                    alert('Error al crear la nómina.');
                }
            })
            .catch(error => {
                console.error('Error creando la nómina:', error);
                alert('Error al crear la nómina.');
            });

        setNominas([...nominas, nuevaNomina]);
        setIsModalOpen(false);
    };

    // Función para generar PDF por nómina
    const handleGneratePDF = (folio: number) => {
        downloadPayrollPDF(folio);
    };

    return (
        <div className='ml-64 flex h-screen flex-col bg-gray-100'>
            <Header tittle='Nóminas' />
            <main className='flex-1 p-6'>
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className='text-xl font-semibold'>Listado de Nóminas</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'>
                        ➕ Añadir Nómina
                    </button>
                </div>
                <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
                    <div className='grid grid-cols-8 bg-gray-200 p-3 text-center font-semibold text-gray-700'>
                        <div>Folio</div>
                        <div>Empleado</div>
                        <div>Fecha</div>
                        <div>Sueldo</div>
                        <div>Préstamos</div>
                        <div>Infonavit</div>
                        <div>Total a Pagar</div>
                        <div>Acciones</div>
                    </div>
                    <div className='divide-y divide-gray-300'>
                        {nominas.length > 0 ? (
                            nominas.map(item => (
                                <div
                                    key={item.folio}
                                    className='grid grid-cols-8 items-center p-3 text-center text-gray-800 odd:bg-gray-50'>
                                    <div>{item.folio}</div>
                                    <div>{`${item.empleado.nombre} ${item.empleado.apellido}`}</div>
                                    <div>{new Date(item.fecha).toLocaleDateString()}</div>
                                    <div>${item.sueldo.toFixed(2)}</div>
                                    <div>${item.prestamos.toFixed(2)}</div>
                                    <div>${item.infonavit.toFixed(2)}</div>
                                    <div className='font-semibold text-green-600'>
                                        ${(item.sueldo - item.prestamos - item.infonavit).toFixed(2)}
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleGneratePDF(item.folio)}
                                            className='cursor-pointer rounded-lg bg-red-500 px-2 py-1 text-white transition hover:bg-red-600'>
                                            📄 Generar PDF
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='p-3 text-center text-gray-500'>No hay nóminas disponibles</div>
                        )}
                    </div>
                </div>
            </main>
            {isModalOpen && (
                <div className='bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md'>
                    <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
                        <h2 className='mb-4 text-lg font-semibold'>Añadir Nueva Nómina</h2>

                        {/* Selección de Empleado */}
                        <label className='mb-2 block text-gray-700'>Empleado:</label>
                        <select
                            name='id_empleado'
                            value={newNomina.id_empleado}
                            onChange={handleChange}
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
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500'>
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payroll;
