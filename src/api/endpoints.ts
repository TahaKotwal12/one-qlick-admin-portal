// API Endpoint Constants
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
export const SEARCH_API_URL = import.meta.env.VITE_SEARCH_API_URL || 'http://localhost:8001/api/v1';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

// Auth Endpoints
export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',  // Backend uses /auth/login for all users
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
} as const;

// User Endpoints
export const USER_ENDPOINTS = {
    LIST: '/users/admin/users',  // Backend uses /users/admin/users
    DETAIL: (id: string) => `/users/admin/users/${id}`,
    UPDATE: (id: string) => `/users/admin/users/${id}`,
    UPDATE_STATUS: (id: string) => `/users/admin/users/${id}/status`,
    UPDATE_ROLE: (id: string) => `/users/admin/users/${id}/role`,
    ADDRESSES: (id: string) => `/users/${id}/addresses`,
    ORDERS: (id: string) => `/users/${id}/orders`,
    SESSIONS: (id: string) => `/users/${id}/sessions`,
    EXPORT: '/users/admin/users/export',
};

// Restaurant Endpoints
export const RESTAURANT_ENDPOINTS = {
    LIST: '/admin/restaurants',
    DETAIL: (id: string) => `/admin/restaurants/${id}`,
    CREATE: '/admin/restaurants',
    UPDATE: (id: string) => `/admin/restaurants/${id}`,
    UPDATE_STATUS: (id: string) => `/admin/restaurants/${id}/status`,
    UPDATE_OPEN_STATUS: (id: string) => `/admin/restaurants/${id}/open-status`,
    PENDING: '/admin/restaurants/pending-approval',
    APPROVE: (id: string) => `/admin/restaurants/${id}/approve`,
    REJECT: (id: string) => `/admin/restaurants/${id}/reject`,
    MENU: (id: string) => `/admin/restaurants/${id}/menu`,
    ORDERS: (id: string) => `/admin/restaurants/${id}/orders`,
    REVIEWS: (id: string) => `/admin/restaurants/${id}/reviews`,
    ANALYTICS: (id: string) => `/admin/restaurants/${id}/analytics`,
    DOCUMENTS: (id: string) => `/admin/restaurants/${id}/documents`,
};

// Order Endpoints
export const ORDER_ENDPOINTS = {
    LIST: '/admin/orders',
    DETAIL: (id: string) => `/admin/orders/${id}`,
    UPDATE_STATUS: (id: string) => `/admin/orders/${id}/status`,
    CANCEL: (id: string) => `/admin/orders/${id}/cancel`,
    REFUND: (id: string) => `/admin/orders/${id}/refund`,
    ASSIGN_DELIVERY: (id: string) => `/admin/orders/${id}/assign-delivery`,
    TRACKING: (id: string) => `/admin/orders/${id}/tracking`,
    TIMELINE: (id: string) => `/admin/orders/${id}/timeline`,
    EXPORT: '/admin/orders/export',
};

// Delivery Partner Endpoints
export const DELIVERY_ENDPOINTS = {
    LIST: '/admin/delivery-partners',
    AVAILABLE: '/admin/delivery-partners/available',
    DETAIL: (id: string) => `/admin/delivery-partners/${id}`,
    UPDATE: (id: string) => `/admin/delivery-partners/${id}`,
    UPDATE_STATUS: (id: string) => `/admin/delivery-partners/${id}/status`,
    ORDERS: (id: string) => `/admin/delivery-partners/${id}/orders`,
    ANALYTICS: (id: string) => `/admin/delivery-partners/${id}/analytics`,
    LOCATION: (id: string) => `/admin/delivery-partners/${id}/location`,
};

// Menu Endpoints
export const MENU_ENDPOINTS = {
    CATEGORIES: '/admin/categories',
    CATEGORY_DETAIL: (id: string) => `/admin/categories/${id}`,
    CREATE_CATEGORY: '/admin/categories',
    UPDATE_CATEGORY: (id: string) => `/admin/categories/${id}`,
    DELETE_CATEGORY: (id: string) => `/admin/categories/${id}`,
    RESTAURANT_MENU: (restaurantId: string) => `/admin/restaurants/${restaurantId}/menu`,
    ADD_ITEM: (restaurantId: string) => `/admin/restaurants/${restaurantId}/menu/items`,
    UPDATE_ITEM: (restaurantId: string, itemId: string) => `/admin/restaurants/${restaurantId}/menu/items/${itemId}`,
    DELETE_ITEM: (restaurantId: string, itemId: string) => `/admin/restaurants/${restaurantId}/menu/items/${itemId}`,
};

