import { useEffect, useMemo, useState } from 'react';

import { HiDocumentAdd } from 'react-icons/hi';
import { FaFilePdf } from 'react-icons/fa6';

import Button from '../components/Button';
import Table from '../components/Table';
import Pagination from '../components/Pagination';

import NewPayroll from '../modals/NewPayroll';

import { PayrollInterface } from '../types';
import { Column } from '../types/extras';

import { useGlobalContext } from '../context/GlobalContext';

import Utils from '../utils';

const Payroll: React.FC = () => {
    const { entitiesState, addPayroll, createPreviewPayrollPDF, loading, isSidebarOpen, setContentHeader } =
        useGlobalContext();

    const [isOpenCreatePayroll, setIsOpenCreatePayroll] = useState<boolean>(false);

    const handleCreatePayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        await addPayroll(newPayroll);
        setIsOpenCreatePayroll(false);
    };

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

    const totalPagar = (total: number) => {
        return (
            <span
                className={`${
                    total < 0
                        ? 'inline-block rounded-full border border-red-700 bg-red-500 px-3 py-1 font-semibold text-white'
                        : 'inline-block rounded-full border border-blue-400 bg-blue-50 px-3 py-1 font-semibold text-blue-500'
                }`}>
                ${total.toFixed(2)}
            </span>
        );
    };

    const styleSueldo = (sueldo: number) => {
        return (
            <span
                className={`${sueldo < 0 ? 'text-red-500' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${sueldo.toFixed(2)}
            </span>
        );
    };
    const stylePrestamo = (prestamos: number) => {
        return (
            <span
                className={`${prestamos <= 0 ? 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${prestamos.toFixed(2)}
            </span>
        );
    };
    const styleInfonavit = (infonavit: number) => {
        return (
            <span
                className={`${infonavit <= 0 ? 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${infonavit.toFixed(2)}
            </span>
        );
    };
    const stylePension = (pension_alimenticia: number) => {
        return (
            <span
                className={`${pension_alimenticia <= 0 ? 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${pension_alimenticia.toFixed(2)}
            </span>
        );
    };
    const styleHoras = (horas_extras: number) => {
        return (
            <span
                className={`${horas_extras <= 0 ? 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${horas_extras.toFixed(2)}
            </span>
        );
    };
    const styleManiobras = (maniobras: number) => {
        return (
            <span
                className={`${maniobras <= 0 ? 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${maniobras.toFixed(2)}
            </span>
        );
    };
    const styleOtros = (otros: number) => {
        return (
            <span
                className={`${otros <= 0 ? 'inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold' : 'inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700'}`}>
                ${otros.toFixed(2)}
            </span>
        );
    };

    const columns: Column<PayrollInterface>[] = useMemo(
        () => [
            {
                key: 'folio',
                header: 'Folio',
                render: (_, row) => (
                    <span className='inline-block rounded-full border border-gray-300 bg-gray-200 px-3 py-1 font-semibold text-gray-500'>
                        {`NOM${row.folio.toString().padStart(4, '0')}`}
                    </span>
                ),
            },
            {
                key: 'empleado',
                header: 'Empleado',
                render: (_, row) => (row.empleado ? `${row.empleado.nombre} ${row.empleado.apellido}` : ''),
            },
            { key: 'fecha', header: 'Fecha', render: (_, row) => Utils.formatDateDDMMYYYY(row.fecha) },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => styleSueldo(row.sueldo ?? 0),
            },
            {
                key: 'prestamos',
                header: 'Prestamos',
                render: (_, row) => stylePrestamo(row.prestamos ?? 0),
            },
            {
                key: 'infonavit',
                header: 'Infonavit',
                render: (_, row) => styleInfonavit(row.infonavit ?? 0),
            },
            {
                key: 'pension_alimenticia',
                header: 'Pensión alimenticia',
                render: (_, row) => stylePension(row.pension_alimenticia ?? 0),
            },
            {
                key: 'horas_extras',
                header: 'Horas extras',
                render: (_, row) => styleHoras(row.horas_extras ?? 0),
            },
            {
                key: 'maniobras',
                header: 'Maniobras',
                render: (_, row) => styleManiobras(row.maniobras ?? 0),
            },
            {
                key: 'otros',
                header: 'Otros',
                render: (_, row) => styleOtros(row.otros ?? 0),
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
            className={`mb-20 flex-auto p-8 transition-all duration-600 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            <Table columns={columns} data={entitiesState.payrolls} loading={loading['payrolls']} />

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
