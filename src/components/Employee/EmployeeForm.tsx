import { FormProvider, useForm } from 'react-hook-form';
import { IconUserEdit, IconUserPlus } from '@tabler/icons-react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

type TEmployeeForm = { isOpen: boolean; onClose: () => void };

const EmployeeForm: React.FC<TEmployeeForm> = ({ isOpen, onClose }) => {
    const methods = useForm();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Añadir un nuevo empleado' containerClassName='max-w-3xl'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(data => console.log(data))} className='space-y-12 text-gray-800'>
                    <div className='space-y-2 rounded-2xl'>
                        <h1 className='text-xl font-medium tracking-wide subpixel-antialiased'>Información Personal</h1>
                        <div className='grid grid-cols-2 gap-4'>
                            <Input
                                type='text'
                                required={true}
                                name='nombre'
                                label='Nombre(s)'
                                placeholder='Ingrese el nombre'
                            />
                            <Input
                                type='text'
                                required={true}
                                name='apellido'
                                label='Apellido(s)'
                                placeholder='Ingrese el apellido'
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
                            />
                            <Input
                                type='text'
                                required={true}
                                name='puesto'
                                label='Puesto asignado'
                                placeholder='Ingrese el puesto'
                            />
                            <Input
                                type='date'
                                name='fecha_incorporacion'
                                label='Fecha Incorporacion'
                                placeholder='Seleccione la fecha de incroporación'
                            />
                            <Input
                                type='number'
                                name='dias_laborables'
                                label='Días laborables'
                                placeholder='Ingrese los días laborables'
                            />
                            <Input type='number' name='sueldo' label='Sueldo base' placeholder='Ingrese el sueldo' />
                        </div>
                    </div>

                    <div className='flex flex-row-reverse gap-2'>
                        <Button type='submit' icon={<IconUserPlus stroke={2} />}>
                            Guardar empleado
                        </Button>
                        <Button type='button' variant='edit' icon={<IconUserEdit stroke={2} />}>
                            Editar empleado
                        </Button>
                        <Button type='button' variant='delete' icon={<AiOutlineUserAdd size={17} />}>
                            Eliminar empleado
                        </Button>
                        <Button type='button' variant='add' icon={<AiOutlineUserAdd size={17} />}>
                            Generar nómina
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default EmployeeForm;
