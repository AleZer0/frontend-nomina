import axiosInstance from '.';
import { Empleado } from '../types';

const getEmployees = async (id: number) => {
    const response = await axiosInstance.get(`/empleado/estado/${id}`);
    return response.data;
};

const getEmployeeDetails = async (id: number) => {
    const response = await axiosInstance.get(`/empleado/${id}`);
    return response.data;
};

const createEmployee = async (data: Empleado) => {
    const response = await axiosInstance.post('/empleado', data);
    return response.data;
};

const updateEmployee = async (id: number, data: Empleado) => {
    const response = await axiosInstance.put(`/empleado/${id}`, data);
    return response.data;
};

const deleteEmployee = async (id: number) => {
    const response = await axiosInstance.put(`/empleado/estado/${id}`, { estado: 0 });
    return response.data;
};

export { getEmployeeDetails, getEmployees, createEmployee, updateEmployee, deleteEmployee };
