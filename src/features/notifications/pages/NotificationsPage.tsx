import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotificationStore } from '@/store/notificationStore';
import NotificationItem from '../components/NotificationItem';
import { CheckCheck } from 'lucide-react';

export default function NotificationsPage() {
    const {
        notifications,
        unreadCount,
        isLoading,
        hasMore,
        currentPage,
        fetchNotifications,
        markAllAsRead,
    } = useNotificationStore();

    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    useEffect(() => {
        fetchNotifications({
            page: 1,
            unread_only: activeTab === 'unread',
        });
    }, [activeTab, fetchNotifications]);

    const handleLoadMore = () => {
        fetchNotifications({
            page: currentPage + 1,
            unread_only: activeTab === 'unread',
        });
    };

    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
        // Refresh notifications
        fetchNotifications({
            page: 1,
            unread_only: activeTab === 'unread',
        });
    };

    return (
        <div className="container mx-auto max-w-4xl space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Notifications</h1>
                    {unreadCount > 0 && (
                        <p className="text-sm text-muted-foreground">
                            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
                {unreadCount > 0 && (
                    <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
                        <CheckCheck className="mr-2 h-4 w-4" />
                        Mark all as read
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'unread')}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">
                        Unread {unreadCount > 0 && `(${unreadCount})`}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <NotificationList
                        notifications={notifications}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        onLoadMore={handleLoadMore}
                    />
                </TabsContent>

                <TabsContent value="unread" className="mt-6">
                    <NotificationList
                        notifications={notifications.filter((n) => !n.is_read)}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        onLoadMore={handleLoadMore}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Notification List Component
interface NotificationListProps {
    notifications: any[];
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
}

function NotificationList({ notifications, isLoading, hasMore, onLoadMore }: NotificationListProps) {
    if (isLoading && notifications.length === 0) {
        return (
            <Card className="p-8 text-center">
                <p className="text-muted-foreground">Loading notifications...</p>
            </Card>
        );
    }

    if (notifications.length === 0) {
        return (
            <Card className="p-12 text-center">
                <div className="mb-4 text-6xl">🔔</div>
                <h3 className="mb-2 text-lg font-semibold">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later for updates.
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <Card className="divide-y">
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.notification_id}
                        notification={notification}
                        showDelete
                    />
                ))}
            </Card>

            {hasMore && (
                <div className="text-center">
                    <Button onClick={onLoadMore} variant="outline" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Load more'}
                    </Button>
                </div>
            )}
        </div>
    );
}
