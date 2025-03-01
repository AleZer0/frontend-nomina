import { useMemo, useState } from 'react';
import { MdAttachMoney } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';

import Table from '../components/Table';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';

import NewLoan from '../modals/NewLoan';
import ViewLoan from '../modals/ViewLoan';

import { useGlobalContext } from '../context/GlobalContext';
import { LoanInterface } from '../types';
import { Column } from '../types/extras';
import Utils from '../utils';

const Loan: React.FC = () => {
    const { loans, addLoan, loading } = useGlobalContext();
    const [isOpenViewLoan, setIsOpenViewLoan] = useState(false);
    const [isOpenCreateLoan, setIsOpenCreateLoan] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<LoanInterface | null>(null);

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
                        icon={<CgDetailsMore size={15} />}
                        onClick={() => {
                            setSelectedLoan(row);
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

            {loading && <Loader />}
            <Table columns={columns} data={loans} />

            {/* Modal para crear un nuevo préstamo */}
            <NewLoan isOpen={isOpenCreateLoan} onClose={() => setIsOpenCreateLoan(false)} onSubmit={handleCreateLoan} />

            {/* Modal para ver detalles del préstamo */}
            <ViewLoan isOpen={isOpenViewLoan} onClose={() => setIsOpenViewLoan(false)} loan={selectedLoan} />
        </section>
    );
};

export default Loan;
