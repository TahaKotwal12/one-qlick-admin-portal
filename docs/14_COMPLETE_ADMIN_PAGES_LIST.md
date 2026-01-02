# OneQlick Admin Panel - Complete Pages & Features List

> **Purpose**: Comprehensive list of ALL admin panel pages based on analysis of User App, Partner App, and Backend APIs  
> **Created**: 2026-01-02  
> **Analysis**: User App (62 screens) + Partner App (41 screens) + Backend (6 API modules)

---

## 📊 Analysis Summary

### Applications Analyzed
1. **User App** (oneQlick-User-App)
   - 62 screens across 14 modules
   - Features: Auth, Onboarding, Restaurant browsing, Food ordering, Checkout, Payment, Order tracking, Profile management, Notifications

2. **Partner App** (oneqlick-partner-app)
   - 41 screens across 8 modules
   - Features: Auth, Delivery management, Restaurant order management, Profile, Notifications

3. **Backend APIs** (oneqlick-backend)
   - 6 API route files
   - Modules: Auth, Users, Restaurants, Food Items, Search
   - Database: 40+ tables with comprehensive schema

---

## 🎯 Complete Admin Panel Pages List

### **1. AUTHENTICATION & DASHBOARD** (4 pages)

#### 1.1 Login Page ✅ (CREATED)
- Email/password login
- Demo credentials support
- Forgot password link
- **Status**: ✅ Built

#### 1.2 Forgot Password Page
- Email input
- Send OTP
- Verify OTP
- Reset password

#### 1.3 Reset Password Page
- Token validation
- New password input
- Confirm password

#### 1.4 Dashboard / Home Page ✅ (CREATED)
- **Key Metrics Cards**:
  - Total Orders (today, week, month)
  - Total Revenue (today, week, month)
  - Active Users
  - Total Restaurants
  - Active Delivery Partners
  - Pending Approvals
  - Total Food Items
  - Average Order Value
- **Charts**:
  - Revenue trend (line chart)
  - Order status distribution (pie chart)
  - Popular cuisines (bar chart)
  - User growth (area chart)
  - Orders by time of day (line chart)
- **Quick Actions**:
  - Approve pending restaurants
  - View pending orders
  - Manage delivery partners
  - View flagged reviews
- **Recent Activity Feed**:
  - New orders
  - New user registrations
  - Restaurant approvals
  - Delivery completions
  - Refund requests
- **Real-time Updates** (WebSocket)
- **Status**: ✅ Built (basic version)

---

### **2. USER MANAGEMENT** (5 pages)

#### 2.1 Users List Page
- **Table Columns**:
  - Profile image
  - Name (first + last)
  - Email
  - Phone
  - Role (Customer, Admin, Delivery Partner, Restaurant Owner)
  - Status (Active, Suspended, Deleted)
  - Email verified
  - Phone verified
  - Loyalty points
  - Total orders
  - Total spent
  - Registration date
  - Last active
- **Filters**:
  - Role filter
  - Status filter
  - Verification status (email/phone)
  - Date range (registration date)
  - Search (name, email, phone)
- **Actions**:
  - View details
  - Edit user
  - Change status (suspend/activate)
  - Change role
  - Delete user
  - Send notification
  - Export to CSV/Excel
- **Bulk Actions**:
  - Bulk status update
  - Bulk delete
  - Bulk export

#### 2.2 User Detail Page
- **Tabs**:
  1. **Profile Tab**:
     - Personal info (name, email, phone, DOB, gender)
     - Profile image
     - Account status
     - Verification status
     - Loyalty points
     - Wallet balance
     - Created date
     - Last active
  2. **Addresses Tab**:
     - List of saved addresses
     - Default address indicator
     - Address type (Home, Work, Other)
     - Map view
     - Add/Edit/Delete address
  3. **Orders Tab**:
     - Order history table
     - Order status
     - Total amount
     - Date
     - Restaurant name
     - View order details
  4. **Wallet Tab**:
     - Current balance
     - Transaction history
     - Add/deduct balance
     - Refund history
  5. **Sessions Tab**:
     - Active sessions
     - Device info
     - IP address
     - Last active
     - Revoke session
  6. **Analytics Tab**:
     - Order frequency chart
     - Spending pattern
     - Favorite restaurants
     - Favorite cuisines
     - Average order value
