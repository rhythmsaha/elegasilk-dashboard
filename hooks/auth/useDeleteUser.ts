import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

type APIDeleteFunction = (userId: string, onDelete: (userId: string) => void) => void;

const useDeleteUser = () => {
    const [isLoading, setIsLoading] = useState(false);

    const ApiDeleteUser: APIDeleteFunction = async (userId, onDelete) => {
        if (isLoading) return;
        if (!userId) throw new Error('User ID is required!');
        toast.dismiss();

        try {
            setIsLoading(true);

            const response = await axios.delete(API_URLS.deleteUser(userId));

            setIsLoading(false);
            if (response.status !== 200) throw new Error('Something Went Wrong!');

            onDelete(userId);
            toast.success('User Deleted Successfully!');

            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return { ApiDeleteUser, isLoading };
};

export default useDeleteUser;
