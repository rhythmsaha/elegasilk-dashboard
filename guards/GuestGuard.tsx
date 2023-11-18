import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}
const GuestGuard: FC<Props> = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated, isAuthenticating, isInitialized } = useAuthStore(
        (state) => state
    );

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    if (isAuthenticating) return <LoadingScreen />;

    return <>{children}</>;
};

export default GuestGuard;
