import { useMemo } from 'react';
import { FaFileCircleMinus, FaFilePdf, FaFilePen } from 'react-icons/fa6';

import Modal from '../Modal';
import Form from '../Form';
import Button from '../Button';

import { FormField } from '../../types/extras';
import { ButtonProps } from '../../types/componentes';

import { useGlobalContext } from '../../context/GlobalContext';
import Utils from '../../utils';
import Popup from '../Popup';

interface ViewPayrollProps {
    isOpen: boolean;
    onClose: () => void;
    handleClickEdit: () => void;
    handleClickDelete: (folio: number) => void;
    showSuccess: boolean;
}

const ViewPayroll: React.FC<ViewPayrollProps> = ({
    isOpen,
    onClose,
    handleClickEdit,
    handleClickDelete,
    showSuccess,
}) => {
    const { selectedEntities, createPreviewPayrollPDF } = useGlobalContext();

    const fields: FormField[] = useMemo(
        () => [
            { name: 'folio', label: 'Folio', type: 'number', variant: 'filled', inputSize: 'md' },
            { name: 'fecha', label: 'Fecha', type: 'text', variant: 'filled', inputSize: 'md' },
            { name: 'dias_trabajados', label: 'Días trabajados', type: 'number', variant: 'filled', inputSize: 'md' },
            {
                name: 'faltas',
                label: 'Faltas',
                type: 'number',
                placeholder: 'No cuenta con faltas',
                variant: 'filled',
                inputSize: 'md',
            },
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
        if (!selectedEntities.selectedPayroll) return [];

        return [
            {
                variant: 'details',
                children: 'PDF',
                icon: <FaFilePdf size={17} />,
                onClick: () => createPreviewPayrollPDF(selectedEntities.selectedPayroll?.folio ?? 0),
            },
            {
                variant: 'delete',
                children: 'Eliminar',
                icon: <FaFileCircleMinus size={17} />,
                onClick: () => handleClickDelete(selectedEntities.selectedPayroll?.folio ?? 0),
            },
            {
                variant: 'edit',
                children: 'Editar',
                icon: <FaFilePen size={17} />,
                onClick: handleClickEdit,
            },
        ];
    }, [selectedEntities.selectedPayroll]);

    if (!isOpen || !selectedEntities.selectedPayroll) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='Detalle de Nómina'
            popup={showSuccess && <Popup>¡Nómina actualizada con éxito!</Popup>}>
            <div className='flex flex-col space-y-8'>
                <Form
                    fields={fields}
                    data={{
                        ...selectedEntities.selectedPayroll,
                        fecha: Utils.formatDateDDMMYYYY(selectedEntities.selectedPayroll.created_at || ''),
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
