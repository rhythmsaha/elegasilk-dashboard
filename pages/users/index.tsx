import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const UsersPage: NextPageWithLayout = () => {
    return <div>UsersPage</div>;
};

UsersPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default UsersPage;
