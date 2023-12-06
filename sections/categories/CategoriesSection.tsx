import CategoryCard from '@/components/categories/CategoryCard';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import { Card, Skeleton, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

const CategoriesSection = () => {
    const { categories, isLoading, error, getCategories } = useFetchCategory();

    useEffect(() => {
        // delay
        getCategories();
    }, [getCategories]);

    if (isLoading) {
        return (
            <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
            ))}
        </div>
    );
};

export default CategoriesSection;
