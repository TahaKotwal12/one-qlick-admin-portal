# OneQlick Admin Panel - Application Pages & Routes Structure

> **Purpose**: Complete reference of all pages, routes, and their components in the admin panel application.  
> **Last Updated**: 2026-01-02  
> **Framework**: Next.js 14 (App Router)

---

## 📁 Application Structure Overview

```
app/
├── (auth)/                    # Authentication routes (no layout)
│   ├── login/
│   ├── forgot-password/
│   └── reset-password/
├── (dashboard)/              # Main dashboard routes (with sidebar layout)
│   ├── (home)/
│   ├── users/
│   ├── restaurants/
│   ├── orders/
│   ├── delivery-partners/
│   ├── menu/
│   ├── coupons/
│   ├── financials/
│   ├── reviews/
│   ├── notifications/
│   ├── reports/
│   └── settings/
└── api/                      # API routes (if needed)
```

---

## 🔐 Authentication Routes

### Route Group: `(auth)`
**Layout**: Minimal layout without sidebar/header  
**Access**: Public (unauthenticated users only)

| Route | File Path | Purpose | Components | Priority |
|-------|-----------|---------|------------|----------|
| `/login` | `app/(auth)/login/page.tsx` | Admin login page | LoginForm, Logo | 🔴 Critical |
| `/forgot-password` | `app/(auth)/forgot-password/page.tsx` | Request password reset | ForgotPasswordForm | 🟡 Medium |
| `/reset-password` | `app/(auth)/reset-password/page.tsx` | Reset password with token | ResetPasswordForm | 🟡 Medium |

### Page Details

#### `/login`
```typescript
// app/(auth)/login/page.tsx
Components:
  - LoginForm (email, password, remember me)
  - Logo
  - Background gradient/image
  
Features:
  - Form validation (Zod)
  - Error handling
  - Loading states
  - Redirect to dashboard on success
  
API Calls:
  - POST /api/v1/auth/admin/login
```

#### `/forgot-password`
```typescript
// app/(auth)/forgot-password/page.tsx
Components:
  - ForgotPasswordForm (email input)
  - Back to login link
  
Features:
  - Email validation
  - Success message
  - Resend timer
  
API Calls:
  - POST /api/v1/auth/admin/forgot-password
```

#### `/reset-password`
```typescript
// app/(auth)/reset-password/page.tsx
Components:
  - ResetPasswordForm (new password, confirm password)
  - Token validation
  
Features:
  - Password strength indicator
  - Token expiry handling
  
API Calls:
  - POST /api/v1/auth/admin/reset-password
```

---

## 🏠 Dashboard Routes

### Route Group: `(dashboard)`
**Layout**: Full dashboard layout with sidebar, header, breadcrumbs  
**Access**: Protected (authenticated admin users only)

---

## 📊 1. Dashboard Home

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/` | `app/(dashboard)/page.tsx` | Main dashboard overview | 🔴 Critical |

### Page: `/` (Dashboard Home)
```typescript
// app/(dashboard)/page.tsx

Sections:
  1. Metric Cards Row
     - Total Orders (today, this week, this month)
     - Total Revenue (today, this week, this month)
     - Active Users (online now, today)
     - Active Restaurants (open now, total active)
  
  2. Charts Section
     - Revenue Trend Chart (line chart, last 30 days)
     - Order Status Distribution (pie/donut chart)
     - Popular Cuisines (bar chart)
  
  3. Recent Activity Feed
     - New orders
     - New user registrations
     - New restaurant applications
     - Recent reviews
  
  4. Quick Actions
     - View pending restaurant approvals
     - View active orders
     - Send notification
     - Generate report

Components:
  - MetricCard
  - RevenueChart (Recharts)
  - OrderStatusChart (Recharts)
  - ActivityFeed
  - QuickActionButtons

API Calls:
  - GET /api/v1/admin/analytics/dashboard
  - GET /api/v1/admin/analytics/revenue-trend
  - GET /api/v1/admin/analytics/order-status-distribution
  - WS /ws/admin/orders (real-time updates)
```

---

## 👥 2. User Management Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/users` | `app/(dashboard)/users/page.tsx` | Users list view | 🔴 Critical |
| `/users/[id]` | `app/(dashboard)/users/[id]/page.tsx` | User detail view | 🔴 Critical |

