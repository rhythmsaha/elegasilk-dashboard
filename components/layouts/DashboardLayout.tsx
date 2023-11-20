import React from 'react';
import AuthGuard from '@/guards/AuthGuard';
import { useWindowSize } from 'react-use';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';

interface Props {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const { width } = useWindowSize();

    return (
        <AuthGuard>
            <div className="flex h-screen overflow-hidden">
                {width >= 1280 && <Sidebar />}

                <main className="relative flex-1 overflow-y-auto overflow-x-hidden">
                    <Header />
                    <div>{children}</div>
                </main>
            </div>
        </AuthGuard>
    );
};

export default DashboardLayout;
