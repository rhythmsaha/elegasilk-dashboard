import { ICategory } from '@/components/categories/CategoryCard';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import React, { useCallback, useState } from 'react';

type APICreateFunction = () => void;

const useFetchCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getCategories: APICreateFunction = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_URLS.getCategories);
            if (response.status !== 200) throw new Error('Something Went Wrong!');
            setCategories(response.data?.data);
            setIsLoading(false);
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
            setCategories([]);
        }
    }, []);

    // delete a category from state with id
    const deleteCategory = (id: string) => {
        setCategories((prevCategories) => prevCategories.filter((category) => category._id !== id));
    };

    return { categories, isLoading, error, getCategories, deleteCategory };
};

export default useFetchCategory;
