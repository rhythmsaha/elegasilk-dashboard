import { ImageFileType } from '@/Typings';
import ProductForm from '@/components/products/ProductForm';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
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
        const _cat = categories.map((c) => ({
            _id: c._id,
            category: c.name,
        }));

        setValue('attributes', _cat);
    }, [categories, setValue]);

    const submitHandler = async (data: IProductFormData) => {
        if (isSubmitting) return;

        const payload: any = {
            images: images.map((img) => img.publicUrl),
        };

        if (data.name) payload.name = data.name;
        if (data.slug) payload.slug = data.slug;
        if (data.description) payload.description = data.description;
        if (data.content) payload.content = data.content;
        if (data.sku) payload.sku = data.sku;
        if (data.stock) payload.stock = data.stock;
        if (data.MRP) payload.MRP = data.MRP;
        if (data.price) payload.price = data.price;
        if (data.published) payload.published = data.published;
        if (data.attributes) payload.attributes = data.attributes;

        if (data.collections) {
            const _collections = data.collections.split(',');
            payload.collections = _collections;
        }
        if (data.colors) {
            const _colors = data.colors.split(',');
            payload.colors = _colors;
        }

        try {
            const response = await axios.post(API_URLS.createProduct, payload);
            console.log(response.data);
        } catch (error: any) {
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
