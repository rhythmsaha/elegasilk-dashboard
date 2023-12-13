import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import useCategory from '@/hooks/category/useCategory';
import { NextPageWithLayout } from '@/pages/_app';
import EditCategorySection from '@/sections/categories/EditCategorySection';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const EditCategoryPage: NextPageWithLayout = () => {
    const { category, error, getCategory, isLoading } = useCategory();

    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        getCategory(id as string);
    }, [getCategory, id]);

    if (!category && isLoading) {
        return (
            <div className="fullscreen-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        router.push('/404');
    }

    if (!category) {
        return (
            <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">
                <h3>404 Not Found</h3>
            </div>
        );
    }

    return (
        <div className="dashboard-xl">
            <PageName
                title={`Edit Category - ${category.name}`}
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Categories', href: '/categories' },
                    { title: category.name, href: `/categories/edit/${category.slug}` },
                ]}
            />

            <EditCategorySection category={category} />
        </div>
    );
};

EditCategoryPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default EditCategoryPage;
