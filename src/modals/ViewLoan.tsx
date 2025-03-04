import { useState, useMemo } from 'react';

import Modal from '../components/Modal';
import Table from '../components/Table';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import { Column, FormField } from '../types/extras';
import { LoanInterface } from '../types';
import { useGlobalContext } from '../context/GlobalContext';
import { FaRegSave } from 'react-icons/fa';

interface ViewLoanProps {
    isOpen: boolean;
    onClose: () => void;
    loan: LoanInterface | null;
}

const ViewLoan: React.FC<ViewLoanProps> = ({ isOpen, onClose, loan }) => {
    const { loans, selectedEmployee, updateLoan } = useGlobalContext();
    const [montoAbonado, setMontoAbonado] = useState<number>(0);

    console.log('Préstamo seleccionado:', loan);
    console.log('Monto Abonado:', montoAbonado);

    // Obtener los préstamos del empleado seleccionado
    const employeeLoans = useMemo(
        () => loans.filter(l => l.id_empleado === selectedEmployee?.id_empleado),
        [loans, selectedEmployee]
    );

    // Configuración de columnas de la tabla
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

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'id_prestamo',
                label: 'No. Préstamo',
                type: 'text',
                variant: 'filled',
                inputSize: 'md',
                disabled: true,
                default_value: loan ? loan.id_prestamo.toString() : '',
            },
        ],
        [loan]
    );

    // Manejador de la acción de enviar el abono
    const handleSubmit = async () => {
        if (!loan) {
            alert('Debe seleccionar un préstamo.');
            return;
        }

        if (montoAbonado <= 0 || isNaN(montoAbonado)) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        try {
            await updateLoan(loan.id_prestamo, montoAbonado);
            alert(`Se abonaron $${montoAbonado} al préstamo No. ${loan.id_prestamo}`);

            setMontoAbonado(0);
        } catch (error) {
            console.error('Error al actualizar préstamo:', error);
            alert('Hubo un error al procesar el abono.');
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles de Préstamos' containerClassName='max-w-3xl'>
            {!loan ? (
                <div className='p-4 text-center'>Seleccione un préstamo para ver detalles.</div>
            ) : (
                <div className='flex flex-col space-y-6'>
                    <Form fields={fields} data={{ id_prestamo: loan.id_prestamo }} />

                    <div>
                        <label className='mb-2 block text-gray-700'>Monto a Abonar *</label>
                        <Input
                            type='number'
                            placeholder='Ingrese el monto abonado'
                            value={montoAbonado || ''}
                            onChange={e => setMontoAbonado(Number(e.target.value))}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <Button
                            variant='add'
                            size='md'
                            className='bg-green-500 text-white hover:bg-green-600'
                            icon={<FaRegSave size={17} />}
                            onClick={handleSubmit}>
                            Abonar
                        </Button>
                    </div>

                    <Table columns={columns} data={employeeLoans} />
                </div>
            )}
        </Modal>
    );
};

export default ViewLoan;
