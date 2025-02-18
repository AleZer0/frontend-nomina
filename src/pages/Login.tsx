import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import Button from '../components/Button';

import { IoLogIn } from 'react-icons/io5';

const Login: React.FC = () => {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (data: Record<string, any>) => {
        const { nombre_usuario, contrasena } = data;
        try {
            await login({ nombre_usuario, contrasena });
        } catch (error) {
            console.error(`Error al iniciar sesión: ${error}`);
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate('/employees');
    }, [isAuthenticated, navigate]);

    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-50'>
            <div className='w-80 rounded-xl bg-blue-50 px-8 py-8 shadow-2xl shadow-blue-300 md:w-96'>
                <h1 className='mb-6 font-sans text-2xl font-bold text-blue-950 md:text-3xl'>Iniciar Sesión</h1>
                <Form
                    fields={[
                        {
                            name: 'nombre_usuario',
                            label: 'Nombre de usuario',
                            type: 'text',
                            placeholder: 'Ingrese el nombre de usuario',
                            required: true,
                        },
                        {
                            name: 'contrasena',
                            label: 'Contraseña',
                            type: 'password',
                            placeholder: 'Ingrese la contraseña',
                            required: true,
                        },
                    ]}
                    onSubmit={handleLogin}>
                    <div className='mb-4 text-right'>
                        <Link
                            to='/forgot-password' // Ruta para la página de recuperación
                            className='text-xs text-blue-500 hover:underline md:text-sm'>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <Button type='submit' variant='primary'>
                        <span className='relative pt-0.5'>
                            <IoLogIn size={20} />
                        </span>
                        Ingresar
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
