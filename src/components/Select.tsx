import { useState } from 'react';

interface SelectProps<T> {
    options: { value: T; label: string }[];
    value?: T | T[];
    onChange: (value: T | T[]) => void;
    multiple?: boolean;
    placeholder?: string;
    className?: string;
}

const Select = <T,>({
    options,
    value,
    onChange,
    multiple = false,
    placeholder = 'Selecciona...',
    className = '',
}: SelectProps<T>) => {
    // ⬇ Corrección: Inicializamos correctamente `selectedValue` basado en `multiple`
    const [selectedValue, setSelectedValue] = useState<T | T[]>(
        value !== undefined ? value : multiple ? [] : (null as unknown as T)
    );

    const handleChange = (selectedOption: T | T[]) => {
        setSelectedValue(selectedOption);
        onChange(selectedOption);
    };

    return (
        <div className={`relative ${className}`}>
            <select
                className='w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 transition-all duration-300 hover:border-gray-400 hover:shadow focus:ring-1 focus:shadow-xl focus:ring-blue-400 focus:outline-none'
                multiple={multiple}
                value={Array.isArray(selectedValue) ? selectedValue.map(String) : String(selectedValue)}
                onChange={e => {
                    const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        option => options.find(o => String(o.value) === option.value)?.value as T
                    );
                    handleChange(multiple ? selectedOptions : selectedOptions[0]);
                }}>
                {!multiple && <option value=''>{placeholder}</option>}
                {options.map(option => (
                    <option key={String(option.value)} value={String(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
