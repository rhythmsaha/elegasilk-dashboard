import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import { NextPageWithLayout } from '@/pages/_app';
import EditProductSection from '@/sections/products/EditProductSection';
import React from 'react';

interface Props {}

const EditProductPage: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <PageName title="Edit Product" breadcrumb={[{ title: 'Dashboard', href: '/' }, { title: 'Products', href: '/products' }, { title: 'Edit' }]} />

            <EditProductSection />
        </>
    );
};

EditProductPage.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            <div className="dashboard-xl">{page}</div>
        </DashboardLayout>
    );
};

export default EditProductPage;
