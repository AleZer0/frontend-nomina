import { useMemo } from 'react';

import { MdMoneyOffCsred, MdOutlineAttachMoney } from 'react-icons/md';

import Modal from '../Modal';
import Table from '../Table';
import Form from '../Form';
import Button from '../Button';

import { Column, FormField } from '../../types/extras';
import { PaymentInterface } from '../../types/entities';
import { ButtonProps } from '../../types/componentes';
import { useGlobalContext } from '../../context/GlobalContext';
import Utils from '../../utils';

interface ViewLoanProps {
    isOpen: boolean;
    onClose: () => void;
    handleClickEdit: () => void;
    handleClickDelete: (id_prestamo: number) => void;
    showSuccess: boolean;
}

const ViewLoan: React.FC<ViewLoanProps> = ({ isOpen, onClose, handleClickEdit, handleClickDelete }) => {
    const { selectedEntities, loading } = useGlobalContext();

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'empleado',
                label: 'Empleado',
                type: 'text',
                placeholder: 'Ingrese el empleado',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'created_at',
                label: 'Fecha',
                type: 'date',
                placeholder: 'Seleccione la fecha',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'monto_total',
                label: 'Monto total',
                type: 'number',
                placeholder: 'Ingrese el monto total',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'saldo_pendiente',
                label: 'Saldo pendiendte',
                type: 'number',
                placeholder: 'Ingrese el saldo pendiente',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'ultimo_abono',
                label: 'Último abono',
                type: 'number',
                placeholder: 'Ingrese el último abono.',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
        ],
        []
    );

    const buttons: ButtonProps[] = useMemo(() => {
        if (!selectedEntities.selectedLoan) return [];

        return [
            {
                variant: 'delete',
                children: 'Eliminar',
                icon: <MdMoneyOffCsred size={17} />,
                onClick: () => handleClickDelete(selectedEntities.selectedLoan?.id_prestamo ?? 0),
            },
            {
                variant: 'edit',
                children: 'Abonar',
                icon: <MdOutlineAttachMoney size={17} />,
                onClick: handleClickEdit,
            },
        ];
    }, [selectedEntities.selectedLoan]);

    const columns: Column<PaymentInterface>[] = useMemo(
        () => [
            {
                key: 'id_abono',
                header: 'No. Abono',
            },
            {
                key: 'monto_abonado',
                header: 'Monto Abonado',
                render: (_, row) => `$${row.monto_abonado.toFixed(2)}`,
            },
            {
                key: 'fecha',
                header: 'Fecha',
                render: (_, row) => Utils.formatDateDDMMYYYY(row.fecha),
            },
        ],
        [selectedEntities.selectedLoan]
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles de Préstamos' containerClassName='max-w-3xl'>
            <div className='flex flex-col space-y-8'>
                <Form fields={fields} data={selectedEntities.selectedLoan ?? {}} disabled={true} columns={2} />

                <Table
                    columns={columns}
                    data={selectedEntities.selectedLoan?.abonos ?? []}
                    loading={loading['abonos']}
                />
                <div className='mt-4 flex justify-end gap-2'>
                    {buttons.map(({ variant, children, icon, onClick, className }) => (
                        <Button
                            key={variant}
                            variant={variant}
                            size='md'
                            icon={icon}
                            onClick={onClick}
                            className={className}>
                            {children}
                        </Button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default ViewLoan;
