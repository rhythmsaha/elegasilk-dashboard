import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

type F = (id: string, onDelete: (id: string) => void) => void;

const useDeleteCollection = () => {
    const [isLoading, setIsLoading] = useState(false);

    const collectionDeleteHandler: F = async (id, onDelete) => {
        if (isLoading) return;
        if (!id) throw new Error('ID is required!');

        try {
            setIsLoading(true);

            const response = await axios.delete(API_URLS.deleteCollection(id));

            setIsLoading(false);
            if (response.status !== 200) throw new Error('Something Went Wrong!');

            onDelete(id);
            toast.success('Collection Deleted Successfully!');
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return { collectionDeleteHandler, isLoading };
};

export default useDeleteCollection;
