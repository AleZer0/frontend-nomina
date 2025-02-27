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

import Utils from '../utils';
import { useGlobalContext } from '../context/GlobalContext';

interface ViewEmployeeProps {
    isOpen: boolean;
    onClose: () => void;
    handleClickEdit: () => void;
}

const ViewEmployee: React.FC<ViewEmployeeProps> = ({ isOpen, onClose, handleClickEdit }) => {
    const { selectedEmployee } = useGlobalContext();

    const fields: FormField[] = useMemo(
        () => [
            { name: 'id_empleado', label: 'No. Empleado', type: 'text', variant: 'filled', inputSize: 'md' },
            {
                name: 'nombre',
                label: 'Nombre',
                type: 'text',
                placeholder: 'Ingrese el nombre',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'apellido',
                label: 'Apellido',
                type: 'text',
                placeholder: 'Ingrese el apellido',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'fecha_incorporacion',
                label: 'Fecha Incorporacion',
                type: 'date',
                placeholder: 'Seleccione una fecha',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'departamento',
                label: 'Departamento',
                type: 'text',
                placeholder: 'Ingrese el departamento',
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'puesto',
                label: 'Puesto',
                type: 'text',
                placeholder: 'Ingrese el puesto',
                required: true,
                variant: 'filled',
                inputSize: 'md',
            },
            {
                name: 'sueldo',
                label: 'Sueldo',
                type: 'number',
                placeholder: 'Ingrese el sueldo',
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
            { key: 'fecha', header: 'Fecha', render: (_, row) => Utils.formatDateDDMMYYYY(row.fecha.split('T')[0]) },
            { key: 'prestamos', header: 'Prestamos', render: (_, row) => `$${(row.prestamos ?? 0).toFixed(2)}` },
            { key: 'sueldo', header: 'Sueldo', render: (_, row) => `$${row.sueldo.toFixed(2)}` },
        ],
        []
    );

    const buttons: ButtonProps[] = useMemo(
        () => [
            { variant: 'add', children: 'Generar Nómina', icon: <HiDocumentPlus size={17} /> },
            {
                variant: 'edit',
                children: 'Editar',
                icon: <FaUserEdit size={17} />,
                onClick: () => handleClickEdit(),
            },
            { variant: 'delete', children: 'Eliminar', icon: <MdDelete size={17} /> },
        ],
        []
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles del Empleado'>
            <div className='flex flex-col space-y-8'>
                <Form fields={fields} data={selectedEmployee ?? {}} disabled={true} variant='edit' columns={2} />

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
