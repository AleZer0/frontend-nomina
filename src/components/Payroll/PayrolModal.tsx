import { useMemo, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { IconPigMoney } from '@tabler/icons-react';

import { LoanInterface, PayrollInterface, PrestamoAbono } from '../../types/entities';
import { Column } from '../../types/extras';

import Modal from '../Modal';
import PayrollForm from './PayrollForm';
import Input from '../Input';
import Table from '../Table';
import StyleComponents from '../../utils/stylesComponentes';

type TPayrollModal = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mode: 'create' | 'edit' | 'view';
    setMode: React.Dispatch<React.SetStateAction<'create' | 'view' | 'edit'>>;
    onCreate: (data: Omit<PayrollInterface, 'folio'>) => void;
    onUpdate: (id: number, data: Partial<PayrollInterface>) => void;
    onDelete: (id: number) => void;
};

const PayrollModal: React.FC<TPayrollModal> = ({ isOpen, setIsOpen, mode, setMode, onCreate, onUpdate, onDelete }) => {
    const { selectedEntities, setSelectedEntities, loading } = useGlobalContext();

    const [idsPrestamos, setIdsPrestamos] = useState<PrestamoAbono[]>([]);
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

    const getTitle = () => {
        switch (mode) {
            case 'create':
                return 'Generar una nueva nómina';
            case 'edit':
                return 'Editar nómina';
            case 'view':
                return 'Detalles de nómina';
        }
    };

    const handleChangeAbono = (idPrestamo: number, monto: number) => {
        setIdsPrestamos(prev => {
            const existIndex = prev.findIndex(p => p.id_prestamo === idPrestamo);
            if (existIndex !== -1) {
                const updatedPrestamos = [...prev];
                updatedPrestamos[existIndex].monto_abonado = monto;
                return updatedPrestamos;
            } else {
                return [...prev, { id_prestamo: idPrestamo, monto_abonado: monto }];
            }
        });
        setInputValues(prev => ({ ...prev, [idPrestamo]: monto.toString() }));
    };

    const columns: Column<LoanInterface>[] = useMemo(
        () => [
            { key: 'id_prestamo', header: 'No. Prestamo' },
            {
                key: 'monto_total',
                header: 'Monto total',
                render: (_, row) => StyleComponents.formatMoney(row.monto_total),
            },
            {
                key: 'saldo_pendiente',
                header: 'Saldo pendiente',
                render: (_, row) => StyleComponents.formatMoney(row.saldo_pendiente),
            },
            {
                key: 'monto_abonado',
                header: 'Monto a abonar',
                render: (_, row) => (
                    <Input
                        name={row.id_prestamo.toString()}
                        variant='default'
                        leftIcon={<IconPigMoney stroke={2} />}
                        type='number'
                        placeholder={`$${row.saldo_pendiente.toFixed(2)}`}
                        value={inputValues[row.id_prestamo] || ''}
                        disabled={loading['addPayroll']}
                        onChange={e => handleChangeAbono(row.id_prestamo, Number(e.target.value))}
                    />
                ),
            },
        ],
        [selectedEntities, inputValues]
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
                setSelectedEntities(prev => ({ ...prev, selectedPayroll: null }));
            }}
            title={getTitle()}
            containerClassName='max-w-3xl'>
            <PayrollForm
                mode={mode}
                setMode={setMode}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onClose={() => setIsOpen(false)}
                idsPrestamos={idsPrestamos}
                setIdsPrestamos={setIdsPrestamos}
                setInputValues={setInputValues}>
                <Table
                    columns={columns}
                    data={
                        selectedEntities.selectedEmployee?.prestamos
                            ? selectedEntities.selectedEmployee.prestamos.filter(pres => pres.saldo_pendiente !== 0)
                            : []
                    }
                    loading={loading['prestamos']}
                />
            </PayrollForm>
        </Modal>
    );
};

export default PayrollModal;