### Page: `/users` (Users List)
```typescript
// app/(dashboard)/users/page.tsx

Layout:
  - Page header with title and actions
  - Search bar
  - Filters row (role, status, verification, date range)
  - Data table
  - Pagination

Components:
  - PageHeader
  - UserSearch
  - UserFilters (role, status, email_verified, phone_verified, date range)
  - UsersTable (TanStack Table)
    Columns:
      - Avatar + Name
      - Email
      - Phone
      - Role (badge)
      - Status (badge)
      - Verified (email/phone icons)
      - Loyalty Points
      - Created Date
      - Actions (view, edit, suspend/activate)
  - Pagination
  - BulkActions (export CSV, bulk status update)

Features:
  - Server-side pagination
  - Multi-column sorting
  - Advanced filtering
  - Search (name, email, phone)
  - Export to CSV
  - Bulk actions

API Calls:
  - GET /api/v1/admin/users
  - PATCH /api/v1/admin/users/{id}/status
  - GET /api/v1/admin/users/export
```

### Page: `/users/[id]` (User Detail)
```typescript
// app/(dashboard)/users/[id]/page.tsx

Layout:
  - Page header with user name and status badge
  - Action buttons (edit, suspend/activate, delete)
  - Tabbed interface

Tabs:
  1. Profile Tab
     - Personal information
     - Contact details
     - Verification status
     - Account status
     - Loyalty points
     - Created/Updated dates
  
  2. Addresses Tab
     - List of saved addresses
     - Default address indicator
     - Delete address action
  
  3. Orders Tab
     - Order history table
     - Filters (status, date range)
     - Order summary stats
  
  4. Wallet Tab
     - Current balance
     - Transaction history
     - Add/deduct balance actions
  
  5. Sessions Tab
     - Active sessions list
     - Device information
     - Last activity
     - Revoke session action
  
  6. Analytics Tab
     - Order frequency chart
     - Spending pattern chart
     - Favorite restaurants
     - Favorite cuisines

Components:
  - UserProfileTab
  - UserAddressesTab
  - UserOrdersTab
  - UserWalletTab
  - UserSessionsTab
  - UserAnalyticsTab
  - EditUserModal
  - UpdateStatusModal

API Calls:
  - GET /api/v1/admin/users/{id}
  - GET /api/v1/admin/users/{id}/addresses
  - GET /api/v1/admin/users/{id}/orders
  - GET /api/v1/admin/users/{id}/sessions
  - PUT /api/v1/admin/users/{id}
  - PATCH /api/v1/admin/users/{id}/status
```

---

## 🏪 3. Restaurant Management Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/restaurants` | `app/(dashboard)/restaurants/page.tsx` | Restaurants list | 🔴 Critical |
| `/restaurants/pending` | `app/(dashboard)/restaurants/pending/page.tsx` | Pending approvals | 🔴 Critical |
| `/restaurants/[id]` | `app/(dashboard)/restaurants/[id]/page.tsx` | Restaurant detail | 🔴 Critical |
| `/restaurants/[id]/menu` | `app/(dashboard)/restaurants/[id]/menu/page.tsx` | Menu management | 🟠 High |

### Page: `/restaurants` (Restaurants List)
```typescript
// app/(dashboard)/restaurants/page.tsx

Layout:
  - Page header with title and "Add Restaurant" button
  - View toggle (table/grid)
  - Search bar
  - Filters row
  - Data table or grid view
  - Pagination

Components:
  - PageHeader
  - ViewToggle (table/grid)
  - RestaurantSearch
  - RestaurantFilters (status, cuisine, city, rating, open/closed)
  - RestaurantsTable
    Columns:
      - Image + Name
      - Owner
      - Cuisine Type
      - City
      - Rating (stars + count)
      - Status (badge)
      - Is Open (toggle)
      - Created Date
      - Actions (view, edit, approve/suspend)
  - RestaurantGrid (alternative view)
  - Pagination
  - CreateRestaurantModal

API Calls:
  - GET /api/v1/admin/restaurants
  - POST /api/v1/admin/restaurants
  - PATCH /api/v1/admin/restaurants/{id}/status
  - PATCH /api/v1/admin/restaurants/{id}/open-status
```

