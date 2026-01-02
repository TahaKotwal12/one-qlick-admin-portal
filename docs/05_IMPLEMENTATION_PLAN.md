# OneQlick Admin Panel - React.js Implementation Plan

> **Updated for React.js + Vite Stack**  
> **Last Updated**: 2026-01-02  
> **Frontend**: React.js 18 + TypeScript + Vite  
> **Backend**: Python FastAPI (Existing)

---

## 🎯 Project Overview

**Project Name**: OneQlick Admin Panel  
**Technology Stack**: React.js 18, TypeScript, Vite, shadcn/ui, Tailwind CSS  
**Timeline**: 8-12 weeks  
**Team Size**: 2-3 developers  

---

## 📋 Development Phases

### Phase 1: Foundation & Setup (Week 1-2)

#### Week 1: Project Initialization

**Tasks**:
- [ ] **Create React + Vite Project** (2h)
  ```bash
  npm create vite@latest one-qlick-admin -- --template react-ts
  ```

- [ ] **Install Core Dependencies** (2h)
  - React Router v6
  - Zustand + TanStack Query
  - Axios
  - shadcn/ui components
  - Tailwind CSS
  - React Hook Form + Zod
  - Recharts, TanStack Table
  - Socket.IO Client

- [ ] **Configure Development Tools** (2h)
  - TypeScript (strict mode)
  - ESLint + Prettier
  - Vite configuration
  - Path aliases (@/)
  - Environment variables

- [ ] **Setup Tailwind CSS** (1h)
  - Initialize Tailwind
  - Configure theme
  - Add custom colors
  - Setup CSS variables

- [ ] **Install shadcn/ui** (2h)
  - Initialize shadcn/ui
  - Install base components
  - Configure component library

- [ ] **Project Structure** (2h)
  ```
  src/
  ├── api/          # API integration
  ├── components/   # React components
  ├── contexts/     # React contexts
  ├── hooks/        # Custom hooks
  ├── pages/        # Page components
  ├── routes/       # Routing config
  ├── store/        # Zustand stores
  ├── types/        # TypeScript types
  └── utils/        # Utilities
  ```

- [ ] **Git Setup** (1h)
  - Initialize repository
  - Create .gitignore
  - Setup branch strategy
  - First commit

**Total Week 1**: ~12 hours

---

#### Week 2: Core Infrastructure

**Tasks**:
- [ ] **API Client Setup** (4h)
  - Create Axios instance
  - Request/response interceptors
  - Error handling
  - Token refresh logic
  - API service modules structure

- [ ] **Authentication System** (12h)
  - Auth store (Zustand)
  - Auth context
  - Login page component
  - Login API integration
  - Protected route component
  - Token management
  - Auto-refresh tokens
  - Logout functionality

- [ ] **React Router Setup** (4h)
  - Router configuration
  - Route definitions
  - Protected routes
  - Layout routes
  - 404 page

- [ ] **Layout Components** (12h)
  - Dashboard layout
  - Sidebar navigation
  - Header component
  - Breadcrumb component
  - Footer component
  - Responsive design

- [ ] **TanStack Query Setup** (2h)
  - Query client configuration
  - Default options
  - Dev tools

- [ ] **Error Handling** (2h)
  - Error boundary
  - Toast notifications
  - Global error handler

**Total Week 2**: ~36 hours

---

### Phase 2: Core Features - MVP (Week 3-5)

#### Week 3: Dashboard & Shared Components

**Tasks**:
- [ ] **Shared Components Library** (16h)
  - DataTable (TanStack Table)
  - Status Badge
  - Loading Spinner
  - Empty State
  - Pagination
  - Confirmation Dialog
  - Form Wrapper
  - File Upload
  - Multi-Select
  - Date Range Picker

- [ ] **Chart Components** (8h)
  - Line Chart (Recharts)
  - Bar Chart
  - Pie Chart
  - Chart wrapper

- [ ] **Dashboard Page** (12h)
  - Metric cards
  - Revenue trend chart
  - Order status chart
  - Activity feed
  - Real-time updates (WebSocket)
  - API integration

- [ ] **Type Definitions** (4h)
  - Common types
  - API types
  - User types
  - Restaurant types
  - Order types

**Total Week 3**: ~40 hours

---

#### Week 4: User Management

**Tasks**:
- [ ] **Users List Page** (12h)
  - Page layout
  - Search functionality
  - Filters (role, status, verification)
  - Users table
  - Pagination
  - Bulk actions
  - Export CSV
  - API integration

- [ ] **User Detail Page** (16h)
  - Page layout
  - Tabs component
  - Profile tab
  - Addresses tab
  - Orders tab
  - Wallet tab
  - Sessions tab
  - Analytics tab
  - Charts integration

- [ ] **User Actions** (8h)
  - Edit user modal
  - Update status modal
  - Form validation
  - API integration

