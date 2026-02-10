import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '@/api/reviews.api';
import type { ReviewFormCreate, ReviewFormUpdate } from '../types';
import { toast } from 'sonner';

const QUERY_KEYS = {
    forms: ['review-forms'] as const,
    form: (slug: string) => ['review-forms', slug] as const,
};

export const useReviewForms = (includeInactive = false) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.forms, includeInactive],
        queryFn: () => reviewsApi.listForms(includeInactive),
    });
};

export const useReviewForm = (slug: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.form(slug),
        queryFn: () => reviewsApi.getForm(slug),
        enabled: !!slug,
    });
};

export const useCreateReviewForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReviewFormCreate) => reviewsApi.createForm(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.forms });
            toast.success('Review form created successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to create review form';
            toast.error(message);
        },
    });
};

export const useUpdateReviewForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: ReviewFormUpdate }) =>
            reviewsApi.updateForm(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.forms });
            // We don't have slug here easily to invalidate single form, 
            // but invalidating all forms is fine for now.
            toast.success('Review form updated successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update review form';
            toast.error(message);
        },
    });
};

export const useDeleteReviewForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => reviewsApi.deleteForm(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.forms });
            toast.success('Review form archived successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to archive review form';
            toast.error(message);
        },
    });
};
