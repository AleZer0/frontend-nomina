import { useMemo, useState } from 'react';

import { HiDocumentPlus } from 'react-icons/hi2';
import { FaFilePdf } from 'react-icons/fa';

import Header from '../components/Header';
import Button from '../components/Button';
import TableData from '../components/TableData';
import Loader from '../components/Loader';
import LoadingButton from '../components/LoadingButton';

import CreatePayrollModal from '../modals/CreateNewPayrroll';

import { previewPayrollPDF } from '../services/pdf.service';
import PayrollServices from '../services/payroll.service';

import { PayrollInterface } from '../types';
import { Column } from '../types/extras';
import { useGlobalContext } from '../context/GlobalContext';
import Table from '../components/Table';
import Utils from '../utils';

const Payroll: React.FC = () => {
    const { payrolls, addPayroll, loading } = useGlobalContext();
    const [selectedPayroll, setSelectedPayroll] = useState<Partial<PayrollInterface> | null>(null);

    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState<boolean>(false);

    const totaPagar = (total: number) => {
        return <span className={`${total < 0 ? 'text-red-500' : 'text-green-500'}`}>${total.toFixed(2)}</span>;
    };

    const columns: Column<PayrollInterface>[] = useMemo(
        () => [
            { key: 'folio', header: 'Folio' },
            {
                key: 'empleado',
                header: 'Empleado',
                render: (_, row) => (row.empleado ? `${row.empleado.nombre} ${row.empleado.apellido}` : ''),
            },
            { key: 'fecha', header: 'Fecha', render: (_, row) => Utils.formatDateDDMMYYYY(row.fecha) },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => (row.sueldo ? `$${row.sueldo.toFixed(2)}` : 'Sin sueldo definido'),
            },
            {
                key: 'prestamos',
                header: 'Prestamos',
                render: (_, row) => `$${(row.prestamos ?? 0).toFixed(2)}`,
            },
            {
                key: 'infonavit',
                header: 'Infonavit',
                render: (_, row) => `$${(row.infonavit ?? 0).toFixed(2)}`,
            },
            {
                key: 'total_pagar',
                header: 'Total a Pagar',
                render: (_, row) =>
                    totaPagar(
                        row.sueldo -
                            (row.prestamos ? row.prestamos : 0) -
                            row.infonavit +
                            row.vacaciones +
                            row.finiquito +
                            row.aguinaldo
                    ),
            },
            {
                key: 'accion',
                header: 'Accion',
                render: (_, row) => (
                    <Button
                        variant='details'
                        size='md'
                        icon={<FaFilePdf size={15} />}
                        onClick={() => {
                            () => previewPayrollPDF(row.folio);
                        }}>
                        Generar PDF
                    </Button>
                ),
            },
        ],
        []
    );

    const handleCreatePayroll = (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
    };

    return (
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header title='Listado de Empleados'>
                <Button
                    variant='add'
                    size='md'
                    icon={<HiDocumentPlus size={17} />}
                    onClick={() => setIsOpenCreatePayroll(true)}>
                    Nuevo empleado
                </Button>
            </Header>

            <main className='p-6'>
                {loading && <Loader />}
                <Table columns={columns} data={payrolls}></Table>
            </main>

            {/* <CreatePayrollModal
                empleados={empleados}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            /> */}
        </div>
    );
};

export default Payroll;