- **Actions**:
  - Edit profile
  - Change password
  - Update status
  - Update role
  - Send notification
  - View order history

#### 2.3 Create User Page
- User form (name, email, phone, password, role)
- Profile image upload
- Address input
- Send verification email option

#### 2.4 Pending Users Page
- Users awaiting email verification
- Resend verification email
- Delete pending user
- Verification status

#### 2.5 User Analytics Page
- User growth chart
- User retention rate
- Active vs inactive users
- Users by role
- Users by location
- Registration trends

---

### **3. RESTAURANT MANAGEMENT** (8 pages)

#### 3.1 Restaurants List Page
- **View Options**: Table view / Grid view
- **Table Columns**:
  - Restaurant image
  - Name
  - Owner name
  - Cuisine type
  - City/Location
  - Rating (stars)
  - Total ratings
  - Status (Active, Inactive, Suspended, Pending Approval)
  - Is open (Yes/No)
  - Is veg/pure veg
  - Cost for two
  - Delivery fee
  - Platform fee
  - Total orders
  - Total revenue
  - Created date
- **Filters**:
  - Status filter
  - Cuisine type
  - City
  - Rating (min/max)
  - Is open
  - Is veg/pure veg
  - Search (name, owner)
- **Actions**:
  - View details
  - Edit restaurant
  - Change status
  - Toggle open/close
  - View menu
  - View orders
  - View reviews
  - View analytics
  - Delete restaurant
- **Bulk Actions**:
  - Bulk status update
  - Bulk export

#### 3.2 Restaurant Detail Page
- **Tabs**:
  1. **Basic Info Tab**:
     - Restaurant details (name, description, cuisine)
     - Owner information
     - Contact (phone, email)
     - Address with map
     - Images (main + cover)
     - Operating hours
     - Pricing (min order, delivery fee, platform fee, cost for two)
     - Veg options
     - Rating & reviews count
     - Status
  2. **Menu Tab**:
     - Categories list
     - Food items by category
     - Item details (name, price, description, image, veg/non-veg)
     - Add/Edit/Delete items
     - Bulk import menu
  3. **Orders Tab**:
     - Restaurant's order history
     - Order statistics
     - Revenue chart
  4. **Offers Tab**:
     - Active offers
     - Expired offers
     - Create new offer
     - Edit/Delete offer
  5. **Reviews Tab**:
     - Customer reviews
     - Rating distribution
     - Flag inappropriate reviews
  6. **Analytics Tab**:
     - Revenue trend
     - Popular items
     - Order frequency
     - Peak hours
     - Customer retention
  7. **Documents Tab** (for pending approval):
     - FSSAI license
     - Business registration
     - Owner ID proof
     - Bank details
- **Actions**:
  - Edit restaurant
  - Approve/Reject (if pending)
  - Change status
  - Toggle open/close
  - View on map

#### 3.3 Pending Restaurants Page
- Restaurants awaiting approval
- **Columns**:
  - Restaurant name
  - Owner name
  - Cuisine type
  - City
  - Submitted date
  - Documents status
- **Actions**:
  - View details
  - View documents
  - Approve
  - Reject (with reason)
  - Request more info
- **Document Viewer**:
  - View uploaded documents
  - Verify authenticity
  - Download documents

#### 3.4 Create Restaurant Page
- Restaurant form
- Owner selection/creation
- Address with map picker
- Operating hours selector
- Image upload (main + cover)
- Pricing configuration
- Initial menu setup

#### 3.5 Restaurant Approval Page
- Detailed view of pending restaurant
- Document verification checklist
- Approval/rejection form
- Email notification to owner

#### 3.6 Restaurant Menu Management Page
- Category management (add/edit/delete/reorder)
- Item management (add/edit/delete)
- Bulk import from CSV/Excel
- Menu preview
- Pricing management

#### 3.7 Restaurant Offers Page
- All restaurant offers
- Filter by restaurant
- Filter by status (active/expired)
- Create/Edit/Delete offers

