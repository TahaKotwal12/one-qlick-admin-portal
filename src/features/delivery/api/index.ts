import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/api/client';
import { DELIVERY_ENDPOINTS } from '@/api/endpoints';

// 1. Types
export interface DeliveryPartner {
    delivery_partner_id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_image: string | null;
    vehicle_type: string;
    vehicle_number: string;
    license_number: string;
    availability_status: string;
    status: string;
    total_deliveries: number;
    rating: number | null;
    address: string | null;
    created_at: string;
}

export interface DeliveryPartnersListResponse {
    delivery_partners: DeliveryPartner[];
    total_count: number;
}

export interface DeliveryPartnerUpdateRequest {
    first_name?: string;
    last_name?: string;
    phone?: string;
    vehicle_type?: string;
    vehicle_number?: string;
    license_number?: string;
    availability_status?: string;
}

export interface CommonResponse<T> {
    code: number;
    message: string;
    message_id: string;
    data: T;
}

// 2. Axios Fetch Functions
export const getDeliveryPartners = async (params: { search?: string; availability?: string; skip?: number; limit?: number }) => {
    const response = await apiClient.get<CommonResponse<DeliveryPartnersListResponse>>(DELIVERY_ENDPOINTS.LIST, { params });
    return response.data.data;
};

export const getDeliveryPartnerById = async (id: string) => {
    const response = await apiClient.get<CommonResponse<DeliveryPartner>>(DELIVERY_ENDPOINTS.DETAIL(id));
    return response.data.data;
};

export const updateDeliveryPartner = async (id: string, data: DeliveryPartnerUpdateRequest) => {
    const response = await apiClient.put<CommonResponse<DeliveryPartner>>(DELIVERY_ENDPOINTS.UPDATE(id), data);
    return response.data.data;
};

// 3. React Query Hooks
export const useDeliveryPartners = (params: { search?: string; availability?: string; skip?: number; limit?: number }) => {
    return useQuery({
        queryKey: ['delivery-partners', params],
        queryFn: () => getDeliveryPartners(params),
    });
};

export const useDeliveryPartner = (id: string) => {
    return useQuery({
        queryKey: ['delivery-partner', id],
        queryFn: () => getDeliveryPartnerById(id),
        enabled: !!id,
    });
};

export const useUpdateDeliveryPartner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: DeliveryPartnerUpdateRequest }) => updateDeliveryPartner(id, data),
        onSuccess: (_, variables) => {
            // This forces the UI to instantly refresh with the new backend data!
            queryClient.invalidateQueries({ queryKey: ['delivery-partner', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['delivery-partners'] });
        },
    });
};
