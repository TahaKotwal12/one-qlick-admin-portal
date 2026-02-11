export const CouponType = {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    FREE_DELIVERY: 'free_delivery',
} as const;

export type CouponType = typeof CouponType[keyof typeof CouponType];

export interface Coupon {
    coupon_id: string;
    code: string;
    title: string;
    description?: string;
    coupon_type: CouponType;
    discount_value: number;
    min_order_amount: number;
    max_discount_amount?: number;
    usage_limit?: number;
    used_count: number;
    valid_from: string;
    valid_until: string;
    is_active: boolean;
    created_at: string;

    // Carousel fields
    show_in_carousel: boolean;
    carousel_priority: number;
    carousel_title?: string;
    carousel_subtitle?: string;
    carousel_badge?: string;
    carousel_icon?: string;
    carousel_gradient_start: string;
    carousel_gradient_middle: string;
    carousel_gradient_end: string;
    carousel_action_text: string;
}

export interface CreateCouponRequest {
    code: string;
    title: string;
    description?: string;
    coupon_type: CouponType;
    discount_value: number;
    min_order_amount: number;
    max_discount_amount?: number;
    usage_limit?: number;
    valid_from: string;
    valid_until: string;
    is_active: boolean;

    // Carousel fields
    show_in_carousel?: boolean;
    carousel_priority?: number;
    carousel_title?: string;
    carousel_subtitle?: string;
    carousel_badge?: string;
    carousel_icon?: string;
    carousel_gradient_start?: string;
    carousel_gradient_middle?: string;
    carousel_gradient_end?: string;
    carousel_action_text?: string;
}

export interface UpdateCouponRequest extends Partial<CreateCouponRequest> { }

export interface CouponListResponse {
    coupons: Coupon[];
    total_count: number;
    has_more?: boolean;
}

export interface CouponUsage {
    user_id: string;
    user_name: string;
    order_id: string;
    discount_applied: number;
    used_at: string;
}

export interface CouponAnalytics {
    total_usage: number;
    total_discount_given: number;
    unique_users: number;
    conversion_rate: number;
    revenue_impact: number;
}
