import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('jwt');
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    function (error) {
        // Return the error directly
        return Promise.reject(error);
    }
);

export default instance;