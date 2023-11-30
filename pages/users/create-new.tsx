import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import CreateNewUserSection from '@/sections/users/CreateNewUserSection';
import React from 'react';

const NewUserPage = () => {
    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="New User"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Users', href: '/users' },
                    { title: 'Create New User', href: '' },
                ]}
            />

            <CreateNewUserSection />
        </div>
    );
};

export default NewUserPage;

NewUserPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout roles={['superadmin', 'admin']}>{page}</DashboardLayout>;
};
