import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Header from '../components/Header';

interface Nomina {
    folio: number;
    fecha: string;
    prestamos: number;
    infonavit: number;
    sueldo: number;
    id_empleado: number;
    empleado: {
        nombre: string;
        apellido: string;
    };
}

interface Empleado {
    id_empleado: number;
    nombre: string;
    apellido: string;
}

const Payroll: React.FC = () => {
    const [nominas, setNominas] = useState<Nomina[]>([]);
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNomina, setNewNomina] = useState({ id_empleado: '', sueldo: '', prestamos: '', infonavit: '' });

    // Simulación de datos
    useEffect(() => {
        setNominas([
            {
                folio: 1,
                fecha: '2024-02-01',
                prestamos: 500,
                infonavit: 300,
                sueldo: 15000,
                id_empleado: 1,
                empleado: { nombre: 'Alexis', apellido: 'Díaz' },
            },
            {
                folio: 2,
                fecha: '2024-02-01',
                prestamos: 1000,
                infonavit: 500,
                sueldo: 17000,
                id_empleado: 2,
                empleado: { nombre: 'Hashley', apellido: 'Aquino' },
            },
        ]);

        setEmpleados([
            { id_empleado: 1, nombre: 'Alexis', apellido: 'Díaz' },
            { id_empleado: 2, nombre: 'Hashley', apellido: 'Aquino' },
            { id_empleado: 3, nombre: 'Carlos', apellido: 'Mendoza' },
        ]);
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

        const nuevaNomina: Nomina = {
            folio: nominas.length + 1,
            fecha: new Date().toISOString(),
            prestamos: Number(newNomina.prestamos) || 0,
            infonavit: Number(newNomina.infonavit) || 0,
            sueldo: Number(newNomina.sueldo),
            id_empleado: Number(newNomina.id_empleado),
            empleado: {
                nombre: empleadoSeleccionado?.nombre || '',
                apellido: empleadoSeleccionado?.apellido || '',
            },
        };

        setNominas([...nominas, nuevaNomina]);
        setIsModalOpen(false);
    };

    // Función para generar PDF por nómina
    const generatePDF = (nomina: Nomina) => {
        const doc = new jsPDF();
        doc.text('Reporte de Nómina', 14, 10);

        autoTable(doc, {
            startY: 20,
            head: [['Folio', 'Empleado', 'Fecha', 'Sueldo', 'Préstamos', 'Infonavit', 'Total a Pagar']],
            body: [
                [
                    nomina.folio,
                    `${nomina.empleado.nombre} ${nomina.empleado.apellido}`,
                    new Date(nomina.fecha).toLocaleDateString(),
                    `$${nomina.sueldo.toFixed(2)}`,
                    `$${nomina.prestamos.toFixed(2)}`,
                    `$${nomina.infonavit.toFixed(2)}`,
                    `$${(nomina.sueldo - nomina.prestamos - nomina.infonavit).toFixed(2)}`,
                ],
            ],
        });

        doc.save(`reporte_nomina_${nomina.folio}.pdf`);
    };

    return (
        <div className='ml-64 flex h-screen flex-col bg-gray-100'>
            <Header tittle='Nóminas' />
            <main className='flex-1 p-6'>
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className='text-xl font-semibold'>Listado de Nóminas</h2>
                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'>
                            ➕ Añadir Nómina
                        </button>
                    </div>
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
                        {nominas.map(item => (
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
                                        onClick={() => generatePDF(item)}
                                        className='rounded-lg bg-red-500 px-2 py-1 text-white transition hover:bg-red-600'>
                                        📄 Generar PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* MODAL */}
            {isModalOpen && (
                <div className='bg-opacity-5 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg'>
                    <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
                        <h2 className='mb-4 text-lg font-semibold'>Añadir Nómina</h2>

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
