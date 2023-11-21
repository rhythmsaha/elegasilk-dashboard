import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAuthStore } from '@/store/useAuthStore';
import { IUserRoles } from '@/Typings';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
    roles?: IUserRoles[];
}

const AuthGuard: React.FC<Props> = ({ children, roles }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const isAuthenticating = useAuthStore((state) => state.isAuthenticating);
    const userRole = useAuthStore((state) => state.user?.role);

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

    if (roles && !roles.includes(userRole!)) {
        return <div>Unauthorized</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;
