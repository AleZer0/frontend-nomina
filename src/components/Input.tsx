import { ChangeEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showPassword?: boolean;
    handleShowPassword?: () => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, showPassword, handleShowPassword }) => {
    return (
        <div className='relative mb-4'>
            <input
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
                className='w-full rounded border border-gray-200 p-2 text-blue-950 hover:border-gray-300 hover:shadow focus:ring-1 focus:ring-blue-400 focus:outline-none'
            />
            {type === 'password' && (
                <button
                    type='button'
                    onClick={handleShowPassword}
                    className='absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-700'>
                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
            )}
        </div>
    );
};

export default Input;
