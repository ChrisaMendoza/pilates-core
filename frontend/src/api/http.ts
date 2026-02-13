import axios from 'axios';

export const TOKEN_KEY = 'pb_token';

export const http = axios.create({
    baseURL: '/api',
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        console.log('HTTP: Attaching token to request:', config.url);
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.log('HTTP: No token found for request:', config.url);
    }
    return config;
});
