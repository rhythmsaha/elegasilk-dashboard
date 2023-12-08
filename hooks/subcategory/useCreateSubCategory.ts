import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type APICreateFunction = (subcategory: any) => void;

const useCreateSubCategory = () => {
    const router = useRouter();

    const createSubCategory: APICreateFunction = async (subcategory: any) => {
        try {
            toast.dismiss();
            if (!subcategory) throw new Error('Sub Category is required!');

            const response = await axios.post(API_URLS.createSubCategory, subcategory);
            if (response.status !== 201) throw new Error('Something Went Wrong!');

            await router.push(`/categories`);

            toast.success('Sub Category Created Successfully!');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return { createSubCategory };
};

export default useCreateSubCategory;