#### 3.8 Restaurant Analytics Page
- Top performing restaurants
- Revenue by restaurant
- Orders by restaurant
- Rating distribution
- Cuisine popularity
- City-wise distribution

---

### **4. ORDER MANAGEMENT** (4 pages)

#### 4.1 Orders List Page
- **Status Tabs**:
  - All Orders
  - Pending
  - Confirmed
  - Preparing
  - Ready
  - Picked Up
  - Delivered
  - Cancelled
- **Table Columns**:
  - Order number
  - Customer name
  - Restaurant name
  - Delivery partner name
  - Order items count
  - Subtotal
  - Delivery fee
  - Discount
  - Total amount
  - Payment method
  - Payment status
  - Order status
  - Order time
  - Estimated delivery time
  - Actual delivery time
- **Filters**:
  - Status filter
  - Payment status
  - Payment method
  - Date range
  - Restaurant filter
  - Customer filter
  - Delivery partner filter
  - Search (order number, customer name)
- **Actions**:
  - View details
  - Update status
  - Cancel order
  - Refund order
  - Assign delivery partner
  - Print invoice
  - Track order
- **Real-time Updates** (WebSocket)

#### 4.2 Order Detail Page
- **3-Column Layout**:
  1. **Left Column - Order Summary**:
     - Order number
     - Order status with timeline
     - Order time
     - Estimated delivery
     - Actual delivery
     - Special instructions
  2. **Middle Column - Order Items**:
     - Item list with images
     - Quantity
     - Price
     - Customizations
     - Subtotal
     - Tax
     - Delivery fee
     - Discount (coupon)
     - Total amount
  3. **Right Column - Details**:
     - Customer card (name, phone, address)
     - Restaurant card (name, phone, address)
     - Delivery partner card (name, phone, location)
     - Payment details
- **Order Timeline**:
  - Placed
  - Confirmed
  - Preparing
  - Ready
  - Picked up
  - Delivered/Cancelled
  - Timestamps for each status
- **Live Tracking Map** (if in delivery)
- **Actions**:
  - Update status
  - Cancel order (with reason)
  - Refund order
  - Assign/reassign delivery partner
  - Print invoice
  - Contact customer
  - Contact restaurant
  - Contact delivery partner

#### 4.3 Order Timeline Page
- Visual timeline of order statuses
- Filter by date range
- Export timeline data

#### 4.4 Order Analytics Page
- Orders by status (pie chart)
- Orders by time of day (line chart)
- Orders by day of week (bar chart)
- Average order value
- Order completion rate
- Cancellation rate
- Average delivery time
- Peak order times

---

### **5. DELIVERY PARTNER MANAGEMENT** (4 pages)

#### 5.1 Delivery Partners List Page
- **Status Tabs**:
  - All Partners
  - Available
  - Busy (on delivery)
  - Offline
- **Table Columns**:
  - Profile image
  - Name
  - Phone
  - Email
  - Status (Active, Suspended, Offline)
  - Availability (Available, Busy)
  - Current location
  - Total deliveries
  - Completed deliveries
  - Cancelled deliveries
  - Average rating
  - Total earnings
  - Joined date
- **Filters**:
  - Status filter
  - Availability filter
  - Rating (min/max)
  - Location/city
  - Search (name, phone)
- **Map View**:
  - Show all partners on map
  - Filter by availability
  - Real-time location updates
- **Actions**:
  - View details
  - Edit partner
  - Change status
  - Assign order
  - View delivery history
  - View reviews
  - View analytics

#### 5.2 Delivery Partner Detail Page
- **Tabs**:
  1. **Profile Tab**:
     - Personal info
     - Profile image
     - Contact details
     - Vehicle details
     - Documents (license, vehicle registration)
     - Status
     - Availability
  2. **Performance Tab**:
     - Total deliveries
     - Completed deliveries
     - Cancelled deliveries
     - Success rate
     - Average delivery time
     - Average rating
     - Total earnings
     - Performance chart
  3. **Location Tab**:
     - Current location (map)
     - Location history
     - Coverage area
  4. **Delivery History Tab**:
     - Past deliveries table
     - Order details
     - Delivery time
     - Customer rating
  5. **Reviews Tab**:
     - Customer reviews
     - Rating distribution
  6. **Earnings Tab**:
     - Total earnings
     - Earnings by date
     - Pending payouts
     - Payout history
