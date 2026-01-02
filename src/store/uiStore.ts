import { create } from 'zustand';

interface UIState {
    // Sidebar
    sidebarOpen: boolean;
    sidebarCollapsed: boolean;

    // Theme
    theme: 'light' | 'dark' | 'system';

    // Loading
    isLoading: boolean;
    loadingMessage: string;

    // Actions
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebarCollapse: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    setLoading: (loading: boolean, message?: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
    // Initial state
    sidebarOpen: true,
    sidebarCollapsed: false,
    theme: 'system',
    isLoading: false,
    loadingMessage: '',

    // Actions
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

    setTheme: (theme) => set({ theme }),

    setLoading: (loading, message = '') => set({ isLoading: loading, loadingMessage: message }),
}));
