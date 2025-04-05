import React, { useMemo } from 'react';
import { FaUserEdit } from 'react-icons/fa';

import Modal from '../Modal';
import Form from '../Form';
import { useGlobalContext } from '../../context/GlobalContext';

import { PayrollInterface } from '../../types';
import { FormField } from '../../types/extras';

interface EditPayrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (folio: number, updatedPayroll: Partial<PayrollInterface>) => void;
}

const EditPayroll: React.FC<EditPayrollModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { selectedEntities, loading } = useGlobalContext();
    const payroll = selectedEntities.selectedPayroll;

    const fields: FormField[] = useMemo(
        () => [
            { name: 'fecha', label: 'Fecha', type: 'date', variant: 'default', inputSize: 'md' },
            { name: 'dias_trabajados', label: 'Días trabajados', type: 'number', variant: 'default', inputSize: 'md' },
            { name: 'sueldo', label: 'Sueldo', type: 'number', variant: 'default', inputSize: 'md' },
            { name: 'infonavit', label: 'Infonavit', type: 'number', variant: 'default', inputSize: 'md' },
            { name: 'vacaciones', label: 'Vacaciones', type: 'number', variant: 'default', inputSize: 'md' },
            { name: 'aguinaldo', label: 'Aguinaldo', type: 'number', variant: 'default', inputSize: 'md' },
            { name: 'finiquito', label: 'Finiquito', type: 'number', variant: 'default', inputSize: 'md' },
            {
                name: 'pension_alimenticia',
                label: 'Pensión alimenticia',
                type: 'number',
                variant: 'default',
                inputSize: 'md',
            },
            { name: 'horas_extras', label: 'Horas extras', type: 'number', variant: 'default', inputSize: 'md' },
            {
                name: 'pago_horas_extras',
                label: 'Pago horas extras',
                type: 'number',
                variant: 'default',
                inputSize: 'md',
            },
            { name: 'maniobras', label: 'Maniobras', type: 'number', variant: 'default', inputSize: 'md' },
            { name: 'otros', label: 'Otros', type: 'number', variant: 'default', inputSize: 'md' },
        ],
        []
    );

    const handleSubmit = (data: Partial<PayrollInterface>) => {
        if (!payroll) return;
        onSubmit(payroll.folio, data);
        onClose();
    };

    if (!isOpen || !payroll) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Editar Nómina' containerClassName='max-w-3xl' zIndex={60}>
            <Form
                fields={fields}
                data={payroll}
                submitIcon={<FaUserEdit size={17} />}
                submitLabel='Guardar cambios'
                variant='edit'
                direction='end'
                columns={3}
                loadingButton={loading['updatePayroll']}
                labelLoadingButton='Guardando cambios...'
                onSubmit={handleSubmit}
            />
        </Modal>
    );
};

export default EditPayroll;
