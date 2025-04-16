import { useMemo } from 'react';

import { useGlobalContext } from '../../context/GlobalContext';

import { EmployeeInterface, PayrollInterface } from '../../types/entities';
import { Column } from '../../types/extras';

import Modal from '../Modal';
import EmployeeForm from './EmployeeForm';
import Table from '../Table';

import Utils from '../../utils';
import StyleComponents from '../../utils/stylesComponentes';

type TEmployeeModal = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mode: 'create' | 'edit' | 'view';
    setMode: React.Dispatch<React.SetStateAction<'create' | 'view' | 'edit'>>;
    onCreate: (data: Omit<EmployeeInterface, 'id_empleado'>) => void;
    onUpdate: (id: number, data: Partial<EmployeeInterface>) => void;
    onDelete: (id: number) => void;
};

const EmployeeModal: React.FC<TEmployeeModal> = ({
    isOpen,
    setIsOpen,
    mode,
    setMode,
    onCreate,
    onUpdate,
    onDelete,
}) => {
    const { selectedEntities, setSelectedEntities, loading } = useGlobalContext();

    const getTitle = () => {
        switch (mode) {
            case 'create':
                return 'Añadir un nuevo empleado';
            case 'edit':
                return 'Editar empleado';
            case 'view':
                return 'Detalles del empleado';
        }
    };

    const columns: Column<PayrollInterface>[] = useMemo(
        () => [
            { key: 'folio', header: 'Folio', render: (_, row) => StyleComponents.formatFolio(row.folio) },
            { key: 'dias_trabajados', header: 'Días Laborados' },
            {
                key: 'created_at',
                header: 'Fecha',
                render: (_, row) => StyleComponents.formatDate(row.created_at ?? ''),
            },
            {
                key: 'prestamos',
                header: 'Prestamos',
                render: (_, row) => StyleComponents.formatMoney(row.prestamos ?? 0),
            },
            {
                key: 'sueldo',
                header: 'Sueldo',
                render: (_, row) => StyleComponents.formatMoney(Utils.calcTotal(row), 'total'),
            },
        ],
        [selectedEntities.selectedEmployee]
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
                setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
            }}
            title={getTitle()}
            containerClassName='max-w-3xl'>
            <EmployeeForm
                mode={mode}
                setMode={setMode}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onClose={() => setIsOpen(false)}>
                <Table
                    columns={columns}
                    data={selectedEntities.selectedEmployee?.nomina ?? []}
                    loading={loading['payrolls']}
                />
            </EmployeeForm>
        </Modal>
    );
};

export default EmployeeModal;
