import Input from './Input';
import { ReactNode, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Field {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea';
    options?: { value: string | number; label: string }[];
    placeholder?: string;
}

interface FormProps {
    fields: Field[];
    onSubmit: (data: Record<string, any>) => void;
    title?: string;
    buttonText?: string;
    children?: ReactNode;
}

const Form: React.FC<FormProps> = ({
    fields,
    onSubmit,
    title,
    buttonText = 'Enviar',
    children = (
        <button type='submit' className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
            {buttonText}
        </button>
    ),
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked ?? false;

        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-3'>
            {title && <h1 className='font-sans text-2xl font-bold'>{title}</h1>}
            {fields.map(({ name, label, type, options, placeholder }) => (
                <div key={name} className='flex flex-col'>
                    <label className='font-medium'>{label}</label>
                    {type === 'select' ? (
                        <select name={name} onChange={handleChange} className='rounded border p-2'>
                            {options?.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : type === 'checkbox' ? (
                        <input type='checkbox' name={name} onChange={handleChange} className='mt-1' />
                    ) : type === 'textarea' ? (
                        <textarea
                            name={name}
                            placeholder={placeholder}
                            onChange={handleChange}
                            className='rounded border p-2'
                        />
                    ) : (
                        <div className='relative'>
                            <Input
                                type={type === 'password' && showPassword ? 'text' : type}
                                name={name}
                                placeholder={placeholder}
                                value={formData[name] || ''}
                                onChange={handleChange}
                            />

                            {type === 'password' && (
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-3 bottom-3.5 flex cursor-pointer items-center text-gray-500 hover:text-gray-600'
                                    onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
            {children}
        </form>
    );
};

export default Form;
