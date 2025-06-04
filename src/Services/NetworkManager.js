import axios from 'axios';
import { message } from 'antd';
import { useAuth } from '../Provider/authProvider';
import config from "../config.js";

// Set up axios instance
const api = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 5000, // Timeout after 5 seconds
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authData') ? JSON.parse(localStorage.getItem('authData')).token : null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add token to every request if available
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        // Show message if status is 200 and response contains a message
        if (response.data.statusCode === 200 && response.data?.data?.message) {
            message.success(response.data.data.message);
        }
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response && error.data.statusCode === 401) {
            message.error('Session expired. Please log in again.');
            localStorage.removeItem('authData');
            window.location.href = '/'; // Redirect to login
        } else if (error.response?.data?.data?.message) {
            // Show specific error message if available
            message.error(error.response.data.data?.message);
        } else {
            // Generic error
            message.error('An error occurred. Please try again.');
        }
        return Promise.reject(error);
    }
);

// API function to handle login
export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        return response.data; // Return response data (e.g., token, user)
    } catch (error) {

        throw error; // Throw error to be caught in the component
    }
};

// API function to fetch user data
export const fetchUserData = async () => {
    try {
        const response = await api.get('/user');
        return response.data; // Return user data
    } catch (error) {
        throw error;
    }
};

// Export the axios instance for direct usage if needed
export default api;
