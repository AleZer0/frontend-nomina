import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { CiLogin } from 'react-icons/ci';

import Form from '../components/Form';
import { FormField } from '../types/extras';
import { useAuth } from '../context/AuthContext';
import logotransportes from '../assets/logotransportes.png';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { isAuthenticated, login, error, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (values: Record<string, string>) => {
        await login({
            nombre_usuario: values.nombre_usuario,
            contrasena: values.contrasena,
        });
    };

    useEffect(() => {
        if (isAuthenticated) navigate('/employees');
    }, [isAuthenticated, navigate]);

    const fields: FormField[] = useMemo(
        () => [
            {
                name: 'nombre_usuario',
                label: 'Nombre de usuario',
                type: 'text',
                placeholder: 'Ingresa tu usuario',
                required: true,
                variant: 'default',
                inputSize: 'md',
                leftIcon: <FaRegUser size={15} />,
            },
            {
                name: 'contrasena',
                label: 'Contraseña',
                type: 'password',
                placeholder: 'Ingresa tu contraseña',
                required: true,
                variant: 'default',
                inputSize: 'md',
                isPassword: showPassword,
                leftIcon: <MdPassword size={15} />,
                rightIcon: showPassword ? (
                    <FaEye onClick={() => setShowPassword(false)} size={20} />
                ) : (
                    <FaEyeSlash onClick={() => setShowPassword(true)} size={20} />
                ),
            },
        ],
        [showPassword]
    );

    return (
        <div className='flex h-screen items-center justify-center bg-gradient-to-r from-blue-800 to-blue-400'>
            <div className='flex w-[300px] flex-col items-center rounded-2xl bg-blue-50 p-10 shadow-2xl shadow-blue-900 md:w-[400px]'>
                <div className='flex h-20 w-64 items-center justify-center'>
                    <img src={logotransportes} alt='Logo' className='h-12 object-contain md:h-20' />
                </div>
                <br />
                <h1 className='mb-8 text-3xl font-bold tracking-tight text-blue-950'>Iniciar Sesión</h1>

                {error && <div className='mb-4 text-center text-sm text-red-500'>{error}</div>}

                <Form
                    fields={fields}
                    onSubmit={handleLogin}
                    submitIcon={<CiLogin size={17} />}
                    submitLabel='Ingresar'
                    variant='details'
                    loadingButton={loading}
                    labelLoadingButton='Ingresando...'
                />
            </div>
        </div>
    );
};

export default Login;
