import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';

import { routes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import Sidebar from './components/Sidebar';
import { GlobalProvider } from './context/DataContext';

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
                                    <Routes>
                                        {routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <>
                                                        <Sidebar />
                                                        {route.element}
                                                    </>
                                                }
                                            />
                                        ))}
                                    </Routes>
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
