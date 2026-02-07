import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useNotificationStore } from '@/store/notificationStore';
import NotificationDropdown from '@/features/notifications/components/NotificationDropdown';

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const { unreadCount, fetchUnreadCount, fetchNotifications } = useNotificationStore();

    // Fetch unread count on mount and every 30 seconds
    useEffect(() => {
        fetchUnreadCount();

        const interval = setInterval(() => {
            fetchUnreadCount();
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [fetchUnreadCount]);

    // Fetch notifications when dropdown opens
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            fetchNotifications({ page: 1 });
        }
    };

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
                <NotificationDropdown onClose={() => setOpen(false)} />
            </PopoverContent>
        </Popover>
    );
}
