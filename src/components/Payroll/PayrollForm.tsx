import { ReactNode, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGlobalContext } from '../../context/GlobalContext';

import { IconFileExcel, IconFilePencil, IconFilePlus, IconFileTypePdf, IconPencilX } from '@tabler/icons-react';

import Select from '../Select';
import Input from '../Input';
import Button from '../Button';

import { PayrollFormData, payrollSchema } from '../../schemas/payrollSchema';
import { EmployeeInterface, PayrollInterface, PrestamoAbono } from '../../types/entities';

import EmployeeServices from '../../services/employees.service';
import { Deducciones, Ganancias, General, TOption } from '../../constants/payrollFormConst';

type TPayrollForm = {
    mode: 'create' | 'edit' | 'view';
    setMode: React.Dispatch<React.SetStateAction<'create' | 'view' | 'edit'>>;
    onCreate: (data: Omit<PayrollInterface, 'folio'>) => void;
    onUpdate: (id: number, data: Partial<PayrollInterface>) => void;
    onDelete: (id: number) => void;
    onClose: () => void;
    idsPrestamos?: PrestamoAbono[];
    setIdsPrestamos?: React.Dispatch<React.SetStateAction<PrestamoAbono[]>>;
    setInputValues?: React.Dispatch<
        React.SetStateAction<{
            [key: number]: string;
        }>
    >;
    children?: ReactNode;
};

