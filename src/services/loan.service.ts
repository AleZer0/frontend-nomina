import axiosInstance from '.';
import { LoanInterface, ParamsInterface, PrestamoAbono } from '../types';

export class LoanServices {
    static getLoans = async (params: ParamsInterface) => {
        if (!params) {
            throw new Error('Debe de haber un parametro por lo menos.');
        }

        try {
            const response = await axiosInstance.get(`/prestamos`, { params });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data;
        } catch (error: any) {
            console.error('Error al obtener prestamos:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al obtener prestamos.');
        }
    };

    static createLoan = async (body: Omit<LoanInterface, 'id_prestamo'>) => {
        try {
            const response = await axiosInstance.post('/prestamos', body);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al crear el prestamo:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al crear el prestamo.');
        }
    };

    static updateLoan = async (id_prestamo: number, body: Omit<PrestamoAbono, 'id_prestamo'>) => {
        try {
            const response = await axiosInstance.put(`prestamos/${id_prestamo}`, body);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al abonar:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al abonar.');
        }
    };
    static services: any;
}

export default LoanServices;
