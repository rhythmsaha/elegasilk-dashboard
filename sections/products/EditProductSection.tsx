import { ImageFileType } from '@/Typings';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProductFormData } from './NewProductSection';
import useSingleProduct from '@/hooks/products/useSingleProduct';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import ProductForm from '@/components/products/ProductForm';

const EditProductSection: FC = () => {
    const [images, setImages] = useState<ImageFileType[]>([]);
    const { getCategories, categories } = useFetchCategory();
    const router = useRouter();

    const { product, productLoading } = useSingleProduct(router.query.id as string);

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

        try {
            toast.success('Product Updated Successfully!');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <section className="mt-10">
            <ProductForm control={control} images={images} setImages={setImages} categories={categories} onSubmit={handleSubmit(submitHandler)} />
        </section>
    );
};

export default EditProductSection;
