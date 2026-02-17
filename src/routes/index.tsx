import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import LoginPage from '@/features/auth/pages/LoginPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';

// Dashboard Pages
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

// User Pages
import UsersListPage from '@/features/users/pages/UsersListPage';

// Restaurant Pages
import RestaurantsListPage from '@/features/restaurants/pages/RestaurantsListPage';

// Coupon Pages
import CouponsListPage from '@/features/coupons/pages/CouponsListPage';
import CreateCouponPage from '@/features/coupons/pages/CreateCouponPage';
import EditCouponPage from '@/features/coupons/pages/EditCouponPage';

// Notification Pages
import NotificationsPage from '@/features/notifications/pages/NotificationsPage';

// Review Pages
import ReviewsListPage from '@/features/reviews/pages/ReviewsListPage';
import CreateReviewFormPage from '@/features/reviews/pages/CreateReviewFormPage';
import EditReviewFormPage from '@/features/reviews/pages/EditReviewFormPage';
import ReviewResponsesPage from '@/features/reviews/pages/ReviewResponsesPage';

// Support Pages
import SupportTicketsPage from '@/features/support/pages/SupportTicketsPage';
import SupportChatPage from '@/features/support/pages/SupportChatPage';

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
        path: '/restaurants',
        element: (
            <ProtectedRoute>
                <RestaurantsListPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/notifications',
        element: (
            <ProtectedRoute>
                <NotificationsPage />
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
        path: '/reviews',
        element: (
            <ProtectedRoute>
                <ReviewsListPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/reviews/new',
        element: (
            <ProtectedRoute>
                <CreateReviewFormPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/reviews/:id/edit',
        element: (
            <ProtectedRoute>
                <EditReviewFormPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/reviews/:id/responses',
        element: (
            <ProtectedRoute>
                <ReviewResponsesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/support',
        element: (
            <ProtectedRoute>
                <SupportTicketsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/support/:id',
        element: (
            <ProtectedRoute>
                <SupportChatPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
]);