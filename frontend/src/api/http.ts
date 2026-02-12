import axios from 'axios';

export const TOKEN_KEY = 'pb_token';

export const http = axios.create({
    baseURL: '/api',
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
