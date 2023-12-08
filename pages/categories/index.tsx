import React from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

import CategoriesSection from '@/sections/categories/CategoriesSection';
// import Image from 'next/image';

const CreateNewCategoryButton = () => {
    return (
        <Button as={Link} href="/categories/new" variant="shadow" color="primary">
            <span>
                <BiPlus />
            </span>

            <span>New Category</span>
        </Button>
    );
};

const CategoriesPage: NextPageWithLayout = () => {
    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="Categories"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Categories', href: '/categories' },
                ]}
                Button={CreateNewCategoryButton}
            />

            <CategoriesSection />
        </div>
    );
};

CategoriesPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CategoriesPage;
