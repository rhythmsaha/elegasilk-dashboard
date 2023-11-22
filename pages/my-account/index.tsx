import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import MyAccountSection from '@/sections/account/MyAccountSection';
import React from 'react';

const MyAccountPage = () => {
    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="My Account"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'My Account', href: '/my-account' },
                ]}
            />

            <MyAccountSection />
        </div>
    );
};

export default MyAccountPage;

MyAccountPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
