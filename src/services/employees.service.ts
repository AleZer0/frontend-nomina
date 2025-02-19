import axiosInstance from '.';
import { Employee } from '../pages/Employees';

export class Empleado {
    static getEmployees = async (estado: number) => {
        const response = await axiosInstance.get(`/empleado/estado/${estado}`);
        return response.data;
    };

    static getEmployeeDetails = async (id: number) => {
        const response = await axiosInstance.get(`/empleado/${id}`);
        return response.data;
    };

    static createEmployee = async (data: Employee) => {
        const response = await axiosInstance.post('/empleado', data);
        return response.data;
    };

    static updateEmployee = async (id: number, data: Employee) => {
        const response = await axiosInstance.put(`/empleado/${id}`, data);
        return response.data;
    };

    static deleteEmployee = async (id: number) => {
        const response = await axiosInstance.put(`/empleado/estado/${id}`, { estado: 0 });
        return response.data;
    };
}

export default Empleado;
