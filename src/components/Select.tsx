import { useFormContext, FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label?: string;
    variant?: 'default' | 'filled';
    selectSize?: 'sm' | 'md' | 'lg';
    options: readonly { id: number; label: string }[];
    defaultMessage?: string;
    required?: boolean;
    register?: UseFormRegisterReturn;
    error?: FieldError;
}

const Select: React.FC<ISelect> = ({
    name,
    label,
    variant = 'default',
    selectSize = 'md',
    options,
    defaultMessage = 'Seleccione una opción...',
    required,
    className,
    multiple = false,
    register,
    error: externalError,
    ...props
}) => {
    let fieldRegister = register;
    let fieldError = externalError;

    try {
        const form = useFormContext();
        const { register: contextRegister, getFieldState, formState } = form;

        if (!fieldRegister) {
            fieldRegister = contextRegister(name);
        }

        if (!fieldError) {
            const { error } = getFieldState(name, formState);
            fieldError = error;
        }
    } catch (e) {}

    return (
        <div className={clsx('w-full', className)}>
            {label && (
                <label
                    htmlFor={name}
                    className={`text-base font-medium capitalize ${required && "after:ml-0.5 after:text-red-500 after:content-['*']"}`}>
                    {label}
                </label>
            )}

            <select
                {...fieldRegister}
                {...props}
                multiple={multiple}
                className={clsx(
                    'mt-1.5 w-full rounded-lg transition-all duration-300 placeholder:text-gray-400 placeholder:italic hover:shadow focus:shadow-xl focus:outline-none disabled:shadow-none',
                    {
                        'border border-gray-300 bg-gray-50 text-gray-900 hover:border-gray-400 focus:border-sky-500':
                            variant === 'default' && !fieldError,
                        'border border-red-500 text-gray-900 hover:border-red-500 focus:border-red-500':
                            variant === 'default' && fieldError,
                        'border-none bg-gray-100 text-gray-500 focus:ring-gray-500': variant === 'filled',
                    },
                    {
                        'p-1 text-sm': selectSize === 'sm',
                        'p-2 text-base': selectSize === 'md',
                        'p-4 text-lg': selectSize === 'lg',
                    }
                )}>
                {!multiple && <option value=''>{defaultMessage}</option>}
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>

            <span className={`${fieldError?.message ? 'visible' : 'invisible'} text-xs text-red-500`}>
                {(fieldError?.message && fieldError.message) || 'Sin errores'}
            </span>
        </div>
    );
};

Select.displayName = 'Select';

export default Select;
