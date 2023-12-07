import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

type APIDeleteFunction = (id: string, onDelete: (id: string) => void) => void;

const useDeleteCategory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const ApiDeleteategory: APIDeleteFunction = async (id, onDelete) => {
        if (isLoading) return;
        if (!id) throw new Error('ID is required!');
        toast.dismiss();

        try {
            setIsLoading(true);

            const response = await axios.delete(API_URLS.deleteCategory(id));

            setIsLoading(false);
            if (response.status !== 200) throw new Error('Something Went Wrong!');

            onDelete(id);
            toast.success('User Deleted Successfully!');
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return { ApiDeleteategory, isLoading };
};

export default useDeleteCategory;