// Coupon Endpoints
export const COUPON_ENDPOINTS = {
    LIST: '/coupons/admin/list',  // Admin list endpoint
    DETAIL: (id: string) => `/coupons/${id}`,
    CREATE: '/coupons',
    UPDATE: (id: string) => `/coupons/${id}`,
    DELETE: (id: string) => `/coupons/${id}`,
    VALIDATE: '/coupons/validate',
    APPLY: '/coupons/apply',
    USAGE: (id: string) => `/coupons/${id}/usage`,
    ANALYTICS: '/coupons/analytics',
    CAROUSEL: '/coupons/carousel',
};

// Financial Endpoints
export const FINANCIAL_ENDPOINTS = {
    REVENUE: '/admin/financials/revenue',
    SETTLEMENTS: '/admin/financials/settlements',
    SETTLEMENT_DETAIL: (id: string) => `/admin/financials/settlements/${id}`,
    RESTAURANT_SETTLEMENTS: '/admin/financials/restaurant-settlements',
    PROCESS_RESTAURANT_SETTLEMENT: (restaurantId: string) => `/admin/financials/restaurant-settlements/${restaurantId}/process`,
    DELIVERY_PAYOUTS: '/admin/financials/delivery-payouts',
    PROCESS_DELIVERY_PAYOUT: (partnerId: string) => `/admin/financials/delivery-payouts/${partnerId}/process`,
    REFUNDS: '/admin/financials/refunds',
    DISPUTES: '/admin/financials/disputes',
};

// Review Endpoints
export const REVIEW_ENDPOINTS = {
    LIST: '/admin/reviews',
    DETAIL: (id: string) => `/admin/reviews/${id}`,
    FLAG: (id: string) => `/admin/reviews/${id}/flag`,
    DELETE: (id: string) => `/admin/reviews/${id}`,
    FLAGGED: '/admin/reviews/flagged',
    ANALYTICS: '/admin/reviews/analytics',

    // Form Management
    FORMS_LIST: '/reviews/admin/forms',
    FORM_CREATE: '/reviews/form',
    FORM_DETAIL: (slug: string) => `/reviews/form/${slug}`,
    FORM_UPDATE: (id: string) => `/reviews/form/${id}`,
    FORM_DELETE: (id: string) => `/reviews/form/${id}`,
    RESPONSES: (id?: string) => `/reviews/admin/responses${id ? `?form_id=${id}` : ''}`,
};

// Notification Endpoints
export const NOTIFICATION_ENDPOINTS = {
    LIST: '/admin/notifications',
    DETAIL: (id: string) => `/admin/notifications/${id}`,
    SEND: '/admin/notifications/send',
    BROADCAST: '/admin/notifications/broadcast',
    ANALYTICS: (id: string) => `/admin/notifications/${id}/analytics`,
};

// Analytics Endpoints
export const ANALYTICS_ENDPOINTS = {
    DASHBOARD: '/admin/analytics/dashboard',
    REVENUE_TREND: '/admin/analytics/revenue-trend',
    ORDER_STATUS_DISTRIBUTION: '/admin/analytics/order-status-distribution',
    USERS: '/admin/analytics/users',
    USER_RETENTION: '/admin/analytics/user-retention',
    RESTAURANTS: '/admin/analytics/restaurants',
    POPULAR_CUISINES: '/admin/analytics/popular-cuisines',
    ORDERS: '/admin/analytics/orders',
} as const;

// Report Endpoints
export const REPORT_ENDPOINTS = {
    SALES: '/admin/reports/sales',
    USERS: '/admin/reports/users',
    RESTAURANTS: '/admin/reports/restaurants',
    DELIVERY_PARTNERS: '/admin/reports/delivery-partners',
    FINANCIAL: '/admin/reports/financial',
    CUSTOM: '/admin/reports/custom',
    CUSTOM_DETAIL: (id: string) => `/admin/reports/custom/${id}`,
};

// Settings Endpoints
export const SETTINGS_ENDPOINTS = {
    GENERAL: '/admin/settings/general',
    BUSINESS: '/admin/settings/business',
    ADMINS: '/admin/settings/admins',
    ADMIN_DETAIL: (id: string) => `/admin/settings/admins/${id}`,
    CREATE_ADMIN: '/admin/settings/admins',
    UPDATE_ADMIN: (id: string) => `/admin/settings/admins/${id}`,
    DELETE_ADMIN: (id: string) => `/admin/settings/admins/${id}`,
};

