import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { createPayroll, getPayrolls } from '../services/payroll.service';
import { PayrollInterface } from '../types';
import Button from '../components/Button';
import Empleado from '../services/employees.service';
import { HiDocumentPlus } from 'react-icons/hi2';
import { Employee } from './Employees';
import CreatePayrollModal from '../components/modals/CreateNewPayrroll';
import TableData from '../components/TableData';
import { previewPayrollPDF } from '../services/pdf.service';
import { FaFilePdf } from 'react-icons/fa';

const Payroll: React.FC = () => {
    const [nominas, setNominas] = useState<PayrollInterface[]>([]);
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        Empleado.getEmployees(1)
            .then(response => {
                setEmpleados(response?.empleados || []);
            })
            .catch(() => setEmpleados([]));

        getPayrolls(1)
            .then(response => {
                setNominas(response?.nominas || []);
            })
            .catch(() => setNominas([]));
    }, []);

    const handleSubmit = (newNomina: {
        fecha: string;
        dias_trabajados: number;
        prestamos: number;
        infonavit: number;
        sueldo: number;
        id_empleado: number;
    }) => {
        createPayroll(newNomina)
            .then(response => {
                if (response?.nomina) {
                    setNominas([...nominas, response.nomina]);
                    setIsModalOpen(false);
                } else {
                    alert('Error al crear la nómina.');
                }
            })
            .catch(() => alert('Error al crear la nómina.'));
    };

    return (
        <div className='ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de Nóminas'>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 rounded cursor-pointer text-black'>
                    <span className='relative pt-1'>
                        <HiDocumentPlus size={17} />
                    </span>
                    Nueva nómina
                </Button>
            </Header>

            <main className='p-6'>
                <TableData
                    fields={[
                        'Folio',
                        'Empleado',
                        'Fecha',
                        'Sueldo',
                        'Préstamos',
                        'Infonavit',
                        'Total a Pagar',
                        'Acciones',
                    ]}
                    data={nominas}
                    renderRow={item => (
                        <>
                            <div className='p-2'>{item.folio}</div>
                            <div className='p-2'>{`${item.empleado.nombre} ${item.empleado.apellido}`}</div>
                            <div className='p-2'>{new Date(item.fecha).toLocaleDateString('es-MX')}</div>
                            <div className='p-2'>${item.sueldo.toFixed(2)}</div>
                            <div className='p-2'>${item.prestamos.toFixed(2)}</div>
                            <div className='p-2'>${item.infonavit.toFixed(2)}</div>
                            <div className='p-2 font-semibold text-green-600'>
                                ${(item.sueldo - item.prestamos - item.infonavit).toFixed(2)}
                            </div>
                            <div className='flex justify-center gap-2 p-2'>
                                <Button
                                    onClick={() => previewPayrollPDF(item.folio)}
                                    design='cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'>
                                    <span className='relative pt-0.5'>
                                        <FaFilePdf size={17} />
                                    </span>
                                    Generar PDF
                                </Button>
                            </div>
                        </>
                    )}
                />
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
