import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import NewCollectionSection from '@/sections/collections/NewCollectionSection';

const NewCollectionPage: NextPageWithLayout = () => {
    return (
        <>
            <PageName
                title="New Collection"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Collections', href: '/collections' },
                    { title: 'New Collection', href: '/collections/new' },
                ]}
            />

            <NewCollectionSection />
        </>
    );
};

NewCollectionPage.getLayout = function getLayout(page: any) {
    return (
        <DashboardLayout>
            <div className="dashboard-xl">{page}</div>
        </DashboardLayout>
    );
};

export default NewCollectionPage;
