import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const ColorsPage: NextPageWithLayout = () => {
    return <div className="dashboard-xl">ColorsPage</div>;
};

ColorsPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
export default ColorsPage;
