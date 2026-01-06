import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Store,
    ShoppingCart,
    Bike,
    DollarSign,
    Package,
    LogOut,
    Loader2
} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Call logout API (clears tokens on backend)
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with logout even if API call fails
        } finally {
            // Clear local state
            logout();
            setIsLoggingOut(false);
            setShowLogoutDialog(false);
            // Redirect to login
            navigate('/login');
        }
    };

    const stats = [
        {
            title: 'Total Orders',
            value: '1,234',
            change: '+12.5%',
            icon: ShoppingCart,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
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
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">OneQlick Admin</h1>
                                <p className="text-sm text-gray-500">Welcome back, {user?.first_name || 'Admin'}!</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowLogoutDialog(true)}
                            variant="outline"
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Welcome to OneQlick Admin Panel</CardTitle>
                        <CardDescription className="text-indigo-100">
                            Manage your food delivery platform with ease
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-indigo-50">
                            You're logged in as <span className="font-semibold">{user?.email}</span>
                        </p>
                        <p className="text-xs text-indigo-200 mt-1">
                            Role: <span className="font-semibold uppercase">{user?.role}</span>
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
                                    className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-indigo-50 hover:border-indigo-300"
                                    onClick={() => alert(`Navigate to ${action.path} (Coming soon!)`)}
                                >
                                    <action.icon className="w-8 h-8 text-indigo-600" />
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

            {/* Logout Confirmation Dialog */}
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be redirected to the login page and will need to sign in again to access the admin panel.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isLoggingOut ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging out...
                                </>
                            ) : (
                                <>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
