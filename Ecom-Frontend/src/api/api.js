

import axios from 'axios';

console.log("MY BACKEND URL IS:", import.meta.env.VITE_BACK_END_URL);

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
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
