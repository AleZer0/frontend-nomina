import axiosInstance from '.';
import { PayrollInterface } from '../types';

class PayrollServices {
    // ✅ Obtener todas las nóminas por estado
    static getPayrolls = async (estado: number) => {
        if (typeof estado !== 'number' || isNaN(estado)) {
            throw new Error('El estado debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.get(`/nomina/estado/${estado}`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al obtener nóminas:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al obtener nóminas.');
        }
    };

    // ✅ Obtener una nómina específica por ID
    static getPayroll = async (id: number) => {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.get(`/nomina/${id}`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al obtener la nómina:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al obtener la nómina.');
        }
    };

    // ✅ Crear una nueva nómina
    static createPayroll = async (data: Omit<PayrollInterface, 'folio'>) => {
        try {
            const response = await axiosInstance.post('/nomina', data);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al crear la nómina:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al crear una nómina.');
        }
    };

    // ✅ Actualizar una nómina por ID
    static updatePayroll = async (id: number, data: Partial<PayrollInterface>) => {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put(`/nomina/${id}`, data);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al actualizar la nómina:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al actualizar la nómina.');
        }
    };

    // ✅ Eliminar (desactivar) una nómina por ID
    static deletePayroll = async (id: number) => {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put(`/nomina/estado/${id}`, { estado: 0 });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al eliminar la nómina:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al eliminar la nómina.');
        }
    };
}

export default PayrollServices;
