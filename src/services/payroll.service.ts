import axiosInstance from '.';
import { ParamsInterface, PayrollInterface } from '../types';

class PayrollServices {
    static getPayrolls = async (params: ParamsInterface) => {
        if (!params) {
            throw new Error('Debe de haber un parametro por lo menos.');
        }

        try {
            const response = await axiosInstance.get(`/nomina`, { params });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al obtener nóminas:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al obtener nóminas.');
        }
    };

    static createPayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        try {
            const response = await axiosInstance.post('/nomina', newPayroll);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al crear la nómina:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al crear una nómina.');
        }
    };
}

export default PayrollServices;
