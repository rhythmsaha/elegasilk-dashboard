import { IUserRoles } from '@/Typings';
import { setSession } from '@/utils/jwt';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IUserState {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: IUserRoles;
    avatar: string;
}

interface IAuthStore {
    user: IUserState | null;
    accessToken: string | null;
    isInitialized: boolean;
    isAuthenticated: boolean;
    isAuthenticating: boolean;

    initializeAuthState: () => void;
    startAuthLoading: () => void;
    stopAuthLoading: () => void;
    login: (user: IUserState, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
    devtools(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isAuthenticating: false,
            isInitialized: false,

            initializeAuthState: () => {
                set(
                    {
                        isInitialized: true,
                    },
                    false,
                    'initializeAuthState'
                );
            },

            startAuthLoading: () => {
                set({ isAuthenticating: true }, false, 'startAuthLoading');
            },

            stopAuthLoading: () => {
                set({ isAuthenticating: false }, false, 'stopAuthLoading');
            },

            login: (user, token) => {
                set(
                    {
                        isInitialized: true,
                        isAuthenticating: false,
                        isAuthenticated: true,
                        user: user,
                        accessToken: token,
                    },
                    false,
                    'login'
                );
            },

            logout: () => {
                setSession();
                set(
                    {
                        isAuthenticated: false,
                        user: null,
                        accessToken: null,
                        isAuthenticating: false,
                    },
                    false,
                    'logout'
                );
            },
        }),

        { name: 'AuthStore' }
    )
);
