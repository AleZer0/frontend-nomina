import axios from 'axios';

const API_BASE_URL = 'https://app-nomina-141e425e046a.herokuapp.com/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default axiosInstance;
