import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import LoginPage from '@/features/auth/pages/LoginPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';

// Dashboard Pages
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

// User Pages
import UsersListPage from '@/features/users/pages/UsersListPage';

// Coupon Pages
import CouponsListPage from '@/features/coupons/pages/CouponsListPage';
import CreateCouponPage from '@/features/coupons/pages/CreateCouponPage';
import EditCouponPage from '@/features/coupons/pages/EditCouponPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/users',
        element: (
            <ProtectedRoute>
                <UsersListPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/coupons',
        element: (
            <ProtectedRoute>
                <CouponsListPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/coupons/new',
        element: (
            <ProtectedRoute>
                <CreateCouponPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/coupons/:id/edit',
        element: (
            <ProtectedRoute>
                <EditCouponPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
]);
