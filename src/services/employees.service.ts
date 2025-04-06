import axiosInstance from '.';
import { EmployeeInterface, ParamsInterface } from '../types/entities';

class EmployeeServices {
    static getEmployees = async (params: ParamsInterface) => {
        if (!params) {
            throw new Error('Debe de haber un parametro por lo menos.');
        }

        try {
            const response = await axiosInstance.get(`/empleado`, { params });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data;
        } catch (error: any) {
            console.error('Error al obtener empleados:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al obtener empleados.');
        }
    };

    static createEmployee = async (newEmployee: Omit<EmployeeInterface, 'id_empleado'>) => {
        try {
            const response = await axiosInstance.post('/empleado', newEmployee);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al crear un empleado:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al crear un empleado.');
        }
    };

    static updateEmployee = async (id_empleado: number, updatedEmployee: Partial<EmployeeInterface>) => {
        if (!Number.isInteger(id_empleado) || id_empleado <= 0) {
            throw new Error('El ID de empleado debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put(`/empleado/${id_empleado}`, updatedEmployee);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Error desconocido.');
            }
            return response.data.data;
        } catch (error: any) {
            console.error('Error al actualizar un empleado:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error al actualizar un empleado.');
        }
    };

    static changeStatusEmployee = async (id_empleado: number, estado: 0 | 1) => {
        if (!Number.isInteger(id_empleado) || id_empleado <= 0) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const response = await axiosInstance.put(`/empleado/estado/${id_empleado}`, { estado });
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
