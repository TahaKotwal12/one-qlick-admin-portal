import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import LoginPage from '@/features/auth/pages/LoginPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';

// Dashboard Pages
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

// User Pages
import UsersListPage from '@/features/users/pages/UsersListPage';

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
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
]);
