import { IProduct } from '@/Typings';
import API_URLS from '@/lib/ApiUrls';
import { IProductFormData } from '@/sections/products/NewProductSection';
import axios from '@/utils/axios';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useSingleProduct = (productId: string) => {
    const [product, setProduct] = useState<IProduct>();
    const [productLoading, setProductLoading] = useState(true);

    const fetchProduct = useCallback(async () => {
        try {
            const { data } = await axios.get(API_URLS.getSingleProduct(productId));
            setProduct(data.data);
        } catch (error: any) {
            toast.error('Something Went wrong');
        } finally {
            setProductLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return { product, productLoading };
};

export default useSingleProduct;
