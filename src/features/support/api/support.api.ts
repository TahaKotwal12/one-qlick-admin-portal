import apiClient from '@/api/client';
import type {
    SupportTicket,
    TicketListResponse,
    SupportTicketDetail,
    SupportMessage,
    SupportStats,
    TicketStatus
} from '../types';

export const supportApi = {
    getTickets: async (page = 1, pageSize = 20, status?: TicketStatus) => {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });
        if (status) params.append('status', status);

        const response = await apiClient.get(`/support/admin/tickets?${params.toString()}`);
        return response.data.data as TicketListResponse;
    },

    getTicketDetails: async (ticketId: string) => {
        const response = await apiClient.get(`/support/tickets/${ticketId}`);
        return response.data.data as SupportTicketDetail;
    },

    sendMessage: async (ticketId: string, content: string, attachmentUrl?: string) => {
        const response = await apiClient.post(`/support/tickets/${ticketId}/messages`, {
            content,
            attachment_url: attachmentUrl
        });
        return response.data.data as SupportMessage;
    },

    resolveTicket: async (ticketId: string) => {
        const response = await apiClient.patch(`/support/admin/tickets/${ticketId}/resolve`);
        return response.data;
    },

    getStats: async () => {
        const response = await apiClient.get('/support/admin/stats');
        return response.data.data as SupportStats;
    }
};
