import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponApi } from '../api/coupon.api';
import type { CreateCouponRequest, UpdateCouponRequest } from '../types';
import { toast } from 'sonner';

const QUERY_KEYS = {
    coupons: ['coupons'] as const,
    coupon: (id: string) => ['coupons', id] as const,
    usage: (id: string) => ['coupons', id, 'usage'] as const,
    analytics: ['coupons', 'analytics'] as const,
};

// List coupons
export const useCoupons = (params?: {
    page?: number;
    limit?: number;
    is_active?: boolean;
    show_in_carousel?: boolean;
}) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.coupons, params],
        queryFn: () => couponApi.list(params),
    });
};

// Get single coupon
export const useCoupon = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.coupon(id),
        queryFn: () => couponApi.get(id),
        enabled: !!id,
    });
};

// Create coupon
export const useCreateCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCouponRequest) => couponApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.coupons });
            toast.success('Coupon created successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create coupon');
        },
    });
};

// Update coupon
export const useUpdateCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCouponRequest }) =>
            couponApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.coupons });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.coupon(variables.id) });
            toast.success('Coupon updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update coupon');
        },
    });
};

// Delete coupon
export const useDeleteCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => couponApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.coupons });
            toast.success('Coupon deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete coupon');
        },
    });
};

// Toggle carousel
export const useToggleCarousel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, show }: { id: string; show: boolean }) =>
            couponApi.toggleCarousel(id, show),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.coupons });
            toast.success('Carousel visibility updated');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update carousel');
        },
    });
};

// Update priority
export const useUpdatePriority = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, priority }: { id: string; priority: number }) =>
            couponApi.updatePriority(id, priority),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.coupons });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update priority');
        },
    });
};

// Get usage
export const useCouponUsage = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.usage(id),
        queryFn: () => couponApi.getUsage(id),
        enabled: !!id,
    });
};

// Get analytics
export const useCouponAnalytics = () => {
    return useQuery({
        queryKey: QUERY_KEYS.analytics,
        queryFn: () => couponApi.getAnalytics(),
    });
};
