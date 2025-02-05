import axios from "axios";

const getEmployees = async (id: number) => {
    const response = await axios.get(`https://app-nomina-141e425e046a.herokuapp.com/api/empleado/estado/${id}`);
    return response.data;
}

const getEmployeeDetails = async (id: number) => {
    const response = await axios.get(`https://app-nomina-141e425e046a.herokuapp.com/api/empleado/${id}`);
    return response.data;
}

const createEmployee = async (data: any) => {
    const response = await axios.post('https://app-nomina-141e425e046a.herokuapp.com/api/empleado', data);
    return response.data;
}

const updateEmployee = async (id: number, data: any) => {
    const response = await axios.put(`https://app-nomina-141e425e046a.herokuapp.com/api/empleado/${id}`, data);
    return response.data;
}

const deleteEmployee = async (id: number) => {
    const response = await axios.put(`https://app-nomina-141e425e046a.herokuapp.com/api/empleado/estado/${id}`,
        { estado: 0 }
    );
    return response.data;
}

export { getEmployeeDetails, getEmployees, createEmployee , updateEmployee, deleteEmployee };
