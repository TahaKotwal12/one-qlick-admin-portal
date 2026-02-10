import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    Store,
    ShoppingBag,
    Bike,
    Settings,
    LogOut,
    UtensilsCrossed,
    Ticket,
    Bell,
    BarChart3,
    MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const routes = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/dashboard',
            color: 'text-sky-500',
        },
        {
            label: 'Users',
            icon: Users,
            href: '/users',
            color: 'text-violet-500',
        },
        {
            label: 'Restaurants',
            icon: Store,
            href: '/restaurants',
            color: 'text-pink-700',
        },
        {
            label: 'Menu Items',
            icon: UtensilsCrossed,
            href: '/menu',
            color: 'text-orange-700',
        },
        {
            label: 'Orders',
            icon: ShoppingBag,
            href: '/orders',
            color: 'text-green-700',
        },
        {
            label: 'Delivery Partners',
            icon: Bike,
            href: '/delivery',
            color: 'text-yellow-600',
        },
        {
            label: 'Coupons',
            icon: Ticket,
            href: '/coupons',
            color: 'text-emerald-500',
        },
        {
            label: 'Analytics',
            icon: BarChart3,
            href: '/analytics',
            color: 'text-blue-700',
        },
        {
            label: 'Notifications',
            icon: Bell,
            href: '/notifications',
            color: 'text-red-500',
        },
        {
            label: 'Reviews',
            icon: MessageSquare,
            href: '/reviews',
            color: 'text-amber-500',
        },
        {
            label: 'Settings',
            icon: Settings,
            href: '/settings',
        },
    ];

    return (
        <div className={cn("pb-12 space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white", className)}>
            <div className="px-6 py-4 flex-1">
                <div className="flex items-center pl-2 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg animate-pulse opacity-75"></div>
                        <div className="relative w-full h-full bg-white rounded-lg flex items-center justify-center">
                            <span className="font-bold text-slate-900 text-lg">Q</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        OneQlick
                    </h1>
                </div>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <NavLink
                            key={route.href}
                            to={route.href}
                            className={({ isActive }) =>
                                cn(
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                    isActive ? "text-white bg-white/10" : "text-zinc-400"
                                )
                            }
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="px-6 py-4">
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10 pl-3"
                >
                    <LogOut className="h-5 w-5 mr-3 text-red-500" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
