import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

type Func = (data: any) => void;

const useCreateCollection = () => {
    const router = useRouter();

    const createCollection: Func = async (collection) => {
        try {
            toast.dismiss();
            if (!collection) throw new Error('Collection is required!');
            const response = await axios.post(API_URLS.createCollection, collection);
            if (response.status !== 201) throw new Error('Something Went Wrong!');
            await router.push('/collections');
            toast.success('Collection Created Successfully!');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return { createCollection };
};

export default useCreateCollection;
