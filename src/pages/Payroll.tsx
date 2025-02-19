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
import Loader from '../components/Loader';
import LoadingButton from '../components/LoadingButton';

const Payroll: React.FC = () => {
    const [nominas, setNominas] = useState<PayrollInterface[]>([]);
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ejecuta ambas peticiones en paralelo
        Promise.all([
            Empleado.getEmployees(1).then(response => setEmpleados(response?.empleados || [])),
            getPayrolls(1).then(response => setNominas(response?.nominas || [])),
        ])
            .catch(() => {
                setEmpleados([]);
                setNominas([]);
            })
            .finally(() => setLoading(false));
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
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de Nóminas'>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 rounded-2xl cursor-pointer text-black'>
                    <span className='relative pt-1'>
                        <HiDocumentPlus size={17} />
                    </span>
                    Nueva nómina
                </Button>
            </Header>
            <main className='p-6'>
                {loading && <Loader />}
                <div className='overflow-hidden rounded-lg bg-white shadow-lg'></div>
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
                            <div className='p-2'>{`NOM${item.folio.toString().padStart(4, '0')}`}</div>
                            <div className='p-2'>{`${item.empleado.nombre} ${item.empleado.apellido}`}</div>
                            <div className='p-2'>{new Date(item.fecha).toLocaleDateString('es-MX')}</div>
                            <div className='p-2'>${item.sueldo.toFixed(2)}</div>
                            <div className='p-2'>${item.prestamos.toFixed(2)}</div>
                            <div className='p-2'>${item.infonavit.toFixed(2)}</div>
                            <div className='p-2 font-semibold text-green-600'>
                                ${(item.sueldo - item.prestamos - item.infonavit).toFixed(2)}
                            </div>
                            <div className='flex justify-center gap-2 p-2'>
                                <LoadingButton onClick={() => previewPayrollPDF(item.folio)}>
                                    <span className='relative pt-0.5'>
                                        <FaFilePdf size={17} />
                                    </span>
                                    Generar PDF
                                </LoadingButton>
                            </div>
                        </>
                    )}
                />
            </main>
            <CreatePayrollModal
                empleados={empleados}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Payroll;
