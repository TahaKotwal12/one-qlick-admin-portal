import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Store,
    ShoppingCart,
    Bike,
    DollarSign,
    Package,
    Activity
} from 'lucide-react';

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const stats = [
        {
            title: 'Total Revenue',
            value: '₹45,678',
            change: '+8.2%',
            icon: DollarSign,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
        },
        {
            title: 'Total Orders',
            value: '1,234',
            change: '+12.5%',
            icon: ShoppingCart,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Active Users',
            value: '892',
            change: '+5.1%',
            icon: Users,
            color: 'text-violet-600',
            bgColor: 'bg-violet-100',
        },
        {
            title: 'Restaurants',
            value: '156',
            change: '+3.4%',
            icon: Store,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
    ];

    const quickActions = [
        { label: 'Manage Users', icon: Users, path: '/users' },
        { label: 'Restaurants', icon: Store, path: '/restaurants' },
        { label: 'Orders', icon: Package, path: '/orders' },
        { label: 'Coupons', icon: Activity, path: '/coupons' },
    ];

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
                    <p className="text-muted-foreground mt-1">
                        Overview of your platform's performance
                    </p>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Welcome back, {user?.first_name || 'Admin'}! 👋</h3>
                    <p className="text-indigo-100 max-w-xl">
                        Here's what's happening with your store today. You have <span className="font-bold text-white">12 new orders</span> and <span className="font-bold text-white">5 new user registrations</span>.
                    </p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 transform translate-x-12 translate-y-4">
                    <Activity className="h-64 w-64" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-600 font-medium">{stat.change}</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Quick Actions */}
                <Card className="col-span-4 border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Frequently used management tools
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {quickActions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-slate-50 border-slate-200 hover:border-violet-500 hover:text-violet-600 transition-all"
                                onClick={() => navigate(action.path)}
                            >
                                <action.icon className="w-8 h-8 opacity-70" />
                                <span className="font-medium">{action.label}</span>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3 border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest events across the platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { action: 'New order #1234', time: '2 mins ago', icon: ShoppingCart, color: 'text-blue-500' },
                                { action: 'User registered', time: '15 mins ago', icon: Users, color: 'text-violet-500' },
                                { action: 'Restaurant updated menu', time: '1 hour ago', icon: Store, color: 'text-orange-500' },
                                { action: 'Delivery completed', time: '2 hours ago', icon: Bike, color: 'text-green-500' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{item.action}</p>
                                        <p className="text-xs text-muted-foreground">{item.time}</p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <item.icon className={`h-4 w-4 ${item.color}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
