import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import { routes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './layout';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path='/'
                element={isAuthenticated ? <Navigate to='/login' replace /> : <Navigate to='/employees' replace />}
            />
            <Route path='/login' element={<Login />} />
            <Route
                path='/*'
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Route>
        </Routes>
    );
};

export default App;
