import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const isAuthenticating = useAuthStore((state) => state.isAuthenticating);

    const router = useRouter();

    useEffect(() => {
        if (isInitialized) {
            if (!isAuthenticated && !isAuthenticating) {
                router.replace('/login');
            }
        }
    }, [isAuthenticated, isAuthenticating, isInitialized, router]);

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (isAuthenticating) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <LoadingScreen />;
    }

    return <div>{children}</div>;
};

export default AuthGuard;
