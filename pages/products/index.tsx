import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';
import CreateNewButton from '@/components/ui/buttons/CreateNewButton';
import ProductsSection from '@/sections/products/ProductsSection';

type Props = {};

const ProductsPage: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <PageName
                title="Products List"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Products', href: '/products' },
                ]}
                Button={CreateNewButton.bind(null, {
                    text: 'Create New',
                    Icon: <BiPlus />,
                    href: '/products/new/',
                    as: Link,
                })}
            />

            <ProductsSection />
        </>
    );
};

ProductsPage.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            <div className="dashboard-xl">{page}</div>
        </DashboardLayout>
    );
};

export default ProductsPage;