### Page: `/restaurants/pending` (Pending Approvals)
```typescript
// app/(dashboard)/restaurants/pending/page.tsx

Layout:
  - Page header with pending count
  - List of pending restaurants
  - Approval workflow interface

Components:
  - PendingRestaurantsList
  - RestaurantApprovalCard
    - Restaurant details
    - Owner information
    - Documents viewer
    - Approve/Reject buttons
  - DocumentViewer (PDF, images)
  - ApprovalModal
  - RejectionModal (with reason)

Features:
  - Document verification
  - Approval notes
  - Rejection reasons
  - Email notifications

API Calls:
  - GET /api/v1/admin/restaurants/pending-approval
  - GET /api/v1/admin/restaurants/{id}/documents
  - POST /api/v1/admin/restaurants/{id}/approve
  - POST /api/v1/admin/restaurants/{id}/reject
```

### Page: `/restaurants/[id]` (Restaurant Detail)
```typescript
// app/(dashboard)/restaurants/[id]/page.tsx

Layout:
  - Cover image header
  - Restaurant name, rating, status
  - Action buttons (edit, approve, suspend, delete)
  - Tabbed interface

Tabs:
  1. Basic Info Tab
     - Restaurant details
     - Owner information
     - Location (map)
     - Operating hours
     - Fees and charges
     - Images
  
  2. Menu Tab
     - Menu categories
     - Menu items list
     - Add/edit items
     - Item availability toggle
  
  3. Orders Tab
     - Restaurant's order history
     - Order statistics
     - Revenue analytics
  
  4. Offers Tab
     - Active offers
     - Expired offers
     - Create new offer
  
  5. Reviews Tab
     - Customer reviews
     - Rating breakdown
     - Flagged reviews
  
  6. Analytics Tab
     - Revenue trends
     - Popular items
     - Peak hours
     - Customer demographics

Components:
  - RestaurantHeader
  - RestaurantInfoTab
  - RestaurantMenuTab
  - RestaurantOrdersTab
  - RestaurantOffersTab
  - RestaurantReviewsTab
  - RestaurantAnalyticsTab
  - EditRestaurantModal

API Calls:
  - GET /api/v1/admin/restaurants/{id}
  - GET /api/v1/admin/restaurants/{id}/menu
  - GET /api/v1/admin/restaurants/{id}/orders
  - GET /api/v1/admin/restaurants/{id}/reviews
  - GET /api/v1/admin/restaurants/{id}/analytics
  - PUT /api/v1/admin/restaurants/{id}
```

### Page: `/restaurants/[id]/menu` (Menu Management)
```typescript
// app/(dashboard)/restaurants/[id]/menu/page.tsx

Layout:
  - Restaurant name breadcrumb
  - Menu management interface
  - Category sidebar
  - Items grid/list

Components:
  - CategorySidebar
  - MenuItemsGrid
  - AddItemModal
  - EditItemModal
  - BulkImportModal

Features:
  - Drag-and-drop reordering
  - Bulk import (CSV)
  - Item availability toggle
  - Category management

API Calls:
  - GET /api/v1/admin/restaurants/{id}/menu
  - POST /api/v1/admin/restaurants/{id}/menu/items
  - PUT /api/v1/admin/restaurants/{id}/menu/items/{item_id}
  - DELETE /api/v1/admin/restaurants/{id}/menu/items/{item_id}
```

---

## 📦 4. Order Management Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/orders` | `app/(dashboard)/orders/page.tsx` | Orders list | 🔴 Critical |
| `/orders/[id]` | `app/(dashboard)/orders/[id]/page.tsx` | Order detail | 🔴 Critical |

### Page: `/orders` (Orders List)
```typescript
// app/(dashboard)/orders/page.tsx

Layout:
  - Page header with real-time order count
  - Status tabs (All, Pending, Confirmed, Preparing, Delivered, Cancelled)
  - Search bar (order number, customer name)
  - Filters row
  - Data table with real-time updates
  - Pagination

Components:
  - PageHeader
  - StatusTabs
  - OrderSearch
  - OrderFilters (status, payment_status, date range, restaurant, customer)
  - OrdersTable (with real-time updates)
    Columns:
      - Order Number
      - Customer Name
      - Restaurant Name
      - Items Count
      - Total Amount
      - Payment Status (badge)
      - Order Status (badge with timeline)
      - Delivery Partner
      - Created Time (relative)
      - Actions (view, update status, cancel)
  - Pagination
  - ExportButton

Features:
  - Real-time order updates (WebSocket)
  - Auto-refresh
  - Sound notification for new orders
  - Status badge with color coding
  - Quick status update

API Calls:
  - GET /api/v1/admin/orders
  - PATCH /api/v1/admin/orders/{id}/status
  - WS /ws/admin/orders (real-time)
```

