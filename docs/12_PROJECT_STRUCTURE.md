# OneQlick Admin Panel - Feature-Based Project Structure

> **Current State Analysis**: React 19 + Vite + shadcn/ui (New York) + Tailwind CSS 4  
> **Created**: 2026-01-02  
> **Structure Type**: Feature-Based Modular Architecture

---

## 📊 Current Project Analysis

### ✅ What's Already Set Up
- **React 19.2.0** with TypeScript
- **Vite 7.2.4** as build tool
- **shadcn/ui** (New York style) with **53 UI components**
- **Tailwind CSS 4.1.18** with Vite plugin
- **Path aliases** configured (@/)
- **All Radix UI components** installed
- **Additional libraries**: recharts, date-fns, react-hook-form, zod

### ❌ What's Missing
- Feature-based folder structure
- API integration layer
- State management (Zustand/TanStack Query)
- Routing (React Router)
- Authentication system
- Layout components
- Type definitions
- Utility functions

---

## 📁 Complete Feature-Based Structure

```
one-qlick-admin/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── assets/
│       ├── images/
│       └── icons/
│
├── src/
│   ├── api/                          # API Integration Layer
│   │   ├── client.ts                # Axios instance with interceptors
│   │   ├── endpoints.ts             # API endpoint constants
│   │   ├── auth.api.ts              # Authentication APIs
│   │   ├── users.api.ts             # User management APIs
│   │   ├── restaurants.api.ts       # Restaurant APIs
│   │   ├── orders.api.ts            # Order APIs
│   │   ├── delivery.api.ts          # Delivery partner APIs
│   │   ├── menu.api.ts              # Menu management APIs
│   │   ├── coupons.api.ts           # Coupon APIs
│   │   ├── financials.api.ts        # Financial APIs
│   │   ├── reviews.api.ts           # Reviews APIs
│   │   ├── notifications.api.ts     # Notification APIs
│   │   ├── analytics.api.ts         # Analytics APIs
│   │   └── settings.api.ts          # Settings APIs
│   │
│   ├── assets/                       # Static Assets
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── empty-state.svg
│   │   │   └── illustrations/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                      # shadcn/ui components (already exists)
│   │   │
│   │   ├── layout/                  # Layout Components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageContainer.tsx
│   │   │
│   │   ├── shared/                  # Shared/Common Components
│   │   │   ├── DataTable/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── DataTablePagination.tsx
│   │   │   │   ├── DataTableToolbar.tsx
│   │   │   │   └── columns.helpers.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── DateRangePicker.tsx
│   │   │   └── SearchInput.tsx
│   │   │
│   │   ├── charts/                  # Chart Components
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── AreaChart.tsx
│   │   │   └── ChartContainer.tsx
│   │   │
│   │   └── forms/                   # Form Components
│   │       ├── FormWrapper.tsx
│   │       ├── FormField.tsx
│   │       └── FormError.tsx
│   │
│   ├── features/                     # Feature Modules
│   │   │
│   │   ├── auth/                    # Authentication Feature
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   └── ResetPasswordForm.tsx
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── ForgotPasswordPage.tsx
│   │   │   │   └── ResetPasswordPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useLogin.ts
│   │   │   ├── store/
│   │   │   │   └── authStore.ts
│   │   │   └── types/
│   │   │       └── auth.types.ts
│   │   │
│   │   ├── dashboard/               # Dashboard Feature
│   │   │   ├── components/
│   │   │   │   ├── MetricCard.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   ├── OrderStatusChart.tsx
│   │   │   │   ├── ActivityFeed.tsx
│   │   │   │   └── QuickActions.tsx
│   │   │   ├── pages/
│   │   │   │   └── DashboardPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useDashboardData.ts
│   │   │   └── types/
│   │   │       └── dashboard.types.ts
│   │   │
│   │   ├── users/                   # User Management Feature
│   │   │   ├── components/
│   │   │   │   ├── UsersTable.tsx
│   │   │   │   ├── UserFilters.tsx
│   │   │   │   ├── UserSearch.tsx
│   │   │   │   ├── EditUserModal.tsx
│   │   │   │   ├── UpdateStatusModal.tsx
│   │   │   │   ├── UserProfileTab.tsx
│   │   │   │   ├── UserAddressesTab.tsx
│   │   │   │   ├── UserOrdersTab.tsx
│   │   │   │   ├── UserWalletTab.tsx
│   │   │   │   ├── UserSessionsTab.tsx
│   │   │   │   └── UserAnalyticsTab.tsx
│   │   │   ├── pages/
│   │   │   │   ├── UsersListPage.tsx
│   │   │   │   └── UserDetailPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useUsers.ts
│   │   │   │   ├── useUserDetail.ts
│   │   │   │   └── useUserActions.ts
│   │   │   └── types/
│   │   │       └── user.types.ts
│   │   │
│   │   ├── restaurants/             # Restaurant Management Feature
│   │   │   ├── components/
│   │   │   │   ├── RestaurantsTable.tsx
│   │   │   │   ├── RestaurantCard.tsx
│   │   │   │   ├── RestaurantFilters.tsx
│   │   │   │   ├── RestaurantInfoTab.tsx
│   │   │   │   ├── RestaurantMenuTab.tsx
│   │   │   │   ├── RestaurantOrdersTab.tsx
│   │   │   │   ├── RestaurantReviewsTab.tsx
│   │   │   │   ├── RestaurantAnalyticsTab.tsx
│   │   │   │   ├── ApprovalModal.tsx
│   │   │   │   ├── DocumentViewer.tsx
│   │   │   │   ├── EditRestaurantModal.tsx
│   │   │   │   └── CreateRestaurantModal.tsx
│   │   │   ├── pages/
│   │   │   │   ├── RestaurantsListPage.tsx
│   │   │   │   ├── RestaurantDetailPage.tsx
│   │   │   │   ├── PendingRestaurantsPage.tsx
│   │   │   │   └── RestaurantMenuPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useRestaurants.ts
│   │   │   │   ├── useRestaurantDetail.ts
│   │   │   │   └── useRestaurantActions.ts
│   │   │   └── types/
│   │   │       └── restaurant.types.ts
│   │   │
│   │   ├── orders/                  # Order Management Feature
│   │   │   ├── components/
│   │   │   │   ├── OrdersTable.tsx
│   │   │   │   ├── OrderFilters.tsx
│   │   │   │   ├── OrderSummary.tsx
│   │   │   │   ├── OrderItemsList.tsx
│   │   │   │   ├── OrderTimeline.tsx
│   │   │   │   ├── LiveTrackingMap.tsx
│   │   │   │   ├── UpdateStatusModal.tsx
│   │   │   │   ├── CancelOrderModal.tsx
│   │   │   │   ├── RefundModal.tsx
│   │   │   │   └── AssignDeliveryModal.tsx
│   │   │   ├── pages/
│   │   │   │   ├── OrdersListPage.tsx
│   │   │   │   └── OrderDetailPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useOrders.ts
│   │   │   │   ├── useOrderDetail.ts
│   │   │   │   ├── useOrderActions.ts
│   │   │   │   └── useRealtimeOrders.ts
│   │   │   └── types/
│   │   │       └── order.types.ts
│   │   │
│   │   ├── delivery/                # Delivery Partner Feature
│   │   │   ├── components/
│   │   │   │   ├── DeliveryPartnersTable.tsx
│   │   │   │   ├── PartnerFilters.tsx
│   │   │   │   ├── PartnerProfileTab.tsx
│   │   │   │   ├── PartnerPerformanceTab.tsx
│   │   │   │   ├── PartnerLocationTab.tsx
│   │   │   │   ├── PartnerDeliveriesTab.tsx
│   │   │   │   └── PartnerReviewsTab.tsx
│   │   │   ├── pages/
│   │   │   │   ├── DeliveryPartnersListPage.tsx
│   │   │   │   └── DeliveryPartnerDetailPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDeliveryPartners.ts
│   │   │   │   └── usePartnerDetail.ts
│   │   │   └── types/
│   │   │       └── delivery.types.ts
│   │   │
│   │   ├── menu/                    # Menu Management Feature
│   │   │   ├── components/
│   │   │   │   ├── CategoryList.tsx
│   │   │   │   ├── CategoryTree.tsx
│   │   │   │   ├── CategoryModal.tsx
│   │   │   │   ├── MenuItemsTable.tsx
│   │   │   │   └── MenuItemModal.tsx
│   │   │   ├── pages/
│   │   │   │   ├── CategoriesPage.tsx
│   │   │   │   └── MenuItemsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCategories.ts
│   │   │   │   └── useMenuItems.ts
│   │   │   └── types/
│   │   │       └── menu.types.ts
│   │   │
│   │   ├── coupons/                 # Coupon Management Feature
│   │   │   ├── components/
│   │   │   │   ├── CouponsTable.tsx
│   │   │   │   ├── CouponFilters.tsx
│   │   │   │   ├── CouponForm.tsx
│   │   │   │   └── CouponPreview.tsx
│   │   │   ├── pages/
│   │   │   │   ├── CouponsListPage.tsx
│   │   │   │   ├── CreateCouponPage.tsx
│   │   │   │   └── CouponDetailPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCoupons.ts
│   │   │   │   └── useCouponActions.ts
│   │   │   └── types/
│   │   │       └── coupon.types.ts
│   │   │
│   │   ├── financials/              # Financial Management Feature
│   │   │   ├── components/
│   │   │   │   ├── RevenueCharts.tsx
│   │   │   │   ├── SettlementsTable.tsx
│   │   │   │   ├── SettlementDetailModal.tsx
│   │   │   │   ├── RefundsTable.tsx
│   │   │   │   └── TransactionsTable.tsx
│   │   │   ├── pages/
│   │   │   │   ├── RevenueDashboardPage.tsx
│   │   │   │   ├── SettlementsPage.tsx
│   │   │   │   ├── RestaurantSettlementsPage.tsx
│   │   │   │   ├── DeliveryPayoutsPage.tsx
│   │   │   │   └── RefundsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useRevenue.ts
│   │   │   │   ├── useSettlements.ts
│   │   │   │   └── useRefunds.ts
│   │   │   └── types/
│   │   │       └── financial.types.ts
│   │   │
│   │   ├── reviews/                 # Reviews Feature
│   │   │   ├── components/
│   │   │   │   ├── ReviewsTable.tsx
│   │   │   │   ├── ReviewFilters.tsx
│   │   │   │   └── ModerationModal.tsx
│   │   │   ├── pages/
│   │   │   │   ├── ReviewsListPage.tsx
│   │   │   │   └── FlaggedReviewsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useReviews.ts
│   │   │   └── types/
│   │   │       └── review.types.ts
│   │   │
│   │   ├── notifications/           # Notifications Feature
│   │   │   ├── components/
│   │   │   │   ├── NotificationForm.tsx
│   │   │   │   ├── RecipientSelector.tsx
│   │   │   │   ├── NotificationPreview.tsx
│   │   │   │   └── NotificationHistoryTable.tsx
│   │   │   ├── pages/
│   │   │   │   ├── NotificationsPage.tsx
│   │   │   │   └── SendNotificationPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useNotifications.ts
│   │   │   └── types/
│   │   │       └── notification.types.ts
│   │   │
│   │   ├── reports/                 # Reports & Analytics Feature
│   │   │   ├── components/
│   │   │   │   ├── ReportCard.tsx
│   │   │   │   ├── SalesReportCharts.tsx
│   │   │   │   ├── ReportBuilder.tsx
│   │   │   │   └── ExportButton.tsx
│   │   │   ├── pages/
│   │   │   │   ├── ReportsDashboardPage.tsx
│   │   │   │   ├── SalesReportPage.tsx
│   │   │   │   ├── UserReportPage.tsx
│   │   │   │   ├── RestaurantReportPage.tsx
│   │   │   │   ├── FinancialReportPage.tsx
│   │   │   │   └── ReportBuilderPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useReports.ts
│   │   │   └── types/
│   │   │       └── report.types.ts
│   │   │
│   │   └── settings/                # Settings Feature
│   │       ├── components/
│   │       │   ├── GeneralSettingsForm.tsx
│   │       │   ├── BusinessSettingsForm.tsx
│   │       │   ├── AdminUsersTable.tsx
│   │       │   ├── CreateAdminModal.tsx
│   │       │   └── SettingsSidebar.tsx
│   │       ├── pages/
│   │       │   ├── SettingsPage.tsx
│   │       │   ├── BusinessSettingsPage.tsx
│   │       │   ├── AdminUsersPage.tsx
│   │       │   ├── EmailSettingsPage.tsx
│   │       │   └── NotificationSettingsPage.tsx
│   │       ├── hooks/
│   │       │   └── useSettings.ts
│   │       └── types/
│   │           └── settings.types.ts
│   │
│   ├── hooks/                        # Global Custom Hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── usePagination.ts
│   │   ├── useWebSocket.ts
│   │   ├── usePermissions.ts
│   │   └── useToast.ts
│   │
│   ├── lib/                          # Library/Utilities
│   │   ├── utils.ts                 # Utility functions (already exists)
│   │   ├── cn.ts                    # Class name utility
│   │   ├── format.ts                # Formatting utilities
│   │   ├── validation.ts            # Validation helpers
│   │   └── constants.ts             # App constants
│   │
│   ├── routes/                       # Routing Configuration
│   │   ├── index.tsx                # Main router
│   │   ├── ProtectedRoute.tsx       # Protected route wrapper
│   │   ├── routes.config.ts         # Route definitions
│   │   └── navigation.config.ts     # Sidebar navigation config
│   │
│   ├── store/                        # Global State (Zustand)
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   │
│   ├── types/                        # Global TypeScript Types
│   │   ├── api.types.ts
│   │   ├── common.types.ts
│   │   ├── user.types.ts
│   │   ├── restaurant.types.ts
│   │   ├── order.types.ts
│   │   └── index.ts
│   │
│   ├── App.tsx                       # Main App component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
│
├── .env.development                  # Development environment
├── .env.production                   # Production environment
├── .gitignore
├── components.json                   # shadcn/ui config
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🎯 Feature Module Structure Explained

Each feature module follows this pattern:

```
features/[feature-name]/
├── components/          # Feature-specific components
├── pages/              # Feature pages
├── hooks/              # Feature-specific hooks
├── store/              # Feature-specific state (if needed)
└── types/              # Feature-specific types
```

### Benefits:
- **Modularity**: Each feature is self-contained
- **Scalability**: Easy to add/remove features
- **Maintainability**: Clear separation of concerns
- **Reusability**: Shared components in `/components/shared`
- **Testability**: Easy to test individual features

---

## 📦 Folder Creation Commands

Run these commands to create the structure:

```bash
# Navigate to src directory
cd src

