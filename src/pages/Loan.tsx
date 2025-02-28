import { useMemo, useState } from 'react';

import { MdAttachMoney } from 'react-icons/md';

import Table from '../components/Table';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';

import NewLoan from '../modals/NewLoan';

import { useGlobalContext } from '../context/GlobalContext';
import { LoanInterface } from '../types';

import { Column } from '../types/extras';
import Utils from '../utils';
import { CgDetailsMore } from 'react-icons/cg';

const Loan: React.FC = () => {
    const { loans, addLoan, loading, selectLoan } = useGlobalContext();
    const [isOpenCreateLoan, setIsOpenCreateLoan] = useState<boolean>(false);
    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState(false);

    const columns: Column<LoanInterface>[] = useMemo(
        () => [
            { key: 'id_empleado', header: 'No. Empleado' },
            {
                key: 'empleado',
                header: 'Empleado',
                render: (_, row) => row.empleado ?? '',
            },
            {
                key: 'created_at',
                header: 'Fecha',
                render: (_, row) => (row.created_at ? Utils.formatDateDDMMYYYY(row.created_at) : 'Sin fecha'),
            },
            { key: 'monto_total', header: 'Monto Total', render: (_, row) => `$${(row.monto_total ?? 0).toFixed(2)}` },
            {
                key: 'saldo_pendiente',
                header: 'Saldo Pendiente',
                render: (_, row) => `$${(row.saldo_pendiente ?? 0).toFixed(2)}`,
            },
            {
                key: 'ultimo_abono',
                header: 'Último Abono',
                render: (_, row) => `$${(row.ultimo_abono ?? 0).toFixed(2)}`,
            },
            {
                key: 'accion',
                header: 'Acción',
                render: (_, row) => (
                    <Button
                        variant='details'
                        size='md'
                        icon={<CgDetailsMore size={15} />}
                        onClick={() => {
                            selectLoan(undefined, row);
                            setIsOpenViewLoan(true);
                        }}>
                        Detalles
                    </Button>
                ),
            },
        ],
        []
    );

    const handleCreateLoan = (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        addLoan(newLoan);
        setIsOpenCreateLoan(false);
    };
    const handleViewLoan = (id_empleado: number) => {
        setIsOpenViewLoan(false);
    };
    const handleCreatePayroll = (newPayroll: Omit<PrestamoAbono, 'folio'>) => {
        addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
    };

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            <Header title='Listado de prestamos'>
                <Button
                    variant='add'
                    size='md'
                    icon={<MdAttachMoney size={17} />}
                    onClick={() => setIsOpenCreateLoan(true)}>
                    Nuevo Prestamo
                </Button>
            </Header>

            {loading && <Loader />}
            <Table columns={columns} data={loans}></Table>

            <NewLoan isOpen={isOpenCreateLoan} onClose={() => setIsOpenCreateLoan(false)} onSubmit={handleCreateLoan} />
            <NewLoan
                isOpen={IsOpenViewLoan}
                onClose={() => setIsOpenViewLoan(false)}
                onSubmit={handleViewLoan}
                handleClick
            />
        </section>

        // {/* Modal para agregar un abono */}
        // <Payloan
        //     isOpen={isSubscriptionModalOpen}
        //     onClose={closeCreateLoanModal}
        //     onSubmit={handleSubscriptionSubmit}
        //     selectLoan={selectedLoan}
        // />
        // {/* ViewLoan ahora se abre correctamente */}
        // <ViewLoan
        //     isOpen={isViewLoanModalOpen}
        //     onClose={() => setIsViewLoanModalOpen(false)}
        //     loan={selectedLoan}
        //     openLoanPay={openLoanPay}
        // />
    );
};

export default Loan;
