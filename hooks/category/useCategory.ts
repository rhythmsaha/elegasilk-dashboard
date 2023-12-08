import { ICategory } from '@/components/categories/CategoryCard';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useCallback, useState } from 'react';

type APICreateFunction = (id: string) => void;

const useCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState<ICategory>();
    const [error, setError] = useState<string | null>(null);

    const getCategory: APICreateFunction = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_URLS.getSingleCategory(id));

            if (response.status !== 200) throw new Error('Something Went Wrong!');
            setCategory(response.data?.data);
            setIsLoading(false);
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
            setCategory(undefined!);
        }
    }, []);

    return { category, isLoading, error, getCategory };
};

export default useCategory;
