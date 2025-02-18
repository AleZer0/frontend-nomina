import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './styles/index.css';
import { AppStatusProvider } from './context/AppStatusContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppStatusProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </AppStatusProvider>
        </BrowserRouter>
    </React.StrictMode>
);
