import { LoanType } from '../types';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { TbPigMoney } from 'react-icons/tb';
import TableData from '../components/TableData';
import Utils from '../utils';

interface ViewLoanProps {
    isOpen: boolean;
    onClose: () => void;
    loan: LoanType | null;
    openLoanPay: () => void;
}

const ViewLoan: React.FC<ViewLoanProps> = ({ isOpen, onClose, loan, openLoanPay }) => {
    if (!isOpen) return null;

    const fields = [
        { label: 'No. Empleado', key: 'id_empleado' },
        { label: 'Empleado', key: 'empleado' },
        { label: 'Fecha del préstamo', key: 'created_at', type: 'date' },
        { label: 'Monto total', key: 'monto_total' },
        { label: 'Saldo Pendiente', key: 'saldo_pendiente' },
        { label: 'Último Abono', key: 'ultimo_abono' },
    ];

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title='Detalles de préstamo' className='max-w-4xl'>
                <div className='grid max-h-96 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2'>
                    {fields.map(({ label, key, type }, index) => {
                        let value = loan ? loan[key as keyof typeof loan] : '';

                        // Si el campo es de tipo "date", lo convierte a "YYYY-MM-DD"
                        if (type === 'date' && value) {
                            const dateValue = new Date(value as string);
                            value = !isNaN(dateValue.getTime()) ? dateValue.toISOString().split('T')[0] : '';
                        }

                        return (
                            <div key={index} className='mb-4'>
                                <label className='mb-2 block text-gray-700'>{label}:</label>
                                <input
                                    type={type === 'date' ? 'date' : 'text'}
                                    value={value}
                                    readOnly
                                    className='w-full rounded-lg border bg-gray-100 p-2'
                                />
                            </div>
                        );
                    })}
                </div>

                <TableData
                    fields={['Monto Abonado', 'Fecha']}
                    data={loan?.abonos || []}
                    renderRow={abono => {
                        let fechaFormateada = 'Fecha no válida';

                        // Intenta convertir la fecha
                        if (abono.fecha) {
                            const parsedDate = new Date(abono.fecha);

                            // Si la conversión es válida, formateamos a YYYY-MM-DD
                            if (!isNaN(parsedDate.getTime())) {
                                fechaFormateada = parsedDate.toISOString().split('T')[0];
                            }
                        }

                        return (
                            <>
                                <div className='p-2'>{`$${abono.monto_abonado.toFixed(2)}`}</div>
                                <div className='p-2'>{Utils.formatDateDDMMYYYY(fechaFormateada)}</div>
                            </>
                        );
                    }}
                />
                {/* Botón para abrir el modal de abonos */}
                <div className='mt-4 flex justify-end'>
                    <Button
                        onClick={() => {
                            onClose();
                            openLoanPay();
                        }}
                        design='cursor-pointer rounded-2xl bg-blue-500 border-blue-700 text-white hover:bg-blue-700'>
                        <span className='relative pt-1'>
                            <TbPigMoney size={17} />
                        </span>
                        Abonar
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ViewLoan;