### Page: `/orders/[id]` (Order Detail)
```typescript
// app/(dashboard)/orders/[id]/page.tsx

Layout:
  - Order number header with status
  - Action buttons (update status, cancel, refund, assign delivery)
  - Three-column layout

Sections:
  1. Left Column - Order Details
     - Order summary
     - Order items list
     - Pricing breakdown
     - Special instructions
  
  2. Middle Column - Parties Information
     - Customer card (name, phone, address)
     - Restaurant card (name, phone, address)
     - Delivery partner card (name, phone, vehicle)
  
  3. Right Column - Tracking & Timeline
     - Live tracking map
     - Order timeline
     - Status history
     - Estimated delivery time

Components:
  - OrderHeader
  - OrderSummary
  - OrderItemsList
  - PricingBreakdown
  - CustomerCard
  - RestaurantCard
  - DeliveryPartnerCard
  - LiveTrackingMap (Google Maps)
  - OrderTimeline
  - UpdateStatusModal
  - CancelOrderModal
  - RefundModal
  - AssignDeliveryModal

Features:
  - Real-time location tracking
  - Status update workflow
  - Cancellation with reason
  - Refund processing
  - Manual delivery assignment
  - Print invoice

API Calls:
  - GET /api/v1/admin/orders/{id}
  - GET /api/v1/admin/orders/{id}/tracking
  - GET /api/v1/admin/orders/{id}/timeline
  - PATCH /api/v1/admin/orders/{id}/status
  - POST /api/v1/admin/orders/{id}/cancel
  - POST /api/v1/admin/orders/{id}/refund
  - POST /api/v1/admin/orders/{id}/assign-delivery
```

---

## 🚴 5. Delivery Partner Management Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/delivery-partners` | `app/(dashboard)/delivery-partners/page.tsx` | Partners list | 🔴 Critical |
| `/delivery-partners/[id]` | `app/(dashboard)/delivery-partners/[id]/page.tsx` | Partner detail | 🔴 Critical |

### Page: `/delivery-partners` (Partners List)
```typescript
// app/(dashboard)/delivery-partners/page.tsx

Layout:
  - Page header with online partners count
  - Status filter tabs (All, Online, Offline, On Delivery)
  - Search bar
  - Filters row
  - Data table
  - Map view toggle

Components:
  - PageHeader
  - StatusTabs
  - PartnerSearch
  - PartnerFilters (status, availability, city, rating)
  - DeliveryPartnersTable
    Columns:
      - Avatar + Name
      - Phone
      - Vehicle Type
      - Current Status (online/offline/on delivery)
      - Current Location (city)
      - Rating (stars)
      - Total Deliveries
      - Earnings (this month)
      - Actions (view, suspend/activate)
  - MapView (shows online partners' locations)
  - Pagination

API Calls:
  - GET /api/v1/admin/delivery-partners
  - GET /api/v1/admin/delivery-partners/available
  - PATCH /api/v1/admin/delivery-partners/{id}/status
```

### Page: `/delivery-partners/[id]` (Partner Detail)
```typescript
// app/(dashboard)/delivery-partners/[id]/page.tsx

Layout:
  - Partner header with photo and status
  - Action buttons (edit, suspend/activate, delete)
  - Tabbed interface

Tabs:
  1. Profile Tab
     - Personal information
     - Contact details
     - Vehicle information
     - Documents (license, vehicle registration)
     - Verification status
  
  2. Performance Tab
     - Performance metrics
     - Rating breakdown
     - Delivery statistics
     - Earnings summary
  
  3. Current Location Tab
     - Live location map
     - Last updated time
     - Current delivery (if any)
  
  4. Delivery History Tab
     - Completed deliveries table
     - Filters (date range, status)
     - Delivery statistics
  
  5. Reviews Tab
     - Customer reviews
     - Rating trends
     - Flagged reviews

Components:
  - PartnerHeader
  - PartnerProfileTab
  - PartnerPerformanceTab
  - PartnerLocationTab
  - PartnerDeliveriesTab
  - PartnerReviewsTab
  - EditPartnerModal

API Calls:
  - GET /api/v1/admin/delivery-partners/{id}
  - GET /api/v1/admin/delivery-partners/{id}/orders
  - GET /api/v1/admin/delivery-partners/{id}/analytics
  - GET /api/v1/admin/delivery-partners/{id}/location
  - PUT /api/v1/admin/delivery-partners/{id}
```

