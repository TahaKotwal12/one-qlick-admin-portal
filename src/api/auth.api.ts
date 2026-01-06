import apiClient, { handleApiError } from './client';

// Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        user: {
            user_id: string;
            email: string;
            first_name: string;
            last_name: string;
            role: string;
            status: string;
            profile_image?: string;
            email_verified: boolean;
            phone_verified: boolean;
        };
        tokens: {
            access_token: string;
            refresh_token: string;
            token_type: string;
        };
    };
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface RefreshTokenResponse {
    success: boolean;
    code: number;
    data: {
        access_token: string;
        refresh_token: string;
        token_type: string;
    };
}

export interface LogoutRequest {
    refresh_token?: string;
    logout_all_devices?: boolean;
}

export interface LogoutResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        message: string;
        logged_out_devices: number;
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
    current_password: string;
    new_password: string;
}

// Auth API Functions
export const authAPI = {
    /**
     * Login with email and password
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

            // Verify user is admin
            if (response.data.data.user.role !== 'admin') {
                throw new Error('Access denied. Admin privileges required.');
            }

            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Refresh access token
     */
    refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
        try {
            const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', {
                refresh_token: refreshToken,
            });
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Logout - Revokes refresh tokens and deactivates sessions
     */
    logout: async (logoutAllDevices: boolean = false): Promise<void> => {
        try {
            // Get refresh token from localStorage
            const refreshToken = localStorage.getItem('refresh_token');

            // Call backend logout endpoint
            await apiClient.post<LogoutResponse>('/auth/logout', {
                refresh_token: refreshToken || undefined,
                logout_all_devices: logoutAllDevices,
            });
        } catch (error) {
            // Log error but don't throw - we still want to clear local storage
            console.error('Logout API error:', error);
        } finally {
            // Always clear local storage regardless of API success
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            localStorage.removeItem('auth-storage'); // Zustand persist key
        }
    },

    /**
     * Request password reset
     */
    forgotPassword: async (email: string): Promise<void> => {
        try {
            await apiClient.post('/auth/forgot-password', { email });
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Reset password with token
     */
    resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
        try {
            await apiClient.post('/auth/reset-password', data);
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Change password (authenticated)
     */
    changePassword: async (data: ChangePasswordRequest): Promise<void> => {
        try {
            await apiClient.post('/auth/change-password', data);
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};
