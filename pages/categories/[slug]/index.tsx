import { ICategory } from '@/components/categories/CategoryCard';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import FullScreenSpinner from '@/components/ui/FullScreenSpinner';
import PageName, { INavLink } from '@/components/ui/PageName';
import CreateNewButton from '@/components/ui/buttons/CreateNewButton';
import API_URLS from '@/lib/ApiUrls';
import { NextPageWithLayout } from '@/pages/_app';
import SubCategoriesSetion from '@/sections/subcategories/SubCategoriesSetion';
import axios from '@/utils/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';

const CategoryPage: NextPageWithLayout = () => {
    const [breadCumbs, setBreadCumbs] = useState<INavLink[]>([
        { title: 'Dashboard', href: '/' },
        { title: 'Categories', href: '/categories' },
    ]);

    const [isLoading, setIsLoading] = useState(true);
    const [subcategories, setSubcategories] = useState<ISubCategory[]>([]);
    const [category, setCategory] = useState<ICategory>();

    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(API_URLS.getSubCategories + `?category=${router.query.slug}`)
            .then((response) => {
                console.log(response.data);

                setSubcategories(response.data.data);
                const categoryObj = { ...response.data.category };

                setCategory(categoryObj);
                setBreadCumbs([
                    { title: 'Dashboard', href: '/' },
                    { title: 'Categories', href: '/categories' },
                    { title: categoryObj.name, href: `/categories/${categoryObj.slug}` },
                ]);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [router.query.slug]);

    const onDelete = (id: string) => {
        // filter subcategories
        const newSubCategories = subcategories.filter((subcategory) => subcategory._id !== id);
        setSubcategories(newSubCategories);
    };

    if (isLoading && !category) {
        return <FullScreenSpinner />;
    }

    return (
        <div className="mx-auto mt-2 w-11/12 max-w-screen-xl pb-20">
            <PageName
                title="Sub Categories"
                breadcrumb={breadCumbs}
                Button={CreateNewButton.bind(null, {
                    text: 'Create New',
                    Icon: <BiPlus />,
                    href: '/subcategories/new/' + category?.slug,
                    as: Link,
                })}
            />

            <SubCategoriesSetion subcategories={subcategories} onDelete={onDelete} />
        </div>
    );
};

CategoryPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CategoryPage;
