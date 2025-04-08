import axiosInstance from '.';
import { ParamsInterface, PayrollInterface } from '../types/entities';

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
            return response.data;
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

    static updatePayroll = async (
        folio: number,
        updatedPayroll: Partial<PayrollInterface>
    ): Promise<PayrollInterface> => {
        if (!Number.isInteger(folio) || folio <= 0) {
            throw new Error('El folio de la nómina debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put<{ success: boolean; data: PayrollInterface }>(
                `/nomina/${folio}`,
                updatedPayroll
            );

            return response.data.data;
        } catch (error: any) {
            console.error('Error al actualizar una nómina:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al actualizar una nómina.');
        }
    };

    static changeStatusPayroll = async (folio: number, estado: 0 | 1) => {
        if (!Number.isInteger(folio) || folio <= 0) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put(`/nomina/estado/${folio}`, { estado });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al eliminar una nómina:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al eliminar una nómina.');
        }
    };
}

export default PayrollServices;
