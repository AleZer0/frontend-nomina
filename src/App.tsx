import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { routes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';

import Layout from './layouts/LayoutGeneral';

import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />} />

                    <Route path='/' element={<Navigate to='/employees' replace />} />
                    <Route
                        path='/*'
                        element={
                            <ProtectedRoute>
                                <GlobalProvider>
                                    {/* HeaderContext */}
                                    <Routes>
                                        {routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={'/' + route.path}
                                                element={<Layout>{route.element}</Layout>}
                                            />
                                        ))}
                                    </Routes>
                                    {/* HeaderContext */}
                                </GlobalProvider>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
