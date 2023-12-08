import DashboardLayout from '@/components/layouts/DashboardLayout';
import FullScreenSpinner from '@/components/ui/FullScreenSpinner';
import PageName from '@/components/ui/PageName';
import useCategory from '@/hooks/category/useCategory';
import { NextPageWithLayout } from '@/pages/_app';
import CreateSubCategorySection from '@/sections/subcategories/CreateSubCategorySection';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const NewSubCategory: NextPageWithLayout = () => {
    const { isLoading, category, error, getCategory } = useCategory();

    const router = useRouter();

    const categoryId = router.query.categoryId as string;

    useEffect(() => {
        getCategory(categoryId);
    }, [getCategory, router, categoryId]);

    if (isLoading && !category) {
        return <FullScreenSpinner />;
    }

    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="New Sub-Category"
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Categories', href: '/categories' },
                    { title: 'New Sub-Category', href: '' },
                ]}
            />

            <CreateSubCategorySection categoryId={categoryId} />
        </div>
    );
};

NewSubCategory.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewSubCategory;
