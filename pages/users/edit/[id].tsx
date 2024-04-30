import PageName from '@/components/ui/PageName';
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import UserForm from '@/components/users/UserForm';
import axios from '@/utils/axios';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useAuthStore } from '@/store/useAuthStore';
import EditUserSection from '@/sections/users/EditUserSection';
import API_URLS from '@/lib/ApiUrls';

const EditUserPage: NextPageWithLayout = () => {
    const [user, setUser] = useState(null);
    const currentUserId = useAuthStore((state) => state.user?._id);
    const currentUserRole = useAuthStore((state) => state.user?.role);
    const router = useRouter();
    const isYou = currentUserId === router.query.id;
    const [noPemission, setNoPemission] = useState(false);

    useEffect(() => {
        axios
            .get(API_URLS.getSingleUser(router.query.id as string))
            .then((response) => {
                if (response.status !== 200) throw new Error('Failed to fetch user!');
                setUser(response.data.user);
            })
            .catch(() => {
                setNoPemission(true);
            });
    }, [currentUserRole, router]);

    if (isYou || noPemission) return <div className="flex min-h-screen items-center justify-center">Permision Denied</div>;

    if (!user) return <LoadingScreen />;

    if (!user) {
        return null;
    }

    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="Edit User"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Users', href: '/users' },
                    { title: 'Edit User', href: router.asPath },
                ]}
            />

            <EditUserSection user={user} />
        </div>
    );
};

EditUserPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout roles={['superadmin', 'admin']}>{page}</DashboardLayout>;
};

export default EditUserPage;
