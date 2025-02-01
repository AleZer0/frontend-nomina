import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './layouts/ProtectedRoute';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';

import { routes } from './routes';

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login />} />

                    <Route
                        path='/*'
                        element={
                            <ProtectedRoute>
                                <div className='flex'>
                                    <Sidebar />
                                    <div className='ml-64 flex-1 p-4'>
                                        <Routes>
                                            {routes.map((route, index) => (
                                                <Route key={index} path={route.path} element={route.element} />
                                            ))}
                                        </Routes>
                                    </div>
                                </div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
