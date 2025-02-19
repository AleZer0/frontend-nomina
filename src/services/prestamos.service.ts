import axiosInstance from '.';

export class Prestamos {
    static getLoans = async (estado: number) => {
        const response = await axiosInstance.get(`/prestamos/estado/${estado}`);
        return response.data;
    };

    static createLoan = async (data: { id_empleado: number; monto_total: number; saldo_pendiente: number }) => {
        const response = await axiosInstance.post('/prestamos', data);
        return response.data;
    };

    static payLoan = async (id_prestamo: number, data: { monto_abonado: number }) => {
        const response = await axiosInstance.put(`prestamos/${id_prestamo}`, data);
        return response.data;
    };
}
