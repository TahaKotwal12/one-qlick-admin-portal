import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification, NotificationType } from '@/features/notifications/types';
import * as notificationApi from '@/features/notifications/api/notification.api';

interface NotificationState {
    // State
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    hasMore: boolean;
    currentPage: number;
    totalPages: number;

    // Actions
    fetchNotifications: (params?: {
        page?: number;
        unread_only?: boolean;
        notification_type?: NotificationType;
    }) => Promise<void>;
    fetchUnreadCount: () => Promise<void>;
    markAsRead: (notificationId: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (notificationId: string) => Promise<void>;
    addNotification: (notification: Notification) => void; // For WebSocket
    reset: () => void;
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set, get) => ({
            // Initial state
            notifications: [],
            unreadCount: 0,
            isLoading: false,
            hasMore: true,
            currentPage: 1,
            totalPages: 1,

            // Fetch notifications with pagination
            fetchNotifications: async (params = {}) => {
                set({ isLoading: true });
                try {
                    const response = await notificationApi.getNotifications({
                        page: params.page || 1,
                        page_size: 20,
                        unread_only: params.unread_only,
                        notification_type: params.notification_type,
                    });

                    set({
                        notifications: response.notifications,
                        unreadCount: response.unread_count,
                        currentPage: response.page,
                        totalPages: response.total_pages,
                        hasMore: response.page < response.total_pages,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('Failed to fetch notifications:', error);
                    set({ isLoading: false });
                }
            },

            // Fetch unread count only
            fetchUnreadCount: async () => {
                try {
                    const count = await notificationApi.getUnreadCount();
                    set({ unreadCount: count });
                } catch (error) {
                    console.error('Failed to fetch unread count:', error);
                }
            },

            // Mark single notification as read
            markAsRead: async (notificationId: string) => {
                try {
                    await notificationApi.markAsRead(notificationId);

                    // Update local state
                    const { notifications, unreadCount } = get();
                    const updatedNotifications = notifications.map((n) =>
                        n.notification_id === notificationId ? { ...n, is_read: true } : n
                    );

                    // Decrease unread count if notification was unread
                    const notification = notifications.find((n) => n.notification_id === notificationId);
                    const newUnreadCount = notification && !notification.is_read ? unreadCount - 1 : unreadCount;

                    set({
                        notifications: updatedNotifications,
                        unreadCount: Math.max(0, newUnreadCount),
                    });
                } catch (error) {
                    console.error('Failed to mark notification as read:', error);
                }
            },

            // Mark all notifications as read
            markAllAsRead: async () => {
                try {
                    await notificationApi.markAllAsRead();

                    // Update local state
                    const { notifications } = get();
                    const updatedNotifications = notifications.map((n) => ({ ...n, is_read: true }));

                    set({
                        notifications: updatedNotifications,
                        unreadCount: 0,
                    });
                } catch (error) {
                    console.error('Failed to mark all notifications as read:', error);
                }
            },

            // Delete notification
            deleteNotification: async (notificationId: string) => {
                try {
                    await notificationApi.deleteNotification(notificationId);

                    // Update local state
                    const { notifications, unreadCount } = get();
                    const notification = notifications.find((n) => n.notification_id === notificationId);
                    const newUnreadCount = notification && !notification.is_read ? unreadCount - 1 : unreadCount;

                    set({
                        notifications: notifications.filter((n) => n.notification_id !== notificationId),
                        unreadCount: Math.max(0, newUnreadCount),
                    });
                } catch (error) {
                    console.error('Failed to delete notification:', error);
                }
            },

            // Add notification (for WebSocket real-time updates)
            addNotification: (notification: Notification) => {
                const { notifications, unreadCount } = get();

                // Add to beginning of list
                set({
                    notifications: [notification, ...notifications],
                    unreadCount: notification.is_read ? unreadCount : unreadCount + 1,
                });
            },

            // Reset state
            reset: () => {
                set({
                    notifications: [],
                    unreadCount: 0,
                    isLoading: false,
                    hasMore: true,
                    currentPage: 1,
                    totalPages: 1,
                });
            },
        }),
        {
            name: 'notification-storage',
            partialize: (state) => ({
                // Only persist unread count for quick display
                unreadCount: state.unreadCount,
            }),
        }
    )
);
