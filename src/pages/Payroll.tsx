import { useMemo, useState } from 'react';

import { HiDocumentAdd } from 'react-icons/hi';
import { FaFilePdf } from 'react-icons/fa6';

import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Table from '../components/Table';
import Pagination from '../components/Pagination';

import NewPayroll from '../modals/NewPayroll';

import { PayrollInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

import Utils from '../utils';

const totalPagar = (total: number) => {
    return <span className={`${total < 0 ? 'text-red-500' : 'text-green-500'}`}>${total.toFixed(2)}</span>;
};

const Payroll: React.FC = () => {
    const { entitiesState, addPayroll, createPreviewPayrollPDF, loading, isSidebarOpen } = useGlobalContext();

    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState<boolean>(false);

    const handleCreatePayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        await addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
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
                        onClick={() => createPreviewPayrollPDF(row.folio)}
                        isLoading={loading[row.folio]}
                        disabled={loading[row.folio]}>
                        Descargar
                    </Button>
                ),
            },
        ],
        [entitiesState.payrolls]
    );

    return (
        <section
            className={`mb-20 flex-auto p-8 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            <Header title='Listado de Nóminas'>
                <Button
                    variant='add'
                    size='md'
                    icon={<HiDocumentAdd size={17} />}
                    onClick={() => setIsOpenCreatePayroll(true)}>
                    Nueva nómina
                </Button>
            </Header>

            {loading['payrolls'] ? (
                <div className='my-4 flex justify-center'>
                    <Loader />
                </div>
            ) : (
                <Table columns={columns} data={entitiesState.payrolls} />
            )}

            <Pagination />

            <NewPayroll
                isOpen={isOpenCreatePayroll}
                onClose={() => setIsOpenCreatePayroll(false)}
                onSubmit={handleCreatePayroll}
            />
        </section>
    );
};

export default Payroll;
