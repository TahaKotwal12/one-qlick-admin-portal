// Common API Response Types
export interface ApiResponse<T> {
    code: number;
    message: string;
    message_id: string;
    data: T;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

export interface ApiError {
    code: number;
    message: string;
    message_id: string;
    detail?: string;
}

// Common Filter Types
export interface DateRangeFilter {
    from_date?: string;
    to_date?: string;
}

export interface PaginationParams {
    page?: number;
    page_size?: number;
}

export interface SearchParams {
    search?: string;
}

export interface SortParams {
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}

// Common Status Types
export type UserStatus = 'active' | 'suspended' | 'deleted';
export type UserRole = 'customer' | 'admin' | 'delivery_partner' | 'restaurant_owner';
export type RestaurantStatus = 'active' | 'inactive' | 'suspended' | 'pending_approval';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'cash' | 'wallet' | 'upi';

// Common Entity Types
export interface Address {
    address_id: string;
    user_id: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    is_default: boolean;
    label?: string;
    created_at: string;
    updated_at: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    address?: string;
}

// Table Column Types
export interface TableColumn<T> {
    id: string;
    label: string;
    accessor: keyof T | ((row: T) => any);
    sortable?: boolean;
    filterable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
}

// Form Types
export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox' | 'radio' | 'file';
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string | number }[];
    validation?: any; // Zod schema
}
