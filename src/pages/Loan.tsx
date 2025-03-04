import { useMemo, useState } from 'react';

import { MdAttachMoney } from 'react-icons/md';
import { HiOutlineCash } from 'react-icons/hi';

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
    const { loans, addLoan, loading, selectEmployee, employees } = useGlobalContext();
    const [isOpenViewLoan, setIsOpenViewLoan] = useState(false);
    const [isOpenCreateLoan, setIsOpenCreateLoan] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<LoanInterface | null>(null);
    const [localLoans, setLocalLoans] = useState<LoanInterface[]>(loans); // Estado local para evitar recargar la página

    // 📌 Columnas de la tabla
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
                            setSelectedLoan(row);
                            selectEmployee(row.id_empleado);
                            setTimeout(() => setIsOpenViewLoan(true), 100);
                        }}>
                        Abonos
                    </Button>
                ),
            },
        ],
        []
    );

    // 📌 Manejo de nuevo préstamo sin hacer otra petición al backend
    const handleCreateLoan = (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        // 🔹 Buscar el nombre del empleado basado en `id_empleado`
        const empleadoSeleccionado = employees.find(emp => emp.id_empleado === newLoan.id_empleado);

        // 🔹 Crear un préstamo con el nombre del empleado
        const newLoanWithEmployee: LoanInterface = {
            id_prestamo: Date.now(), // Temporal
            ...newLoan,
            empleado: empleadoSeleccionado
                ? `${empleadoSeleccionado.nombre} ${empleadoSeleccionado.apellido}`
                : 'Desconocido',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            abonos: [],
            ultimo_abono: 0,
        };

        // 🔹 Agregar el nuevo préstamo al estado global
        addLoan(newLoanWithEmployee);

        // 🔹 Actualizar la tabla sin hacer otra petición
        setLocalLoans(prevLoans => [...prevLoans, newLoanWithEmployee]);

        setIsOpenCreateLoan(false);
    };

    return (
        <section className='mb-20 ml-64 flex-auto p-8'>
            {/* 📌 Header con botón para nuevo préstamo */}
            <Header title='Listado de préstamos'>
                <Button
                    variant='add'
                    size='md'
                    icon={<MdAttachMoney size={17} />}
                    onClick={() => setIsOpenCreateLoan(true)}>
                    Nuevo Préstamo
                </Button>
            </Header>

            {/* 📌 Loader debajo del Header */}
            {loading && (
                <div className='my-4 flex justify-center'>
                    <Loader />
                </div>
            )}

            {/* 📌 Contenedor de la tabla con encabezado fijo */}
            <div className='overflow-hidden rounded-lg shadow-md'>
                {/* 🔹 La tabla siempre muestra el encabezado, incluso si está vacía */}
                <Table columns={columns} data={localLoans} />

                {/* 📌 Mensaje de "No hay registros" cuando la lista está vacía */}
                {!loading && localLoans.length === 0 && (
                    <div className='py-4 text-center text-gray-500'>No hay registros disponibles.</div>
                )}
            </div>

            {/* 📌 Modal para crear un nuevo préstamo */}
            <NewLoan isOpen={isOpenCreateLoan} onClose={() => setIsOpenCreateLoan(false)} onSubmit={handleCreateLoan} />

            {/* 📌 Modal para ver detalles del préstamo */}
            <ViewLoan isOpen={isOpenViewLoan} onClose={() => setIsOpenViewLoan(false)} loan={selectedLoan} />
        </section>
    );
};

export default Loan;
