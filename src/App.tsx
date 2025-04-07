import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { routes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';
import Layout from './layouts/LayoutGeneral';

import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';

import SplashScreen from './components/SplashScreen';

const AppContent: React.FC = () => {
    const { loading } = useGlobalContext();
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const minSplashTime = 1500; // mínimo 1.5 segundos
        const timer = setTimeout(() => {
            if (!loading.loadingAllData) {
                setIsSplashVisible(false);
            }
        }, minSplashTime);

        if (!loading.loadingAllData) {
            const delay = setTimeout(() => setIsSplashVisible(false), minSplashTime);
            return () => clearTimeout(delay);
        }

        return () => clearTimeout(timer);
    }, [loading.loadingAllData]);

    if (isSplashVisible) return <SplashScreen />;

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Navigate to='/employees' replace />} />
            <Route
                path='/*'
                element={
                    <ProtectedRoute>
                        <Routes>
                            {routes.map((route, index) => (
                                <Route key={index} path={`/${route.path}`} element={<Layout>{route.element}</Layout>} />
                            ))}
                        </Routes>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <GlobalProvider>
                    <AppContent />
                </GlobalProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
