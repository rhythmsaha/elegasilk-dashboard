import { ImageFileType } from '@/Typings';
import ProductForm from '@/components/products/ProductForm';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import createProductPayload from '@/utils/products/createProductPayload';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export interface IProductFormData {
    name: string;
    slug?: string;
    description: string;
    images?: string[];
    sku?: string;
    MRP: number;
    discount: number;
    published: boolean;
    colors: string;
    collections?: string;
    stock?: number;
    attributes: {
        _id?: string;
        category: string;
        subcategory?: string;
    }[];
    specs: {
        name: string;
        value: string;
    }[];
}

const NewProductSection: FC = () => {
    const [images, setImages] = useState<ImageFileType[]>([]);
    const { getCategories, categories } = useFetchCategory();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<IProductFormData>({
        defaultValues: {
            published: true,
            specs: [{ name: 'Product Category', value: 'Saree' }],
        },
    });

    const router = useRouter();

    useEffect(() => {
        getCategories(true);
    }, [getCategories, setValue]);

    useEffect(() => {
        const _cat = categories.map((c, i) => {
            return {
                _id: c._id,
                category: c.name,
            };
        });

        setValue('attributes', _cat);
    }, [categories, setValue, getValues]);

    const submitHandler = async (data: IProductFormData) => {
        if (isSubmitting) return;

        const productPayload = createProductPayload(data, images);
        console.log(productPayload);
        await router.push('/products');
        toast.success('Product Created Successfully!');

        try {
            const response = await axios.post(API_URLS.createProduct, productPayload);
            if (response.status !== 201) throw new Error('Something Went Wrong!');
        } catch (error: any) {
            toast.error(error.message);
            console.log(error.message);
        }
    };

    return (
        <section className="mt-10">
            <ProductForm control={control} images={images} setImages={setImages} categories={categories} onSubmit={handleSubmit(submitHandler)} />
        </section>
    );
};

export default NewProductSection;
