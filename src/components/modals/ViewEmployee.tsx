import React, { useState, useEffect } from 'react';
import { Employee } from '../../pages/Employees';
import Modal from '../Modal';
import Button from '../Button';
import TableData from '../TableData';
import { HiDocumentPlus } from 'react-icons/hi2';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface ViewEmployeeProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onEdit: (employee: Employee) => void;
    onDelete: (id_empleado: number) => void;
    onCreatePayroll: (employee: Employee) => void;
}

const emptyEmployee: Employee = {
    id_empleado: 0,
    nombre: '',
    apellido: '',
    fecha_incorporacion: '',
    departamento: '',
    puesto: '',
    sueldo: 0,
    nomina: [],
    abonos: [],
};

const ViewEmployee: React.FC<ViewEmployeeProps> = ({
    isOpen,
    onClose,
    employee,
    onEdit,
    onDelete,
    onCreatePayroll,
}) => {
    const [formData, setFormData] = useState<Employee>(emptyEmployee);

    useEffect(() => {
        if (employee) {
            setFormData({
                ...employee,
                fecha_incorporacion: employee.fecha_incorporacion
                    ? new Date(employee.fecha_incorporacion).toISOString().split('T')[0]
                    : '',
            });
        }
    }, [employee]);

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Detalles del Empleado' className='max-w-4xl'>
            <div className='flex flex-col space-y-8'>
                {/* Sección de Datos del Empleado */}
                <div className='max-h-96 overflow-y-auto'>
                    {['Nombre', 'Apellido', 'Fecha de incorporación', 'Puesto', 'Sueldo'].map((label, index) => (
                        <div key={index} className='mb-4'>
                            <label className='mb-2 block text-gray-700'>{label}:</label>
                            <input
                                type={label === 'Fecha de incorporación' ? 'date' : 'text'}
                                value={formData[label.toLowerCase() as keyof Employee] as string}
                                readOnly
                                className='w-full rounded-lg border bg-gray-100 p-2'
                            />
                        </div>
                    ))}
                </div>
                {/* Sección de Nóminas con TableData */}
                <TableData
                    fields={['Folio', 'Fecha', 'Días Trabajados', 'Sueldo']}
                    data={employee?.nomina || []}
                    renderRow={nomina => (
                        <>
                            <div className='p-2'>{`NOM${nomina.folio.toString().padStart(4, '0')}`}</div>
                            <div className='p-2'>{new Date(nomina.fecha).toLocaleDateString()}</div>
                            <div className='p-2'>{nomina.dias_trabajados}</div>
                            <div className='p-2'>${nomina.sueldo.toFixed(2)}</div>
                        </>
                    )}
                />

                {/* Botones de acción */}
                <div className='mt-4 flex justify-end gap-2'>
                    <Button
                        onClick={() => {
                            if (!employee) return;
                            onCreatePayroll(employee);
                            onClose();
                        }}
                        design='rounded-2xl cursor-pointer bg-blue-500 text-white hover:bg-blue-600'>
                        <span className='relative pt-1'>
                            <HiDocumentPlus size={17} />
                        </span>
                        Generar Nómina
                    </Button>

                    <Button
                        onClick={() => {
                            if (!employee) return;
                            onEdit(employee);
                            onClose();
                        }}
                        design='rounded-2xl cursor-pointer bg-orange-500 text-white hover:bg-orange-600'>
                        <span className='relative pt-1'>
                            <FaUserEdit size={17} />
                        </span>
                        Editar
                    </Button>

                    <Button
                        onClick={() => {
                            if (!employee) return;
                            onDelete(employee.id_empleado);
                            onClose();
                        }}
                        design='rounded-2xl cursor-pointer bg-red-500 text-white hover:bg-red-600'>
                        <span className='relative pt-1'>
                            <MdDelete size={17} />
                        </span>
                        Eliminar
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewEmployee;
