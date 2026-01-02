# OneQlick Admin Panel - API Integration Guide

## 📡 API Overview

**Base URL**: `https://api.oneqlick.com/api/v1`  
**Authentication**: JWT Bearer Token  
**Response Format**: JSON  
**API Version**: v1  

---

## 🔐 Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@oneqlick.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "code": 200,
  "message": "Login successful",
  "message_id": "LOGIN_SUCCESS",
  "data": {
    "user": {
      "user_id": "uuid",
      "email": "admin@oneqlick.com",
      "first_name": "Admin",
      "last_name": "User",
      "role": "admin",
      "status": "active"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "refresh_token_hash",
      "token_type": "bearer",
      "expires_in": 28800
    }
  }
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "refresh_token_hash"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "refresh_token": "refresh_token_hash",
  "logout_all_devices": false
}
```

---

## 👥 User Management APIs

### Get All Users (Admin)
```http
GET /users/admin/users?page=1&page_size=20&role=customer&status=active&search=john
Authorization: Bearer {access_token}
```

**Query Parameters**:
- `page` (integer, default: 1)
- `page_size` (integer, default: 20, max: 100)
- `role` (enum: customer, admin, delivery_partner, restaurant_owner)
- `status` (enum: active, inactive, suspended)
- `search` (string) - Search by name, email, phone

**Response**:
```json
{
  "code": 200,
  "message": "Users retrieved successfully",
  "message_id": "USERS_GET_SUCCESS",
  "data": {
    "users": [
      {
        "user_id": "uuid",
        "email": "john@example.com",
        "phone": "+919876543210",
        "first_name": "John",
        "last_name": "Doe",
        "role": "customer",
        "status": "active",
        "email_verified": true,
        "phone_verified": true,
        "loyalty_points": 150,
        "created_at": "2026-01-01T10:00:00Z"
      }
    ],
    "total_users": 1234,
    "page": 1,
    "page_size": 20,
    "total_pages": 62
  }
}
```

### Get User by ID
```http
GET /users/admin/users/{user_id}
Authorization: Bearer {access_token}
```

### Update User Status
```http
PUT /users/admin/users/{user_id}/status
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "status": "suspended"
}
```

### Update User Role
```http
PUT /users/admin/users/{user_id}/role
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "role": "restaurant_owner"
}
```

---

## 🍽️ Restaurant Management APIs

### Get Nearby Restaurants
```http
GET /restaurants/nearby?latitude=28.6315&longitude=77.2167&radius_km=10&limit=20&offset=0&is_veg_only=false&is_open=true&sort_by=rating
Authorization: Bearer {access_token}
```

**Query Parameters**:
- `latitude` (float, required) - User's latitude (-90 to 90)
- `longitude` (float, required) - User's longitude (-180 to 180)
- `radius_km` (float, default: 5.0) - Search radius (0.1 - 50)
- `limit` (integer, default: 10) - Results per page (1 - 100)
- `offset` (integer, default: 0) - Pagination offset
- `is_veg_only` (boolean) - Filter pure veg restaurants
- `is_open` (boolean) - Filter currently open restaurants
- `sort_by` (enum: distance, rating, delivery_time, cost_low, cost_high)

**Response**:
```json
{
  "code": 200,
  "message": "Nearby restaurants retrieved successfully",
  "message_id": "NEARBY_RESTAURANTS_SUCCESS",
  "data": {
    "restaurants": [
      {
        "restaurant_id": "uuid",
        "name": "Pizza Hut",
        "description": "Best pizzas in town",
        "cuisine_type": "Italian",
        "image": "https://...",
        "cover_image": "https://...",
        "rating": 4.5,
        "total_ratings": 1234,
        "avg_delivery_time": 30,
        "delivery_fee": 40.00,
        "min_order_amount": 200.00,
        "cost_for_two": 500.00,
        "platform_fee": 5.00,
        "status": "active",
        "is_open": true,
        "is_veg": false,
        "is_pure_veg": false,
        "opening_time": "10:00:00",
        "closing_time": "23:00:00",
        "distance": 2.5,
        "location": {
          "address_line1": "123 Main St",
          "address_line2": "Near City Mall",
          "city": "New Delhi",
          "state": "Delhi",
          "postal_code": "110001",
          "latitude": 28.6315,
          "longitude": 77.2167
        },
        "offers": [
          {
            "offer_id": "uuid",
            "title": "50% Off",
            "description": "Get 50% off on orders above ₹500",
            "discount_type": "percentage",
            "discount_value": 50.00,
            "min_order_amount": 500.00,
            "max_discount_amount": 200.00,
            "valid_from": "2026-01-01T00:00:00Z",
            "valid_until": "2026-01-31T23:59:59Z",
            "is_active": true
          }
        ]
      }
    ],
    "total_count": 45,
    "has_more": true
  }
}
```

### Get Restaurant by ID
```http
GET /restaurants/{restaurant_id}?include_menu=true&include_reviews=false&include_offers=true
Authorization: Bearer {access_token}
```

### Get Popular Dishes
```http
GET /restaurants/popular-dishes?latitude=28.6315&longitude=77.2167&radius_km=10&limit=20&is_veg_only=false&category=Pizza
Authorization: Bearer {access_token}
```

### Unified Search
```http
GET /restaurants/search?query=pizza&latitude=28.6315&longitude=77.2167&radius_km=10&limit=20&search_type=all&is_veg_only=false&is_open=true&sort_by=relevance
Authorization: Bearer {access_token}
```

**Query Parameters**:
- `query` (string, required) - Search query
- `latitude` (float, required)
- `longitude` (float, required)
- `radius_km` (float, default: 10.0)
- `limit` (integer, default: 20)
- `search_type` (enum: all, restaurants, dishes, categories)
- `is_veg_only` (boolean)
- `is_open` (boolean)
- `sort_by` (enum: relevance, distance, rating, price_low, price_high)

---

## 📦 Order Management APIs

### Get All Orders (Admin)
```http
GET /orders?page=1&page_size=20&status=pending&restaurant_id=uuid&customer_id=uuid&start_date=2026-01-01&end_date=2026-01-31
Authorization: Bearer {access_token}
```

**Query Parameters**:
- `page` (integer)
- `page_size` (integer)
- `status` (enum: pending, confirmed, preparing, ready_for_pickup, out_for_delivery, delivered, cancelled, refunded)
- `restaurant_id` (uuid)
- `customer_id` (uuid)
- `delivery_partner_id` (uuid)
- `start_date` (date)
- `end_date` (date)
- `payment_status` (enum: pending, paid, failed, refunded)
- `payment_method` (enum: cash, card, upi, wallet, netbanking, cod)

### Get Order by ID
```http
GET /orders/{order_id}
Authorization: Bearer {access_token}
```

**Response**:
```json
{
  "code": 200,
  "message": "Order retrieved successfully",
  "message_id": "ORDER_GET_SUCCESS",
  "data": {
    "order_id": "uuid",
    "order_number": "ORD12345",
    "customer": {
      "user_id": "uuid",
      "name": "John Doe",
      "phone": "+919876543210",
      "email": "john@example.com"
    },
    "restaurant": {
      "restaurant_id": "uuid",
      "name": "Pizza Hut",
      "phone": "+919876543211"
    },
    "delivery_partner": {
      "user_id": "uuid",
      "name": "Mike Smith",
      "phone": "+919876543212",
      "vehicle_type": "motorcycle"
    },
    "delivery_address": {
      "address_id": "uuid",
      "title": "Home",
      "address_line1": "123 Main St",
      "city": "New Delhi",
      "postal_code": "110001",
      "latitude": 28.6315,
      "longitude": 77.2167
    },
    "items": [
      {
        "order_item_id": "uuid",
        "food_item": {
          "food_item_id": "uuid",
          "name": "Margherita Pizza",
          "image": "https://..."
        },
        "variant": {
          "name": "Large",
          "price_adjustment": 50.00
        },
        "quantity": 1,
        "unit_price": 350.00,
        "total_price": 400.00,
        "customizations": [
          {
            "name": "Spice Level",
            "option": "Medium"
          }
        ],
        "addons": [
          {
            "name": "Extra Cheese",
            "quantity": 1,
            "price": 50.00
          }
        ],
        "special_instructions": "Extra crispy"
      }
    ],
    "subtotal": 520.00,
    "tax_amount": 28.50,
    "delivery_fee": 40.00,
    "discount_amount": 50.00,
    "total_amount": 538.50,
    "payment_method": "upi",
    "payment_status": "paid",
    "payment_id": "pay_abc123",
    "order_status": "out_for_delivery",
    "estimated_delivery_time": "2026-01-02T15:15:00Z",
    "actual_delivery_time": null,
    "special_instructions": "Ring the doorbell",
    "created_at": "2026-01-02T14:30:00Z",
    "updated_at": "2026-01-02T15:00:00Z",
    "timeline": [
      {
        "status": "pending",
        "timestamp": "2026-01-02T14:30:00Z",
        "notes": "Order placed"
      },
      {
        "status": "confirmed",
        "timestamp": "2026-01-02T14:31:00Z",
        "notes": "Restaurant accepted"
      },
      {
        "status": "preparing",
        "timestamp": "2026-01-02T14:35:00Z",
        "notes": "Preparing order"
      },
      {
        "status": "ready_for_pickup",
        "timestamp": "2026-01-02T14:50:00Z",
        "notes": "Ready for pickup"
      },
      {
        "status": "picked_up",
        "timestamp": "2026-01-02T14:55:00Z",
        "notes": "Picked up by delivery partner"
      },
      {
        "status": "out_for_delivery",
        "timestamp": "2026-01-02T15:00:00Z",
        "notes": "Out for delivery",
        "latitude": 28.6315,
        "longitude": 77.2167
      }
    ]
  }
}
```

### Update Order Status
```http
PUT /orders/{order_id}/status
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Restaurant accepted the order"
}
```

### Assign Delivery Partner
```http
PUT /orders/{order_id}/assign-delivery-partner
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "delivery_partner_id": "uuid"
}
```

### Cancel Order
```http
POST /orders/{order_id}/cancel
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "cancellation_reason": "Customer requested cancellation",
  "refund_amount": 538.50
}
```

---

## 🚚 Delivery Partner APIs

### Get All Delivery Partners
```http
GET /delivery-partners?page=1&page_size=20&status=available&vehicle_type=motorcycle
Authorization: Bearer {access_token}
```

### Get Delivery Partner by ID
```http
GET /delivery-partners/{partner_id}
Authorization: Bearer {access_token}
```

### Update Delivery Partner Status
```http
PUT /delivery-partners/{partner_id}/status
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "availability_status": "available"
}
```

### Get Delivery Partner Location
```http
GET /delivery-partners/{partner_id}/location
Authorization: Bearer {access_token}
```

---

## 🎟️ Coupon Management APIs

### Get All Coupons
```http
GET /coupons?page=1&page_size=20&status=active&coupon_type=percentage
Authorization: Bearer {access_token}
```

### Create Coupon
```http
POST /coupons
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "code": "SAVE20",
  "title": "20% Off on All Orders",
  "description": "Get 20% discount on orders above ₹500",
  "coupon_type": "percentage",
  "discount_value": 20.00,
  "min_order_amount": 500.00,
  "max_discount_amount": 200.00,
  "usage_limit": 1000,
  "valid_from": "2026-01-01T00:00:00Z",
  "valid_until": "2026-01-31T23:59:59Z",
  "is_active": true
}
```

### Update Coupon
```http
PUT /coupons/{coupon_id}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "is_active": false
}
```

### Delete Coupon
```http
DELETE /coupons/{coupon_id}
Authorization: Bearer {access_token}
```

### Get Coupon Usage
```http
GET /coupons/{coupon_id}/usage?page=1&page_size=20
Authorization: Bearer {access_token}
```

---

## 📊 Analytics APIs

### Dashboard Metrics
```http
GET /analytics/dashboard?start_date=2026-01-01&end_date=2026-01-31
Authorization: Bearer {access_token}
```

**Response**:
```json
{
  "code": 200,
  "message": "Dashboard metrics retrieved successfully",
  "message_id": "ANALYTICS_SUCCESS",
  "data": {
    "overview": {
      "total_orders": 12345,
      "total_revenue": 1234567.89,
      "total_customers": 5678,
      "total_restaurants": 234,
      "total_delivery_partners": 456,
      "platform_commission": 61728.39
    },
    "today": {
      "orders": 234,
      "revenue": 23456.78,
      "active_users": 123,
      "active_delivery_partners": 45
    },
    "trends": {
      "orders_trend": [
        { "date": "2026-01-01", "count": 234 },
        { "date": "2026-01-02", "count": 245 }
      ],
      "revenue_trend": [
        { "date": "2026-01-01", "amount": 23456.78 },
        { "date": "2026-01-02", "amount": 24567.89 }
      ]
    },
    "order_status_distribution": {
      "pending": 12,
      "confirmed": 23,
      "preparing": 34,
      "out_for_delivery": 45,
      "delivered": 11234,
      "cancelled": 123
    },
    "top_restaurants": [
      {
        "restaurant_id": "uuid",
        "name": "Pizza Hut",
        "total_orders": 567,
        "total_revenue": 56789.01
      }
    ],
    "top_customers": [
      {
        "user_id": "uuid",
        "name": "John Doe",
        "total_orders": 45,
        "total_spent": 12345.67
      }
    ]
  }
}
```

### Revenue Report
```http
GET /analytics/revenue?start_date=2026-01-01&end_date=2026-01-31&group_by=day
Authorization: Bearer {access_token}
```

**Query Parameters**:
- `start_date` (date, required)
- `end_date` (date, required)
- `group_by` (enum: day, week, month)
- `restaurant_id` (uuid) - Filter by restaurant

### User Analytics
```http
GET /analytics/users?start_date=2026-01-01&end_date=2026-01-31
Authorization: Bearer {access_token}
```

### Restaurant Performance
```http
GET /analytics/restaurants/{restaurant_id}?start_date=2026-01-01&end_date=2026-01-31
Authorization: Bearer {access_token}
```

---

## 🔔 Notification APIs

### Send Notification
```http
POST /notifications/send
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "recipients": "all_customers",
  "title": "New Year Sale!",
  "message": "Get 50% off on all orders",
  "notification_type": "promotion",
  "channels": ["in_app", "push", "email"],
  "schedule_for": null
}
```

**Recipients Options**:
- `all_customers`
- `all_restaurants`
- `all_delivery_partners`
- `specific_users` (with `user_ids` array)
- `new_users`
- `active_users`
- `inactive_users`

### Get Notification History
```http
GET /notifications/history?page=1&page_size=20
Authorization: Bearer {access_token}
```

---

## ⚙️ System Settings APIs

### Get Settings
```http
GET /settings
Authorization: Bearer {access_token}
```

### Update Settings
```http
PUT /settings
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "platform_name": "OneQlick",
  "platform_commission_rate": 5.0,
  "default_delivery_radius": 10.0,
  "tax_rate": 5.0,
  "min_order_amount": 100.00,
  "max_order_amount": 10000.00
}
```

---

## 🔍 Search Service APIs

**Base URL**: `https://search.oneqlick.com/api/v1`