# Create main directories
mkdir -p api assets/{images,icons,fonts} features hooks lib routes store types

# Create shared components
mkdir -p components/layout components/shared/DataTable components/charts components/forms

# Create feature modules
mkdir -p features/auth/{components,pages,hooks,store,types}
mkdir -p features/dashboard/{components,pages,hooks,types}
mkdir -p features/users/{components,pages,hooks,types}
mkdir -p features/restaurants/{components,pages,hooks,types}
mkdir -p features/orders/{components,pages,hooks,types}
mkdir -p features/delivery/{components,pages,hooks,types}
mkdir -p features/menu/{components,pages,hooks,types}
mkdir -p features/coupons/{components,pages,hooks,types}
mkdir -p features/financials/{components,pages,hooks,types}
mkdir -p features/reviews/{components,pages,hooks,types}
mkdir -p features/notifications/{components,pages,hooks,types}
mkdir -p features/reports/{components,pages,hooks,types}
mkdir -p features/settings/{components,pages,hooks,types}
```

---

## 🔧 Next Steps

1. **Install Missing Dependencies**
   ```bash
   npm install react-router-dom zustand @tanstack/react-query @tanstack/react-table axios socket.io-client
   ```

2. **Create Core Files** (I'll create these for you)
   - API client
   - Auth store
   - Router configuration
   - Type definitions

3. **Setup Environment Variables**
   - Create `.env.development`
   - Add API URLs

4. **Start Building Features**
   - Begin with Auth feature
   - Then Dashboard
   - Then other features

---

**Last Updated**: 2026-01-02  
**Status**: Ready to implement  
**Next**: Create core infrastructure files
