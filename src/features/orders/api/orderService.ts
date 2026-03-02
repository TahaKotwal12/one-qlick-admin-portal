import apiClient, { handleApiError } from '@/api/client';
import { ORDER_ENDPOINTS } from '@/api/endpoints';
import type { OrdersListResponse, OrdersFilters } from '../types';

export const orderService = {
    async getOrders(params: OrdersFilters & { page: number }) {
        try {
            const query = new URLSearchParams();
            if (params.page) query.append('page', params.page.toString());
            if (params.location) query.append('location', params.location);
            if (params.min_price) query.append('min_price', params.min_price);
            if (params.max_price) query.append('max_price', params.max_price);
            if (params.status_filter !== 'all') query.append('status_filter', params.status_filter);

            const response = await apiClient.get(`${ORDER_ENDPOINTS.LIST}?${query.toString()}`);
            return response.data.data as OrdersListResponse;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }
};
