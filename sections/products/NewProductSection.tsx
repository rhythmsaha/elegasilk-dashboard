import { ImageFileType } from '@/Typings';
import ProductForm from '@/components/products/ProductForm';
import ProductFormSectionHeader from '@/components/products/ProductFormSectionHeader';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {};

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
    collections?: string[];
    stock?: number;
    attributes: [
        {
            _id?: string;
            category: string;
            subcategory: string;
        },
    ];
}

const NewProductSection = (props: Props) => {
    const [images, setImages] = useState<ImageFileType[]>([]);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<IProductFormData>({
        defaultValues: {
            content: '<p><strong>sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd</strong></p><h2>sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd</h2>',
            description: 'sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd',
            name: 'dsadsdsadsads',
            published: true,
        },
    });

    const submitHandler = async (data: IProductFormData) => {
        if (isSubmitting) return;

        const payload: IProductFormData = {
            ...data,
        };

        console.log(payload);
    };

    return (
        <section className="mt-10">
            <form onSubmit={handleSubmit(submitHandler)}>
                <ProductForm control={control} images={images} setImages={setImages} />
            </form>
        </section>
    );
};

export default NewProductSection;