- **Actions**:
  - Edit profile
  - Change status
  - Assign order
  - View on map
  - Process payout

#### 5.3 Available Partners Map Page
- Real-time map of all available partners
- Filter by location
- Assign orders from map
- View partner details on click

#### 5.4 Delivery Analytics Page
- Total deliveries
- Average delivery time
- Delivery success rate
- Partner performance comparison
- Busiest delivery times
- Delivery by location

---

### **6. MENU & FOOD ITEMS MANAGEMENT** (4 pages)

#### 6.1 Categories List Page
- **Tree View** of categories
- **Table Columns**:
  - Category name
  - Description
  - Parent category
  - Total items
  - Status (Active/Inactive)
  - Created date
- **Actions**:
  - Add category
  - Edit category
  - Delete category
  - Reorder categories (drag & drop)
  - View items in category

#### 6.2 Category Detail Page
- Category information
- Items in category
- Add/remove items
- Subcategories

#### 6.3 Food Items List Page
- **Table Columns**:
  - Item image
  - Name
  - Category
  - Restaurant
  - Description
  - Price
  - Veg/Non-veg
  - Is available
  - Rating
  - Total orders
  - Created date
- **Filters**:
  - Category filter
  - Restaurant filter
  - Veg/Non-veg
  - Availability
  - Price range
  - Search (name)
- **Actions**:
  - View details
  - Edit item
  - Toggle availability
  - Delete item
  - View reviews

#### 6.4 Food Item Detail Page
- Item details
- Images
- Pricing
- Customizations
- Availability
- Reviews
- Order statistics

---

### **7. COUPON & OFFERS MANAGEMENT** (4 pages)

#### 7.1 Coupons List Page
- **Status Tabs**:
  - All Coupons
  - Active
  - Expired
  - Scheduled
- **Table Columns**:
  - Coupon code
  - Description
  - Discount type (percentage/fixed)
  - Discount value
  - Min order amount
  - Max discount
  - Valid from
  - Valid to
  - Usage limit
  - Used count
  - Status
- **Filters**:
  - Status filter
  - Discount type
  - Date range
  - Search (code, description)
- **Actions**:
  - View details
  - Edit coupon
  - Deactivate coupon
  - Delete coupon
  - View usage history

#### 7.2 Create Coupon Page
- **Coupon Form**:
  - Code (auto-generate option)
  - Description
  - Discount type (percentage/fixed)
  - Discount value
  - Min order amount
  - Max discount amount
  - Valid from/to dates
  - Usage limit (per user, total)
  - Applicable to (all users, specific users, new users)
  - Applicable restaurants (all, specific)
  - Terms & conditions
- **Preview Card**
- **Schedule Option**

#### 7.3 Coupon Detail Page
- Coupon information
- **Usage Statistics**:
  - Total uses
  - Unique users
  - Total discount given
  - Revenue impact
- **Usage History Table**:
  - User name
  - Order number
  - Discount amount
  - Used date
- **Actions**:
  - Edit coupon
  - Extend validity
  - Deactivate
  - Clone coupon

#### 7.4 Coupon Analytics Page
- Most used coupons
- Coupon usage trend
- Revenue impact
- User acquisition by coupons
- Coupon effectiveness

---

### **8. FINANCIAL MANAGEMENT** (6 pages)

#### 8.1 Revenue Dashboard Page
- **Metric Cards**:
  - Total revenue (today, week, month, year)
  - Order revenue
  - Delivery fees collected
  - Platform fees collected
  - Discounts given
  - Refunds issued
  - Net revenue
- **Charts**:
  - Revenue trend (line chart)
  - Revenue breakdown (pie chart)
  - Revenue by restaurant (bar chart)
  - Revenue by payment method
- **Recent Transactions Table**

#### 8.2 Settlements Page
- **Tabs**:
  - Restaurant Settlements
  - Delivery Partner Payouts
- **Table Columns**:
  - Settlement ID
  - Restaurant/Partner name
  - Period (from-to dates)
  - Total orders
  - Gross amount
  - Platform fee
  - Net amount
  - Status (Pending, Processed, Paid)
  - Settlement date
