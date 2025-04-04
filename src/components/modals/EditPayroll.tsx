import React, { useMemo } from 'react';
import { FaUserEdit } from 'react-icons/fa';

import Modal from '../Modal';
import Form from '../Form';

import { PayrollInterface } from '../../types';
import { FormField } from '../../types/extras';
import { useGlobalContext } from '../../context/GlobalContext';

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
            {
                name: 'fecha',
                label: 'Fecha',
                type: 'date',
                placeholder: 'Ingrese la fecha',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'dias_trabajados',
                label: 'Días trabajados',
                type: 'number',
                placeholder: 'Ingrese días trabajados',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'infonavit',
                label: 'Infonavit',
                type: 'number',
                placeholder: 'Ingrese el infonavit',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'vacaciones',
                label: 'Vacaciones',
                type: 'number',
                placeholder: 'Ingrese vacaciones',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'aguinaldo',
                label: 'Aguinaldo',
                type: 'number',
                placeholder: 'Ingrese aguinaldo',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'finiquito',
                label: 'Finiquito',
                type: 'number',
                placeholder: 'Ingrese finiquito',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'pension_alimenticia',
                label: 'Pensión alimenticia',
                type: 'number',
                placeholder: 'Ingrese pensión alimenticia',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'horas_extras',
                label: 'Horas extras',
                type: 'number',
                placeholder: 'Ingrese las horas extras',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'pago_horas_extras',
                label: 'Pago horas extras',
                type: 'number',
                placeholder: 'Ingrese pago de horas extras',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'maniobras',
                label: 'Maniobras',
                type: 'number',
                placeholder: 'Ingrese maniobras',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'otros',
                label: 'Otros',
                type: 'number',
                placeholder: 'Ingrese otros',
                variant: 'default',
                inputSize: 'md',
            },
        ],
        []
    );

    const handleSubmit = (data: Partial<PayrollInterface>) => {
        if (!payroll) return;
        onSubmit(payroll.folio, data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Editar Nómina' containerClassName='max-w-3xl' zIndex={60}>
            <Form
                fields={fields}
                data={payroll ?? {}}
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
