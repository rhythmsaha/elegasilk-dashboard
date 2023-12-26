import { ImageFileType } from '@/Typings';
import ProductForm from '@/components/products/ProductForm';
import useFetchCategory from '@/hooks/category/useFetchCategory';
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
    colors: string[];
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
            ...data,
            images: images.map((img) => img.publicUrl),
        };

        // console.log(payload.attributes[0].subcategory.split(','));
        console.log(payload);
    };

    return (
        <section className="mt-10">
            <form onSubmit={handleSubmit(submitHandler)}>
                <ProductForm control={control} images={images} setImages={setImages} categories={categories} />
            </form>
        </section>
    );
};

export default NewProductSection;