---

## 🍔 6. Menu Management Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/menu/categories` | `app/(dashboard)/menu/categories/page.tsx` | Global categories | 🟠 High |
| `/menu/items` | `app/(dashboard)/menu/items/page.tsx` | All menu items | 🟡 Medium |

### Page: `/menu/categories` (Global Categories)
```typescript
// app/(dashboard)/menu/categories/page.tsx

Layout:
  - Page header with "Add Category" button
  - Categories tree view
  - Category details panel

Components:
  - PageHeader
  - CategoryTree (hierarchical view)
  - CategoryCard
  - CreateCategoryModal
  - EditCategoryModal
  - DeleteConfirmDialog

Features:
  - Hierarchical categories
  - Drag-and-drop reordering
  - Category icons/images
  - Parent-child relationships

API Calls:
  - GET /api/v1/admin/categories
  - POST /api/v1/admin/categories
  - PUT /api/v1/admin/categories/{id}
  - DELETE /api/v1/admin/categories/{id}
```

---

## 🎟️ 7. Coupon Management Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/coupons` | `app/(dashboard)/coupons/page.tsx` | Coupons list | 🟠 High |
| `/coupons/create` | `app/(dashboard)/coupons/create/page.tsx` | Create coupon | 🟠 High |
| `/coupons/[id]` | `app/(dashboard)/coupons/[id]/page.tsx` | Coupon detail | 🟡 Medium |

### Page: `/coupons` (Coupons List)
```typescript
// app/(dashboard)/coupons/page.tsx

Layout:
  - Page header with "Create Coupon" button
  - Status tabs (All, Active, Expired, Scheduled)
  - Search bar
  - Filters row
  - Coupons grid/table
  - Pagination

Components:
  - PageHeader
  - StatusTabs
  - CouponSearch
  - CouponFilters (status, type, date range)
  - CouponsTable
    Columns:
      - Coupon Code
      - Type (percentage/fixed)
      - Discount Value
      - Min Order Amount
      - Usage (used/limit)
      - Valid From - Valid Until
      - Status (badge)
      - Actions (view, edit, deactivate, delete)
  - Pagination

API Calls:
  - GET /api/v1/admin/coupons
  - DELETE /api/v1/admin/coupons/{id}
```

### Page: `/coupons/create` (Create Coupon)
```typescript
// app/(dashboard)/coupons/create/page.tsx

Layout:
  - Page header
  - Coupon creation form

Components:
  - CouponForm
    Fields:
      - Coupon Code (auto-generate option)
      - Discount Type (percentage/fixed)
      - Discount Value
      - Min Order Amount
      - Max Discount Amount
      - Valid From Date
      - Valid Until Date
      - Usage Limit (per user, total)
      - Applicable To (all users, new users, specific users)
      - Applicable Restaurants (all, specific)
      - Description
      - Terms & Conditions

Features:
  - Code generator
  - Date range picker
  - Preview card
  - Validation

API Calls:
  - POST /api/v1/admin/coupons
```

---

## 💰 8. Financial Management Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/financials` | `app/(dashboard)/financials/page.tsx` | Revenue dashboard | 🔴 Critical |
| `/financials/settlements` | `app/(dashboard)/financials/settlements/page.tsx` | All settlements | 🔴 Critical |
| `/financials/restaurant-settlements` | `app/(dashboard)/financials/restaurant-settlements/page.tsx` | Restaurant settlements | 🔴 Critical |
| `/financials/delivery-payouts` | `app/(dashboard)/financials/delivery-payouts/page.tsx` | Delivery payouts | 🔴 Critical |
| `/financials/refunds` | `app/(dashboard)/financials/refunds/page.tsx` | Refunds | 🟠 High |