const PayrollForm: React.FC<TPayrollForm> = ({
    mode = 'create',
    setMode,
    onCreate,
    onUpdate,
    onDelete,
    onClose,
    idsPrestamos,
    setIdsPrestamos,
    setInputValues,
    children,
}) => {
    const { selectedEntities, setSelectedEntities } = useGlobalContext();

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
    const [visibleGeneral, setVisibleGeneral] = useState<TOption[]>([]);
    const [visibleGanancias, setVisibleGanancias] = useState<TOption[]>([]);
    const [visibleDeducciones, setVisibleDeducciones] = useState<TOption[]>([]);

    useEffect(() => {
        EmployeeServices.getEmployees({ estado: 1 })
            .then(response => setEmployees(response.data))
            .catch(err => {
                console.error('Error al cargar empleados:', err);
                setEmployees([]);
            });
    }, []);

    useEffect(() => {
        const id = methods.watch('id_empleado');

        if (!id) {
            methods.setValue('sueldo', '');
            setSelectedEntities(prev => ({ ...prev, selectedEmployee: null }));
            setIdsPrestamos?.([]);
            setInputValues?.({});
            return;
        }

        const empleado = employees.find(e => e.id_empleado === Number(id));
        if (empleado) {
            setSelectedEntities(prev => ({ ...prev, selectedEmployee: empleado }));
            if (empleado.sueldo) {
                methods.setValue('sueldo', empleado.sueldo.toString());
            }
        }
    }, [methods.watch('id_empleado'), employees]);

    useEffect(() => {
        if (!selectedEntities.selectedPayroll) return;

        const data = selectedEntities.selectedPayroll;

        const addVisible = (source: TOption[], setter: React.Dispatch<React.SetStateAction<TOption[]>>) => {
            const visibles = source.filter(
                opt => data[opt.key] !== null && data[opt.key] !== undefined && data[opt.key] != 0
            );
            setter(visibles);
        };

        if (mode !== 'create') {
            addVisible(General, setVisibleGeneral);
            addVisible(Ganancias, setVisibleGanancias);
            addVisible(Deducciones, setVisibleDeducciones);
        }
    }, [mode, selectedEntities.selectedPayroll]);

    const toggleConcepto = (type: 'ganancia' | 'deduccion' | 'general', key: keyof PayrollFormData) => {
        const source = type === 'ganancia' ? Ganancias : type === 'deduccion' ? Deducciones : General;
        const item: TOption | undefined = source.find(i => i.key === key);
        if (!item) return;

        const updater =
            type === 'ganancia'
                ? setVisibleGanancias
                : type === 'deduccion'
                  ? setVisibleDeducciones
                  : setVisibleGeneral;

        updater(prev => {
            const exists = prev.find(p => p.key === key);
            return exists ? prev.filter(p => p.key !== key) : [...prev, item];
        });
    };

    const totalGanancias = useMemo(() => {
        const values = methods.watch();
        const sueldoBase = Number(values.sueldo || 0);
        const adicionales = visibleGanancias.reduce((sum, item) => sum + Number(values[item.key] || 0), 0);
        return sueldoBase + adicionales;
    }, [visibleGanancias, methods.watch()]);

    const totalDeducciones = useMemo(() => {
        const values = methods.watch();
        const prestamosTotal = idsPrestamos ? idsPrestamos.reduce((sum, p) => sum + (p.monto_abonado || 0), 0) : 0;
        const subtotal = visibleDeducciones.reduce((sum, item) => sum + Number(values[item.key] || 0), 0);
        return prestamosTotal + subtotal;
    }, [visibleDeducciones, methods.watch()]);

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

    const renderConceptSelect = (type: 'ganancia' | 'deduccion' | 'general') => {
        const source = type === 'ganancia' ? Ganancias : type === 'deduccion' ? Deducciones : General;
        const visible =
            type === 'ganancia' ? visibleGanancias : type === 'deduccion' ? visibleDeducciones : visibleGeneral;
        const visibleKeys = visible.map(v => v.key);

        return (
            <select
                onChange={e => {
                    const value = e.target.value as keyof PayrollFormData;
                    if (source.some(opt => opt.key === value)) {
                        toggleConcepto(type, value);
                    }
                }}
                className='mt-1.5 w-60 rounded-lg border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 transition-all duration-300 placeholder:text-gray-400 placeholder:italic hover:border-gray-400 hover:shadow focus:border-sky-500 focus:shadow-xl focus:outline-none disabled:shadow-none'>
                <option value=''>-- Agregar {type} --</option>
                {source
                    .filter(opt => !visibleKeys.includes(opt.key))
                    .map(opt => (
                        <option key={opt.key} value={opt.key}>
                            {opt.label}
                        </option>
                    ))}
            </select>
        );
    };

    const disabled = mode === 'view';
    const variant = mode === 'view' ? 'filled' : 'default';

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className='space-y-6 text-gray-800'>
                {/* General */}
                <div className='space-y-2 rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold tracking-wide subpixel-antialiased'>
                            Información General
                        </h2>
                        {!disabled && renderConceptSelect('general')}
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <Select
                            name='id_empleado'
                            required={true}
                            label='Empleado'
                            variant={variant}
                            disabled={disabled}
                            options={employees.map(emp => ({
                                id: emp.id_empleado,
                                label: `${emp.nombre} ${emp.apellido}`,
                            }))}
                            defaultMessage='Seleccione un empleado'
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
                            placeholder='Ingrese el campo días laborados'
                            disabled={disabled}
                        />
                        {visibleGeneral.map(obj => (
                            <Input
                                key={obj.key}
                                name={obj.key}
                                type='number'
                                label={obj.label}
                                variant={variant}
                                placeholder={`Ingrese el campo ${obj.label.toLowerCase()}`}
                                disabled={disabled}
                                {...(mode !== 'view' && {
                                    onRemove: () => {
                                        setVisibleGeneral(prev => prev.filter(p => p.key !== obj.key));
                                        methods.setValue(obj.key, '');
                                    },
                                })}
                            />
                        ))}
                    </div>
                </div>

                {/* Ganancias */}
                <div className='space-y-2 rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold tracking-wide subpixel-antialiased'>Ganancías</h2>
                        {!disabled && renderConceptSelect('ganancia')}
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <Input
                            type='number'
                            required={true}
                            name='sueldo'
                            label='Sueldo base'
                            variant={variant}
                            placeholder='Ingrese el campo sueldo base'
                            disabled={disabled}
                        />
                        {visibleGanancias.map(obj => (
                            <Input
                                key={obj.key}
                                name={obj.key}
                                type='number'
                                label={obj.label}
                                variant={variant}
                                placeholder={`Ingrese el campo ${obj.label.toLowerCase()}`}
                                disabled={disabled}
                                {...(mode !== 'view' && {
                                    onRemove: () => {
                                        setVisibleGanancias(prev => prev.filter(p => p.key !== obj.key));
                                        methods.setValue(obj.key, '');
                                    },
                                })}
                            />
                        ))}
                    </div>
                </div>

                <div className='rounded-2xl bg-gray-50 px-2 py-2 text-base font-medium'>
                    Total Ganancias: <span className='text-green-500'>${totalGanancias.toFixed(2)}</span>
                </div>

                {/* Deducciones */}
                <div>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold tracking-wide subpixel-antialiased'>Deducciones</h2>
                        {!disabled && renderConceptSelect('deduccion')}
                    </div>
                    <div className='mt-2 grid grid-cols-2 gap-4'>
                        {visibleDeducciones.map(obj => (
                            <Input
                                key={obj.key}
                                name={obj.key}
                                type='number'
                                label={obj.label}
                                variant={variant}
                                placeholder={`Ingrese el campo ${obj.label.toLowerCase()}`}
                                disabled={disabled}
                                {...(mode !== 'view' && {
                                    onRemove: () => {
                                        setVisibleDeducciones(prev => prev.filter(p => p.key !== obj.key));
                                        methods.setValue(obj.key, '');
                                    },
                                })}
                            />
                        ))}
                    </div>
                </div>

                {mode === 'create' && children}

                <div className='rounded-2xl bg-gray-50 px-2 py-2 text-base font-medium'>
                    Total Deducciones: <span className='text-red-500'>- ${totalDeducciones.toFixed(2)}</span>
                </div>

                {/* Sueldo Neto */}
                <div className='rounded-2xl bg-gray-50 px-2 py-2 text-xl font-semibold'>
                    Sueldo Neto:{' '}
                    <span className='text-blue-500'>${(totalGanancias - totalDeducciones).toFixed(2)}</span>
                </div>

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
                            <Button type='button' variant='details' icon={<IconFileTypePdf stroke={2} />}>
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
