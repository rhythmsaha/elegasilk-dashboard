import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import NewCollectionSection from '@/sections/collections/NewCollectionSection';

const NewCollectionPage: NextPageWithLayout = () => {
    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="New Collection"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Collections', href: '/collections' },
                    { title: 'New Collection', href: '/collections/new' },
                ]}
            />

            <NewCollectionSection />
        </div>
    );
};

NewCollectionPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewCollectionPage;
