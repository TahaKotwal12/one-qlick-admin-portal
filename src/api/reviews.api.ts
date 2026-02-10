import apiClient from './client';
import { REVIEW_ENDPOINTS } from './endpoints';
import type {
    ReviewForm,
    ReviewFormCreate,
    ReviewFormUpdate,
    ReviewResponse,
    ApiResponse
} from '@/features/reviews/types';

export const reviewsApi = {
    // Form Management
    listForms: async (includeInactive = false) => {
        const response = await apiClient.get<ApiResponse<ReviewForm[]>>(
            `${REVIEW_ENDPOINTS.FORMS_LIST}?include_inactive=${includeInactive}`
        );
        return response.data;
    },

    getForm: async (slug: string) => {
        const response = await apiClient.get<ApiResponse<ReviewForm>>(
            REVIEW_ENDPOINTS.FORM_DETAIL(slug)
        );
        return response.data;
    },

    createForm: async (data: ReviewFormCreate) => {
        const response = await apiClient.post<ApiResponse<ReviewForm>>(
            REVIEW_ENDPOINTS.FORM_CREATE,
            data
        );
        return response.data;
    },

    updateForm: async (id: string, data: ReviewFormUpdate) => {
        const response = await apiClient.put<ApiResponse<ReviewForm>>(
            REVIEW_ENDPOINTS.FORM_UPDATE(id),
            data
        );
        return response.data;
    },

    deleteForm: async (id: string) => {
        const response = await apiClient.delete<ApiResponse<any>>(
            REVIEW_ENDPOINTS.FORM_DELETE(id)
        );
        return response.data;
    },

    // Response Retrieval
    getResponses: async (formId?: string) => {
        const response = await apiClient.get<ApiResponse<ReviewResponse[]>>(
            REVIEW_ENDPOINTS.RESPONSES(formId)
        );
        return response.data;
    }
};
