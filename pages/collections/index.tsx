import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import CreateNewButton from '@/components/ui/buttons/CreateNewButton';
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';
import CollectionsSection from '@/sections/collections/CollectionsSection';

const CollectionPage: NextPageWithLayout = () => {
    return (
        <div className="dashboard-xl">
            <PageName
                title="Collections"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Collections', href: '/collections' },
                ]}
                Button={CreateNewButton.bind(null, {
                    text: 'Create New',
                    Icon: <BiPlus />,
                    href: '/collections/new/',
                    as: Link,
                })}
            />

            <CollectionsSection />
        </div>
    );
};

CollectionPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CollectionPage;
