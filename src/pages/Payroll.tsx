import { useMemo, useState } from 'react';

import { HiDocumentPlus } from 'react-icons/hi2';
import { FaFilePdf } from 'react-icons/fa';

import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Table from '../components/Table';

import NewPayroll from '../modals/NewPayroll';

import { previewPayrollPDF } from '../services/pdf.service';

import { PayrollInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

import Utils from '../utils';

const totalPagar = (total: number) => {
    return <span className={`${total < 0 ? 'text-red-500' : 'text-green-500'}`}>${total.toFixed(2)}</span>;
};

const Payroll: React.FC = () => {
    const { payrolls, addPayroll, loading, loadingButtons, setLoadingButtons } = useGlobalContext();

    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState<boolean>(false);

    const handleCreatePayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        await addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
    };

    const handleDownload = (folio: number) => {
        setLoadingButtons(prev => ({ ...prev, [folio]: true }));

        setTimeout(() => {
            previewPayrollPDF(folio);
            setLoadingButtons(prev => ({ ...prev, [folio]: false }));
        }, 3000);
    };

    const columns: Column<PayrollInterface>[] = useMemo(
        () => [
            { key: 'folio', header: 'Folio', render: (_, row) => `NOM${row.folio.toString().padStart(4, '0')}` },
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
                    totalPagar(
                        row.sueldo -
                            (row.prestamos ?? 0) -
                            (row.infonavit ?? 0) +
                            (row.vacaciones ?? 0) +
                            (row.finiquito ?? 0) +
                            (row.aguinaldo ?? 0)
                    ),
            },
            {
                key: 'accion',
                header: 'Acción',
                render: (_, row) => (
                    <Button
                        variant='details'
                        size='md'
                        icon={<FaFilePdf size={15} />}
                        onClick={() => handleDownload(row.folio)}
                        isLoading={loadingButtons[row.folio]}
                        disabled={loadingButtons[row.folio]}>
                        Descargar
                    </Button>
                ),
            },
        ],
        [loadingButtons]
    );

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            <Header title='Listado de Nóminas'>
                <Button
                    variant='add'
                    size='md'
                    icon={<HiDocumentPlus size={17} />}
                    onClick={() => setIsOpenCreatePayroll(true)}>
                    Nueva nómina
                </Button>
            </Header>

            {loading && (
                <div className='my-4 flex justify-center'>
                    <Loader />
                </div>
            )}

            <Table columns={columns} data={payrolls} />

            <NewPayroll
                isOpen={isOpenCreatePayroll}
                onClose={() => setIsOpenCreatePayroll(false)}
                onSubmit={handleCreatePayroll}
            />
        </section>
    );
};

export default Payroll;
