# OneQlick Admin Panel - Technology Stack & Architecture (React.js)

> **Purpose**: Define the complete technology stack and architecture for the admin panel.  
> **Last Updated**: 2026-01-02  
> **Frontend**: React.js 18  
> **Backend**: Python FastAPI (Existing)

---

## 🎯 Technology Stack Overview

### Frontend Stack
- **Framework**: React.js 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: 
  - Zustand (Client state)
  - TanStack Query (Server state)
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Tables**: TanStack Table
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client

### Backend Stack (Existing)
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL
- **Cache**: Redis
- **ORM**: SQLAlchemy
- **Authentication**: JWT
- **Email**: SMTP Integration
- **Real-time**: WebSocket

---

## 📁 React Project Structure

```
one-qlick-admin/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── api/                    # API integration layer
│   │   ├── client.ts          # Axios instance
│   │   ├── auth.ts            # Auth APIs
│   │   ├── users.ts           # User APIs
│   │   ├── restaurants.ts     # Restaurant APIs
│   │   ├── orders.ts          # Order APIs
│   │   └── ...
│   ├── assets/                # Static assets
│   │   ├── images/
│   │   └── icons/
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── dashboard/        # Dashboard components
│   │   ├── users/            # User components
│   │   ├── restaurants/      # Restaurant components
│   │   ├── orders/           # Order components
│   │   ├── shared/           # Shared components
│   │   │   ├── DataTable.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ...
│   │   └── charts/           # Chart components
│   ├── contexts/             # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useWebSocket.ts
│   │   └── ...
│   ├── pages/                # Page components
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── users/
│   │   │   ├── UsersList.tsx
│   │   │   └── UserDetail.tsx
│   │   ├── restaurants/
│   │   │   ├── RestaurantsList.tsx
│   │   │   ├── RestaurantDetail.tsx
│   │   │   └── PendingRestaurants.tsx
│   │   ├── orders/
│   │   │   ├── OrdersList.tsx
│   │   │   └── OrderDetail.tsx
│   │   └── ...
│   ├── routes/               # Route configuration
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── routes.config.ts
│   ├── store/                # Zustand stores
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── ...
│   ├── types/                # TypeScript types
│   │   ├── api.ts
│   │   ├── user.ts
│   │   ├── restaurant.ts
│   │   ├── order.ts
│   │   └── common.ts
│   ├── utils/                # Utility functions
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── .env.development
├── .env.production
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Project Setup Commands

### 1. Create React + Vite Project
```bash
# Create project with Vite
npm create vite@latest one-qlick-admin -- --template react-ts

# Navigate to project
cd one-qlick-admin

# Install dependencies
npm install
```

### 2. Install Core Dependencies
```bash
# Routing
npm install react-router-dom

# State Management
npm install zustand @tanstack/react-query

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch

# Styling
npm install tailwindcss postcss autoprefixer
npm install clsx tailwind-merge class-variance-authority

# Icons
npm install lucide-react

# Forms
npm install react-hook-form zod @hookform/resolvers

# HTTP Client
npm install axios

# Charts
npm install recharts

# Tables
npm install @tanstack/react-table

# Date utilities
npm install date-fns

# Real-time
npm install socket.io-client

# Utilities
npm install react-hot-toast
```

### 3. Install Dev Dependencies
```bash
npm install -D @types/node
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
npm install -D @vitejs/plugin-react
```

### 4. Setup Tailwind CSS
```bash
npx tailwindcss init -p
```

### 5. Setup shadcn/ui
```bash
npx shadcn-ui@latest init
```

---

## 📦 Complete package.json

```json
{
  "name": "one-qlick-admin",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.14.2",
    "@tanstack/react-table": "^8.11.2",
    "axios": "^1.6.2",
    "react-hook-form": "^7.49.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.3",
    "recharts": "^2.10.3",
    "date-fns": "^2.30.0",
    "socket.io-client": "^4.5.4",
    "lucide-react": "^0.294.0",
    "react-hot-toast": "^2.4.1",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0",
    "class-variance-authority": "^0.7.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/node": "^20.10.5",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.0.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.0.4"
  }
}
```

---

## ⚙️ Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 🔐 Environment Variables

### .env.development
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_SEARCH_API_URL=http://localhost:8001/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=OneQlick Admin
```

