

import axios from 'axios';

const rawBackendUrl = import.meta.env.VITE_BACK_END_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const cleanBackendUrl = rawBackendUrl.replace(/\/+$/, '');
const baseURL = cleanBackendUrl.endsWith('/api') ? cleanBackendUrl : `${cleanBackendUrl}/api`;

console.log("MY BACKEND URL IS:", baseURL);

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

const safeGetLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

api.interceptors.request.use(
    (config) => {
        const auth = safeGetLocalStorage("auth");
        if (auth) {
            try {
                const parsedAuth = JSON.parse(auth);
                if (parsedAuth.jwtToken) {
                    config.headers.Authorization = `Bearer ${parsedAuth.jwtToken}`;
                }
            } catch {
                // ignore parse errors
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
