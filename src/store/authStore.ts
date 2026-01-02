import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    profile_image?: string;
}

interface AuthState {
    // State
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    isAuthenticated: boolean;

    // Actions
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: User) => void;
    setAccessToken: (token: string) => void;
    logout: () => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // Initial state
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,

            // Set both tokens (on login)
            setTokens: (accessToken, refreshToken) => {
                // Also save to localStorage for API client
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                set({
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                });
            },

            // Set user data
            setUser: (user) => {
                set({ user });
            },

            // Update access token (on refresh)
            setAccessToken: (accessToken) => {
                localStorage.setItem('access_token', accessToken);
                set({ accessToken });
            },

            // Logout
            logout: () => {
                localStorage.clear();
                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                    isAuthenticated: false,
                });
            },

            // Clear all auth data
            clearAuth: () => {
                localStorage.clear();
                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                // Only persist these fields
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