- **Filters**:
  - Status filter
  - Date range
  - Restaurant/Partner filter
- **Actions**:
  - View details
  - Process settlement
  - Download report
  - Mark as paid

#### 8.3 Settlement Detail Page
- Settlement information
- Order breakdown
- Fee calculation
- Payment details
- Download invoice
- Mark as paid

#### 8.4 Restaurant Settlements Page
- List of restaurant settlements
- Filter by restaurant
- Filter by status
- Process bulk settlements
- Download reports

#### 8.5 Delivery Payouts Page
- List of delivery partner payouts
- Filter by partner
- Filter by status
- Process bulk payouts
- Download reports

#### 8.6 Refunds Page
- **Table Columns**:
  - Refund ID
  - Order number
  - Customer name
  - Amount
  - Reason
  - Status (Pending, Approved, Rejected, Processed)
  - Requested date
  - Processed date
- **Filters**:
  - Status filter
  - Date range
  - Search (order number, customer)
- **Actions**:
  - View details
  - Approve refund
  - Reject refund
  - Process refund

---

### **9. REVIEWS & RATINGS MANAGEMENT** (3 pages)

#### 9.1 Reviews List Page
- **Type Tabs**:
  - Restaurant Reviews
  - Delivery Partner Reviews
  - Food Item Reviews
- **Table Columns**:
  - Review ID
  - User name
  - Restaurant/Partner/Item name
  - Rating (stars)
  - Review text
  - Images
  - Is flagged
  - Created date
- **Filters**:
  - Type filter
  - Rating filter (1-5 stars)
  - Flagged status
  - Date range
  - Search
- **Actions**:
  - View details
  - Flag review
  - Delete review
  - Reply to review

#### 9.2 Flagged Reviews Page
- Reviews flagged by users or system
- Moderation queue
- Approve/reject flags
- Delete inappropriate reviews
- Ban users for violations

#### 9.3 Review Analytics Page
- Average rating by restaurant
- Average rating by delivery partner
- Rating distribution
- Review trends
- Most reviewed items

---

### **10. NOTIFICATIONS MANAGEMENT** (3 pages)

#### 10.1 Notifications History Page
- **Type Tabs**:
  - Push Notifications
  - Email Notifications
  - SMS Notifications
- **Table Columns**:
  - Notification ID
  - Title
  - Message
  - Type
  - Recipients count
  - Sent date
  - Delivery rate
  - Open rate
- **Filters**:
  - Type filter
  - Date range
  - Search
- **Actions**:
  - View details
  - View analytics
  - Resend

#### 10.2 Send Notification Page
- **Notification Form**:
  - Title
  - Message (rich text editor)
  - Type (Push, Email, SMS)
  - Recipients:
    - All users
    - Specific users
    - By role
    - By location
    - By order status
  - Schedule option
  - Attach image/link
- **Preview Panel**
- **Test Send** (to admin)

#### 10.3 Notification Templates Page
- Pre-defined templates
- Create/edit templates
- Template variables
- Template categories

---

### **11. REPORTS & ANALYTICS** (7 pages)

#### 11.1 Reports Dashboard Page
- **Pre-built Reports Grid**:
  - Sales Report
  - User Report
  - Restaurant Report
  - Delivery Partner Report
  - Financial Report
  - Inventory Report
- **Recent Reports List**
- **Quick Generate** buttons

#### 11.2 Sales Report Page
- **Summary Metrics**:
  - Total sales
  - Total orders
  - Average order value
  - Top selling items
- **Charts**:
  - Sales trend
  - Sales by restaurant
  - Sales by category
  - Sales by time
- **Detailed Table**
- **Export Options**: PDF, Excel, CSV

#### 11.3 User Report Page
- User statistics
- User growth chart
- User segments
- Active vs inactive users
- User retention
- Export options

#### 11.4 Restaurant Report Page
- Restaurant performance
- Revenue by restaurant
- Orders by restaurant
- Rating distribution
- Top restaurants
- Export options

#### 11.5 Delivery Partner Report Page
- Partner performance
- Delivery statistics
- Earnings summary
- Rating distribution
- Top performers
- Export options

