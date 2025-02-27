import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';

import Input from './Input';
import Button from './Button';

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
    children,
}) => {
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

    const handleChange = (name: string, type: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    useEffect(() => {
        const allRequiredFilled = fields.every(
            field =>
                !field.required ||
                (formData[field.name] !== undefined &&
                    formData[field.name] !== null &&
                    formData[field.name].toString().trim() !== '')
        );
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
                {fields.map(
                    ({
                        name,
                        label,
                        type,
                        placeholder,
                        required,
                        variant,
                        inputSize,
                        isPassword,
                        leftIcon,
                        rightIcon,
                    }) => {
                        let value = formData[name] ?? '';

                        if (type === 'date' && value) {
                            const dateValue = new Date(value);
                            value = !isNaN(dateValue.getTime()) ? dateValue.toISOString().split('T')[0] : '';
                        }

                        if (typeof value === 'number') {
                            value = value.toString();
                        }

                        return (
                            <div key={name} className='flex flex-col'>
                                <label htmlFor={name} className='mb-1'>
                                    {label} {required && <span className='text-red-500'>*</span>}
                                </label>
                                <Input
                                    variant={variant}
                                    inputSize={inputSize}
                                    leftIcon={leftIcon}
                                    rightIcon={rightIcon}
                                    isPassword={isPassword}
                                    disabled={disabled}
                                    type={type}
                                    id={name}
                                    name={name}
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={e => handleChange(name, type, e.target.value)}
                                />
                            </div>
                        );
                    }
                )}
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
