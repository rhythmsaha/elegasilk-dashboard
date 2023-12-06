import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import NewCategorySection from '@/sections/categories/NewCategorySection';

const NewCategoryPage: NextPageWithLayout = () => {
    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="New Category"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Categories', href: '/categories' },
                    { title: 'Create New Category', href: '/categories/new' },
                ]}
            />

            <NewCategorySection />
        </div>
    );
};

NewCategoryPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewCategoryPage;
