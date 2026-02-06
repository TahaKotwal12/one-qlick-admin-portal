import api from '@/api/client';
import { COUPON_ENDPOINTS } from '@/api/endpoints';
import type {
    Coupon,
    CouponListResponse,
    CreateCouponRequest,
    UpdateCouponRequest,
    CouponUsage,
    CouponAnalytics,
} from '../types';

export const couponApi = {
    // List all coupons
    list: async (params?: {
        page?: number;
        limit?: number;
        is_active?: boolean;
        show_in_carousel?: boolean;
    }): Promise<CouponListResponse> => {
        const response = await api.get(COUPON_ENDPOINTS.LIST, { params });
        // Backend returns the full response object directly
        return response.data;
    },

    // Get single coupon
    get: async (id: string): Promise<Coupon> => {
        const response = await api.get(COUPON_ENDPOINTS.DETAIL(id));
        return response.data.data;
    },

    // Create coupon
    create: async (data: CreateCouponRequest): Promise<Coupon> => {
        const response = await api.post(COUPON_ENDPOINTS.CREATE, data);
        return response.data.data;
    },

    // Update coupon
    update: async (id: string, data: UpdateCouponRequest): Promise<Coupon> => {
        const response = await api.put(COUPON_ENDPOINTS.UPDATE(id), data);
        return response.data.data;
    },

    // Delete coupon
    delete: async (id: string): Promise<void> => {
        await api.delete(COUPON_ENDPOINTS.DELETE(id));
    },

    // Get coupon usage
    getUsage: async (id: string): Promise<CouponUsage[]> => {
        const response = await api.get(COUPON_ENDPOINTS.USAGE(id));
        return response.data.data;
    },

    // Get analytics
    getAnalytics: async (): Promise<CouponAnalytics> => {
        const response = await api.get(COUPON_ENDPOINTS.ANALYTICS);
        return response.data.data;
    },

    // Toggle carousel visibility
    toggleCarousel: async (id: string, show: boolean): Promise<Coupon> => {
        const response = await api.put(COUPON_ENDPOINTS.UPDATE(id), {
            show_in_carousel: show,
        });
        return response.data.data;
    },

    // Update carousel priority
    updatePriority: async (id: string, priority: number): Promise<Coupon> => {
        const response = await api.put(COUPON_ENDPOINTS.UPDATE(id), {
            carousel_priority: priority,
        });
        return response.data.data;
    },
};
