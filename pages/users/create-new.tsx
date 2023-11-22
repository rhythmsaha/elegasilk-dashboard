import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import React from 'react';

const NewUserPage = () => {
    return <div>NewUserPage</div>;
};

export default NewUserPage;

NewUserPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout roles={['superadmin', 'admin']}>{page}</DashboardLayout>;
};
