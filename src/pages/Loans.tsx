import { useMemo, useState } from 'react';

import { MdAttachMoney } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';

import Table from '../components/Table';
import Header from '../components/Header';
import Button from '../components/Button';
import Pagination from '../components/Pagination';

import ViewLoan from '../modals/ViewLoan';
import NewLoan from '../modals/NewLoan';
import PayLoan from '../modals/Payloan';

import { useGlobalContext } from '../context/GlobalContext';

import { LoanInterface, PaymentInterface } from '../types';
import { Column } from '../types/extras';

import Utils from '../utils';

const Loans: React.FC = () => {
    const { entitiesState, selectedEntities, setSelectedEntities, addLoan, updateLoan, loading, isSidebarOpen } =
        useGlobalContext();

    const [isOpenViewLoan, setIsOpenViewLoan] = useState(false);
    const [isOpenCreateLoan, setIsOpenCreateLoan] = useState(false);
    const [isOpenPayLoan, setIsOpenPayLoan] = useState(false);

    const handleCreateLoan = async (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        await addLoan(newLoan);
        setIsOpenCreateLoan(false);
    };

    const handlePayLoan = async (updatedLoan: Partial<PaymentInterface>) => {
        if (!selectedEntities.selectedLoan) return;
        const newSelectedLoan = await updateLoan(
            selectedEntities.selectedLoan.id_prestamo,
            updatedLoan.monto_abonado ?? 0
        );
        setSelectedEntities(prev => ({ ...prev, selectedLoan: newSelectedLoan }));
        setIsOpenPayLoan(false);
        if (newSelectedLoan.saldo_pendiente === 0) setIsOpenViewLoan(false);
    };

    const columns: Column<LoanInterface>[] = useMemo(
        () => [
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
                        icon={<CgDetailsMore size={17} />}
                        onClick={() => {
                            setSelectedEntities(prev => ({ ...prev, selectedLoan: row }));
                            setIsOpenViewLoan(true);
                        }}>
                        Detalles
                    </Button>
                ),
            },
        ],
        [entitiesState.loans]
    );

    return (
        <section
            className={`mb-20 flex-auto p-8 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            <Header title='Listado de préstamos'>
                <Button
                    variant='add'
                    size='md'
                    icon={<MdAttachMoney size={17} />}
                    onClick={() => setIsOpenCreateLoan(true)}>
                    Nuevo préstamo
                </Button>
            </Header>

            <Table
                columns={columns}
                data={entitiesState.loans.filter(prev => prev.saldo_pendiente !== 0)}
                loading={loading['loans']}
            />
            <Pagination />

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
