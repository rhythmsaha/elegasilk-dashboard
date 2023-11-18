import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    const router = useRouter();

    useEffect(() => {
        if (!isInitialized) return;

        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, isInitialized, router]);

    return <div>AuthGuard</div>;
};

export default AuthGuard;
