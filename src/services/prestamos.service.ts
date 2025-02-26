import axiosInstance from '.';
import { LoanInterface } from '../types';

export class Prestamos {
    static getLoans = async (estado: number) => {
        try {
            const response = await axiosInstance.get(`/prestamos/estado/${estado}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los prestamos.');
        }
    };

    static createLoan = async (data: Omit<LoanInterface, 'id_prestamo'>) => {
        try {
            const response = await axiosInstance.post('/prestamos', data);
            return response.data;
        } catch (error) {
            throw new Error('Error al crear prestamo.');
        }
    };

    static payLoan = async (id_prestamo: number, data: { monto_abonado: number }) => {
        try {
            const response = await axiosInstance.put(`prestamos/${id_prestamo}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Error al aobonar.');
        }
    };
}
