import apiClient from './client';
import { AUTH_ENDPOINTS } from './endpoints';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
        user_id: string;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        profile_image?: string;
    };
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    new_password: string;
}

export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
}

// Login
export const login = async (data: LoginRequest) => {
    const response = await apiClient.post<{ data: LoginResponse }>(
        AUTH_ENDPOINTS.LOGIN,
        data
    );
    return response.data.data;
};

// Refresh token
export const refreshToken = async (refreshToken: string) => {
    const response = await apiClient.post<{ data: { access_token: string } }>(
        AUTH_ENDPOINTS.REFRESH,
        { refresh_token: refreshToken }
    );
    return response.data.data;
};

// Logout
export const logout = async (refreshToken: string) => {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT, {
        refresh_token: refreshToken,
    });
    return response.data;
};

// Forgot password
export const forgotPassword = async (data: ForgotPasswordRequest) => {
    const response = await apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
    return response.data;
};

// Reset password
export const resetPassword = async (data: ResetPasswordRequest) => {
    const response = await apiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, data);
    return response.data;
};

// Change password
export const changePassword = async (data: ChangePasswordRequest) => {
    const response = await apiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data);
    return response.data;
};
