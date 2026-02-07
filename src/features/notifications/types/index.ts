// Notification types and interfaces

export type NotificationType =
    // Order related
    | 'order_placed'
    | 'order_confirmed'
    | 'order_preparing'
    | 'order_ready'
    | 'order_picked_up'
    | 'order_out_for_delivery'
    | 'order_delivered'
    | 'order_cancelled'
    // Payment related
    | 'payment_success'
    | 'payment_failed'
    | 'refund_processed'
    // Promotion related
    | 'new_coupon'
    | 'coupon_expiring'
    | 'special_offer'
    // System related
    | 'system_announcement'
    | 'account_update'
    | 'security_alert';

export interface Notification {
    notification_id: string;
    user_id: string;
    title: string;
    message: string;
    notification_type: NotificationType;
    is_read: boolean;
    data_json?: Record<string, any>;
    created_at: string;
}

export interface NotificationListResponse {
    notifications: Notification[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    unread_count: number;
}

export interface UnreadCountResponse {
    unread_count: number;
}

export interface CreateNotificationRequest {
    user_id: string;
    title: string;
    message: string;
    notification_type: NotificationType;
    data_json?: Record<string, any>;
}

export interface BroadcastNotificationRequest {
    title: string;
    message: string;
    notification_type: NotificationType;
    user_ids?: string[];
    role_filter?: string;
    data_json?: Record<string, any>;
}

export interface NotificationStats {
    total_notifications: number;
    total_sent_today: number;
    total_read: number;
    total_unread: number;
    read_rate: number;
    notifications_by_type: Record<string, number>;
    recent_broadcasts: any[];
}

export interface NotificationFilter {
    unread_only?: boolean;
    notification_type?: NotificationType;
}