- [ ] **User API Services** (4h)
  - Get users list
  - Get user detail
  - Update user
  - Update status
  - Export users

**Total Week 4**: ~40 hours

---

#### Week 5: Restaurant Management

**Tasks**:
- [ ] **Restaurants List Page** (12h)
  - Page layout
  - View toggle (table/grid)
  - Search functionality
  - Filters
  - Restaurants table
  - Restaurant cards
  - Pagination
  - API integration

- [ ] **Pending Restaurants Page** (8h)
  - Pending list
  - Document viewer
  - Approval workflow
  - Approval/rejection modals

- [ ] **Restaurant Detail Page** (16h)
  - Page layout
  - Tabs (Info, Menu, Orders, Offers, Reviews, Analytics)
  - Each tab component
  - Charts for analytics
  - API integration

- [ ] **Restaurant Actions** (4h)
  - Edit restaurant modal
  - Create restaurant modal
  - Approve/reject functionality

**Total Week 5**: ~40 hours

---

### Phase 3: Advanced Features (Week 6-8)

#### Week 6: Order Management

**Tasks**:
- [ ] **Orders List Page** (12h)
  - Page layout
  - Status tabs
  - Real-time updates (WebSocket)
  - Search functionality
  - Filters
  - Orders table
  - Pagination
  - API integration

- [ ] **Order Detail Page** (20h)
  - 3-column layout
  - Order summary
  - Order items list
  - Pricing breakdown
  - Customer/Restaurant/Delivery cards
  - Order timeline
  - Live tracking map (Google Maps)
  - API integration

- [ ] **Order Actions** (8h)
  - Update status modal
  - Cancel order modal
  - Refund modal
  - Assign delivery modal
  - Print invoice

**Total Week 6**: ~40 hours

---

#### Week 7: Delivery Partners & Menu

**Tasks**:
- [ ] **Delivery Partners List** (8h)
  - Page layout
  - Status tabs
  - Partners table
  - Map view
  - Filters
  - API integration

- [ ] **Delivery Partner Detail** (12h)
  - Page layout
  - Profile tab
  - Performance tab
  - Location tab (map)
  - Delivery history tab
  - Reviews tab

- [ ] **Menu Categories** (8h)
  - Categories page
  - Category tree
  - Create/edit modals
  - Drag-and-drop

- [ ] **Menu Items** (8h)
  - Items table
  - Add/edit modals
  - Bulk import

- [ ] **WebSocket Integration** (4h)
  - WebSocket hook
  - Real-time order updates
  - Connection management

**Total Week 7**: ~40 hours

---

#### Week 8: Coupons & Reviews

**Tasks**:
- [ ] **Coupons List** (8h)
  - Page layout
  - Status tabs
  - Coupons table
  - Filters
  - API integration

- [ ] **Create Coupon** (12h)
  - Coupon form
  - Code generator
  - Date picker
  - Recipient selector
  - Preview
  - Validation

- [ ] **Reviews Management** (8h)
  - Reviews list
  - Type tabs
  - Filters
  - Moderation modal
  - Flag/delete actions

- [ ] **Notifications** (12h)
  - Notifications history
  - Send notification page
  - Notification form
  - Recipient selector
  - Schedule functionality

**Total Week 8**: ~40 hours

---

### Phase 4: Financial & Reports (Week 9-10)

#### Week 9: Financial Management

**Tasks**:
- [ ] **Revenue Dashboard** (12h)
  - Metric cards
  - Revenue charts
  - Breakdown charts
  - Transactions table

- [ ] **Settlements** (12h)
  - Settlements list
  - Type tabs
  - Settlement detail modal
  - Process settlement

- [ ] **Restaurant Settlements** (8h)
  - Settlements table
  - Process modal
  - Download reports

- [ ] **Delivery Payouts** (8h)
  - Payouts table
  - Process payout
  - History

**Total Week 9**: ~40 hours

---

#### Week 10: Reports & Analytics

**Tasks**:
- [ ] **Reports Dashboard** (8h)
  - Pre-built reports grid
  - Recent reports
  - Quick generate

- [ ] **Sales Report** (12h)
  - Summary metrics
  - Charts
  - Detailed table
  - Export (PDF, Excel, CSV)

- [ ] **Other Reports** (12h)
  - User report
  - Restaurant report
  - Delivery report
  - Financial report

- [ ] **Settings Pages** (8h)
  - General settings
  - Business settings
  - Admin users
  - Email/SMS config

**Total Week 10**: ~40 hours

---

### Phase 5: Testing & Deployment (Week 11-12)

#### Week 11: Testing

**Tasks**:
- [ ] **Unit Tests** (16h)
  - Component tests (Vitest + React Testing Library)
  - Utility tests
  - Hook tests
  - Store tests

