import DashboardLayout from '@/components/layouts/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../_app';
import PageName from '@/components/ui/PageName';
import OrdersSection from '@/sections/orders/OrdersSection';
import 'react-day-picker/dist/style.css';

const OrdersPage: NextPageWithLayout = () => {
    return (
        <div>
            <PageName
                title="Orders List"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Orders', href: '/orders' },
                ]}
            />

            <OrdersSection />
        </div>
    );
};

export default OrdersPage;

OrdersPage.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            <div className="dashboard-xl">{page}</div>
        </DashboardLayout>
    );
};
