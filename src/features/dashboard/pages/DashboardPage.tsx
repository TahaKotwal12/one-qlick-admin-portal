import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Store,
    ShoppingCart,
    Bike,
    TrendingUp,
    DollarSign,
    Package
} from 'lucide-react';

export default function DashboardPage() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const stats = [
        {
            title: 'Total Orders',
            value: '1,234',
            change: '+12.5%',
            icon: ShoppingCart,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Total Revenue',
            value: '₹45,678',
            change: '+8.2%',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Active Users',
            value: '892',
            change: '+5.1%',
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
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
        { label: 'Delivery Partners', icon: Bike, path: '/delivery-partners' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">OneQlick Admin</h1>
                                <p className="text-sm text-gray-500">Welcome back, {user?.first_name || 'Admin'}!</p>
                            </div>
                        </div>
                        <Button onClick={handleLogout} variant="outline">
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Welcome to OneQlick Admin Panel</CardTitle>
                        <CardDescription className="text-blue-100">
                            Manage your food delivery platform with ease
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-50">
                            You're logged in as <span className="font-semibold">{user?.email}</span>
                        </p>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Access frequently used features</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
                                    onClick={() => alert(`Navigate to ${action.path} (Coming soon!)`)}
                                >
                                    <action.icon className="w-8 h-8 text-blue-600" />
                                    <span className="font-medium">{action.label}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="mt-8 border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { action: 'New order placed', time: '5 minutes ago', icon: ShoppingCart },
                                { action: 'New user registered', time: '12 minutes ago', icon: Users },
                                { action: 'Restaurant approved', time: '1 hour ago', icon: Store },
                                { action: 'Delivery completed', time: '2 hours ago', icon: Bike },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <activity.icon className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
