import { FormProvider, useForm } from 'react-hook-form';
import { IconFilePlus, IconUserEdit, IconUserMinus, IconUserPlus } from '@tabler/icons-react';
import Input from '../Input';
import Button from '../Button';

type TEmployeeForm = {
    onSubmit?: () => void;
    mode?: 'create' | 'edit' | 'view';
};

const EmployeeForm: React.FC<TEmployeeForm> = ({ mode = 'create', onSubmit }) => {
    const methods = useForm();
    const disabled = mode === 'view';

    const handleSubmit = (data: any) => {
        console.log('Submit data:', data);
        onSubmit && onSubmit();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className='space-y-12 text-gray-800'>
                <div className='space-y-2 rounded-2xl'>
                    <h1 className='text-xl font-medium tracking-wide subpixel-antialiased'>Información Personal</h1>
                    <div className='grid grid-cols-2 gap-4'>
                        <Input
                            type='text'
                            required={true}
                            name='nombre'
                            label='Nombre(s)'
                            placeholder='Ingrese el nombre'
                            disabled={disabled}
                        />
                        <Input
                            type='text'
                            required={true}
                            name='apellido'
                            label='Apellido(s)'
                            placeholder='Ingrese el apellido'
                            disabled={disabled}
                        />
                    </div>
                </div>

                <div className='space-y-2 rounded-2xl'>
                    <h1 className='text-xl font-medium tracking-wide subpixel-antialiased'>Información Laboral</h1>
                    <div className='grid grid-cols-2 gap-4'>
                        <Input
                            type='text'
                            name='departamento'
                            label='Departamento asignado'
                            placeholder='Ingrese el departamento'
                            disabled={disabled}
                        />
                        <Input
                            type='text'
                            required={true}
                            name='puesto'
                            label='Puesto asignado'
                            placeholder='Ingrese el puesto'
                            disabled={disabled}
                        />
                        <Input
                            type='date'
                            name='fecha_incorporacion'
                            label='Fecha Incorporacion'
                            placeholder='Seleccione la fecha de incroporación'
                            disabled={disabled}
                        />
                        <Input
                            type='number'
                            name='dias_laborables'
                            label='Días laborables'
                            placeholder='Ingrese los días laborables'
                            disabled={disabled}
                        />
                        <Input type='number' name='sueldo' label='Sueldo base' placeholder='Ingrese el sueldo' />
                    </div>
                </div>

                <div className='flex flex-row-reverse gap-2'>
                    {(mode === 'create' || mode === 'edit') && (
                        <Button type='submit' icon={<IconUserPlus stroke={2} />}>
                            Guardar empleado
                        </Button>
                    )}
                    {mode === 'view' && (
                        <>
                            <Button type='submit' variant='edit' icon={<IconUserEdit stroke={2} />}>
                                Editar empleado
                            </Button>
                            <Button type='button' variant='delete' icon={<IconUserMinus stroke={2} />}>
                                Eliminar empleado
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
