import axiosInstance from '.';
import { EmpleadoType } from '../types';

export class Empleado {
    static getEmployees = async (id: number) => {
        const response = await axiosInstance.get(`/empleado/estado/${id}`);
        return response.data;
    };

    static getEmployeeDetails = async (id: number) => {
        const response = await axiosInstance.get(`/empleado/${id}`);
        return response.data;
    };

    static createEmployee = async (data: EmpleadoType) => {
        const response = await axiosInstance.post('/empleado', data);
        return response.data;
    };

    static updateEmployee = async (id: number, data: Empleado) => {
        const response = await axiosInstance.put(`/empleado/${id}`, data);
        return response.data;
    };

    static deleteEmployee = async (id: number) => {
        const response = await axiosInstance.put(`/empleado/estado/${id}`, { estado: 0 });
        return response.data;
    };
}

export default Empleado;
