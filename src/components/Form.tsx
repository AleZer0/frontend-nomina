import { ReactNode, useState } from 'react';
import { useAppStatus } from '../context/AppStatusContext';
import Input from './Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Field {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea';
    options?: { value: string | number; label: string }[];
    placeholder?: string;
    required?: boolean;
}

interface FormProps {
    fields: Field[];
    onSubmit: (data: Record<string, any>) => void;
    children: ReactNode;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, children }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { errors, setError, clearError } = useAppStatus();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked ?? false;

        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Validación en tiempo real
        const field = fields.find(f => f.name === name);
        if (field?.required && value.trim() === '') {
            setError(name, field.label);
        } else {
            clearError(name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let hasError = false;

        fields.forEach(({ name, label, required }) => {
            if (required && !formData[name]) {
                setError(name, label);
                hasError = true;
            }
        });

        if (!hasError) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-3 text-sm text-blue-950 md:text-base'>
            {fields.map(({ name, label, type, options, placeholder, required }) => (
                <div key={name} className='flex flex-col'>
                    <label className='font-medium'>
                        {label} {required && <span className='text-red-500'>*</span>}
                    </label>
                    {type === 'select' ? (
                        <select name={name} required={required} onChange={handleChange} className='rounded border p-2'>
                            {options?.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : type === 'checkbox' ? (
                        <input
                            type='checkbox'
                            name={name}
                            required={required}
                            onChange={handleChange}
                            className='mt-1'
                        />
                    ) : type === 'textarea' ? (
                        <textarea
                            name={name}
                            required={required}
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
                                    className='absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500 hover:text-gray-600'
                                    onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            )}

                            {errors[name] && <p className='text-sm text-red-500'>{errors[name]}</p>}
                            <p className='hidden text-sm text-red-500 peer-invalid:block'>
                                El campo {label.toLowerCase()} es incorrecto
                            </p>
                        </div>
                    )}
                </div>
            ))}
            {children}
        </form>
    );
};

export default Form;
