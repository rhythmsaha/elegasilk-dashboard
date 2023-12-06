import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type APICreateFunction = (category: any) => void;

const useCreateCategory = () => {
    const router = useRouter();

    const createCategory: APICreateFunction = async (category: any) => {
        try {
            toast.dismiss();
            if (!category) throw new Error('Category is required!');

            const response = await axios.post(API_URLS.createCategory, category);
            if (response.status !== 201) throw new Error('Something Went Wrong!');

            await router.push('/categories');

            toast.success('Category Created Successfully!');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return { createCategory };
};

export default useCreateCategory;
