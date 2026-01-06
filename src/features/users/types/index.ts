// User Types
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
    gender?: string;
    loyalty_points: number;
    created_at: string;
    updated_at: string;
}

export type UserRole = 'customer' | 'admin' | 'restaurant_owner' | 'delivery_partner';

export type UserStatus = 'active' | 'inactive' | 'suspended';

// API Request/Response Types
export interface UsersListParams {
    page?: number;
    page_size?: number;
    search?: string;
    role?: string;
    status?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
}

export interface UsersListResponse {
    users: User[];
    total_count: number;
    page: number;
    page_size: number;
    has_more: boolean;
}

export interface UpdateUserStatusRequest {
    status: UserStatus;
}

export interface UpdateUserRoleRequest {
    role: UserRole;
}

// UI State Types
export interface UsersFilters {
    search: string;
    role: string;
    status: string;
}

export interface Address {
    address_id: string;
    user_id: string;
    title: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    latitude?: number;
    longitude?: number;
    is_default: boolean;
    address_type: 'home' | 'work' | 'other';
}
