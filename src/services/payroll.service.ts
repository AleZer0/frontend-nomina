import axiosInstance from '.';
import { PayrollType } from '../types';

const getPayrolls = async (id: number) => {
    const response = await axiosInstance.get(`/nomina/estado/${id}`);
    return response.data;
};

const getPayroll = (id: number) => {
    return axiosInstance.get(`/nomina/${id}`);
};

const createPayroll = async (data: Omit<PayrollType, 'folio'>) => {
    try {
        const response = await axiosInstance.post('/nomina', data);
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error('Error en createPayroll:', error);
        throw error;
    }
};

const updatePayroll = (id: number, data: Omit<PayrollType, 'folio'>) => {
    return axiosInstance.put(`/nomina/${id}`, data);
};

const deletePayroll = (id: number) => {
    return axiosInstance.put(`/nomina/estado/${id}`, { estado: 0 });
};

export { getPayrolls, getPayroll, createPayroll, updatePayroll, deletePayroll };
