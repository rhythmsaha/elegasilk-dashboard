import { IUserRoles } from '@/Typings';
import { create } from 'zustand';

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

export const useAuthStore = create<IAuthStore>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isAuthenticating: false,
    isInitialized: false,

    initializeAuthState: () => {
        set({
            isInitialized: true,
        });
    },

    startAuthLoading: () => {
        set({ isAuthenticating: true });
    },

    stopAuthLoading: () => {
        set({ isAuthenticating: false });
    },

    login: (user, token) => {
        set({
            isInitialized: true,
            isAuthenticating: false,
            isAuthenticated: true,
            user: user,
            accessToken: token,
        });
    },

    logout: () => {
        set({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            isAuthenticating: false,
        });
    },
}));