### Page: `/financials` (Revenue Dashboard)
```typescript
// app/(dashboard)/financials/page.tsx

Layout:
  - Page header with date range selector
  - Metric cards row
  - Charts section
  - Recent transactions table

Sections:
  1. Metric Cards
     - Total Revenue
     - Platform Fee Earned
     - Pending Settlements
     - Refunds Processed
  
  2. Charts
     - Revenue Trend (line chart)
     - Revenue Breakdown (pie chart: orders, delivery, platform fee)
     - Top Earning Restaurants (bar chart)
  
  3. Recent Transactions
     - Latest transactions table
     - Quick filters

Components:
  - DateRangePicker
  - MetricCard
  - RevenueChart
  - RevenueBreakdownChart
  - TopRestaurantsChart
  - TransactionsTable

API Calls:
  - GET /api/v1/admin/financials/revenue
```

### Page: `/financials/settlements` (All Settlements)
```typescript
// app/(dashboard)/financials/settlements/page.tsx

Layout:
  - Page header
  - Type tabs (All, Restaurant, Delivery Partner)
  - Filters row
  - Settlements table
  - Pagination

Components:
  - StatusTabs
  - SettlementFilters (status, type, date range)
  - SettlementsTable
    Columns:
      - Settlement ID
      - Type (restaurant/delivery)
      - Party Name
      - Amount
      - Status (pending/processing/completed)
      - Period (from - to)
      - Created Date
      - Actions (view, process, download)
  - SettlementDetailModal

API Calls:
  - GET /api/v1/admin/financials/settlements
  - GET /api/v1/admin/financials/settlements/{id}
```

### Page: `/financials/restaurant-settlements` (Restaurant Settlements)
```typescript
// app/(dashboard)/financials/restaurant-settlements/page.tsx

Layout:
  - Page header with "Process Settlement" button
  - Filters row
  - Settlements table
  - Pagination

Components:
  - PageHeader
  - SettlementFilters
  - RestaurantSettlementsTable
  - ProcessSettlementModal
  - SettlementDetailModal

Features:
  - Bulk settlement processing
  - Download settlement reports
  - Email settlement details

API Calls:
  - GET /api/v1/admin/financials/restaurant-settlements
  - POST /api/v1/admin/financials/restaurant-settlements/{restaurant_id}/process
```

---

## ⭐ 9. Reviews & Ratings Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/reviews` | `app/(dashboard)/reviews/page.tsx` | All reviews | 🟡 Medium |
| `/reviews/flagged` | `app/(dashboard)/reviews/flagged/page.tsx` | Flagged reviews | 🟡 Medium |

### Page: `/reviews` (All Reviews)
```typescript
// app/(dashboard)/reviews/page.tsx

Layout:
  - Page header
  - Type tabs (All, Restaurant, Delivery Partner)
  - Filters row
  - Reviews table
  - Pagination

Components:
  - TypeTabs
  - ReviewFilters (type, rating, flagged, date range)
  - ReviewsTable
    Columns:
      - Customer Name
      - Review For (restaurant/delivery partner)
      - Rating (stars)
      - Review Text
      - Flagged (icon)
      - Created Date
      - Actions (view, flag/unflag, delete)
  - ReviewDetailModal
  - ModerationModal

API Calls:
  - GET /api/v1/admin/reviews
  - PATCH /api/v1/admin/reviews/{id}/flag
  - DELETE /api/v1/admin/reviews/{id}
```

---

## 🔔 10. Notifications Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/notifications` | `app/(dashboard)/notifications/page.tsx` | Notification history | 🟠 High |
| `/notifications/send` | `app/(dashboard)/notifications/send/page.tsx` | Send notification | 🟠 High |

### Page: `/notifications` (Notification History)
```typescript
// app/(dashboard)/notifications/page.tsx

Layout:
  - Page header with "Send Notification" button
  - Type tabs (All, Push, Email, SMS)
  - Filters row
  - Notifications table
  - Pagination

Components:
  - PageHeader
  - TypeTabs
  - NotificationFilters (type, status, date range)
  - NotificationsTable
    Columns:
      - Title
      - Type (push/email/sms)
      - Recipients Count
      - Sent Date
      - Status (sent/scheduled/failed)
      - Delivery Stats (delivered/opened/clicked)
      - Actions (view, resend)
  - NotificationDetailModal

API Calls:
  - GET /api/v1/admin/notifications
  - GET /api/v1/admin/notifications/{id}
  - GET /api/v1/admin/notifications/{id}/analytics
```

