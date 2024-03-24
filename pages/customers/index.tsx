import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import CreateNewButton from '@/components/ui/buttons/CreateNewButton';
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';
import CustomersSection from '@/sections/customers/CustomersSection';

const CustomersPage: NextPageWithLayout = () => {
    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="Customers List"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Customers', href: '/customers' },
                ]}
                Button={CreateNewButton.bind(null, {
                    text: 'Create New',
                    Icon: <BiPlus />,
                    href: '/customers/new/',
                    as: Link,
                })}
            />

            <CustomersSection />
        </div>
    );
};

export default CustomersPage;

CustomersPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout roles={['superadmin', 'admin', 'moderator']}>{page}</DashboardLayout>;
};
