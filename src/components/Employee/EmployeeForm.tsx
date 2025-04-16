import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGlobalContext } from '../../context/GlobalContext';

import { IconFilePlus, IconPencilX, IconUserEdit, IconUserMinus, IconUserPlus } from '@tabler/icons-react';

import Input from '../Input';
import Button from '../Button';

import { EmployeeInterface } from '../../types/entities';
import { EmployeeFormData, employeeSchema } from '../../schemas/employeeSchema';

type TEmployeeForm = {
    mode: 'create' | 'edit' | 'view';
    setMode: React.Dispatch<React.SetStateAction<'create' | 'view' | 'edit'>>;
    onCreate: (data: Omit<EmployeeInterface, 'id_empleado'>) => void;
    onUpdate: (id: number, data: Partial<EmployeeInterface>) => void;
    onDelete: (id: number) => void;
    onClose: () => void;
    children?: ReactNode;
};

const EmployeeForm: React.FC<TEmployeeForm> = ({
    mode = 'create',
    setMode,
    onCreate,
    onUpdate,
    onDelete,
    onClose,
    children,
}) => {
    const { selectedEntities } = useGlobalContext();

    const defaultValues: Partial<EmployeeFormData> = selectedEntities.selectedEmployee
        ? {
              ...selectedEntities.selectedEmployee,
              sueldo: selectedEntities.selectedEmployee.sueldo.toString(),
              dias_laborables: selectedEntities.selectedEmployee.dias_laborables?.toString(),
              fecha_incorporacion: selectedEntities.selectedEmployee.fecha_incorporacion ?? '',
          }
        : {};

    const methods = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues,
    });

    const disabled = mode === 'view';
    const variant = mode === 'view' ? 'filled' : 'default';

    const handleSubmit = (data: EmployeeFormData) => {
        const payload = {
            ...data,
            sueldo: Number(data.sueldo),
            dias_laborables: data.dias_laborables ? Number(data.dias_laborables) : undefined,
        };

        if (mode === 'create') {
            onCreate(payload);
            onClose();
        }

        if (mode === 'edit' && selectedEntities.selectedEmployee) {
            onUpdate(selectedEntities.selectedEmployee.id_empleado, payload);
            setMode('view');
        }
    };

    const handleDelete = () => {
        if (selectedEntities.selectedEmployee) {
            onDelete(selectedEntities.selectedEmployee.id_empleado);
            onClose();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className='space-y-8 text-gray-800'>
                <div className='space-y-2 rounded-2xl'>
                    <h1 className='text-xl font-medium tracking-wide subpixel-antialiased'>Información Personal</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <Input
                            type='text'
                            required={true}
                            name='nombre'
                            label='Nombre(s)'
                            variant={variant}
                            placeholder='Ingrese el nombre'
                            disabled={disabled}
                        />
                        <Input
                            type='text'
                            required={true}
                            name='apellido'
                            label='Apellido(s)'
                            variant={variant}
                            placeholder='Ingrese el apellido'
                            disabled={disabled}
                        />
                    </div>
                </div>

                <div className='space-y-2 rounded-2xl'>
                    <h1 className='text-xl font-medium tracking-wide subpixel-antialiased'>Información Laboral</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <Input
                            type='date'
                            name='fecha_incorporacion'
                            label='Fecha Incorporacion'
                            variant={variant}
                            placeholder='Seleccione la fecha de incroporación'
                            disabled={disabled}
                        />
                        <Input
                            type='text'
                            name='departamento'
                            label='Departamento asignado'
                            variant={variant}
                            placeholder='Ingrese el departamento'
                            disabled={disabled}
                        />
                        <Input
                            type='text'
                            required={true}
                            name='puesto'
                            label='Puesto asignado'
                            variant={variant}
                            placeholder='Ingrese el puesto'
                            disabled={disabled}
                        />
                        <Input
                            type='number'
                            name='dias_laborables'
                            label='Días laborables'
                            variant={variant}
                            placeholder='Ingrese los días laborables'
                            disabled={disabled}
                        />
                        <Input
                            type='number'
                            required={true}
                            name='sueldo'
                            label='Sueldo base'
                            variant={variant}
                            placeholder='Ingrese el sueldo'
                        />
                    </div>
                </div>

                {mode === 'view' && children}

                <div className='flex flex-row-reverse gap-4'>
                    {mode === 'create' && (
                        <Button type='submit' icon={<IconUserPlus stroke={2} />}>
                            Guardar
                        </Button>
                    )}
                    {mode === 'edit' && (
                        <>
                            <Button type='submit' variant='edit' icon={<IconUserEdit stroke={2} />}>
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
                                icon={<IconUserEdit stroke={2} />}
                                onClick={() => {
                                    methods.reset(undefined, { keepDefaultValues: true });
                                    setMode('edit');
                                }}>
                                Editar
                            </Button>
                            <Button
                                type='button'
                                variant='delete'
                                icon={<IconUserMinus stroke={2} />}
                                onClick={handleDelete}>
                                Eliminar
                            </Button>
                            <Button type='button' variant='add' icon={<IconFilePlus stroke={2} />}>
                                Generar nómina
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </FormProvider>
    );
};

export default EmployeeForm;