### Page: `/notifications/send` (Send Notification)
```typescript
// app/(dashboard)/notifications/send/page.tsx

Layout:
  - Page header
  - Notification form
  - Preview panel

Components:
  - NotificationForm
    Fields:
      - Title
      - Message
      - Type (push/email/sms/all)
      - Recipients (all users, specific role, specific users, user segment)
      - Schedule (send now/schedule for later)
      - Image (optional, for push)
      - Action URL (optional)
  - RecipientSelector
  - PreviewPanel
  - ScheduleModal

Features:
  - Rich text editor
  - Recipient selection
  - Scheduling
  - Preview for different devices
  - Test send

API Calls:
  - POST /api/v1/admin/notifications/send
  - POST /api/v1/admin/notifications/broadcast
```

---

## 📊 11. Reports & Analytics Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/reports` | `app/(dashboard)/reports/page.tsx` | Reports dashboard | 🟠 High |
| `/reports/sales` | `app/(dashboard)/reports/sales/page.tsx` | Sales report | 🟠 High |
| `/reports/users` | `app/(dashboard)/reports/users/page.tsx` | User report | 🟡 Medium |
| `/reports/restaurants` | `app/(dashboard)/reports/restaurants/page.tsx` | Restaurant report | 🟡 Medium |
| `/reports/delivery` | `app/(dashboard)/reports/delivery/page.tsx` | Delivery report | 🟡 Medium |
| `/reports/financial` | `app/(dashboard)/reports/financial/page.tsx` | Financial report | 🟠 High |
| `/reports/builder` | `app/(dashboard)/reports/builder/page.tsx` | Custom report builder | 🟢 Low |

### Page: `/reports` (Reports Dashboard)
```typescript
// app/(dashboard)/reports/page.tsx

Layout:
  - Page header
  - Pre-built reports grid
  - Recent reports list

Components:
  - ReportCard (for each pre-built report)
  - RecentReportsList
  - QuickReportGenerator

Pre-built Reports:
  - Sales Report
  - User Report
  - Restaurant Performance Report
  - Delivery Partner Report
  - Financial Report
  - Custom Reports (saved)

Features:
  - Quick generate
  - Schedule reports
  - Export formats (PDF, Excel, CSV)
```

### Page: `/reports/sales` (Sales Report)
```typescript
// app/(dashboard)/reports/sales/page.tsx

Layout:
  - Page header with export button
  - Date range selector
  - Filters
  - Report sections

Sections:
  1. Summary Metrics
     - Total Orders
     - Total Revenue
     - Average Order Value
     - Growth Rate
  
  2. Charts
     - Sales Trend
     - Sales by Category
     - Sales by Restaurant
     - Sales by Time of Day
  
  3. Detailed Table
     - Order-level data
     - Exportable

Components:
  - DateRangePicker
  - ReportFilters
  - SummaryCards
  - SalesCharts
  - DetailedTable
  - ExportButton (PDF, Excel, CSV)

API Calls:
  - GET /api/v1/admin/reports/sales
```

### Page: `/reports/builder` (Custom Report Builder)
```typescript
// app/(dashboard)/reports/builder/page.tsx

Layout:
  - Page header
  - Builder interface (drag-and-drop)
  - Preview panel

Components:
  - DataSourceSelector
  - MetricSelector
  - FilterBuilder
  - VisualizationSelector
  - ReportPreview
  - SaveReportModal
  - ScheduleReportModal

Features:
  - Drag-and-drop interface
  - Custom metrics
  - Advanced filters
  - Multiple visualizations
  - Save and schedule
  - Share reports

API Calls:
  - POST /api/v1/admin/reports/custom
  - GET /api/v1/admin/reports/custom/{id}
```

---

## ⚙️ 12. Settings Routes

| Route | File Path | Purpose | Priority |
|-------|-----------|---------|----------|
| `/settings` | `app/(dashboard)/settings/page.tsx` | General settings | 🟡 Medium |
| `/settings/business` | `app/(dashboard)/settings/business/page.tsx` | Business settings | 🟠 High |
| `/settings/admins` | `app/(dashboard)/settings/admins/page.tsx` | Admin users | 🟠 High |
| `/settings/email` | `app/(dashboard)/settings/email/page.tsx` | Email config | 🟡 Medium |
| `/settings/sms` | `app/(dashboard)/settings/sms/page.tsx` | SMS config | 🟡 Medium |
| `/settings/notifications` | `app/(dashboard)/settings/notifications/page.tsx` | Notification settings | 🟡 Medium |

