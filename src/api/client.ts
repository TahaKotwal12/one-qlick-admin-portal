import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './endpoints';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage
        const token = localStorage.getItem('access_token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get refresh token
                const refreshToken = localStorage.getItem('refresh_token');

                if (!refreshToken) {
                    // No refresh token, redirect to login
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // Try to refresh the token
                const response = await axios.post(`${API_BASE_URL}/auth/admin/refresh`, {
                    refresh_token: refreshToken,
                });

                const { access_token } = response.data.data;

                // Save new access token
                localStorage.setItem('access_token', access_token);

                // Retry original request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                }

                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear storage and redirect to login
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;

// Helper function to handle API errors
export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string; detail?: string }>;

        if (axiosError.response?.data?.message) {
            return axiosError.response.data.message;
        }

        if (axiosError.response?.data?.detail) {
            return axiosError.response.data.detail;
        }

        if (axiosError.message) {
            return axiosError.message;
        }
    }

    return 'An unexpected error occurred';
};
