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
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='peer w-full rounded-lg border border-gray-300 p-2 invalid:border-red-500 hover:shadow focus:shadow-lg focus:outline-none'
            />
        </>
    );
};

export default Input;
