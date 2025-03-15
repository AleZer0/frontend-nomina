import React, { useMemo } from 'react';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Table from '../components/Table';
import Pagination from '../components/Pagination';

import { useGlobalContext } from '../context/GlobalContext';

import { Column } from '../types/extras';
import { OperatorInterface } from '../types';

const Operator: React.FC = () => {
    const { entitiesState, loading, isSidebarOpen } = useGlobalContext();

    const columns: Column<OperatorInterface>[] = useMemo(
        () => [
            {
                key: 'pension_alimenticia',
                header: 'Pensión alimenticia',
                render: (_, row) => `$${(row.pension_alimenticia ?? 0).toFixed(2)}`,
            },
            {
                key: 'horas_extras',
                header: 'Horas extras',
                render: (_, row) => `$${(row.horas_extras ?? 0).toFixed(2)}`,
            },
            {
                key: 'maniobras',
                header: 'Maniobras',
                render: (_, row) => `$${(row.maniobras ?? 0).toFixed(2)}`,
            },
            {
                key: 'diesel',
                header: 'Diesel',
                render: (_, row) => `$${(row.diesel ?? 0).toFixed(2)}`,
            },
            {
                key: 'precio_viaje',
                header: 'Precio del viaje',
                render: (_, row) => `$${(row.precio_viaje ?? 0).toFixed(2)}`,
            },
            {
                key: 'viaticos',
                header: 'Viaticos',
                render: (_, row) => `$${(row.viaticos ?? 0).toFixed(2)}`,
            },
            {
                key: 'casetas',
                header: 'Casetas',
                render: (_, row) => `$${(row.viaticos ?? 0).toFixed(2)}`,
            },
            {
                key: 'otros',
                header: 'Otros',
                render: (_, row) => `$${(row.otros ?? 0).toFixed(2)}`,
            },
        ],
        [entitiesState.operators]
    );

    return (
        <section
            className={`mb-20 flex-auto p-8 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-16'
            }`}>
            <Header title='Listado de Empleados'>
                {/* <Button
                    variant='add'
                    size='md'
                    icon={<FaUserPlus size={17} />}
                    onClick={() => setIsOpenCreateEmployee(true)}>
                    Nuevo empleado
                </Button> */}
            </Header>

            {loading['operators'] ? (
                <div className='my-4 flex justify-center'>
                    <Loader />
                </div>
            ) : (
                <Table columns={columns} data={entitiesState.operators.filter(operator => operator.estado !== 0)} />
            )}

            <Pagination />
        </section>
    );
};

export default Operator;
