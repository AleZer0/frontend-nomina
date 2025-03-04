import { useMemo, useState } from 'react';

import { MdAttachMoney } from 'react-icons/md';
import { HiOutlineCash } from 'react-icons/hi';

import Table from '../components/Table';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';

import ViewLoan from '../modals/ViewLoan';
import NewLoan from '../modals/NewLoan';
import PayLoan from '../modals/Payloan';

import { useGlobalContext } from '../context/GlobalContext';

import { LoanInterface, PaymentInterface } from '../types';
import { Column } from '../types/extras';

import Utils from '../utils';

const Loans: React.FC = () => {
    const { loans, selectedLoan, addLoan, updateLoan, loading, selectEmployee, selectLoan } = useGlobalContext();

    const [isOpenViewLoan, setIsOpenViewLoan] = useState(false);
    const [isOpenCreateLoan, setIsOpenCreateLoan] = useState(false);
    const [isOpenPayLoan, setIsOpenPayLoan] = useState(false);

    const handleCreateLoan = (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        addLoan(newLoan);
        setIsOpenCreateLoan(false);
    };

    const handlePayLoan = async (updatedLoan: Partial<PaymentInterface>) => {
        if (!selectedLoan) return;
        updateLoan(selectedLoan.id_prestamo ?? 0, updatedLoan.monto_abonado ?? 0);
        setIsOpenPayLoan(false);
    };

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
            {
                key: 'monto_total',
                header: 'Monto Total',
                render: (_, row) => `$${(row.monto_total ?? 0).toFixed(2)}`,
            },
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
                        icon={<HiOutlineCash size={15} />}
                        onClick={() => {
                            selectLoan(undefined, row);
                            selectEmployee(row.id_empleado);
                            setTimeout(() => setIsOpenViewLoan(true), 100);
                        }}>
                        Detalles
                    </Button>
                ),
            },
        ],
        []
    );

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            <Header title='Listado de préstamos'>
                <Button
                    variant='add'
                    size='md'
                    icon={<MdAttachMoney size={17} />}
                    onClick={() => setIsOpenCreateLoan(true)}>
                    Nuevo Préstamo
                </Button>
            </Header>

            {loading && (
                <div className='my-4 flex justify-center'>
                    <Loader />
                </div>
            )}

            <Table columns={columns} data={loans} />

            <ViewLoan
                isOpen={isOpenViewLoan}
                onClose={() => setIsOpenViewLoan(false)}
                handleClickPayLoan={() => setIsOpenPayLoan(true)}
            />

            <NewLoan isOpen={isOpenCreateLoan} onClose={() => setIsOpenCreateLoan(false)} onSubmit={handleCreateLoan} />

            <PayLoan isOpen={isOpenPayLoan} onClose={() => setIsOpenPayLoan(false)} onSubmit={handlePayLoan} />
        </section>
    );
};

export default Loans;