### Search Restaurants
```http
GET /search/restaurants?query=pizza&latitude=28.6315&longitude=77.2167&radius_km=10
Authorization: Bearer {access_token}
```

### Search Food Items
```http
GET /search/food-items?query=margherita&latitude=28.6315&longitude=77.2167&radius_km=10
Authorization: Bearer {access_token}
```

---

## 📝 Common Response Format

All API responses follow this structure:

```json
{
  "code": 200,
  "message": "Success message",
  "message_id": "UNIQUE_MESSAGE_ID",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "code": 400,
  "message": "Error message",
  "message_id": "ERROR_CODE",
  "data": {}
}
```

---

## 🔐 Authentication Headers

All authenticated requests must include:

```http
Authorization: Bearer {access_token}
Content-Type: application/json
```

---

## 📊 Pagination

Paginated responses include:

```json
{
  "data": {
    "items": [...],
    "total_count": 1234,
    "page": 1,
    "page_size": 20,
    "total_pages": 62,
    "has_more": true
  }
}
```

---

## ⚠️ Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | Success | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Invalid or missing authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## 🚀 Rate Limiting

- **Limit**: 1000 requests per hour per user
- **Headers**:
  - `X-RateLimit-Limit`: 1000
  - `X-RateLimit-Remaining`: 999
  - `X-RateLimit-Reset`: 1609459200

---

## 🔄 WebSocket Endpoints

### Real-Time Order Updates
```javascript
const ws = new WebSocket('wss://api.oneqlick.com/ws/orders');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'authenticate',
    token: 'access_token'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Order update:', data);
};
```

### Real-Time Delivery Tracking
```javascript
const ws = new WebSocket('wss://api.oneqlick.com/ws/delivery/{order_id}');
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-02  
**Status**: API Reference Guide
