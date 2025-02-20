import React, { useState, useEffect } from 'react';
import { Employee } from '../../pages/Employees';
import Modal from '../Modal';
import Button from '../Button';
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
            // Cargar datos del empleado
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
                    <label className='mb-2 block text-gray-700'>Nombre:</label>
                    <input
                        type='text'
                        value={formData.nombre}
                        readOnly
                        className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
                    />

                    <label className='mb-2 block text-gray-700'>Apellido:</label>
                    <input
                        type='text'
                        value={formData.apellido}
                        readOnly
                        className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
                    />

                    <label className='mb-2 block text-gray-700'>Fecha de incorporación:</label>
                    <input
                        type='date'
                        value={formData.fecha_incorporacion}
                        readOnly
                        className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
                    />

                    <label className='mb-2 block text-gray-700'>Puesto:</label>
                    <input
                        type='text'
                        value={formData.puesto}
                        readOnly
                        className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
                    />

                    <label className='mb-2 block text-gray-700'>Sueldo:</label>
                    <input
                        type='number'
                        value={formData.sueldo}
                        readOnly
                        className='mb-4 w-full rounded-lg border bg-gray-100 p-2'
                    />
                </div>

                {/* Sección de Nóminas */}
                <div className='max-h-96 overflow-y-auto'>
                    <h3 className='mt-4 mb-2 font-semibold text-gray-700'>Historial de Nóminas</h3>

                    {employee?.nomina && employee.nomina.length > 0 ? (
                        <table className='w-full border-collapse border bg-gray-50'>
                            <thead>
                                <tr className='bg-gray-200 text-center'>
                                    <th className='border p-2'>Folio</th>
                                    <th className='border p-2'>Fecha</th>
                                    <th className='border p-2'>Días Trabajados</th>
                                    <th className='border p-2'>Sueldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.nomina.map((nomina, index) => (
                                    <tr key={index} className='border-b text-center'>
                                        <td className='border p-2'>{`NOM${nomina.folio.toString().padStart(4, '0')}`}</td>
                                        <td className='border p-2'>{new Date(nomina.fecha).toLocaleDateString()}</td>
                                        <td className='border p-2'>{nomina.dias_trabajados}</td>
                                        <td className='border p-2'>${nomina.sueldo.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className='flex items-center justify-center p-6 text-center text-gray-500'>
                            No hay registros disponibles
                        </div>
                    )}
                </div>
            </div>

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
        </Modal>
    );
};

export default ViewEmployee;
