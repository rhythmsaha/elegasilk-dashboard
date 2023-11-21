import React from 'react';
import AuthGuard from '@/guards/AuthGuard';
import { useWindowSize } from 'react-use';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import { IUserRoles } from '@/Typings';

interface Props {
    children: React.ReactNode;
    roles?: IUserRoles[];
}

const DashboardLayout: React.FC<Props> = ({ children, roles }) => {
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
        </AuthGuard>
    );
};

export default DashboardLayout;
