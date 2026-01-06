import { useState, useEffect, useCallback } from 'react';
import { userService } from '../api/userService';
import type { User, UsersListParams, UsersFilters } from '../types';

/**
 * Custom hook for managing users
 */
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [isExporting, setIsExporting] = useState(false);

    // Filters
    const [filters, setFilters] = useState<UsersFilters>({
        search: '',
        role: 'all',
        status: 'all',
    });

    /**
     * Fetch users from API
     */
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params: UsersListParams = {
                page,
                page_size: pageSize,
                ...(filters.search && { search: filters.search }),
                ...(filters.role !== 'all' && { role: filters.role }),
                ...(filters.status !== 'all' && { status: filters.status }),
            };

            const response = await userService.getUsers(params);
            setUsers(response.users);
            setTotalCount(response.total_count);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, filters]);

    /**
     * Update user status
     */
    const updateUserStatus = async (userId: string, status: string) => {
        try {
            await userService.updateUserStatus(userId, status);
            await fetchUsers(); // Refresh list
        } catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Failed to update status');
        }
    };

    /**
     * Update user role
     */
    const updateUserRole = async (userId: string, role: string) => {
        try {
            await userService.updateUserRole(userId, role);
            await fetchUsers(); // Refresh list
        } catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Failed to update role');
        }
    };

    /**
     * Update filters
     */
    const updateFilters = (newFilters: Partial<UsersFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1); // Reset to first page when filters change
    };

    /**
     * Search users
     */
    const searchUsers = (query: string) => {
        updateFilters({ search: query });
    };

    /**
     * Export users to CSV
     */
    const exportUsers = async () => {
        setIsExporting(true);
        try {
            const params: UsersListParams = {
                ...(filters.search && { search: filters.search }),
                ...(filters.role !== 'all' && { role: filters.role }),
                ...(filters.status !== 'all' && { status: filters.status }),
            };

            const blob = await userService.exportUsers(params);

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Failed to export users');
        } finally {
            setIsExporting(false);
        }
    };

    // Fetch users when dependencies change
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        // Data
        users,
        loading,
        error,
        totalCount,
        page,
        pageSize,
        filters,
        isExporting,

        // Actions
        setPage,
        updateFilters,
        searchUsers,
        updateUserStatus,
        updateUserRole,
        fetchUsers,
        exportUsers,
    };
};
