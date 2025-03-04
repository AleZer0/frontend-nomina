import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import Input from './Input';
import Button from './Button';
import Select from './Select'; // Importamos el nuevo Select

import { FormProps } from '../types/componentes';

const Form: React.FC<FormProps> = ({
    fields,
    data = {},
    onSubmit,
    submitIcon,
    submitLabel = 'Enviar',
    disabled = false,
    variant = 'generate',
    direction = 'start',
    columns = 1,
    extra,
    children,
}) => {
    // const { selectedEmployee, selectEmployee } = useGlobalContext();

    const [formData, setFormData] = useState<Record<string, any>>({ ...data });
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            setFormData({ ...data });
            isFirstRender.current = false;
        } else if (disabled) {
            setFormData({ ...data });
        }
    }, [data]);

    const handleChange = (name: string, type: string, value: any) => {
        if (name === 'id_empleado' && extra) {
            extra(parseInt(value));
        }
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value,
        }));
    };

    useEffect(() => {
        const allRequiredFilled = fields.every(field => {
            const value = formData[field.name];

            if (!field.required) return true;

            if (field.type === 'date') {
                return value && !isNaN(new Date(value).getTime());
            }

            return value !== undefined && value !== null && value.toString().trim() !== '';
        });

        setIsFormValid(allRequiredFilled);
    }, [formData, fields]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid && !disabled && onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 text-blue-950'>
            <div className={clsx('grid gap-4', { 'grid-cols-1': columns === 1, 'grid-cols-2': columns === 2 })}>
                {fields.map(field => (
                    <div key={field.name} className='flex flex-col'>
                        <label htmlFor={field.name} className='mb-1'>
                            {field.label} {field.required && <span className='text-red-500'>*</span>}
                        </label>
                        {field.type === 'select' ? (
                            <Select
                                options={
                                    field.data?.map(option => ({
                                        value: option.id,
                                        label: option.label,
                                    })) || []
                                }
                                value={formData[field.name]}
                                onChange={value => handleChange(field.name, field.type, value)}
                                placeholder='Selecciona una opción...'
                            />
                        ) : field.type === 'multi_select' ? (
                            <Select
                                options={
                                    field.data?.map(option => ({
                                        value: option.id,
                                        label: option.label,
                                    })) || []
                                }
                                value={formData[field.name] || []}
                                onChange={value => handleChange(field.name, field.type, value)}
                                multiple
                                placeholder='Selecciona múltiples opciones...'
                            />
                        ) : (
                            <Input
                                variant={field.variant}
                                inputSize={field.inputSize}
                                leftIcon={field.leftIcon}
                                rightIcon={field.rightIcon}
                                isPassword={field.isPassword}
                                disabled={disabled}
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={
                                    formData[field.name] !== undefined && formData[field.name] !== 0
                                        ? formData[field.name]
                                        : ''
                                }
                                onChange={e => handleChange(field.name, field.type, e.target.value)}
                            />
                        )}
                    </div>
                ))}
            </div>
            {children}
            {!disabled && (
                <div
                    className={clsx('mt-2 flex items-center', {
                        'justify-start': direction === 'start',
                        'justify-center': direction === 'center',
                        'justify-end': direction === 'end',
                    })}>
                    <Button
                        type='submit'
                        variant={!isFormValid || disabled ? 'disabled' : variant}
                        size='md'
                        icon={submitIcon}
                        disabled={!isFormValid || disabled}>
                        {!isFormValid ? 'Esperando...' : submitLabel}
                    </Button>
                </div>
            )}
        </form>
    );
};

export default Form;
