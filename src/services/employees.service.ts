import axiosInstance from '.';
import { EmployeeInterface, EmployeeParamsInterface } from '../types';

class EmployeeServices {
    // ✅ Obtener utodos los empleados por estado
    static getEmployees = async (params: EmployeeParamsInterface) => {
        if (!params) {
            throw new Error('Debe de haber un parametro por lo menos.');
        }

        try {
            const response = await axiosInstance.get(`/empleado`, { params });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }

            return response.data.data;
        } catch (error: any) {
            console.error('Error al obtener empleados:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al obtener empleados.');
        }
    };

    // ✅ Obtener un empleado por ID
    static getEmployee = async (id: number) => {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.get(`/empleado/one?id_empleado=${id}`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al obtener un empleado:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al obtener un empleado.');
        }
    };

    // ✅ Crear un nuevo empleado
    static createEmployee = async (data: Omit<EmployeeInterface, 'id_empleado'>) => {
        try {
            const response = await axiosInstance.post('/empleado', data);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al crear un empleado:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al crear un empleado.');
        }
    };

    // ✅ Actualizar un empleado por ID
    static updateEmployee = async (id: number, data: Partial<EmployeeInterface>) => {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put(`/empleado/${id}`, data);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al actualizar un empleado:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al actualizar un empleado.');
        }
    };

    // ✅ Eliminar (desactivar) un empleado por ID
    static deleteEmployee = async (id: number) => {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put(`/empleado/estado/${id}`, { estado: 0 });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al eliminar un empleado:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al eliminar un empleado.');
        }
    };
}

export default EmployeeServices;