#### 11.6 Financial Report Page
- Revenue breakdown
- Settlements summary
- Refunds summary
- Payment method distribution
- Profit/loss statement
- Export options

#### 11.7 Custom Report Builder Page
- **Builder Interface**:
  - Select data source
  - Select metrics
  - Add filters
  - Choose visualization
  - Preview
- **Save Report**
- **Schedule Report** (daily, weekly, monthly)

---

### **12. SYSTEM SETTINGS** (8 pages)

#### 12.1 General Settings Page
- **App Settings**:
  - App name
  - Logo upload
  - Favicon
  - Primary color
  - Secondary color
  - Support email
  - Support phone
  - Address
- **Business Hours**
- **Timezone**
- **Currency**
- **Language**

#### 12.2 Business Settings Page
- **Pricing Configuration**:
  - Platform fee (percentage/fixed)
  - Delivery fee calculation
  - Tax rates
  - Service charges
- **Order Settings**:
  - Min order amount
  - Max order amount
  - Order cancellation window
  - Auto-assign delivery partners
- **Delivery Settings**:
  - Delivery radius
  - Delivery time slots
  - Express delivery charges

#### 12.3 Admin Users Management Page
- **Table Columns**:
  - Name
  - Email
  - Role (Super Admin, Admin, Operations, Support)
  - Status
  - Last login
  - Created date
- **Actions**:
  - Add admin
  - Edit admin
  - Change role
  - Change status
  - Delete admin
  - Reset password

#### 12.4 Create Admin User Page
- Admin form
- Role selection
- Permissions assignment
- Send invitation email

#### 12.5 Roles & Permissions Page
- **Roles List**:
  - Super Admin
  - Admin
  - Operations Manager
  - Support Agent
  - Finance Manager
- **Permissions Matrix**:
  - View/Edit/Delete for each module
  - Custom permission creation

#### 12.6 Email Settings Page
- SMTP configuration
- Email templates
- Test email functionality
- Email logs

#### 12.7 SMS Settings Page
- SMS gateway configuration
- SMS templates
- Test SMS functionality
- SMS logs

#### 12.8 Notification Settings Page
- Push notification configuration
- Firebase/OneSignal setup
- Notification templates
- Notification preferences

---

### **13. ADDITIONAL FEATURES** (5 pages)

#### 13.1 Search & Filters Page
- Global search functionality
- Advanced filters
- Search history
- Saved searches

#### 13.2 Activity Logs Page
- **Table Columns**:
  - Timestamp
  - User (admin)
  - Action
  - Module
  - Details
  - IP address
- **Filters**:
  - Date range
  - User filter
  - Action type
  - Module filter

#### 13.3 System Health Page
- Server status
- Database status
- API response times
- Error logs
- Performance metrics
- Uptime monitoring

#### 13.4 Backup & Restore Page
- Database backup
- Schedule backups
- Restore from backup
- Backup history

#### 13.5 Help & Documentation Page
- User guide
- API documentation
- Video tutorials
- FAQ
- Contact support

---

## 📊 Summary Statistics

### Total Pages: **85 Pages**

**By Module**:
1. Authentication & Dashboard: 4 pages
2. User Management: 5 pages
3. Restaurant Management: 8 pages
4. Order Management: 4 pages
5. Delivery Partner Management: 4 pages
6. Menu & Food Items: 4 pages
7. Coupons & Offers: 4 pages
8. Financial Management: 6 pages
9. Reviews & Ratings: 3 pages
10. Notifications: 3 pages
11. Reports & Analytics: 7 pages
12. System Settings: 8 pages
13. Additional Features: 5 pages

### Priority Levels

**Phase 1 - MVP (High Priority)**: 25 pages
- Authentication (2)
- Dashboard (1)
- Users (2)
- Restaurants (3)
- Orders (2)
- Delivery Partners (2)
- Menu (2)
- Coupons (2)
- Financial (3)
- Reviews (1)
- Notifications (2)
- Settings (3)

**Phase 2 - Core Features**: 35 pages
- All detail pages
- Analytics pages
- Report pages
- Advanced filters

**Phase 3 - Advanced Features**: 25 pages
- Custom report builder
- Advanced analytics
- Bulk operations
- System health monitoring

