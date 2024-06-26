import API_URLS from '@/lib/ApiUrls';
import { useAuthStore } from '@/store/useAuthStore';
import axios from '@/utils/axios';
import { getSession, setSession } from '@/utils/jwt';
import { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    const startAuthLoading = useAuthStore((state) => state.startAuthLoading);
    const stopAuthLoading = useAuthStore((state) => state.stopAuthLoading);
    const initializeAuthState = useAuthStore((state) => state.initializeAuthState);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    useEffect(() => {
        if (isInitialized) return;
        initializeAuthState();
    }, [initializeAuthState, isInitialized]);

    useEffect(() => {
        const initialize = async () => {
            const token = getSession();
            startAuthLoading();
            if (!token) return logout();

            try {
                const response = await axios.get(API_URLS.session);

                const data = await response.data;

                setSession(data.accessToken);
                login(data.user, data.accessToken);
            } catch (error) {
                logout();
            }
        };

        initialize();
    }, [initializeAuthState, login, logout, startAuthLoading, stopAuthLoading]);

    return <>{children}</>;
};

export default AuthProvider;
