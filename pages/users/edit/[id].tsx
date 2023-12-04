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

const EditUserPage: NextPageWithLayout = () => {
    const [user, setUser] = useState(null);
    const currentUserId = useAuthStore((state) => state.user?._id);
    const currentUserRole = useAuthStore((state) => state.user?.role);
    const router = useRouter();
    const isYou = currentUserId === router.query.id;
    const [noPemission, setNoPemission] = useState(false);

    useEffect(() => {
        axios
            .get(`/admin/user/${router.query.id}`)
            .then((response) => {
                if (response.status !== 200) throw new Error('Failed to fetch user!');

                // check role permission
                // if (response.data.user.role === 'superadmin' && currentUserRole !== 'superadmin') {
                //     router.push('/not-found');
                // } else {
                // }
                setUser(response.data.user);
            })
            .catch((error) => {
                setNoPemission(true);
                // router.push('/not-found');
            });
    }, [currentUserRole, router]);

    if (isYou) return <p>Permision Denied</p>;
    if (noPemission) return <p>Permision Denied</p>;

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
