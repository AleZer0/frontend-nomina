import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { createPayroll, getPayrolls } from '../services/payroll.service';
import { PayrollInterface } from '../types';
import Button from '../components/Button';
import Empleado from '../services/employees.service';
import { HiDocumentPlus } from 'react-icons/hi2';
import { Employee } from './Employees';
import TableDataNomina from '../components/TableDataNomina';
import CreatePayrollModal from '../components/modals/CreateNewPayrroll';

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
        <div className='ml-64 flex h-screen flex-col bg-gray-100'>
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

            <main className='flex-1 p-6'>
                <TableDataNomina
                    fields={['Folio', 'Empleado', 'Fecha', 'Sueldo', 'Préstamos', 'Infonavit', 'Total a Pagar']}
                    data={nominas}
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
