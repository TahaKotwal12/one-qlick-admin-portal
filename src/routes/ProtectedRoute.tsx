import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
