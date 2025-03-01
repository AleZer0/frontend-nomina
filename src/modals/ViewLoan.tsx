import { useMemo, useState } from 'react';

import { HiDocumentPlus } from 'react-icons/hi2';
// import { LiaPiggyBankSolid } from 'react-icons/lia';

import Modal from '../components/Modal';
import Table from '../components/Table';
import Button from '../components/Button';
import Form from '../components/Form';
import { Column, FormField } from '../types/extras';
import { LoanInterface } from '../types';
import { useGlobalContext } from '../context/GlobalContext';
// import Utils from '../utils';

interface ViewLoanProps {
    isOpen: boolean;
    onClose: () => void;
    loan: LoanInterface | null;
}

const ViewLoan: React.FC<ViewLoanProps> = ({ isOpen, onClose, loan }) => {
    const { loans, selectedEmployee, selectEmployee } = useGlobalContext();
    const [montoAbonado, setMontoAbonado] = useState<number>(0);

    if (!isOpen || !loan) return null;

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'id_prestamo',
                label: 'No. Préstamo',
                type: 'select',
                data: loans.map(({ id_prestamo }) => ({
                    id: id_prestamo,
                    label: `${id_prestamo}`,
                })),
                default_value: selectedEmployee?.id_empleado.toString(),
                placeholder: 'Seleccione un empleado',
                required: true,
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => selectEmployee(Number(e.target.value)),
            },
            {
                name: 'monto_abonado',
                label: 'Monto a Abonar',
                type: 'number',
                placeholder: 'Ingrese el monto a abonar',
                required: true,
                variant: 'default',
                inputSize: 'md',
                value: montoAbonado.toString(),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMontoAbonado(parseFloat(e.target.value) || 0),
            },
        ],
        [loans, selectedEmployee, montoAbonado]
    );

    const columns: Column<LoanInterface>[] = useMemo(
        () => [
            { key: 'id_prestamo', header: 'No. Préstamo' },
            {
                key: 'monto_total',
                header: 'Monto Total',
                render: (_, row) => `$${row.monto_total.toFixed(2)}`,
            },
            {
                key: 'saldo_pendiente',
                header: 'Saldo Pendiente',
                render: (_, row) => `$${row.saldo_pendiente.toFixed(2)}`,
            },
            {
                key: 'ultimo_abono',
                header: 'Último Abono',
                render: (_, row) => `$${(row.ultimo_abono ?? 0).toFixed(2)}`,
            },
        ],
        []
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles de Abonos' containerClassName='max-w-3xl'>
            {/* 📌 Sección superior con los campos */}
            <Form
                fields={fields}
                data={{ id_prestamo: loan.id_prestamo, monto_abonado: montoAbonado }}
                onSubmit={() => {}}
            />

            {/* 📌 Tabla con los préstamos */}
            <Table columns={columns} data={[loan]} />

            <div className='mt-4 flex justify-end'>
                <Button variant='add' size='md' icon={<HiDocumentPlus size={17} />} onClick={onClose}>
                    Cerrar
                </Button>
            </div>
        </Modal>
    );
};

export default ViewLoan;
