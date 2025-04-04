import { useMemo } from 'react';

import { HiDocumentAdd } from 'react-icons/hi';
import { FaUserEdit } from 'react-icons/fa';
import { FaUserMinus } from 'react-icons/fa';

import Modal from '../Modal';
import Form from '../Form';
import Table from '../Table';
import Button from '../Button';

import { PayrollInterface } from '../../types/index';
import { Column, FormField } from '../../types/extras';
import { ButtonProps } from '../../types/componentes';

import { useGlobalContext } from '../../context/GlobalContext';
import Utils from '../../utils';

interface ViewEmployeeProps {
    isOpen: boolean;
    onClose: () => void;
    handleClickCreatePayroll: () => void;
    handleClickEdit: () => void;
    handleClickDelate: (id_empleado: number) => void;
}

const ViewEmployee: React.FC<ViewEmployeeProps> = ({
    isOpen,
    onClose,
    handleClickCreatePayroll,
    handleClickEdit,
    handleClickDelate,
}) => {
    const { selectedEntities, loading } = useGlobalContext();

    const handleClickDelateButton = () => {
        if (!selectedEntities.selectedEmployee) return;
        handleClickDelate(selectedEntities.selectedEmployee.id_empleado);
    };

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'apellido',
                label: 'Apellido',
                type: 'text',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'fecha_incorporacion',
                label: 'Fecha Incorporacion',
                type: 'date',
                placeholder: 'No cuenta con fecha de incorporación',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'departamento',
                label: 'Departamento',
                type: 'text',
                placeholder: 'No cuenta con departamento',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'puesto',
                label: 'Puesto',
                type: 'text',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'sueldo',
                label: 'Sueldo',
                type: 'number',
                placeholder: 'No cuenta con sueldo definido',
                variant: 'filled',
                inputSize: 'md',
            },
        ],
        []
    );

    const columns: Column<PayrollInterface>[] = useMemo(
        () => [
            { key: 'folio', header: 'Folio', render: (_, row) => `NOM${row.folio.toString().padStart(4, '0')}` },
            { key: 'dias_trabajados', header: 'Días Laborados' },
            {
                key: 'fecha',
                header: 'Fecha',
                render: (_, row) => (row.created_at ? Utils.formatDateDDMMYYYY(row.created_at) : 'Sin fecha'),
            },
            { key: 'prestamos', header: 'Prestamos', render: (_, row) => `$${(row.prestamos ?? 0).toFixed(2)}` },
            { key: 'sueldo', header: 'Sueldo', render: (_, row) => `$${row.sueldo.toFixed(2)}` },
        ],
        [selectedEntities.selectedEmployee]
    );

    const buttons: ButtonProps[] = useMemo(
        () => [
            {
                variant: 'add',
                children: 'Generar nómina',
                icon: <HiDocumentAdd size={17} />,
                onClick: () => handleClickCreatePayroll(),
                className: 'text-white',
            },
            {
                variant: 'edit',
                children: 'Editar',
                icon: <FaUserEdit size={17} />,
                onClick: () => handleClickEdit(),
            },
            {
                variant: 'delete',
                children: 'Eliminar',
                icon: <FaUserMinus size={17} />,
                onClick: () => handleClickDelateButton(),
            },
        ],
        [selectedEntities.selectedEmployee]
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles del Empleado'>
            <div className='flex flex-col space-y-8'>
                <Form fields={fields} data={selectedEntities.selectedEmployee ?? {}} disabled={true} columns={2} />

                <Table
                    columns={columns}
                    data={selectedEntities.selectedEmployee?.nomina ?? []}
                    loading={loading['prestamos']}
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

export default ViewEmployee;
