// import axios from 'axios';

// console.log("MY BACKEND URL IS:", import.meta.env.VITE_BACK_END_URL);

// const api = axios.create({
   
//     baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    
    
//     withCredentials: true,
    
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// export default api;


import axios from 'axios';

console.log("MY BACKEND URL IS:", import.meta.env.VITE_BACK_END_URL);

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// FIX: This interceptor explicitly attaches your JWT token to every request.
// This guarantees the backend always sees the exact same user that React sees!
api.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const parsedAuth = JSON.parse(auth);
            if (parsedAuth.jwtToken) {
                config.headers.Authorization = `Bearer ${parsedAuth.jwtToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;