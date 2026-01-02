import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import LoginPage from '@/features/auth/pages/LoginPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

// Dashboard Pages
// import DashboardPage from '@/features/dashboard/pages/DashboardPage';

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
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
]);
