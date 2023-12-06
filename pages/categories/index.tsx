import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageName from '@/components/ui/PageName';
import { Avatar, Button, Card, CardFooter, Divider, Image } from '@nextui-org/react';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';
import { faker } from '@faker-js/faker';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import CategoryCard from '@/components/categories/CategoryCard';
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

const categoriesDemo = Array.from({ length: 10 }, () => ({
    _id: faker.datatype.uuid(),
    name: faker.commerce.department(),
    slug: faker.lorem.slug(),
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr({ category: 'saree' }),
    createdAt: faker.date.past().toLocaleDateString(),
    updatedAt: faker.date.recent().toLocaleDateString(),
}));

const CategoriesPage: NextPageWithLayout = () => {
    const [categories, setCategories] = useState<typeof categoriesDemo>([]);

    useEffect(() => {
        setCategories([...categoriesDemo]);
    }, []);

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

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                ))}
            </div>
        </div>
    );
};

CategoriesPage.getLayout = function getLayout(page: any) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CategoriesPage;
