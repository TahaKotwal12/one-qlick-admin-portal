# OneQlick Admin Panel - Backend API Progress Tracker

> **Purpose**: Track the development and integration status of all backend APIs required for the admin panel.  
> **Last Updated**: 2026-01-02  
> **Status**: Planning Phase

---

## 📊 Overall Progress

| Category | Total | Completed | In Progress | Not Started | Progress |
|----------|-------|-----------|-------------|-------------|----------|
| **Authentication APIs** | 6 | 0 | 0 | 6 | 0% |
| **User Management APIs** | 12 | 0 | 0 | 12 | 0% |
| **Restaurant Management APIs** | 15 | 0 | 0 | 15 | 0% |
| **Order Management APIs** | 10 | 0 | 0 | 10 | 0% |
| **Delivery Partner APIs** | 8 | 0 | 0 | 8 | 0% |
| **Menu Management APIs** | 8 | 0 | 0 | 8 | 0% |
| **Coupon & Promotion APIs** | 7 | 0 | 0 | 7 | 0% |
| **Financial APIs** | 9 | 0 | 0 | 9 | 0% |
| **Review & Rating APIs** | 6 | 0 | 0 | 6 | 0% |
| **Notification APIs** | 5 | 0 | 0 | 5 | 0% |
| **Analytics & Reports APIs** | 12 | 0 | 0 | 12 | 0% |
| **System Settings APIs** | 8 | 0 | 0 | 8 | 0% |
| **TOTAL** | **106** | **0** | **0** | **106** | **0%** |

---

## 🔐 1. Authentication APIs

### Admin Authentication
- [ ] **POST** `/api/v1/auth/admin/login`
  - **Purpose**: Admin user login
  - **Request**: `{ email, password }`
  - **Response**: `{ access_token, refresh_token, user }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical
  - **Notes**: Requires role-based access control

- [ ] **POST** `/api/v1/auth/admin/refresh`
  - **Purpose**: Refresh access token
  - **Request**: `{ refresh_token }`
  - **Response**: `{ access_token }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/auth/admin/logout`
  - **Purpose**: Logout admin user
  - **Request**: `{ refresh_token }`
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

### Password Management
- [ ] **POST** `/api/v1/auth/admin/forgot-password`
  - **Purpose**: Request password reset
  - **Request**: `{ email }`
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **POST** `/api/v1/auth/admin/reset-password`
  - **Purpose**: Reset password with token
  - **Request**: `{ token, new_password }`
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **POST** `/api/v1/auth/admin/change-password`
  - **Purpose**: Change password (authenticated)
  - **Request**: `{ old_password, new_password }`
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

---

## 👥 2. User Management APIs

### User Listing & Search
- [ ] **GET** `/api/v1/admin/users`
  - **Purpose**: Get paginated user list with filters
  - **Query Params**: `page, page_size, role, status, search, email_verified, phone_verified, created_from, created_to`
  - **Response**: `{ users[], total_users, page, page_size, total_pages }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical
  - **Notes**: Existing endpoint, needs verification

- [ ] **GET** `/api/v1/admin/users/search`
  - **Purpose**: Advanced user search
  - **Query Params**: `query, filters`
  - **Response**: `{ users[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/users/export`
  - **Purpose**: Export users to CSV
  - **Query Params**: `filters, format`
  - **Response**: CSV file
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

### User Details & Management
- [ ] **GET** `/api/v1/admin/users/{user_id}`
  - **Purpose**: Get detailed user information
  - **Response**: `{ user, addresses, orders_summary, wallet, sessions }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical
  - **Notes**: Existing endpoint, needs verification

- [ ] **PUT** `/api/v1/admin/users/{user_id}`
  - **Purpose**: Update user information
  - **Request**: `{ first_name, last_name, email, phone, date_of_birth, gender }`
  - **Response**: `{ user }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **PATCH** `/api/v1/admin/users/{user_id}/status`
  - **Purpose**: Update user status
  - **Request**: `{ status: 'active' | 'suspended' | 'deleted' }`
  - **Response**: `{ user }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical
  - **Notes**: Existing endpoint, needs verification

- [ ] **PATCH** `/api/v1/admin/users/{user_id}/role`
  - **Purpose**: Update user role
  - **Request**: `{ role: 'customer' | 'admin' | 'delivery_partner' | 'restaurant_owner' }`
  - **Response**: `{ user }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

