import axios from 'axios';

const API_URL = 'https://app-nomina-141e425e046a.herokuapp.com/api'; // Cambia esto a tu backend

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // 🔹 Permite enviar cookies con las peticiones
});

// ✅ Interceptor de respuestas para manejar token expirado
axiosInstance.interceptors.response.use(
    response => response, // Si la respuesta es exitosa, la retorna sin cambios
    async error => {
        const originalRequest = error.config;

        // 🔹 Si el error es 401 (No autorizado), intentamos refrescar el token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 🆕 Llamamos al endpoint para refrescar el token
                await axios.get(`${API_URL}/usuario/refresh`, { withCredentials: true });

                // 🔁 Reintentamos la petición original
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Error al refrescar el token', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
