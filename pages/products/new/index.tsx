import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import { NextPageWithLayout } from '@/pages/_app';
import NewProductSection from '@/sections/products/NewProductSection';
import React from 'react';

const CreateNewProductPage: NextPageWithLayout = () => {
    return (
        <>
            <PageName
                title="New Product"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Products', href: '/products' },
                    { title: 'Create New', href: '/products/new' },
                ]}
            />

            <NewProductSection />
        </>
    );
};

CreateNewProductPage.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            <div className="dashboard-xl">{page}</div>
        </DashboardLayout>
    );
};

export default CreateNewProductPage;