### Page: `/settings` (General Settings)
```typescript
// app/(dashboard)/settings/page.tsx

Layout:
  - Settings sidebar navigation
  - Settings content area

Sections:
  - Application Name
  - Logo Upload
  - Favicon Upload
  - Contact Information
  - Social Media Links
  - Timezone
  - Language
  - Date Format

Components:
  - SettingsSidebar
  - GeneralSettingsForm
  - ImageUpload
  - SaveButton

API Calls:
  - GET /api/v1/admin/settings/general
  - PUT /api/v1/admin/settings/general
```

### Page: `/settings/business` (Business Settings)
```typescript
// app/(dashboard)/settings/business/page.tsx

Layout:
  - Settings sidebar
  - Business settings form

Sections:
  - Platform Fee (percentage)
  - Delivery Fee (default)
  - Tax Rate
  - Currency
  - Min Order Amount
  - Max Delivery Distance
  - Commission Rates (restaurant, delivery)

Components:
  - SettingsSidebar
  - BusinessSettingsForm
  - SaveButton

API Calls:
  - GET /api/v1/admin/settings/business
  - PUT /api/v1/admin/settings/business
```

### Page: `/settings/admins` (Admin Users)
```typescript
// app/(dashboard)/settings/admins/page.tsx

Layout:
  - Page header with "Add Admin" button
  - Admin users table

Components:
  - PageHeader
  - AdminUsersTable
    Columns:
      - Name
      - Email
      - Role (Super Admin, Admin, Operations, Support)
      - Status
      - Last Login
      - Actions (edit, deactivate, delete)
  - CreateAdminModal
  - EditAdminModal
  - PermissionsModal

Features:
  - Role-based permissions
  - Activity log
  - Two-factor authentication

API Calls:
  - GET /api/v1/admin/settings/admins
  - POST /api/v1/admin/settings/admins
  - PUT /api/v1/admin/settings/admins/{id}
  - DELETE /api/v1/admin/settings/admins/{id}
```

---

## 📱 Responsive Design Requirements

All pages must be responsive and work on:
- **Desktop**: 1920px, 1440px, 1366px
- **Tablet**: 1024px, 768px
- **Mobile**: 375px, 414px (view-only for critical features)

---

## 🎨 Design System Requirements

### Colors
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Neutral: Gray scale

### Typography
- Font Family: Inter
- Headings: 24px, 20px, 18px, 16px
- Body: 14px, 12px

### Components (shadcn/ui)
- Button, Input, Select, Checkbox, Radio
- Table, Card, Badge, Avatar
- Dialog, Sheet, Popover, Dropdown
- Toast, Alert, Tabs, Accordion

---

## 🔒 Access Control

### Role-Based Access
- **Super Admin**: Full access
- **Admin**: All except system settings
- **Operations**: Users, Restaurants, Orders, Delivery
- **Support**: View-only + basic actions

### Protected Routes
All dashboard routes require authentication and appropriate role permissions.

---

## 📊 Summary Statistics

| Category | Total Pages | Critical | High | Medium | Low |
|----------|-------------|----------|------|--------|-----|
| Authentication | 3 | 1 | 0 | 2 | 0 |
| Dashboard | 1 | 1 | 0 | 0 | 0 |
| Users | 2 | 2 | 0 | 0 | 0 |
| Restaurants | 4 | 3 | 1 | 0 | 0 |
| Orders | 2 | 2 | 0 | 0 | 0 |
| Delivery Partners | 2 | 2 | 0 | 0 | 0 |
| Menu | 2 | 0 | 1 | 1 | 0 |
| Coupons | 3 | 0 | 2 | 1 | 0 |
| Financials | 5 | 3 | 1 | 0 | 0 |
| Reviews | 2 | 0 | 0 | 2 | 0 |
| Notifications | 2 | 0 | 2 | 0 | 0 |
| Reports | 7 | 0 | 3 | 3 | 1 |
| Settings | 6 | 0 | 2 | 4 | 0 |
| **TOTAL** | **41** | **14** | **14** | **13** | **1** |

---

**Last Updated**: 2026-01-02  
**Maintained By**: Development Team  
**Status**: Ready for Implementation
