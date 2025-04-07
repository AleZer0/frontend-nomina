import { useMemo } from 'react';
import { FaFilePdf, FaUserEdit } from 'react-icons/fa';

import Modal from '../Modal';
import Form from '../Form';
import Button from '../Button';

import { FormField } from '../../types/extras';
import { ButtonProps } from '../../types/componentes';

import { useGlobalContext } from '../../context/GlobalContext';
import Utils from '../../utils';

interface ViewPayrollProps {
    isOpen: boolean;
    onClose: () => void;
    handleClickEditPayroll: () => void;
    handleClickViewPayroll: () => void;
}

const ViewPayroll: React.FC<ViewPayrollProps> = ({ isOpen, onClose, handleClickEditPayroll }) => {
    const { selectedEntities, createPreviewPayrollPDF } = useGlobalContext();
    const payroll = selectedEntities.selectedPayroll;

    const fields: FormField[] = useMemo(
        () => [
            { name: 'folio', label: 'Folio', type: 'number', variant: 'filled', inputSize: 'md' },
            { name: 'fecha', label: 'Fecha', type: 'text', variant: 'filled', inputSize: 'md' },
            { name: 'dias_trabajados', label: 'Días trabajados', type: 'number', variant: 'filled', inputSize: 'md' },
            {
                name: 'sueldo',
                label: 'Sueldo',
                type: 'number',
                placeholder: 'No cuenta con sueldo',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'infonavit',
                label: 'Infonavit',
                type: 'number',
                placeholder: 'No cuenta con infonavit',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'vacaciones',
                label: 'Vacaciones',
                type: 'number',
                placeholder: 'No cuenta con vacaciones ',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'aguinaldo',
                label: 'Aguinaldo',
                type: 'number',
                placeholder: 'No cuenta con aguinaldo',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'finiquito',
                label: 'Finiquito',
                type: 'number',
                placeholder: 'No cuenta con finiquito',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'pension_alimenticia',
                label: 'Pensión alimenticia',
                type: 'number',
                placeholder: 'No cuenta con pensión alimenticia',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'horas_extras',
                label: 'Cantidad de horas extras',
                type: 'number',
                placeholder: 'No cuenta con horas extras',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'pago_horas_extras',
                label: 'Pago horas extras',
                type: 'number',
                placeholder: 'No cuenta con pago de horas extras',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'maniobras',
                label: 'Maniobras',
                type: 'number',
                placeholder: 'No cuenta con maniobras',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'otros',
                label: 'Otros',
                type: 'number',
                placeholder: 'No cuenta con otros',
                variant: 'filled',
                inputSize: 'md',
            },
        ],
        []
    );

    const buttons: ButtonProps[] = useMemo(() => {
        if (!payroll) return [];

        return [
            {
                variant: 'delete',
                children: 'PDF',
                icon: <FaFilePdf size={15} />,
                onClick: () => createPreviewPayrollPDF(payroll.folio),
            },
            {
                variant: 'edit',
                children: 'Editar',
                icon: <FaUserEdit size={17} />,
                onClick: handleClickEditPayroll,
            },
        ];
    }, [payroll]);

    if (!isOpen || !payroll) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalle de Nómina'>
            <div className='flex flex-col space-y-8'>
                <Form
                    fields={fields}
                    data={{
                        ...payroll,
                        fecha: Utils.formatDateDDMMYYYY(payroll.created_at || ''),
                    }}
                    disabled={true}
                    columns={3}
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

export default ViewPayroll;
