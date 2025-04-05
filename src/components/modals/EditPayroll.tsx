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

    const handleSubmit = (values: Partial<PayrollInterface>) => {
        if (!selectedEntities.selectedPayroll) return;

        const numericFields: (keyof PayrollInterface)[] = [
            'dias_trabajados',
            'sueldo',
            'infonavit',
            'vacaciones',
            'aguinaldo',
            'finiquito',
            'pension_alimenticia',
            'horas_extras',
            'pago_horas_extras',
            'maniobras',
            'otros',
        ];

        const sanitizedValues: Partial<PayrollInterface> = {};

        for (const key of numericFields) {
            const value = values[key];
            (sanitizedValues as any)[key] =
                value === '' || value === null || value === undefined
                    ? 0
                    : typeof value === 'string'
                      ? Number(value)
                      : value;
        }

        if (!values.fecha && !selectedEntities.selectedPayroll.fecha) {
            alert('El campo fecha es obligatorio.');
            return;
        }

        const updatedPayroll: Partial<PayrollInterface> = {
            ...selectedEntities.selectedPayroll,
            ...sanitizedValues,
            fecha: values.fecha || selectedEntities.selectedPayroll.fecha,
        };

        onSubmit(selectedEntities.selectedPayroll.folio, updatedPayroll);
        onClose();
    };

    const fields: FormField[] = useMemo(
        () => [
            { name: 'fecha', label: 'Fecha', type: 'text', variant: 'filled', inputSize: 'md' },
            {
                name: 'dias_trabajados',
                label: 'Días trabajados',
                type: 'number',
                placeholder: 'Ingresar días trabajados',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'sueldo',
                label: 'Sueldo',
                type: 'number',
                placeholder: 'Ingresa sueldo',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'infonavit',
                label: 'Infonavit',
                type: 'number',
                placeholder: 'Ingresa infonavit',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'vacaciones',
                label: 'Vacaciones',
                type: 'number',
                placeholder: 'Ingresa vacaciones ',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'aguinaldo',
                label: 'Aguinaldo',
                type: 'number',
                placeholder: 'Ingresa aguinaldo',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'finiquito',
                label: 'Finiquito',
                type: 'number',
                placeholder: 'Ingresa finiquito',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'pension_alimenticia',
                label: 'Pensión alimenticia',
                type: 'number',
                placeholder: 'Ingresa pensión alimenticia',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'horas_extras',
                label: 'Cantidad de horas extras',
                type: 'number',
                placeholder: 'Ingresa cantidad horas extras',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'pago_horas_extras',
                label: 'Pago horas extras',
                type: 'number',
                placeholder: 'Ingresa pago de horas extras',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'maniobras',
                label: 'Maniobras',
                type: 'number',
                placeholder: 'Ingresa maniobras',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'otros',
                label: 'Otros',
                type: 'number',
                placeholder: 'Ingresa otros',
                variant: 'filled',
                inputSize: 'md',
            },
        ],
        []
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Editar Nómina' containerClassName='max-w-3xl' zIndex={60}>
            <Form
                fields={fields}
                data={
                    selectedEntities.selectedPayroll ?? {
                        fecha: '',
                        dias_trabajados: 0,
                        infonavit: 0,
                        vacaciones: 0,
                        aguinaldo: 0,
                        finiquito: 0,
                        sueldo: 0,
                        pension_alimenticia: 0,
                        horas_extras: 0,
                        pago_horas_extras: 0,
                        maniobras: 0,
                        otros: 0,
                    }
                }
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
