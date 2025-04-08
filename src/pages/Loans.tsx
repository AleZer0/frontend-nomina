import { useEffect, useMemo, useState } from 'react';

import { CgDetailsMore } from 'react-icons/cg';
import { MdAttachMoney, MdOutlineManageSearch } from 'react-icons/md';
import { TbUserSearch } from 'react-icons/tb';
import { BsFillEraserFill } from 'react-icons/bs';

import Table from '../components/Table';
import Button from '../components/Button';
import Pagination from '../components/Pagination';

import ViewLoan from '../components/modals/ViewLoan';
import NewLoan from '../components/modals/NewLoan';
import PayLoan from '../components/modals/Payloan';

import { useGlobalContext } from '../context/GlobalContext';

import { LoanInterface, PaymentInterface } from '../types/entities';
import { Column } from '../types/extras';

import Utils from '../utils';
import Popup from '../components/Popup';
import { FaSortAmountDown } from 'react-icons/fa';
import Search from '../components/Search';
import Input from '../components/Input';

const Loans: React.FC = () => {
    const {
        entitiesState,
        selectedEntities,
        setSelectedEntities,
        loading,
        params,
        setParams,
        addLoan,
        updateLoan,
        isSidebarOpen,
        setContentHeader,
    } = useGlobalContext();

    const [isOpenViewLoan, setIsOpenViewLoan] = useState(false);
    const [isOpenCreateLoan, setIsOpenCreateLoan] = useState(false);
    const [isOpenPayLoan, setIsOpenPayLoan] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [query, setQuery] = useState({ empleado: '', start_date: '', end_date: '' });

    useEffect(() => {
        setContentHeader(
            <div className='flex w-full items-center justify-between px-4'>
                <h1
                    className={`text-start text-3xl font-bold tracking-wider duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
                    Listado de Préstamos
                </h1>
                <Button
                    variant='add'
                    size='md'
                    icon={<MdAttachMoney size={17} />}
                    onClick={() => setIsOpenCreateLoan(true)}>
                    Nuevo préstamo
                </Button>
            </div>
        );
    }, [isSidebarOpen]);

    const handleCreateLoan = async (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        await addLoan(newLoan);
        setIsOpenCreateLoan(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
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

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setParams(prev => ({
            ...prev,
            q: query.empleado || undefined,
            start_date: query.start_date || undefined,
            end_date: query.end_date || undefined,
            page: 1,
        }));
    };

    const handleClear = () => {
        setQuery({ empleado: '', start_date: '', end_date: '' });
        setParams(prev => {
            const newParams = { ...prev };
            delete newParams.q;
            delete newParams.start_date;
            delete newParams.end_date;
            newParams.page = 1;
            return newParams;
        });
    };

    const styleMoney = (cantidad: number) => {
        return (
            <span
                className={`inline-block rounded-full border px-1.5 py-1 font-semibold ${!cantidad ? 'border-gray-300 bg-gray-100 text-gray-500' : cantidad && cantidad < 0 ? 'border-red-400 bg-red-200 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
                ${cantidad.toFixed(2)}
            </span>
        );
    };

    const columns: Column<LoanInterface>[] = useMemo(
        () => [
            {
                key: 'empleado',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                const newOrder = params.order === 'asc' ? 'desc' : 'asc';
                                setParams({ ...params, order: newOrder, sort_by: 'empleado' });
                            }}>
                            <FaSortAmountDown
                                size={17}
                                className={`transition-transform duration-200 ${
                                    params.sort_by === 'empleado' && params.order === 'desc' && 'rotate-180'
                                } text-gray-500 hover:text-gray-700`}
                            />
                        </button>
                        <span>Empleado</span>
                    </div>
                ),
            },
            {
                key: 'created_at',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                const newOrder = params.order === 'asc' ? 'desc' : 'asc';
                                setParams({ ...params, order: newOrder, sort_by: 'created_at' });
                            }}>
                            <FaSortAmountDown
                                size={17}
                                className={`transition-transform duration-200 ${
                                    params.sort_by === 'created_at' && params.order === 'desc' && 'rotate-180'
                                } text-gray-500 hover:text-gray-700`}
                            />
                        </button>
                        <span>Fecha</span>
                    </div>
                ),
                render: (_, row) => (row.created_at ? Utils.formatDateDDMMYYYY(row.created_at) : 'Sin fecha'),
            },
            {
                key: 'monto_total',
                header: 'Monto Total',
                render: (_, row) => styleMoney(row.monto_total ?? 0),
            },
            {
                key: 'saldo_pendiente',
                header: 'Saldo Pendiente',
                render: (_, row) => styleMoney(row.saldo_pendiente ?? 0),
            },
            {
                key: 'ultimo_abono',
                header: 'Último Abono',
                render: (_, row) => styleMoney(row.ultimo_abono ?? 0),
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
            className={`mb-20 flex-auto p-8 transition-all duration-600 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            {showSuccess && (
                <div className='mb-4 flex justify-center'>
                    <Popup>¡Prestamo registrado con éxito!</Popup>
                </div>
            )}

            <Search handleSubmit={handleSearch}>
                <Input
                    variant='default'
                    inputSize='md'
                    placeholder='Buscar empleado...'
                    value={query.empleado}
                    onChange={e => setQuery(prev => ({ ...prev, empleado: e.target.value }))}
                    leftIcon={<TbUserSearch size={20} />}
                />
                <Input
                    variant='default'
                    inputSize='md'
                    type='date'
                    placeholder='Fecha inicio'
                    value={query.start_date}
                    onChange={e => setQuery(prev => ({ ...prev, start_date: e.target.value }))}
                />
                <Input
                    variant='default'
                    inputSize='md'
                    type='date'
                    placeholder='Fecha fin'
                    value={query.end_date}
                    onChange={e => setQuery(prev => ({ ...prev, end_date: e.target.value }))}
                />
                <Button
                    variant='details'
                    size='md'
                    icon={<MdOutlineManageSearch size={20} />}
                    type='submit'
                    disabled={!query.empleado && !query.start_date && !query.end_date}>
                    Buscar
                </Button>
                <Button
                    variant='details'
                    size='md'
                    icon={<BsFillEraserFill size={15} />}
                    onClick={handleClear}
                    type='button'>
                    Limpiar
                </Button>
            </Search>

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
