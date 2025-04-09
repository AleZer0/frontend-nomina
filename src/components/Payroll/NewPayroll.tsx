import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { HiDocumentAdd } from 'react-icons/hi';
import { MdPayments } from 'react-icons/md';

import Modal from '../Modal';
import Form from '../Form';
import Input from '../Input';
import Table from '../Table';

import { useGlobalContext } from '../../context/GlobalContext';

import { Column, FormField } from '../../types/extras';
import { EmployeeInterface, LoanInterface, PayrollInterface, PrestamoAbono } from '../../types/entities';
import EmployeeServices from '../../services/employees.service';
import { getActiveEntityFromPath } from '../../utils/router';

interface CreatePayrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newPayroll: Omit<PayrollInterface, 'folio'>) => void;
}

const NewPayroll: React.FC<CreatePayrollModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { pathname } = useLocation();
    const activeEntity = getActiveEntityFromPath(pathname);

    const { selectedEntities, setSelectedEntities, loading } = useGlobalContext();

    const emptyPayroll: Omit<PayrollInterface, 'folio'> = {
        fecha: '',
        dias_trabajados: 0,
        infonavit: 0,
        sueldo: selectedEntities.selectedEmployee?.sueldo ?? 0,
        finiquito: 0,
        vacaciones: 0,
        aguinaldo: 0,
        pension_alimenticia: 0,
        horas_extras: 0,
        pago_horas_extras: 0,
        maniobras: 0,
        faltas: 0,
        otros: 0,
        id_empleado: selectedEntities.selectedEmployee?.id_empleado ?? 0,
        ids_prestamos: [] as PrestamoAbono[],
    };

    const [idsPrestamos, setIdsPrestamos] = useState<PrestamoAbono[]>([]);
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

    const handleClickClose = () => {
        setIdsPrestamos([]);
        setInputValues({});
        if (activeEntity !== 'employees') setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
        onClose();
    };

    const handleSelectEmployee = (id_empleado: number) => {
        console.log(id_empleado);
        setSelectedEntities(prev => ({
            ...prev,
            selectedEmployee: employees.find(emp => emp.id_empleado === id_empleado) ?? null,
        }));
        console.log('Empleado seleccionado:', selectedEntities.selectedEmployee);
        console.log('Préstamos del empleado seleccionado:', selectedEntities.selectedEmployee?.prestamos);

        setIdsPrestamos([]);
        setInputValues({});
    };

    const handleChangeAbono = (idPrestamo: number, monto: number) => {
        setIdsPrestamos(prev => {
            const existIndex = prev.findIndex(p => p.id_prestamo === idPrestamo);
            if (existIndex !== -1) {
                const updatedPrestamos = [...prev];
                updatedPrestamos[existIndex].monto_abonado = monto;
                return updatedPrestamos;
            } else {
                return [...prev, { id_prestamo: idPrestamo, monto_abonado: monto }];
            }
        });
        setInputValues(prev => ({ ...prev, [idPrestamo]: monto.toString() }));
    };

    const handleSubmit = (values: Partial<PayrollInterface>) => {
        if (!values.fecha || !values.dias_trabajados || !values.sueldo || !values.id_empleado) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        const newPayroll: Omit<PayrollInterface, 'folio'> = {
            ...emptyPayroll,
            ...values,
            ids_prestamos: idsPrestamos,
        };

        setIdsPrestamos([]);
        setInputValues({});
        onSubmit(newPayroll);
        onClose();
    };

    useEffect(() => {
        EmployeeServices.getEmployees({ estado: 1, page: 1, limit: 200 })
            .then(({ data }) => setEmployees(data))
            .catch(err => {
                throw new Error(`Error al obtener todos los empleados ${err}`);
            });
    }, []);

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'id_empleado',
                label: 'Empleado',
                type: 'select',
                data: employees.map(({ id_empleado, nombre, apellido }) => ({
                    id: id_empleado,
                    label: `${nombre} ${apellido}`,
                })),
                placeholder: 'Seleccione un empleado',
                required: true,
            },
            {
                name: 'fecha',
                label: 'Fecha',
                type: 'date',
                placeholder: 'Seleccione una fecha',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'dias_trabajados',
                label: 'Días laborados',
                type: 'number',
                placeholder: 'Ingrese los días laborados',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'faltas',
                label: 'Días no laborados',
                type: 'number',
                placeholder: 'Ingrese la cantidad a días no laborados',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'sueldo',
                label: 'Sueldo',
                type: 'number',
                placeholder: 'Ingrese la cantidad a sueldo',
                required: true,
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'infonavit',
                label: 'Infonavit',
                type: 'number',
                placeholder: 'Ingrese la cantidad a infonavit',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'vacaciones',
                label: 'Vacaciones',
                type: 'number',
                placeholder: 'Ingrese la cantidad a vacaciones',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'aguinaldo',
                label: 'Aguinaldo',
                type: 'number',
                placeholder: 'Ingrese la cantidad a aguinaldo',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'finiquito',
                label: 'Finiquito',
                type: 'number',
                placeholder: 'Ingrese la cantidad a finiquito',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'pension_alimenticia',
                label: 'Pension Alimenticia',
                type: 'number',
                placeholder: 'Ingrese la cantidad a pension alimenticia',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'horas_extras',
                label: 'Cantidad de horas extras',
                type: 'number',
                placeholder: 'Ingrese la cantidad a horas extras',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'pago_horas_extras',
                label: 'Pago de horas extras',
                type: 'number',
                placeholder: 'Ingrese el pago de horas extras',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'maniobras',
                label: 'Maniobras',
                type: 'number',
                placeholder: 'Ingrese la cantidad a maniobras',
                variant: 'default',
                inputSize: 'md',
            },
            {
                name: 'Otros',
                label: 'Otros',
                type: 'number',
                placeholder: 'Ingrese la cantidad a otros',
                variant: 'default',
                inputSize: 'md',
            },
        ],
        [selectedEntities, employees]
    );

    const columns: Column<LoanInterface>[] = useMemo(
        () => [
            { key: 'id_prestamo', header: 'No. Prestamo' },
            {
                key: 'monto_total',
                header: 'Monto total',
                render: (_, row) => `$${row.monto_total.toFixed(2)}`,
            },
            {
                key: 'saldo_pendiente',
                header: 'Saldo pendiente',
                render: (_, row) => `$${row.saldo_pendiente.toFixed(2)}`,
            },
            {
                key: 'monto_abonado',
                header: 'Monto a abonar',
                render: (_, row) => (
                    <Input
                        variant='default'
                        inputSize='md'
                        leftIcon={<MdPayments size={17} />}
                        type='number'
                        placeholder={`$${row.saldo_pendiente.toFixed(2)}`}
                        value={inputValues[row.id_prestamo] || ''}
                        disabled={loading['addPayroll']}
                        onChange={e => handleChangeAbono(row.id_prestamo, Number(e.target.value))}
                    />
                ),
            },
        ],
        [selectedEntities, inputValues]
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={handleClickClose} title='Crear una nueva nómina' containerClassName='max-w-3xl'>
            <Form
                fields={fields}
                data={emptyPayroll}
                onSubmit={handleSubmit}
                submitIcon={<HiDocumentAdd size={17} />}
                submitLabel='Crear nómina'
                variant='save'
                direction='end'
                columns={3}
                extra={handleSelectEmployee}
                loadingButton={loading['addPayroll']}
                labelLoadingButton='Creando nómina...'>
                <Table
                    columns={columns}
                    data={
                        selectedEntities.selectedEmployee?.prestamos
                            ? selectedEntities.selectedEmployee.prestamos.filter(pres => pres.saldo_pendiente !== 0)
                            : []
                    }
                    loading={loading['prestamos']}
                />
            </Form>
        </Modal>
    );
};

export default NewPayroll;
