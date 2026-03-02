export interface Order {
    order_id: string;
    order_number: string;
    customer_id: string;
    customer_name: string;
    restaurant: {
        name: string;
    };

    total_amount: number;
    order_status: string;
    created_at: string;
    // Add other fields from backend response...
}

export interface OrdersFilters {
    search: string;
    status_filter: 'all' | 'pending' | 'confirmed';
    min_price: string;
    max_price: string;
    location: string;
}

export interface OrdersListResponse {
    orders: Order[];
    total_count: number;
    total_orders_completed: number; // The new stat we added
    page: number;
    total_pages: number;
}
