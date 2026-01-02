import { UserStatus, UserRole, Address } from './common.types';

export interface User {
    user_id: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    status: UserStatus;
    profile_image?: string;
    email_verified: boolean;
    phone_verified: boolean;
    date_of_birth?: string;
    gender?: 'male' | 'female' | 'other';
    loyalty_points: number;
    created_at: string;
    updated_at: string;
}

export interface UserListFilters {
    role?: UserRole;
    status?: UserStatus;
    search?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    created_from?: string;
    created_to?: string;
}

export interface UserDetail extends User {
    addresses?: Address[];
    total_orders?: number;
    total_spent?: number;
    wallet_balance?: number;
}

export interface UpdateUserRequest {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    date_of_birth?: string;
    gender?: 'male' | 'female' | 'other';
}

export interface UpdateUserStatusRequest {
    status: UserStatus;
}

export interface UpdateUserRoleRequest {
    role: UserRole;
}
