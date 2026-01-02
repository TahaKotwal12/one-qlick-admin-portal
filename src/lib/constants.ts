// App Constants
export const APP_NAME = 'OneQlick Admin';
export const APP_VERSION = '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Date Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Status Colors
export const STATUS_COLORS = {
    // User Status
    active: 'bg-green-100 text-green-800',
    suspended: 'bg-red-100 text-red-800',
    deleted: 'bg-gray-100 text-gray-800',

    // Order Status
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    ready: 'bg-indigo-100 text-indigo-800',
    picked_up: 'bg-cyan-100 text-cyan-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',

    // Payment Status
    processing: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
} as const;

// User Roles
export const USER_ROLES = {
    customer: 'Customer',
    admin: 'Admin',
    delivery_partner: 'Delivery Partner',
    restaurant_owner: 'Restaurant Owner',
} as const;

// Order Status Labels
export const ORDER_STATUS_LABELS = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready',
    picked_up: 'Picked Up',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
} as const;

// Payment Method Labels
export const PAYMENT_METHOD_LABELS = {
    card: 'Card',
    cash: 'Cash',
    wallet: 'Wallet',
    upi: 'UPI',
} as const;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

// API
export const API_TIMEOUT = 30000; // 30 seconds
export const RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second

// WebSocket
export const WS_RECONNECT_INTERVAL = 5000; // 5 seconds
export const WS_MAX_RECONNECT_ATTEMPTS = 5;

// Local Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'user',
    THEME: 'theme',
    SIDEBAR_STATE: 'sidebar_state',
} as const;

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',

    // Dashboard
    DASHBOARD: '/dashboard',

    // Users
    USERS: '/users',
    USER_DETAIL: (id: string) => `/users/${id}`,

    // Restaurants
    RESTAURANTS: '/restaurants',
    RESTAURANT_DETAIL: (id: string) => `/restaurants/${id}`,
    PENDING_RESTAURANTS: '/restaurants/pending',

    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: (id: string) => `/orders/${id}`,

    // Delivery Partners
    DELIVERY_PARTNERS: '/delivery-partners',
    DELIVERY_PARTNER_DETAIL: (id: string) => `/delivery-partners/${id}`,

    // Menu
    MENU_CATEGORIES: '/menu/categories',
    MENU_ITEMS: '/menu/items',

    // Coupons
    COUPONS: '/coupons',
    CREATE_COUPON: '/coupons/create',

    // Financials
    FINANCIALS: '/financials',
    SETTLEMENTS: '/financials/settlements',
    REFUNDS: '/financials/refunds',

    // Reviews
    REVIEWS: '/reviews',

    // Notifications
    NOTIFICATIONS: '/notifications',
    SEND_NOTIFICATION: '/notifications/send',

    // Reports
    REPORTS: '/reports',
    SALES_REPORT: '/reports/sales',

    // Settings
    SETTINGS: '/settings',
    ADMIN_USERS: '/settings/admins',
} as const;
