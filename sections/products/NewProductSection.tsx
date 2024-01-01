import { ImageFileType } from '@/Typings';
import ProductForm from '@/components/products/ProductForm';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import createProductPayload from '@/utils/products/createProductPayload';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface IProductFormData {
    name: string;
    slug?: string;
    description: string;
    content?: string;
    images?: string[];
    sku?: string;
    MRP: number;
    price: number;
    published: boolean;
    colors: string;
    collections?: string;
    stock?: number;
    attributes: {
        _id?: string;
        category: string;
        subcategory?: string;
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
        },
    });

    useEffect(() => {
        getCategories(true);
    }, [getCategories, setValue]);

    useEffect(() => {
        const _cat = categories.map((c, i) => {
            const _field = getValues('attributes')[i];
            if (_field?.subcategory) return _field;

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

        // try {
        //     const response = await axios.post(API_URLS.createProduct, payload);
        //     console.log(response.data);
        // } catch (error: any) {
        //     console.log(error.message);
        // }

        console.log(productPayload);
    };

    return (
        <section className="mt-10">
            <ProductForm control={control} images={images} setImages={setImages} categories={categories} onSubmit={handleSubmit(submitHandler)} />
        </section>
    );
};

export default NewProductSection;
