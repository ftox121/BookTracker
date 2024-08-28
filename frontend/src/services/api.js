import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const register = (userData) => axiosInstance.post('user/register/', userData);
export const login = (credentials) => axiosInstance.post('token/', credentials);
export const refreshToken = (refreshToken) => axiosInstance.post('token/refresh/', { refresh: refreshToken });
