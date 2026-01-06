import apiClient, { handleApiError } from '@/api/client';
import { USER_ENDPOINTS } from '@/api/endpoints';
import type { User, UsersListParams, UsersListResponse, Address } from '../types';

/**
 * User API Service
 * Handles all user-related API calls
 */
export const userService = {
    /**
     * Get all users (admin only)
     */
    async getUsers(params?: UsersListParams): Promise<UsersListResponse> {
        try {
            const queryParams = new URLSearchParams();

            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
            if (params?.search) queryParams.append('search', params.search);
            if (params?.role) queryParams.append('role', params.role);
            if (params?.status) queryParams.append('status', params.status);
            if (params?.email_verified !== undefined) {
                queryParams.append('email_verified', params.email_verified.toString());
            }
            if (params?.phone_verified !== undefined) {
                queryParams.append('phone_verified', params.phone_verified.toString());
            }

            const url = `${USER_ENDPOINTS.LIST}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            const response = await apiClient.get(url);

            return response.data.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Get user by ID (admin only)
     */
    async getUserById(userId: string): Promise<User> {
        try {
            const response = await apiClient.get(USER_ENDPOINTS.DETAIL(userId));
            return response.data.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Get user addresses
     */
    async getUserAddresses(userId: string): Promise<Address[]> {
        try {
            const response = await apiClient.get(USER_ENDPOINTS.ADDRESSES(userId));
            return response.data.data;
        } catch (error) {
            // Return empty array if fails (optional, or throw)
            console.warn('Failed to fetch addresses', error);
            return [];
        }
    },

    /**
     * Update user status (admin only)
     */
    async updateUserStatus(userId: string, status: string): Promise<User> {
        try {
            const response = await apiClient.put(USER_ENDPOINTS.UPDATE_STATUS(userId), { status });
            return response.data.data.user;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Update user role (admin only)
     */
    async updateUserRole(userId: string, role: string): Promise<User> {
        try {
            const response = await apiClient.put(USER_ENDPOINTS.UPDATE_ROLE(userId), { role });
            return response.data.data.user;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Export users to CSV (admin only)
     */
    async exportUsers(params?: UsersListParams): Promise<Blob> {
        try {
            const queryParams = new URLSearchParams();

            if (params?.search) queryParams.append('search', params.search);
            if (params?.role) queryParams.append('role', params.role);
            if (params?.status) queryParams.append('status', params.status);

            const url = `${USER_ENDPOINTS.EXPORT}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            const response = await apiClient.get(url, { responseType: 'blob' });

            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};
