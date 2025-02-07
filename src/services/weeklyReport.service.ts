import axiosInstance from '.';

export class ReportesSemanales {
    static getReportsList = async () => {
        try {
            const response = await axiosInstance.get('/reportes_semanales/2025');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener listado de todos los reportes semanales.');
        }
    };
}
