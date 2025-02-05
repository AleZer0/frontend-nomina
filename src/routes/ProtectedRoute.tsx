import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteTypes {
    children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteTypes> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to='/login' replace />;

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
