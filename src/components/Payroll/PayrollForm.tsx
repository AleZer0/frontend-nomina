import { ReactNode, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGlobalContext } from '../../context/GlobalContext';

import { IconFileExcel, IconFilePencil, IconFilePlus, IconFileTypePdf, IconPencilX } from '@tabler/icons-react';

import Select from '../Select';
import Input from '../Input';
import Button from '../Button';

import { PayrollFormData, payrollSchema } from '../../schemas/payrollSchema';
import { EmployeeInterface, PayrollInterface } from '../../types/entities';

import EmployeeServices from '../../services/employees.service';

type TPayrollForm = {
    mode: 'create' | 'edit' | 'view';
    setMode: React.Dispatch<React.SetStateAction<'create' | 'view' | 'edit'>>;
    onCreate: (data: Omit<PayrollInterface, 'folio'>) => void;
    onUpdate: (id: number, data: Partial<PayrollInterface>) => void;
    onDelete: (id: number) => void;
    onClose: () => void;
    children?: ReactNode;
};

const PayrollForm: React.FC<TPayrollForm> = ({
    mode = 'create',
    setMode,
    onCreate,
    onUpdate,
    onDelete,
    onClose,
    children,
}) => {
    const { selectedEntities } = useGlobalContext();

    const defaultValues: Partial<PayrollFormData> = selectedEntities.selectedPayroll
        ? {
              ...selectedEntities.selectedPayroll,
              fecha: selectedEntities.selectedPayroll.fecha ?? '',
              dias_trabajados: selectedEntities.selectedPayroll.dias_trabajados.toString(),
              faltas: selectedEntities.selectedPayroll.faltas?.toString(),
              infonavit: selectedEntities.selectedPayroll.infonavit?.toString(),
              vacaciones: selectedEntities.selectedPayroll.vacaciones?.toString(),
              aguinaldo: selectedEntities.selectedPayroll.aguinaldo?.toString(),
              finiquito: selectedEntities.selectedPayroll.finiquito?.toString(),
              sueldo: selectedEntities.selectedPayroll.sueldo.toString(),
              pension_alimenticia: selectedEntities.selectedPayroll.pension_alimenticia?.toString(),
              horas_extras: selectedEntities.selectedPayroll.horas_extras?.toString(),
              pago_horas_extras: selectedEntities.selectedPayroll.pago_horas_extras?.toString(),
              maniobras: selectedEntities.selectedPayroll.maniobras?.toString(),
              otros: selectedEntities.selectedPayroll.otros?.toString(),
              id_empleado: selectedEntities.selectedPayroll.id_empleado?.toString(),
          }
        : {};

    const methods = useForm<PayrollFormData>({
        resolver: zodResolver(payrollSchema),
        defaultValues,
    });

    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [visibleGeneral, setVisibleGeneral] = useState<(keyof PayrollFormData)[]>([]);
    const [visibleGanancias, setVisibleGanancias] = useState<(keyof PayrollFormData)[]>([]);
    const [visibleDeducciones, setVisibleDeducciones] = useState<(keyof PayrollFormData)[]>([]);

    useEffect(() => {
        EmployeeServices.getEmployees({ estado: 1 })
            .then(response => setEmployees(response.data))
            .catch(err => {
                console.error('Error al cargar empleados:', err);
                setEmployees([]);
            });
    }, []);

    const selectedEmployee = useMemo(() => {
        const id = methods.watch('id_empleado');
        return employees.find(e => e.id_empleado === Number(id));
    }, [methods.watch('id_empleado'), employees]);

    const toggleConcepto = (type: 'ganancia' | 'deduccion' | 'general', key: keyof PayrollFormData) => {
        let updater;
        switch (type) {
            case 'ganancia':
                updater = setVisibleGanancias;
                break;
            case 'deduccion':
                updater = setVisibleDeducciones;
                break;
            case 'general':
                updater = setVisibleGeneral;
                break;
        }
        updater(prev => (prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]));
    };

    const general: (keyof PayrollFormData)[] = ['faltas', 'horas_extras'];
    const ganancias: (keyof PayrollFormData)[] = [
        'vacaciones',
        'aguinaldo',
        'finiquito',
        'maniobras',
        'otros',
        'pago_horas_extras',
    ];
    const deducciones: (keyof PayrollFormData)[] = ['infonavit', 'pension_alimenticia'];

    const watchFields = methods.watch();

    const sueldoNeto = useMemo(() => {
        const base = Number(watchFields.sueldo || 0);
        const totalGanancias = visibleGanancias.reduce((sum, key) => sum + Number(watchFields[key] || 0), 0);
        const totalDeducciones = visibleDeducciones.reduce((sum, key) => sum + Number(watchFields[key] || 0), 0);
        return base + totalGanancias - totalDeducciones;
    }, [watchFields, visibleGanancias, visibleDeducciones]);

    const handleSubmit = (data: PayrollFormData) => {
        const payload = {
            ...data,
            sueldo: Number(data.sueldo),
            dias_trabajados: Number(data.dias_trabajados),
            fecha: data.fecha ?? null,
            faltas: data.faltas ? Number(data.faltas) : undefined,
            infonavit: data.infonavit ? Number(data.infonavit) : undefined,
            vacaciones: data.vacaciones ? Number(data.vacaciones) : undefined,
            aguinaldo: data.aguinaldo ? Number(data.aguinaldo) : undefined,
            finiquito: data.finiquito ? Number(data.finiquito) : undefined,
            pension_alimenticia: data.pension_alimenticia ? Number(data.pension_alimenticia) : undefined,
            horas_extras: data.horas_extras ? Number(data.horas_extras) : undefined,
            pago_horas_extras: data.pago_horas_extras ? Number(data.pago_horas_extras) : undefined,
            maniobras: data.maniobras ? Number(data.maniobras) : undefined,
            otros: data.otros ? Number(data.otros) : undefined,
            id_empleado: Number(data.id_empleado),
        };

        if (mode === 'create') {
            onCreate(payload);
            onClose();
        }

        if (mode === 'edit' && selectedEntities.selectedPayroll) {
            onUpdate(selectedEntities.selectedPayroll.folio, payload);
            setMode('view');
        }
    };

    const handleDelete = () => {
        if (selectedEntities.selectedPayroll) {
            onDelete(selectedEntities.selectedPayroll.folio);
            onClose();
        }
    };

    const disabled = mode === 'view';
    const variant = mode === 'view' ? 'filled' : 'default';

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className='space-y-8 text-gray-800'>
                <div className='space-y-2 rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold tracking-wide subpixel-antialiased'>
                            Información General
                        </h2>
                        <select
                            onChange={e => {
                                const value = e.target.value;
                                if (general.includes(value as keyof PayrollFormData)) {
                                    toggleConcepto('ganancia', value as keyof PayrollFormData);
                                }
                            }}
                            className='rounded border px-2 py-1 text-sm'>
                            <option value=''>Agregar información general</option>
                            {general.map(
                                key =>
                                    !visibleGeneral.includes(key) && (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    )
                            )}
                        </select>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <Select
                            name='id_empleado'
                            label='Empleado'
                            options={employees.map(emp => ({
                                id: emp.id_empleado,
                                label: `${emp.nombre} ${emp.apellido}`,
                            }))}
                            defaultMessage='Seleccione un empleado'
                            required
                        />
                        <Input
                            type='date'
                            required={true}
                            name='fecha'
                            label='Fecha'
                            variant={variant}
                            placeholder='Seleccione la fecha'
                            disabled={disabled}
                        />
                        <Input
                            type='text'
                            required={true}
                            name='dias_trabajados'
                            label='Días laborados'
                            variant={variant}
                            placeholder='Ingrese los días laborados'
                            disabled={disabled}
                        />
                    </div>
                </div>

                {/* Ganancias */}
                <div className='space-y-2 rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold tracking-wide subpixel-antialiased'>Ganancías</h2>
                        <select
                            onChange={e => {
                                const value = e.target.value;
                                if (ganancias.includes(value as keyof PayrollFormData)) {
                                    toggleConcepto('ganancia', value as keyof PayrollFormData);
                                }
                            }}
                            className='rounded border px-2 py-1 text-sm'>
                            <option value=''>Agregar ganancia</option>
                            {ganancias.map(
                                key =>
                                    !visibleGanancias.includes(key) && (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    )
                            )}
                        </select>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <Input
                            type='number'
                            required={true}
                            name='sueldo'
                            label='Sueldo base'
                            variant={variant}
                            placeholder='Ingrese el sueldo base'
                            disabled={disabled}
                        />
                        {visibleGanancias.map(key => (
                            <Input key={key} name={key} type='number' label={key} />
                        ))}
                    </div>
                </div>

                {/* Deducciones */}
                <div>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold tracking-wide subpixel-antialiased'>Deducciones</h2>
                        <select
                            onChange={e => {
                                const value = e.target.value;
                                if (ganancias.includes(value as keyof PayrollFormData)) {
                                    toggleConcepto('deduccion', value as keyof PayrollFormData);
                                }
                            }}
                            className='rounded border px-2 py-1 text-sm'>
                            <option value=''>Agregar deducción</option>
                            {deducciones.map(
                                key =>
                                    !visibleDeducciones.includes(key) && (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    )
                            )}
                        </select>
                    </div>
                    <div className='mt-2 grid grid-cols-2 gap-4'>
                        {visibleDeducciones.map(key => (
                            <Input key={key} name={key} type='number' label={key} />
                        ))}
                    </div>
                </div>

                {/* Sueldo Neto */}
                <div>
                    <h2 className='text-xl font-semibold tracking-wide subpixel-antialiased'>Sueldo Neto</h2>
                    <div className='text-xl font-semibold text-blue-600'>${sueldoNeto.toFixed(2)}</div>
                </div>

                {mode === 'view' && children}

                <div className='flex flex-row-reverse gap-4'>
                    {mode === 'create' && (
                        <Button type='submit' icon={<IconFilePlus stroke={2} />}>
                            Guardar
                        </Button>
                    )}
                    {mode === 'edit' && (
                        <>
                            <Button type='submit' variant='edit' icon={<IconFilePencil stroke={2} />}>
                                Editar
                            </Button>
                            <Button
                                type='button'
                                variant='delete'
                                icon={<IconPencilX stroke={2} />}
                                onClick={() => {
                                    methods.reset(undefined, { keepDefaultValues: true });
                                    setMode('view');
                                }}>
                                Cancelar
                            </Button>
                        </>
                    )}
                    {mode === 'view' && (
                        <>
                            <Button
                                type='button'
                                variant='edit'
                                icon={<IconPencilX stroke={2} />}
                                onClick={() => {
                                    methods.reset(undefined, { keepDefaultValues: true });
                                    setMode('edit');
                                }}>
                                Editar
                            </Button>
                            <Button
                                type='button'
                                variant='delete'
                                icon={<IconFileExcel stroke={2} />}
                                onClick={handleDelete}>
                                Eliminar
                            </Button>
                            <Button type='button' variant='delete' icon={<IconFileTypePdf stroke={2} />}>
                                PDF
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </FormProvider>
    );
};

export default PayrollForm;
