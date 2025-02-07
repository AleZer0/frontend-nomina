import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { downloadPayrollPDF } from '../services/pdf.service';
import { createPayroll, getPayrolls } from '../services/payroll.service';
import { PayrollInterface } from '../types';
import Button from '../components/Button';
import Empleado from '../services/employees.service';
import { FaFilePdf } from 'react-icons/fa6';
import CreatePayrollModal from '../components/modals/CreateNewPayrroll';

import { HiDocumentPlus } from 'react-icons/hi2';

const Payroll: React.FC = () => {
    const [nominas, setNominas] = useState<PayrollInterface[]>([]);
    const [empleados, setEmpleados] = useState<PayrollInterface['empleado'][]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        Empleado.getEmployees(1)
            .then(response => {
                if (response && Array.isArray(response.empleados)) {
                    setEmpleados(response.empleados);
                } else {
                    setEmpleados([]);
                }
            })
            .catch(() => setEmpleados([]));

        getPayrolls(1)
            .then(response => {
                if (response && Array.isArray(response.nominas)) {
                    setNominas(response.nominas);
                } else {
                    setNominas([]);
                }
            })
            .catch(() => setNominas([]));
    }, []);

    const handleSubmit = (newNomina: {
        fecha: string;
        prestamos: number;
        infonavit: number;
        sueldo: number;
        id_empleado: number;
    }) => {
        createPayroll(newNomina)
            .then(response => {
                if (response && response.data && response.data.nomina) {
                    setNominas([...nominas, response.data.nomina]);
                    setIsModalOpen(false);
                } else {
                    alert('Error al crear la nómina.');
                }
            })
            .catch(() => alert('Error al crear la nómina.'));
    };

    return (
        <div className='ml-64 flex h-screen flex-col bg-gray-100'>
            <Header tittle='Listado de Nóminas'>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    disabled={false}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 cursor-pointer text-black'
                    icon={null}>
                    <span className='relative pt-1'>
                        <HiDocumentPlus size={17} />
                    </span>
                    Nueva nómina
                </Button>
            </Header>
            <main className='flex-1 p-6'>
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
                                    <div>{`NOM${item.folio.toString().padStart(4, '0')}`}</div>
                                    <div>{`${item.empleado.nombre} ${item.empleado.apellido}`}</div>
                                    <div>{new Date(item.fecha).toLocaleDateString()}</div>
                                    <div>${item.sueldo.toFixed(2)}</div>
                                    <div>${item.prestamos.toFixed(2)}</div>
                                    <div>${item.infonavit.toFixed(2)}</div>
                                    <div className='font-semibold text-green-600'>
                                        ${(item.sueldo - item.prestamos - item.infonavit).toFixed(2)}
                                    </div>
                                    <div className='flex justify-center gap-2'>
                                        <Button
                                            onClick={() => downloadPayrollPDF(item.folio)}
                                            disabled={false}
                                            design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
                                            icon={null}>
                                            <span className='relative pt-0.5'>
                                                <FaFilePdf size={17} />
                                            </span>
                                            Generar PDF
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='p-3 text-center text-gray-500'>No hay nóminas disponibles</div>
                        )}
                    </div>
                </div>
            </main>
            <CreatePayrollModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                empleados={empleados}
            />
        </div>
    );
};

export default Payroll;
