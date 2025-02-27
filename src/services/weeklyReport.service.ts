import axiosInstance from '.';
import { ParamsInterface } from '../types';

export class ReportesSemanales {
    static getReportsList = async (params: ParamsInterface) => {
        try {
            const response = await axiosInstance.get(`/reportes_semanales`, { params });
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener listado de todos los reportes semanales.');
        }
    };
}