### .env.production
```env
VITE_API_URL=https://api.oneqlick.com/api/v1
VITE_SEARCH_API_URL=https://search.oneqlick.com/api/v1
VITE_WS_URL=wss://api.oneqlick.com/ws
VITE_APP_NAME=OneQlick Admin
```

---

## 🛣️ React Router Setup

### src/routes/index.tsx
```typescript
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Auth Pages
import Login from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';

// Dashboard Layout
import DashboardLayout from '@/components/layout/DashboardLayout';

// Dashboard Pages
import Dashboard from '@/pages/dashboard/Dashboard';
import UsersList from '@/pages/users/UsersList';
import UserDetail from '@/pages/users/UserDetail';
import RestaurantsList from '@/pages/restaurants/RestaurantsList';
import RestaurantDetail from '@/pages/restaurants/RestaurantDetail';
import OrdersList from '@/pages/orders/OrdersList';
import OrderDetail from '@/pages/orders/OrderDetail';
// ... more imports

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <UsersList />,
      },
      {
        path: 'users/:id',
        element: <UserDetail />,
      },
      {
        path: 'restaurants',
        element: <RestaurantsList />,
      },
      {
        path: 'restaurants/:id',
        element: <RestaurantDetail />,
      },
      {
        path: 'orders',
        element: <OrdersList />,
      },
      {
        path: 'orders/:id',
        element: <OrderDetail />,
      },
      // ... more routes
    ],
  },
]);
```

### src/routes/ProtectedRoute.tsx
```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

---

## 🔌 API Integration

### src/api/client.ts
```typescript
import axios from 'axios';
import { authStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = authStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authStore.getState().refreshToken;
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/admin/refresh`,
          { refresh_token: refreshToken }
        );

        const { access_token } = response.data.data;
        authStore.getState().setAccessToken(access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        authStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 🗄️ State Management

### src/store/authStore.ts (Zustand)
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken, isAuthenticated: true }),
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

---

## 🎨 Main App Component

### src/App.tsx
```typescript
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
```

### src/main.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🎯 Key Differences from Next.js

| Feature | Next.js | React + Vite |
|---------|---------|--------------|
| **Routing** | File-based | React Router (code-based) |
| **SSR** | Built-in | Client-side only (SPA) |
| **API Routes** | Built-in | Separate backend (FastAPI) |
| **Build Tool** | Webpack/Turbopack | Vite |
| **Dev Server** | Next dev server | Vite dev server |
| **Deployment** | Vercel optimized | Any static host |
| **Image Optimization** | Built-in | Manual |
| **Code Splitting** | Automatic | Manual with React.lazy |

---

## 🚀 Development Workflow

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Linter
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

---

## 📦 Deployment Options

### Static Hosting (Recommended)
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **AWS S3 + CloudFront**
- **GitHub Pages**
- **Firebase Hosting**

### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔧 Backend Integration (Python FastAPI)

### Backend is Already Built
Your existing FastAPI backend at `oneqlick-backend` provides all necessary APIs:
- Authentication endpoints
- User management
- Restaurant management
- Order management
- All other admin functionalities

### No Backend Changes Needed
The React frontend will consume the existing FastAPI endpoints documented in:
- `04_API_INTEGRATION_GUIDE.md`
- `06_BACKEND_API_PROGRESS.md`

---

## ✅ Advantages of React + Vite

1. **Faster Development**: Vite's HMR is extremely fast
2. **Simpler Architecture**: Pure SPA, easier to understand
3. **Flexibility**: Easy to deploy anywhere
4. **Smaller Bundle**: No server-side code
5. **Better for Admin Panels**: No need for SSR
6. **Existing Backend**: Works perfectly with FastAPI

---

**Last Updated**: 2026-01-02  
**Status**: Ready for Implementation  
**Tech Stack**: React.js 18 + TypeScript + Vite + Python FastAPI
