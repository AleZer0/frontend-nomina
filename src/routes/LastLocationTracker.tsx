import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PUBLIC_ROUTES = ['/login'];

const LastLocationTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const isPublic = PUBLIC_ROUTES.includes(location.pathname);
        if (!isPublic) {
            localStorage.setItem('lastRoute', location.pathname);
        }
    }, [location]);

    return null;
};

export default LastLocationTracker;
