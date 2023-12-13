import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useCallback, useState } from 'react';

type func = (id: string) => void;

export interface ICollection {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    status: boolean;
    subcategory: { name: string; slug: string; _id: string };
    createdAt: string;
    updatedAt: string;
}

const useCollection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [collection, setCollection] = useState<ICollection>();
    const [error, setError] = useState<string | null>(null);

    const getCollection: func = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_URLS.getSingleCollection(id));

            if (response.status !== 200) throw new Error('Something Went Wrong!');
            setCollection(response.data?.data);
            setIsLoading(false);
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
            setCollection(null!);
        }
    }, []);

    return { collection, isLoading, error, getCollection };
};

export default useCollection;
