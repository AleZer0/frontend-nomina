import axiosInstance from '.';
import { ParamsInterface } from '../types';

export class WeeklyReports {
    static getReportsList = async (params: Omit<ParamsInterface, 'estado'>) => {
        if (!params) {
            throw new Error('Debe de haber un parametro por lo menos.');
        }

        try {
            const response = await axiosInstance.get(`/reporte_semanal`, { params });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error(
                'Error al obtener listado de todos los reportes semanales.',
                error.response?.data || error.message
            );
            throw new Error(
                error.response?.data?.message || 'Error al obtener listado de todos los reportes semanales.'
            );
        }
    };
}

export default WeeklyReports;
