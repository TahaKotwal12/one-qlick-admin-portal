# OneQlick Admin Panel - Quick Start Guide (React.js)

> **Get started with the React.js admin panel in minutes**  
> **Last Updated**: 2026-01-02

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Project
```bash
# Create React + Vite project
npm create vite@latest one-qlick-admin -- --template react-ts

# Navigate to project
cd one-qlick-admin

# Install base dependencies
npm install
```

### Step 2: Install Dependencies
```bash
# Core dependencies (one command)
npm install react-router-dom zustand @tanstack/react-query @tanstack/react-table axios react-hook-form zod @hookform/resolvers recharts date-fns socket.io-client lucide-react react-hot-toast clsx tailwind-merge class-variance-authority

# Radix UI components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch

# Dev dependencies
npm install -D @types/node tailwindcss postcss autoprefixer eslint prettier
```

### Step 3: Setup Tailwind CSS
```bash
npx tailwindcss init -p
```

### Step 4: Setup shadcn/ui
```bash
npx shadcn-ui@latest init
```

### Step 5: Configure Environment
Create `.env.development`:
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_SEARCH_API_URL=http://localhost:8001/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=OneQlick Admin
```

### Step 6: Start Development
```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 📁 Project Structure

```
one-qlick-admin/
├── src/
│   ├── api/              # API integration
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── ...
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── layout/      # Layout components
│   │   ├── shared/      # Shared components
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── users/
│   │   └── ...
│   ├── routes/          # React Router config
│   ├── store/           # Zustand stores
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilities
│   ├── App.tsx
│   └── main.tsx
├── .env.development
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🔧 Essential Configuration Files

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

### tsconfig.json (Add paths)
```json
{
  "compilerOptions": {
    // ... other options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🎯 Core Files to Create

### 1. API Client (`src/api/client.ts`)
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### 2. Auth Store (`src/store/authStore.ts`)
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => 
        set({ accessToken: token, user, isAuthenticated: true }),
      logout: () => 
        set({ accessToken: null, user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

### 3. Router Setup (`src/routes/index.tsx`)
```typescript
import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/dashboard/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // Add more routes
    ],
  },
]);
```

### 4. Main App (`src/App.tsx`)
```typescript
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';

const queryClient = new QueryClient();

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

---

## 📦 shadcn/ui Components to Install

```bash
# Essential components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add form
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add textarea
```

---

## 🎨 Global Styles (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 🔌 Backend Connection

### Python FastAPI Backend
Your existing backend at `oneqlick-backend` is ready to use!

**Backend URL**: `http://localhost:8000`  
**API Base**: `/api/v1`

### Test Connection
```typescript
// src/api/auth.ts
import apiClient from './client';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/admin/login', {
    email,
    password,
  });
  return response.data;
};
```

---

## 🧪 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format

# Run tests
npm run test
```

---

## 📚 Documentation Reference

1. **[10_REACT_TECH_STACK.md](file:///c:/Users/cmss/Desktop/ONEQLICK/One-qliclk-admin/docs/10_REACT_TECH_STACK.md)** - Complete tech stack details
2. **[05_IMPLEMENTATION_PLAN.md](file:///c:/Users/cmss/Desktop/ONEQLICK/One-qliclk-admin/docs/05_IMPLEMENTATION_PLAN.md)** - 12-week implementation plan
3. **[09_TEAM_TASK_DISTRIBUTION.md](file:///c:/Users/cmss/Desktop/ONEQLICK/One-qliclk-admin/docs/09_TEAM_TASK_DISTRIBUTION.md)** - Team task breakdown
4. **[08_APPLICATION_PAGES_STRUCTURE.md](file:///c:/Users/cmss/Desktop/ONEQLICK/One-qliclk-admin/docs/08_APPLICATION_PAGES_STRUCTURE.md)** - All pages and routes
5. **[04_API_INTEGRATION_GUIDE.md](file:///c:/Users/cmss/Desktop/ONEQLICK/One-qliclk-admin/docs/04_API_INTEGRATION_GUIDE.md)** - Backend API reference

---

## ✅ Checklist

Before starting development, ensure:

- [ ] Node.js 18+ installed
- [ ] Python FastAPI backend running
- [ ] Git configured
- [ ] VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Dev server running

---

## 🚨 Common Issues & Solutions

### Issue: Module not found '@/...'
**Solution**: Check `vite.config.ts` has path alias configured

### Issue: Tailwind classes not working
**Solution**: Ensure `tailwind.config.js` content paths include all files

### Issue: API calls failing
**Solution**: Check backend is running and CORS is configured

### Issue: shadcn/ui components not styled
**Solution**: Ensure `index.css` has Tailwind directives and CSS variables

---

## 🎯 Next Steps

1. **Start with Phase 1** (Week 1-2)
   - Setup project
   - Build authentication
   - Create layout

2. **Follow Implementation Plan**
   - Week-by-week tasks
   - Clear deliverables
   - Regular demos

3. **Use Team Distribution**
   - Assign tasks to developers
   - Daily standups
   - Code reviews

---

## 💡 Pro Tips

1. **Use TypeScript strictly** - No `any` types
2. **Component-first approach** - Build reusable components
3. **TanStack Query for data** - Automatic caching and refetching
4. **Zustand for UI state** - Simple and performant
5. **shadcn/ui for consistency** - Pre-built accessible components
6. **Test as you build** - Don't leave testing for the end

---

**Ready to build? Start with:**
```bash
npm create vite@latest one-qlick-admin -- --template react-ts
cd one-qlick-admin
npm install
npm run dev
```

**Happy coding! 🚀**