- [ ] **Integration Tests** (12h)
  - API integration tests
  - Form submission tests
  - Auth flow tests

- [ ] **E2E Tests** (12h)
  - Setup Playwright/Cypress
  - Critical flow tests
  - User management
  - Order management

**Total Week 11**: ~40 hours

---

#### Week 12: Optimization & Deployment

**Tasks**:
- [ ] **Performance Optimization** (12h)
  - Code splitting (React.lazy)
  - Lazy loading routes
  - Image optimization
  - Bundle analysis
  - Caching strategies

- [ ] **Accessibility** (8h)
  - WCAG 2.1 AA compliance
  - Keyboard navigation
  - Screen reader support
  - ARIA labels

- [ ] **Deployment** (12h)
  - Build optimization
  - CI/CD pipeline (GitHub Actions)
  - Deploy to Vercel/Netlify
  - Environment configuration
  - Monitoring (Sentry)
  - Analytics

- [ ] **Documentation** (8h)
  - Setup guide
  - Component docs
  - Deployment guide
  - API integration docs

**Total Week 12**: ~40 hours

---

## 🛠️ React + Vite Specific Setup

### Initial Setup Commands
```bash
# Create project
npm create vite@latest one-qlick-admin -- --template react-ts
cd one-qlick-admin

# Install dependencies
npm install react-router-dom zustand @tanstack/react-query @tanstack/react-table
npm install axios react-hook-form zod @hookform/resolvers
npm install recharts date-fns socket.io-client
npm install lucide-react react-hot-toast clsx tailwind-merge class-variance-authority

# Install Radix UI components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-avatar
npm install @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-popover
npm install @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch

# Install dev dependencies
npm install -D @types/node tailwindcss postcss autoprefixer
npm install -D eslint prettier eslint-config-prettier

# Setup Tailwind
npx tailwindcss init -p

# Setup shadcn/ui
npx shadcn-ui@latest init

# Start development
npm run dev
```

---

## 📊 Key Differences from Next.js Approach

| Aspect | Next.js | React + Vite |
|--------|---------|--------------|
| **Routing** | File-based (app/) | React Router (code-based) |
| **Pages** | Server Components | Client Components |
| **API Routes** | Built-in | External (FastAPI) |
| **Data Fetching** | Server Actions | TanStack Query |
| **State** | Server + Client | Client only |
| **Build** | Next build | Vite build |
| **Deploy** | Vercel | Any static host |
| **SSR** | Yes | No (SPA) |

---

## 🎯 React-Specific Best Practices

### 1. Component Organization
```typescript
// Use functional components with hooks
const UsersList: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <LoadingSpinner />;

  return <UsersTable data={data} />;
};
```

### 2. State Management
```typescript
// Zustand for client state
const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// TanStack Query for server state
const { data } = useQuery({
  queryKey: ['users', filters],
  queryFn: () => fetchUsers(filters),
});
```

### 3. Routing
```typescript
// React Router v6
const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'users', element: <UsersList /> },
      { path: 'users/:id', element: <UserDetail /> },
    ],
  },
]);
```

### 4. Code Splitting
```typescript
// Lazy load routes
const UsersList = lazy(() => import('@/pages/users/UsersList'));
const RestaurantsList = lazy(() => import('@/pages/restaurants/RestaurantsList'));

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <UsersList />
</Suspense>
```

---

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel deploy
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🔧 Backend Integration

### Python FastAPI Backend
The existing FastAPI backend provides all APIs. No changes needed.

### API Base URL Configuration
```typescript
// .env.development
VITE_API_URL=http://localhost:8000/api/v1

// .env.production
VITE_API_URL=https://api.oneqlick.com/api/v1
```

### Proxy Configuration (Development)
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## ✅ Success Metrics

### Performance
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Lighthouse Score > 90
- Bundle size < 500KB (gzipped)

### Code Quality
- Test Coverage > 80%
- TypeScript Strict Mode
- Zero ESLint Errors
- Consistent Formatting

### User Experience
- Mobile Responsive
- Accessibility (WCAG 2.1 AA)
- Fast Navigation
- Smooth Animations

---

## 📅 Milestones

| Milestone | Target Date | Deliverables |
|-----------|-------------|--------------|
| M1: Foundation | Week 2 | Project setup, Auth, Layout |
| M2: MVP | Week 5 | Dashboard, Users, Restaurants, Orders |
| M3: Advanced | Week 8 | Delivery, Menu, Coupons, Reviews |
| M4: Financial | Week 10 | Financial, Reports, Settings |
| M5: Production | Week 12 | Testing, Optimization, Deployment |

---

**Document Version**: 2.0 (React.js)  
**Last Updated**: 2026-01-02  
**Status**: Ready for Implementation  
**Tech Stack**: React.js 18 + TypeScript + Vite + Python FastAPI
