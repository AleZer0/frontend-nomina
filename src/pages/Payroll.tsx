import { useEffect, useMemo, useState } from 'react';

import { HiDocumentAdd } from 'react-icons/hi';
import { FaSortAmountDown } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';

import Button from '../components/Button';
import Table from '../components/Table';
import Pagination from '../components/Pagination';

import NewPayroll from '../components/modals/NewPayroll';

import { PayrollInterface } from '../types/entities';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

import Utils from '../utils';
import Popup from '../components/Popup';
import ViewPayroll from '../components/modals/ViewPayroll';
import EditPayroll from '../components/modals/EditPayroll';
import Search from '../components/Search';
import Input from '../components/Input';
import { TbUserSearch } from 'react-icons/tb';
import { MdOutlineManageSearch } from 'react-icons/md';
import { BsFillEraserFill } from 'react-icons/bs';

const Payroll: React.FC = () => {
    const {
        entitiesState,
        setSelectedEntities,
        loading,
        params,
        setParams,
        addPayroll,
        updatePayroll,
        isSidebarOpen,
        setContentHeader,
    } = useGlobalContext();

    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState<boolean>(false);
    const [isOpenViewPayroll, setIsOpenViewPayroll] = useState<boolean>(false);
    const [isOpenEditPayroll, setIsOpenEditPayroll] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [query, setQuery] = useState({ empleado: '', start_date: '', end_date: '' });

    const handleCreatePayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        await addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleUpdatePayroll = async (folio: number, updatedPayroll: Partial<PayrollInterface>) => {
        const newSelectedPayroll = await updatePayroll(folio, updatedPayroll);
        setSelectedEntities(prev => ({ ...prev, selectedPayroll: newSelectedPayroll }));
        setIsOpenEditPayroll(false);
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

    const totalPagar = (total: number) => {
        return (
            <span
                className={`${
                    total < 0
                        ? 'inline-block rounded-full border border-red-700 bg-red-500 px-3 py-1 font-semibold text-red-700'
                        : 'inline-block rounded-full border border-blue-400 bg-blue-50 px-3 py-1 font-semibold text-blue-500'
                }`}>
                ${total.toFixed(2)}
            </span>
        );
    };

    const styleMoney = (cantidad: number) => {
        return (
            <span
                className={`inline-block rounded-full border px-1.5 py-1 font-semibold ${!cantidad ? 'border-gray-300 bg-gray-100 text-gray-500' : cantidad && cantidad < 0 ? 'border-red-400 bg-red-200 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
                ${cantidad.toFixed(2)}
            </span>
        );
    };

    const columns: Column<PayrollInterface>[] = useMemo(
        () => [
            {
                key: 'folio',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                setParams(prev =>
                                    prev.order === 'asc'
                                        ? { ...prev, order: 'desc', sort_by: 'folio' }
                                        : { ...prev, order: 'asc', sort_by: 'folio' }
                                );
                            }}>
                            <FaSortAmountDown
                                size={17}
                                className={`transition-transform duration-200 ${
                                    params.sort_by === 'folio' && params.order === 'desc' && 'rotate-180'
                                } text-gray-500 hover:text-gray-700`}
                            />
                        </button>
                        <span>Folio</span>
                    </div>
                ),
                render: (_, row) => (
                    <span className='inline-block rounded-full border border-gray-300 bg-gray-100 px-3 py-1 font-semibold text-gray-500'>
                        {`NOM${row.folio.toString().padStart(4, '0')}`}
                    </span>
                ),
            },
            {
                key: 'empleado',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                setParams(prev =>
                                    prev.order === 'asc'
                                        ? { ...prev, order: 'desc', sort_by: 'empleado' }
                                        : { ...prev, order: 'asc', sort_by: 'empleado' }
                                );
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
                render: (_, row) => (row.empleado ? `${row.empleado.nombre} ${row.empleado.apellido}` : ''),
            },
            {
                key: 'fecha',
                header: (
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={() => {
                                setParams(prev =>
                                    prev.order === 'asc'
                                        ? { ...prev, order: 'desc', sort_by: 'fecha' }
                                        : { ...prev, order: 'asc', sort_by: 'fecha' }
                                );
                            }}>
                            <FaSortAmountDown
                                size={17}
                                className={`transition-transform duration-200 ${
                                    params.sort_by === 'fecha' && params.order === 'desc' && 'rotate-180'
                                } text-gray-500 hover:text-gray-700`}
                            />
                        </button>
                        <span>Fecha</span>
                    </div>
                ),
                render: (_, row) => (row.fecha ? Utils.formatDateDDMMYYYY(row.fecha) : 'Sin fecha'),
            },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => styleMoney(row.sueldo ?? 0),
            },
            {
                key: 'vacaciones',
                header: 'Vacaciones',
                render: (_, row) => styleMoney(row.vacaciones ?? 0),
            },
            {
                key: 'aguinaldo',
                header: 'Aguinaldo',
                render: (_, row) => styleMoney(row.aguinaldo ?? 0),
            },
            {
                key: 'pago_horas_extras',
                header: 'H. Extras',
                render: (_, row) => styleMoney(row.pago_horas_extras ?? 0),
            },
            {
                key: 'maniobras',
                header: 'Maniobras',
                render: (_, row) => styleMoney(row.maniobras ?? 0),
            },
            {
                key: 'finiquito',
                header: 'Finiquito',
                render: (_, row) => styleMoney(row.finiquito ?? 0),
            },
            {
                key: 'otros',
                header: 'Otros',
                render: (_, row) => styleMoney(row.otros ?? 0),
            },
            {
                key: 'pension_alimenticia',
                header: 'Pensión A.',
                render: (_, row) => styleMoney(row.pension_alimenticia ?? 0),
            },
            {
                key: 'infonavit',
                header: 'Infonavit',
                render: (_, row) => styleMoney(row.infonavit ?? 0),
            },
            {
                key: 'prestamos',
                header: 'Prestamos',
                render: (_, row) => styleMoney(row.prestamos ?? 0),
            },
            {
                key: 'total_pagar',
                header: 'Total',
                render: (_, row) =>
                    totalPagar(
                        row.sueldo -
                            (row.prestamos ?? 0) -
                            (row.infonavit ?? 0) +
                            (row.vacaciones ?? 0) +
                            (row.finiquito ?? 0) +
                            (row.aguinaldo ?? 0) -
                            (row.pension_alimenticia ?? 0) +
                            (row.pago_horas_extras ?? 0) +
                            (row.maniobras ?? 0) +
                            (row.otros ?? 0)
                    ),
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
                            setSelectedEntities(prev => ({ ...prev, selectedPayroll: row }));
                            setIsOpenViewPayroll(true);
                        }}>
                        Detalles
                    </Button>
                ),
            },
        ],
        [entitiesState.payrolls]
    );

    useEffect(() => {
        setContentHeader(
            <div className='flex w-full items-center justify-between px-4'>
                <h1
                    className={`text-start text-3xl font-bold tracking-wider duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
                    Listado de Nóminas
                </h1>
                <Button
                    variant='add'
                    size='md'
                    icon={<HiDocumentAdd size={17} />}
                    onClick={() => setIsOpenCreatePayroll(true)}>
                    Nueva nómina
                </Button>
            </div>
        );
    }, [isSidebarOpen]);

    return (
        <section
            className={`mb-20 flex-auto p-8 transition-all duration-600 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-20'
            }`}>
            {showSuccess && (
                <div className='mb-4 flex justify-center'>
                    <Popup>¡Nómina registrada con éxito!</Popup>
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

            <Table columns={columns} data={entitiesState.payrolls} loading={loading['payrolls']} />

            <Pagination />

            <NewPayroll
                isOpen={isOpenCreatePayroll}
                onClose={() => setIsOpenCreatePayroll(false)}
                onSubmit={handleCreatePayroll}
            />
            <ViewPayroll
                isOpen={isOpenViewPayroll}
                onClose={() => {
                    setIsOpenViewPayroll(false);
                }}
                handleClickViewPayroll={() => setIsOpenViewPayroll(true)}
                handleClickEditPayroll={() => setIsOpenEditPayroll(true)}
            />
            <EditPayroll
                isOpen={isOpenEditPayroll}
                onClose={() => setIsOpenEditPayroll(false)}
                onSubmit={handleUpdatePayroll}
            />
        </section>
    );
};

export default Payroll;
