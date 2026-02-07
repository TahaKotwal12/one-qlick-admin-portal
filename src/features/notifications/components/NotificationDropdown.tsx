import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotificationStore } from '@/store/notificationStore';
import NotificationItem from '@/features/notifications/components/NotificationItem';

interface NotificationDropdownProps {
    onClose: () => void;
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
    const { notifications, unreadCount, isLoading, markAllAsRead } = useNotificationStore();

    // Show only first 5 notifications
    const recentNotifications = notifications.slice(0, 5);

    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
    };

    if (isLoading) {
        return (
            <div className="p-4 text-center text-sm text-muted-foreground">
                Loading notifications...
            </div>
        );
    }

    if (recentNotifications.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="mb-2 text-4xl">🔔</div>
                <p className="text-sm font-medium">No notifications</p>
                <p className="text-xs text-muted-foreground">
                    You're all caught up!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <p className="text-xs text-muted-foreground">
                            {unreadCount} unread
                        </p>
                    )}
                </div>
                {unreadCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllAsRead}
                        className="text-xs"
                    >
                        Mark all read
                    </Button>
                )}
            </div>

            {/* Notifications List */}
            <ScrollArea className="max-h-[400px]">
                <div className="divide-y">
                    {recentNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.notification_id}
                            notification={notification}
                            onClick={onClose}
                        />
                    ))}
                </div>
            </ScrollArea>

            {/* Footer */}
            <Separator />
            <div className="p-2">
                <Link to="/notifications" onClick={onClose}>
                    <Button variant="ghost" className="w-full text-xs">
                        View all notifications
                    </Button>
                </Link>
            </div>
        </div>
    );
}