---

## 🎯 Features Controlled by Admin

### User Management
- ✅ View all users
- ✅ Create/edit/delete users
- ✅ Change user status (suspend/activate)
- ✅ Change user roles
- ✅ Manage user addresses
- ✅ View user orders
- ✅ Manage user wallet
- ✅ View user sessions
- ✅ Send notifications to users

### Restaurant Management
- ✅ View all restaurants
- ✅ Approve/reject restaurant applications
- ✅ Create/edit/delete restaurants
- ✅ Change restaurant status
- ✅ Toggle restaurant open/close
- ✅ Manage restaurant menu
- ✅ Manage restaurant offers
- ✅ View restaurant orders
- ✅ View restaurant reviews
- ✅ View restaurant analytics

### Order Management
- ✅ View all orders
- ✅ Update order status
- ✅ Cancel orders
- ✅ Refund orders
- ✅ Assign delivery partners
- ✅ Track orders in real-time
- ✅ Print invoices
- ✅ View order analytics

### Delivery Partner Management
- ✅ View all delivery partners
- ✅ Approve/reject partner applications
- ✅ Create/edit/delete partners
- ✅ Change partner status
- ✅ Assign orders to partners
- ✅ View partner location (real-time)
- ✅ View partner deliveries
- ✅ Process partner payouts
- ✅ View partner reviews

### Menu Management
- ✅ Manage categories
- ✅ Manage food items
- ✅ Set item availability
- ✅ Manage pricing
- ✅ Bulk import menu

### Coupon Management
- ✅ Create/edit/delete coupons
- ✅ Set coupon rules
- ✅ View coupon usage
- ✅ Deactivate coupons
- ✅ View coupon analytics

### Financial Management
- ✅ View revenue dashboard
- ✅ Process restaurant settlements
- ✅ Process delivery payouts
- ✅ Manage refunds
- ✅ View financial reports
- ✅ Download invoices

### Review Management
- ✅ View all reviews
- ✅ Flag inappropriate reviews
- ✅ Delete reviews
- ✅ Reply to reviews
- ✅ View review analytics

### Notification Management
- ✅ Send push notifications
- ✅ Send email notifications
- ✅ Send SMS notifications
- ✅ Schedule notifications
- ✅ Manage templates
- ✅ View notification analytics

### System Settings
- ✅ Configure app settings
- ✅ Configure business settings
- ✅ Manage admin users
- ✅ Configure email/SMS
- ✅ Set roles & permissions
- ✅ View activity logs
- ✅ Monitor system health

---

## 🔄 Real-time Features (WebSocket)

1. **Dashboard**:
   - New order notifications
   - Revenue updates
   - User activity

2. **Orders**:
   - Order status updates
   - Live order tracking
   - Delivery partner location

3. **Delivery Partners**:
   - Partner availability status
   - Partner location updates

4. **Notifications**:
   - Real-time notification delivery

---

## 📱 Mobile Responsive

All pages must be fully responsive:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (< 768px)

---

## 🎨 UI Components Needed

### shadcn/ui Components (Already Installed)
- ✅ Card, Button, Input, Label, Select
- ✅ Table, Dialog, Dropdown, Tabs
- ✅ Badge, Avatar, Toast, Alert
- ✅ Calendar, Checkbox, Switch
- ✅ Textarea, Popover, Separator

### Custom Components to Build
- DataTable (with TanStack Table)
- StatusBadge
- LoadingSpinner
- EmptyState
- ConfirmDialog
- FileUpload
- ImageUpload
- DateRangePicker
- SearchInput
- Charts (Recharts)
- Map (Google Maps)
- Timeline
- MetricCard

---

## 🔐 Access Control

### Roles
1. **Super Admin**: Full access
2. **Admin**: All features except system settings
3. **Operations Manager**: Orders, delivery, restaurants
4. **Support Agent**: Users, orders (view only)
5. **Finance Manager**: Financial reports, settlements

### Permissions
- View
- Create
- Edit
- Delete
- Approve
- Export

---

**Last Updated**: 2026-01-02  
**Status**: Complete Analysis  
**Next**: Start building pages phase by phase
