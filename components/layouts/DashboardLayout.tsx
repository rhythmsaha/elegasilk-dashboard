import React from 'react';
import AuthGuard from '@/guards/AuthGuard';
import { useWindowSize } from 'react-use';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import { IUserRoles } from '@/Typings';
import { useMobileMenuStore } from '@/store/mobilemenu/useMenuStore';
import MobileMenu from '../mobilemenu/MobileMenu';
import { AnimatePresence } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    roles?: IUserRoles[];
}

const DashboardLayout: React.FC<Props> = ({ children, roles }) => {
    const isMobileMenuOpen = useMobileMenuStore((state) => state.isOpen);
    const { width } = useWindowSize();

    return (
        <AuthGuard roles={roles}>
            <div className="flex h-screen overflow-hidden">
                {width >= 1280 && <Sidebar />}

                <main className="relative flex-1 overflow-y-auto overflow-x-hidden">
                    <Header />
                    <div>{children}</div>
                </main>
            </div>

            <AnimatePresence>{isMobileMenuOpen && <MobileMenu />}</AnimatePresence>
        </AuthGuard>
    );
};

export default DashboardLayout;
