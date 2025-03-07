import { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';

import Input from './Input';
import Button from './Button';
import Select from './Select';

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
    loadingButton,
    labelLoadingButton,
}) => {
    const initialData = useMemo(() => {
        return fields.reduce(
            (acc, field) => {
                acc[field.name] = data[field.name] ?? (field.type === 'number' || field.type === 'select' ? '' : '');
                return acc;
            },
            {} as Record<string, any>
        );
    }, [data, fields]);

    const [formData, setFormData] = useState(initialData);
    const [isFormValid, setIsFormValid] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current || disabled) {
            setFormData(initialData);
            isFirstRender.current = false;
        }
    }, [initialData, disabled]);

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
        setIsFormValid(
            fields.every(field => {
                if (!field.required) return true;
                const value = formData[field.name];

                if (field.type === 'number') {
                    return value !== '' && value !== null && value !== undefined && value > 0;
                }

                if (field.type === 'select') {
                    return value !== '' && value !== null && value !== undefined && value !== '0';
                }

                if (field.type === 'date') {
                    return value && !isNaN(new Date(value).getTime());
                }

                return value !== '' && value !== null && value !== undefined;
            })
        );
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
                {fields.map(({ name, label, required, type, data, ...rest }) => (
                    <div key={name} className='flex flex-col'>
                        <label htmlFor={name} className='mb-1'>
                            {label} {required && <span className='text-red-500'>*</span>}
                        </label>
                        {type === 'select' || type === 'multi_select' ? (
                            <Select
                                options={
                                    data?.map(option => ({
                                        value: option.id,
                                        label: option.label,
                                    })) || []
                                }
                                value={formData[name] || (type === 'multi_select' ? [] : '')}
                                onChange={value => handleChange(name, type, value)}
                                multiple={type === 'multi_select'}
                                placeholder='Selecciona una opción...'
                            />
                        ) : (
                            <Input
                                {...rest}
                                disabled={disabled}
                                type={type}
                                id={name}
                                name={name}
                                value={formData[name] === 0 ? '' : (formData[name] ?? '')}
                                onChange={e => handleChange(name, type, e.target.value)}
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
                        disabled={!isFormValid || disabled || loadingButton}
                        isLoading={loadingButton}>
                        {loadingButton ? labelLoadingButton : submitLabel}
                    </Button>
                </div>
            )}
        </form>
    );
};

export default Form;
