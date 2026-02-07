import apiClient from '@/api/client';
import type {
    Notification,
    NotificationListResponse,
    UnreadCountResponse,
    CreateNotificationRequest,
    BroadcastNotificationRequest,
    NotificationStats,
    NotificationType,
} from '../types';

const NOTIFICATIONS_BASE = '/notifications';

// ============================================
// User Notification APIs
// ============================================

export const getNotifications = async (params: {
    page?: number;
    page_size?: number;
    unread_only?: boolean;
    notification_type?: NotificationType;
}): Promise<NotificationListResponse> => {
    const response = await apiClient.get(NOTIFICATIONS_BASE, { params });
    return response.data.data;
};

export const getUnreadCount = async (): Promise<number> => {
    const response = await apiClient.get<{ data: UnreadCountResponse }>(`${NOTIFICATIONS_BASE}/unread-count`);
    return response.data.data.unread_count;
};

export const markAsRead = async (notificationId: string): Promise<Notification> => {
    const response = await apiClient.patch(`${NOTIFICATIONS_BASE}/${notificationId}/read`);
    return response.data.data;
};

export const markAllAsRead = async (): Promise<{ count: number }> => {
    const response = await apiClient.patch(`${NOTIFICATIONS_BASE}/read-all`);
    return response.data.data;
};

export const deleteNotification = async (notificationId: string): Promise<void> => {
    await apiClient.delete(`${NOTIFICATIONS_BASE}/${notificationId}`);
};

// ============================================
// Admin Notification APIs
// ============================================

export const createNotification = async (data: CreateNotificationRequest): Promise<Notification> => {
    const response = await apiClient.post(`${NOTIFICATIONS_BASE}/admin/send`, data);
    return response.data.data;
};

export const broadcastNotification = async (data: BroadcastNotificationRequest): Promise<{
    message: string;
    notifications_sent: number;
    user_ids: string[];
}> => {
    const response = await apiClient.post(`${NOTIFICATIONS_BASE}/admin/broadcast`, data);
    return response.data.data;
};

export const getNotificationStats = async (): Promise<NotificationStats> => {
    const response = await apiClient.get(`${NOTIFICATIONS_BASE}/admin/stats`);
    return response.data.data;
};
