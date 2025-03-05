import { useMemo } from 'react';

import { HiDocumentPlus } from 'react-icons/hi2';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import Modal from '../components/Modal';
import Form from '../components/Form';
import Table from '../components/Table';
import Button from '../components/Button';

import { PayrollInterface } from '../types';
import { Column, FormField } from '../types/extras';
import { ButtonProps } from '../types/componentes';

import { useGlobalContext } from '../context/GlobalContext';
import Utils from '../utils';

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
    const { selectedEmployee } = useGlobalContext();

    const handleClickDelateButton = () => {
        if (!selectedEmployee) return;
        console.log('Si entra aquí 1');
        handleClickDelate(selectedEmployee.id_empleado);
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
            { key: 'fecha', header: 'Fecha', render: (_, row) => Utils.formatDateDDMMYYYY(row.fecha) },
            { key: 'prestamos', header: 'Prestamos', render: (_, row) => `$${(row.prestamos ?? 0).toFixed(2)}` },
            { key: 'sueldo', header: 'Sueldo', render: (_, row) => `$${row.sueldo.toFixed(2)}` },
        ],
        []
    );

    const buttons: ButtonProps[] = useMemo(
        () => [
            {
                variant: 'add',
                children: 'Generar nómina',
                icon: <HiDocumentPlus size={17} />,
                onClick: () => handleClickCreatePayroll(),
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
                icon: <MdDelete size={17} />,
                onClick: () => handleClickDelateButton(),
            },
        ],
        []
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles del Empleado'>
            <div className='flex flex-col space-y-8'>
                <Form fields={fields} data={selectedEmployee ?? {}} disabled={true} columns={2} />

                <Table columns={columns} data={selectedEmployee?.nomina ?? []} />

                <div className='mt-4 flex justify-end gap-2'>
                    {buttons.map(({ variant, children, icon, onClick }) => (
                        <Button key={variant} variant={variant} size='md' icon={icon} onClick={onClick}>
                            {children}
                        </Button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default ViewEmployee;
