import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';

import { autentication } from '../api/auth';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleShowPassword = () => {
        console.log(showPassword);
        setShowPassword(!showPassword);
    };

    const { login } = useAuth();
    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            login();
            const data = await autentication(username, password);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-800 to-blue-400'>
            <div className='w-[300px] rounded bg-blue-50 p-10 shadow-2xl shadow-blue-900 md:w-[400px]'>
                <h1 className='mb-10 text-3xl font-bold tracking-tight text-blue-950'>Iniciar Sesión</h1>
                {error && <div className='mb-4 text-center text-sm text-red-500'>{error}</div>}
                <Input
                    type='text'
                    placeholder='Nombre de usuario'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Input
                    type='password'
                    placeholder='Contraseña'
                    showPassword={showPassword}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    handleShowPassword={handleShowPassword}
                />
                <div className='mb-2 text-right'>
                    <Link
                        to='/forgot-password' // Ruta para la página de recuperación
                        className='text-sm text-blue-500 hover:underline'>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <Button
                    onClick={handleLogin}
                    design={`${loading ? 'bg-gray-300 text-blue-50' : 'bg-blue-500 hover:bg-blue-400 text-blue-50 cursor-pointer'}`}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </Button>
            </div>
        </div>
    );
};

export default Login;
