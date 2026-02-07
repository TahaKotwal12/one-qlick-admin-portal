import { formatDistanceToNow } from 'date-fns';
import {
    ShoppingBag,
    CheckCircle,
    ChefHat,
    Package,
    Truck,
    Home,
    XCircle,
    CreditCard,
    AlertCircle,
    Gift,
    Tag,
    Megaphone,
    User,
    Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Notification, NotificationType } from '../types';
import { useNotificationStore } from '@/store/notificationStore';

interface NotificationItemProps {
    notification: Notification;
    onClick?: () => void;
    showDelete?: boolean;
}

// Icon mapping for notification types
const getNotificationIcon = (type: NotificationType) => {
    const iconClass = 'h-5 w-5';

    switch (type) {
        case 'order_placed':
            return <ShoppingBag className={cn(iconClass, 'text-blue-500')} />;
        case 'order_confirmed':
            return <CheckCircle className={cn(iconClass, 'text-green-500')} />;
        case 'order_preparing':
            return <ChefHat className={cn(iconClass, 'text-orange-500')} />;
        case 'order_ready':
            return <Package className={cn(iconClass, 'text-purple-500')} />;
        case 'order_picked_up':
        case 'order_out_for_delivery':
            return <Truck className={cn(iconClass, 'text-indigo-500')} />;
        case 'order_delivered':
            return <Home className={cn(iconClass, 'text-green-600')} />;
        case 'order_cancelled':
            return <XCircle className={cn(iconClass, 'text-red-500')} />;
        case 'payment_success':
            return <CreditCard className={cn(iconClass, 'text-green-500')} />;
        case 'payment_failed':
            return <AlertCircle className={cn(iconClass, 'text-red-500')} />;
        case 'refund_processed':
            return <CreditCard className={cn(iconClass, 'text-blue-500')} />;
        case 'new_coupon':
            return <Gift className={cn(iconClass, 'text-pink-500')} />;
        case 'coupon_expiring':
            return <Tag className={cn(iconClass, 'text-yellow-500')} />;
        case 'special_offer':
            return <Megaphone className={cn(iconClass, 'text-purple-500')} />;
        case 'system_announcement':
            return <Megaphone className={cn(iconClass, 'text-blue-500')} />;
        case 'account_update':
            return <User className={cn(iconClass, 'text-gray-500')} />;
        case 'security_alert':
            return <Shield className={cn(iconClass, 'text-red-600')} />;
        default:
            return <ShoppingBag className={cn(iconClass, 'text-gray-500')} />;
    }
};

export default function NotificationItem({
    notification,
    onClick,
    showDelete = false,
}: NotificationItemProps) {
    const { markAsRead, deleteNotification } = useNotificationStore();

    const handleClick = async () => {
        if (!notification.is_read) {
            await markAsRead(notification.notification_id);
        }
        onClick?.();
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteNotification(notification.notification_id);
    };

    const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
        addSuffix: true,
    });

    return (
        <div
            className={cn(
                'flex cursor-pointer gap-3 p-4 transition-colors hover:bg-accent',
                !notification.is_read && 'bg-blue-50/50 dark:bg-blue-950/20'
            )}
            onClick={handleClick}
        >
            {/* Icon */}
            <div className="flex-shrink-0 pt-0.5">
                {getNotificationIcon(notification.notification_type)}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-sm font-medium', !notification.is_read && 'font-semibold')}>
                        {notification.title}
                    </p>
                    {!notification.is_read && (
                        <div className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>

            {/* Delete button (optional) */}
            {showDelete && (
                <button
                    onClick={handleDelete}
                    className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                    aria-label="Delete notification"
                >
                    <XCircle className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