### User Addresses
- [ ] **GET** `/api/v1/admin/users/{user_id}/addresses`
  - **Purpose**: Get user addresses
  - **Response**: `{ addresses[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **DELETE** `/api/v1/admin/users/{user_id}/addresses/{address_id}`
  - **Purpose**: Delete user address
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

### User Orders & Activity
- [ ] **GET** `/api/v1/admin/users/{user_id}/orders`
  - **Purpose**: Get user order history
  - **Query Params**: `page, page_size, status, from_date, to_date`
  - **Response**: `{ orders[], total, page, page_size }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **GET** `/api/v1/admin/users/{user_id}/sessions`
  - **Purpose**: Get user active sessions
  - **Response**: `{ sessions[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

- [ ] **DELETE** `/api/v1/admin/users/{user_id}/sessions/{session_id}`
  - **Purpose**: Revoke user session
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

---

## 🏪 3. Restaurant Management APIs

### Restaurant Listing & Search
- [ ] **GET** `/api/v1/admin/restaurants`
  - **Purpose**: Get paginated restaurant list
  - **Query Params**: `page, page_size, status, is_open, cuisine_type, city, search, rating_min, created_from, created_to`
  - **Response**: `{ restaurants[], total, page, page_size, total_pages }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **GET** `/api/v1/admin/restaurants/search`
  - **Purpose**: Advanced restaurant search
  - **Query Params**: `query, filters`
  - **Response**: `{ restaurants[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/restaurants/export`
  - **Purpose**: Export restaurants to CSV
  - **Query Params**: `filters, format`
  - **Response**: CSV file
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

### Restaurant Details & Management
- [ ] **GET** `/api/v1/admin/restaurants/{restaurant_id}`
  - **Purpose**: Get detailed restaurant information
  - **Response**: `{ restaurant, owner, menu_summary, orders_summary, reviews_summary }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/admin/restaurants`
  - **Purpose**: Create new restaurant
  - **Request**: `{ owner_id, name, description, phone, email, address, location, cuisine_type, timings, fees }`
  - **Response**: `{ restaurant }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **PUT** `/api/v1/admin/restaurants/{restaurant_id}`
  - **Purpose**: Update restaurant information
  - **Request**: Restaurant details
  - **Response**: `{ restaurant }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **PATCH** `/api/v1/admin/restaurants/{restaurant_id}/status`
  - **Purpose**: Update restaurant status
  - **Request**: `{ status: 'active' | 'inactive' | 'suspended' | 'pending_approval' }`
  - **Response**: `{ restaurant }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **PATCH** `/api/v1/admin/restaurants/{restaurant_id}/open-status`
  - **Purpose**: Toggle restaurant open/close
  - **Request**: `{ is_open: boolean }`
  - **Response**: `{ restaurant }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

