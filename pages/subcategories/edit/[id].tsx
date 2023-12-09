import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import useSubCategory from '@/hooks/subcategory/useSubCategory';
import { NextPageWithLayout } from '@/pages/_app';
import EditSubCategorySection from '@/sections/subcategories/EditSubCategorySection';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const EditPage: NextPageWithLayout = () => {
    const { isLoading, error, getSubCategory, subCategory } = useSubCategory();
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        getSubCategory(id as string);
    }, [getSubCategory, id]);

    if (!subCategory && isLoading) {
        return (
            <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        // router.push('/404');

        return <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">{error}</div>;
    }

    if (!subCategory) {
        // router.push('/404');

        return (
            <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">
                <h3>404 Not Found</h3>
            </div>
        );
    }

    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title={`Edit Category - ${subCategory.name}`}
                breadcrumb={[
                    { title: 'Dashboard', href: '/' },
                    { title: 'Categories', href: '/categories' },
                    { title: subCategory.category?.name || 'Subcategory', href: `/categories/${subCategory.category?.slug}` },
                    { title: subCategory.name, href: `/subcategories/edit/${subCategory._id}` },
                ]}
            />

            <EditSubCategorySection subCategory={subCategory} />
        </div>
    );
};

EditPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default EditPage;
