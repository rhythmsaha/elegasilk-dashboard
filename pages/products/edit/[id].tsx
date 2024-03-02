import DashboardLayout from '@/components/layouts/DashboardLayout';
import LoadingScreen from '@/components/ui/LoadingScreen';
import PageName from '@/components/ui/PageName';
import useSingleProduct from '@/hooks/products/useSingleProduct';
import { NextPageWithLayout } from '@/pages/_app';
import EditProductSection from '@/sections/products/EditProductSection';
import { useRouter } from 'next/router';
import React from 'react';

const EditProductPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { product, productLoading } = useSingleProduct(router.query.id as string);

    console.log(product);

    if (productLoading) return <LoadingScreen />;

    return (
        <>
            <PageName title="Edit Product" breadcrumb={[{ title: 'Dashboard', href: '/' }, { title: 'Products', href: '/products' }, { title: 'Edit' }]} />

            <EditProductSection product={product} />
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
