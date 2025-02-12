import { ChangeEvent } from 'react';

interface InputProps {
    type: 'text' | 'number' | 'email' | 'password';
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange }) => {
    return (
        <div className='relative mb-4'>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='w-full rounded border border-gray-200 p-2 text-blue-950 hover:border-gray-300 hover:shadow focus:ring-1 focus:ring-blue-400 focus:outline-none'
            />
        </div>
    );
};

export default Input;
