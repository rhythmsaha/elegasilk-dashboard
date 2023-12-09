import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useCallback, useState } from 'react';

type APIGetFunc = (id: string) => void;

const useSubCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [subCategory, setSubCategory] = useState<ISubCategory>();
    const [error, setError] = useState<string | null>(null);

    const getSubCategory: APIGetFunc = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_URLS.getSingleSubCategory(id));

            if (response.status !== 200) throw new Error('Something Went Wrong!');
            setSubCategory(response.data?.data);
            setIsLoading(false);
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
            setSubCategory(undefined!);
        }
    }, []);

    return { subCategory, isLoading, error, getSubCategory };
};

export default useSubCategory;