### Restaurant Approval Workflow
- [ ] **GET** `/api/v1/admin/restaurants/pending-approval`
  - **Purpose**: Get restaurants pending approval
  - **Query Params**: `page, page_size`
  - **Response**: `{ restaurants[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/admin/restaurants/{restaurant_id}/approve`
  - **Purpose**: Approve restaurant
  - **Request**: `{ notes }`
  - **Response**: `{ restaurant }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/admin/restaurants/{restaurant_id}/reject`
  - **Purpose**: Reject restaurant
  - **Request**: `{ reason, notes }`
  - **Response**: `{ restaurant }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

### Restaurant Orders & Analytics
- [ ] **GET** `/api/v1/admin/restaurants/{restaurant_id}/orders`
  - **Purpose**: Get restaurant orders
  - **Query Params**: `page, page_size, status, from_date, to_date`
  - **Response**: `{ orders[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **GET** `/api/v1/admin/restaurants/{restaurant_id}/analytics`
  - **Purpose**: Get restaurant analytics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ revenue, orders_count, avg_rating, popular_items }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/restaurants/{restaurant_id}/reviews`
  - **Purpose**: Get restaurant reviews
  - **Query Params**: `page, page_size, rating`
  - **Response**: `{ reviews[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/restaurants/{restaurant_id}/documents`
  - **Purpose**: Get restaurant verification documents
  - **Response**: `{ documents[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

---

## 📦 4. Order Management APIs

### Order Listing & Search
- [ ] **GET** `/api/v1/admin/orders`
  - **Purpose**: Get paginated order list
  - **Query Params**: `page, page_size, status, payment_status, from_date, to_date, customer_id, restaurant_id, delivery_partner_id, search`
  - **Response**: `{ orders[], total, page, page_size, total_pages }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **GET** `/api/v1/admin/orders/search`
  - **Purpose**: Search orders by order number
  - **Query Params**: `query`
  - **Response**: `{ orders[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **GET** `/api/v1/admin/orders/export`
  - **Purpose**: Export orders to CSV
  - **Query Params**: `filters, format`
  - **Response**: CSV file
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

### Order Details & Management
- [ ] **GET** `/api/v1/admin/orders/{order_id}`
  - **Purpose**: Get detailed order information
  - **Response**: `{ order, items[], customer, restaurant, delivery_partner, tracking, timeline }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **PATCH** `/api/v1/admin/orders/{order_id}/status`
  - **Purpose**: Update order status
  - **Request**: `{ status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled' }`
  - **Response**: `{ order }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/admin/orders/{order_id}/cancel`
  - **Purpose**: Cancel order
  - **Request**: `{ reason, refund_amount }`
  - **Response**: `{ order }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/admin/orders/{order_id}/refund`
  - **Purpose**: Process refund
  - **Request**: `{ amount, reason }`
  - **Response**: `{ refund }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

### Order Assignment & Tracking
- [ ] **POST** `/api/v1/admin/orders/{order_id}/assign-delivery`
  - **Purpose**: Manually assign delivery partner
  - **Request**: `{ delivery_partner_id }`
  - **Response**: `{ order }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **GET** `/api/v1/admin/orders/{order_id}/tracking`
  - **Purpose**: Get real-time order tracking
  - **Response**: `{ location, status, estimated_time }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/orders/{order_id}/timeline`
  - **Purpose**: Get order status timeline
  - **Response**: `{ timeline[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

---

## 🚴 5. Delivery Partner Management APIs

### Delivery Partner Listing
- [ ] **GET** `/api/v1/admin/delivery-partners`
  - **Purpose**: Get paginated delivery partners list
  - **Query Params**: `page, page_size, status, availability, city, search, rating_min`
  - **Response**: `{ delivery_partners[], total, page, page_size }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **GET** `/api/v1/admin/delivery-partners/available`
  - **Purpose**: Get available delivery partners
  - **Query Params**: `latitude, longitude, radius_km`
  - **Response**: `{ delivery_partners[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

### Delivery Partner Details
- [ ] **GET** `/api/v1/admin/delivery-partners/{partner_id}`
  - **Purpose**: Get detailed delivery partner info
  - **Response**: `{ partner, profile, vehicle_info, documents, performance_metrics }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **PUT** `/api/v1/admin/delivery-partners/{partner_id}`
  - **Purpose**: Update delivery partner information
  - **Request**: Partner details
  - **Response**: `{ partner }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **PATCH** `/api/v1/admin/delivery-partners/{partner_id}/status`
  - **Purpose**: Update partner status
  - **Request**: `{ status: 'active' | 'inactive' | 'suspended' }`
  - **Response**: `{ partner }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

### Delivery Partner Performance
- [ ] **GET** `/api/v1/admin/delivery-partners/{partner_id}/orders`
  - **Purpose**: Get partner delivery history
  - **Query Params**: `page, page_size, status, from_date, to_date`
  - **Response**: `{ orders[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/delivery-partners/{partner_id}/analytics`
  - **Purpose**: Get partner performance analytics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ total_deliveries, earnings, avg_rating, on_time_percentage }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/delivery-partners/{partner_id}/location`
  - **Purpose**: Get current location
  - **Response**: `{ latitude, longitude, last_updated }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

---

## 🍔 6. Menu Management APIs

### Category Management
- [ ] **GET** `/api/v1/admin/categories`
  - **Purpose**: Get all food categories
  - **Response**: `{ categories[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **POST** `/api/v1/admin/categories`
  - **Purpose**: Create new category
  - **Request**: `{ name, description, image, parent_id }`
  - **Response**: `{ category }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **PUT** `/api/v1/admin/categories/{category_id}`
  - **Purpose**: Update category
  - **Request**: Category details
  - **Response**: `{ category }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **DELETE** `/api/v1/admin/categories/{category_id}`
  - **Purpose**: Delete category
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

### Restaurant Menu Management
- [ ] **GET** `/api/v1/admin/restaurants/{restaurant_id}/menu`
  - **Purpose**: Get restaurant menu
  - **Response**: `{ categories[], items[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **POST** `/api/v1/admin/restaurants/{restaurant_id}/menu/items`
  - **Purpose**: Add menu item
  - **Request**: `{ name, description, price, category_id, image, is_veg, is_available }`
  - **Response**: `{ item }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **PUT** `/api/v1/admin/restaurants/{restaurant_id}/menu/items/{item_id}`
  - **Purpose**: Update menu item
  - **Request**: Item details
  - **Response**: `{ item }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **DELETE** `/api/v1/admin/restaurants/{restaurant_id}/menu/items/{item_id}`
  - **Purpose**: Delete menu item
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

---

## 🎟️ 7. Coupon & Promotion APIs

### Coupon Management
- [ ] **GET** `/api/v1/admin/coupons`
  - **Purpose**: Get all coupons
  - **Query Params**: `page, page_size, status, type, search`
  - **Response**: `{ coupons[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **GET** `/api/v1/admin/coupons/{coupon_id}`
  - **Purpose**: Get coupon details
  - **Response**: `{ coupon, usage_stats }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **POST** `/api/v1/admin/coupons`
  - **Purpose**: Create new coupon
  - **Request**: `{ code, type, discount_value, min_order, max_discount, valid_from, valid_until, usage_limit }`
  - **Response**: `{ coupon }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **PUT** `/api/v1/admin/coupons/{coupon_id}`
  - **Purpose**: Update coupon
  - **Request**: Coupon details
  - **Response**: `{ coupon }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **DELETE** `/api/v1/admin/coupons/{coupon_id}`
  - **Purpose**: Delete coupon
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

### Coupon Analytics
- [ ] **GET** `/api/v1/admin/coupons/{coupon_id}/usage`
  - **Purpose**: Get coupon usage statistics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ total_uses, total_discount, orders[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

- [ ] **GET** `/api/v1/admin/coupons/analytics`
  - **Purpose**: Get overall coupon analytics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ total_coupons, active_coupons, total_redemptions, total_discount_given }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

---

## 💰 8. Financial Management APIs

### Revenue & Settlements
- [ ] **GET** `/api/v1/admin/financials/revenue`
  - **Purpose**: Get revenue overview
  - **Query Params**: `from_date, to_date, group_by`
  - **Response**: `{ total_revenue, platform_fee, net_revenue, breakdown[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **GET** `/api/v1/admin/financials/settlements`
  - **Purpose**: Get all settlements
  - **Query Params**: `page, page_size, status, type, from_date, to_date`
  - **Response**: `{ settlements[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **GET** `/api/v1/admin/financials/settlements/{settlement_id}`
  - **Purpose**: Get settlement details
  - **Response**: `{ settlement, orders[], transactions[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

### Restaurant Settlements
- [ ] **GET** `/api/v1/admin/financials/restaurant-settlements`
  - **Purpose**: Get restaurant settlements
  - **Query Params**: `page, page_size, restaurant_id, status, from_date, to_date`
  - **Response**: `{ settlements[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/admin/financials/restaurant-settlements/{restaurant_id}/process`
  - **Purpose**: Process restaurant settlement
  - **Request**: `{ from_date, to_date }`
  - **Response**: `{ settlement }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

### Delivery Partner Payouts
- [ ] **GET** `/api/v1/admin/financials/delivery-payouts`
  - **Purpose**: Get delivery partner payouts
  - **Query Params**: `page, page_size, partner_id, status, from_date, to_date`
  - **Response**: `{ payouts[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **POST** `/api/v1/admin/financials/delivery-payouts/{partner_id}/process`
  - **Purpose**: Process delivery partner payout
  - **Request**: `{ from_date, to_date }`
  - **Response**: `{ payout }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

### Refunds & Disputes
- [ ] **GET** `/api/v1/admin/financials/refunds`
  - **Purpose**: Get all refunds
  - **Query Params**: `page, page_size, status, from_date, to_date`
  - **Response**: `{ refunds[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **GET** `/api/v1/admin/financials/disputes`
  - **Purpose**: Get payment disputes
  - **Query Params**: `page, page_size, status`
  - **Response**: `{ disputes[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

---

## ⭐ 9. Review & Rating APIs

### Review Management
- [ ] **GET** `/api/v1/admin/reviews`
  - **Purpose**: Get all reviews
  - **Query Params**: `page, page_size, type, rating, flagged, from_date, to_date`
  - **Response**: `{ reviews[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/reviews/{review_id}`
  - **Purpose**: Get review details
  - **Response**: `{ review, order, customer, restaurant/delivery_partner }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **PATCH** `/api/v1/admin/reviews/{review_id}/flag`
  - **Purpose**: Flag/unflag review
  - **Request**: `{ is_flagged, reason }`
  - **Response**: `{ review }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **DELETE** `/api/v1/admin/reviews/{review_id}`
  - **Purpose**: Delete inappropriate review
  - **Request**: `{ reason }`
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

### Review Analytics
- [ ] **GET** `/api/v1/admin/reviews/flagged`
  - **Purpose**: Get flagged reviews
  - **Query Params**: `page, page_size`
  - **Response**: `{ reviews[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/reviews/analytics`
  - **Purpose**: Get review analytics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ avg_rating, total_reviews, rating_distribution }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

---

## 🔔 10. Notification APIs

### Send Notifications
- [ ] **POST** `/api/v1/admin/notifications/send`
  - **Purpose**: Send notification to users
  - **Request**: `{ title, message, recipients, type, scheduled_at }`
  - **Response**: `{ notification }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **POST** `/api/v1/admin/notifications/broadcast`
  - **Purpose**: Broadcast notification to all users
  - **Request**: `{ title, message, type, user_segments }`
  - **Response**: `{ notification }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

### Notification Management
- [ ] **GET** `/api/v1/admin/notifications`
  - **Purpose**: Get notification history
  - **Query Params**: `page, page_size, type, status, from_date, to_date`
  - **Response**: `{ notifications[], total }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/notifications/{notification_id}`
  - **Purpose**: Get notification details
  - **Response**: `{ notification, delivery_stats }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

- [ ] **GET** `/api/v1/admin/notifications/{notification_id}/analytics`
  - **Purpose**: Get notification analytics
  - **Response**: `{ sent, delivered, opened, clicked }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

---

## 📊 11. Analytics & Reports APIs

### Dashboard Analytics
- [ ] **GET** `/api/v1/admin/analytics/dashboard`
  - **Purpose**: Get dashboard overview metrics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ total_orders, total_revenue, active_users, active_restaurants, avg_order_value }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **GET** `/api/v1/admin/analytics/revenue-trend`
  - **Purpose**: Get revenue trend data
  - **Query Params**: `from_date, to_date, group_by`
  - **Response**: `{ data_points[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🔴 Critical

- [ ] **GET** `/api/v1/admin/analytics/order-status-distribution`
  - **Purpose**: Get order status distribution
  - **Response**: `{ pending, confirmed, preparing, delivered, cancelled }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

### User Analytics
- [ ] **GET** `/api/v1/admin/analytics/users`
  - **Purpose**: Get user analytics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ total_users, new_users, active_users, user_growth[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/analytics/user-retention`
  - **Purpose**: Get user retention metrics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ retention_rate, cohort_analysis[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

### Restaurant Analytics
- [ ] **GET** `/api/v1/admin/analytics/restaurants`
  - **Purpose**: Get restaurant analytics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ total_restaurants, active_restaurants, top_restaurants[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/analytics/popular-cuisines`
  - **Purpose**: Get popular cuisine types
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ cuisines[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟢 Low

### Order Analytics
- [ ] **GET** `/api/v1/admin/analytics/orders`
  - **Purpose**: Get order analytics
  - **Query Params**: `from_date, to_date`
  - **Response**: `{ total_orders, avg_order_value, peak_hours[], order_trend[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

### Reports
- [ ] **GET** `/api/v1/admin/reports/sales`
  - **Purpose**: Generate sales report
  - **Query Params**: `from_date, to_date, format`
  - **Response**: Report data or file
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **GET** `/api/v1/admin/reports/restaurants`
  - **Purpose**: Generate restaurant performance report
  - **Query Params**: `from_date, to_date, format`
  - **Response**: Report data or file
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/reports/delivery-partners`
  - **Purpose**: Generate delivery partner report
  - **Query Params**: `from_date, to_date, format`
  - **Response**: Report data or file
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **GET** `/api/v1/admin/reports/financial`
  - **Purpose**: Generate financial report
  - **Query Params**: `from_date, to_date, format`
  - **Response**: Report data or file
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

---

## ⚙️ 12. System Settings APIs

### General Settings
- [ ] **GET** `/api/v1/admin/settings/general`
  - **Purpose**: Get general system settings
  - **Response**: `{ settings }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **PUT** `/api/v1/admin/settings/general`
  - **Purpose**: Update general settings
  - **Request**: Settings object
  - **Response**: `{ settings }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

### Business Settings
- [ ] **GET** `/api/v1/admin/settings/business`
  - **Purpose**: Get business settings
  - **Response**: `{ platform_fee, delivery_fee, tax_rate, currency }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **PUT** `/api/v1/admin/settings/business`
  - **Purpose**: Update business settings
  - **Request**: Business settings
  - **Response**: `{ settings }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

### Admin User Management
- [ ] **GET** `/api/v1/admin/settings/admins`
  - **Purpose**: Get all admin users
  - **Response**: `{ admins[] }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **POST** `/api/v1/admin/settings/admins`
  - **Purpose**: Create new admin user
  - **Request**: `{ email, password, first_name, last_name, permissions }`
  - **Response**: `{ admin }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **PUT** `/api/v1/admin/settings/admins/{admin_id}`
  - **Purpose**: Update admin user
  - **Request**: Admin details
  - **Response**: `{ admin }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

- [ ] **DELETE** `/api/v1/admin/settings/admins/{admin_id}`
  - **Purpose**: Delete admin user
  - **Response**: `{ message }`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

---

## 🔄 WebSocket Events

### Real-time Updates
- [ ] **WS** `/ws/admin/orders`
  - **Purpose**: Real-time order updates
  - **Events**: `order_created`, `order_updated`, `order_status_changed`
  - **Status**: ❌ Not Started
  - **Priority**: 🟠 High

- [ ] **WS** `/ws/admin/delivery-tracking`
  - **Purpose**: Real-time delivery partner location
  - **Events**: `location_updated`
  - **Status**: ❌ Not Started
  - **Priority**: 🟡 Medium

---

## 📝 Notes & Considerations

### API Development Guidelines
1. **Authentication**: All admin APIs require JWT authentication with admin role
2. **Rate Limiting**: Implement rate limiting for all endpoints
3. **Pagination**: Use consistent pagination (page, page_size, total)
4. **Error Handling**: Standardized error responses
5. **Logging**: Log all admin actions for audit trail
6. **Validation**: Strict input validation using Pydantic models

### Priority Legend
- 🔴 **Critical**: Must have for MVP
- 🟠 **High**: Important for launch
- 🟡 **Medium**: Nice to have
- 🟢 **Low**: Future enhancement

### Status Legend
- ✅ **Completed**: API implemented and tested
- 🔄 **In Progress**: Currently being developed
- ❌ **Not Started**: Not yet started

---

**Last Updated**: 2026-01-02  
**Next Review**: Weekly during development  
**Maintained By**: Backend Development Team
