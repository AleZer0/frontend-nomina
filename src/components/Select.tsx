import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface ISelect extends React.InputHTMLAttributes<HTMLSelectElement> {
    name: string;
    options: readonly { id: number; label: string }[];
    label?: string;
    variant?: 'default' | 'error' | 'filled';
    selectSize?: 'sm' | 'md' | 'lg';
    defaultMessage: string;
}

const Select: React.FC<ISelect> = ({
    name,
    options,
    label,
    variant,
    selectSize,
    defaultMessage,
    multiple = false,
    className,
    ...props
}) => {
    const { register, formState, getFieldState } = useFormContext();
    const { error } = getFieldState(name, formState);

    return (
        <div className={clsx('w-full', className)}>
            <select
                {...register(name)}
                {...props}
                className={clsx(
                    'w-full rounded-lg border bg-gray-50 p-2 transition-all duration-300 hover:shadow focus:ring-1 focus:shadow-xl focus:outline-none',
                    {
                        'border-gray-300 text-gray-900 hover:border-gray-400 focus:ring-blue-400':
                            variant === 'default',
                        'border-none text-gray-500 focus:ring-gray-500': variant === 'filled',
                        'border border-red-500 text-gray-900 hover:ring-red-600 focus:border-red-700': error,
                    },
                    {
                        'p-1 text-sm': selectSize === 'sm',
                        'p-2 text-base': selectSize === 'md',
                        'p-4 text-lg': selectSize === 'lg',
                    },
                    className
                )}
                multiple={multiple}>
                {defaultMessage && <option>{defaultMessage}</option>}
                {options.map(option => (
                    <option key={option.id} value={String(option.id)}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error?.message && <span className='text-xs text-red-500'>{error.message}</span>}
        </div>
    );
};

export default Select;
