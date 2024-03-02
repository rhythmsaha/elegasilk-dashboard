import { IProduct, ImageFileType } from '@/Typings';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProductFormData } from './NewProductSection';
import toast from 'react-hot-toast';
import ProductForm from '@/components/products/ProductForm';
import createProductPayload from '@/utils/products/createProductPayload';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';

interface Props {
    product: IProduct;
}

const EditProductSection: FC<Props> = ({ product }) => {
    const myImages = product?.images?.map((img, i) => ({ preview: img, id: i, publicUrl: img }));
    const [images, setImages] = useState<ImageFileType[]>(myImages as any[]);
    const { getCategories, categories } = useFetchCategory();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<IProductFormData>({
        defaultValues: {
            name: product?.name,
            description: product?.description,
            // images: product?.images,
            sku: product?.sku,
            MRP: product?.MRP,
            discount: product?.discount,
            published: product?.published,
            stock: product?.stock,
            specs: product?.specs,
            collections: product?.collections.join(','),
            colors: product?.colors.join(','),
        },
    });

    useEffect(() => {
        getCategories(true);
    }, [getCategories, setValue]);

    useEffect(() => {
        const _cat = categories.map((c, i) => {
            const defaultAttr = product?.attributes.find((attr) => attr.category === c._id);

            if (defaultAttr) {
                return {
                    _id: c._id,
                    category: c.name,
                    subcategory: defaultAttr?.subcategory.join(','),
                };
            } else {
                return {
                    _id: c._id,
                    category: c.name,
                };
            }
        });

        setValue('attributes', _cat);
    }, [categories, setValue, getValues, product?.attributes]);

    const submitHandler = async (data: IProductFormData) => {
        if (isSubmitting) return;

        const productPayload = createProductPayload(data, images);
        console.log(productPayload);

        try {
            const response = await axios.put(API_URLS.updateProduct(product._id), productPayload);
            if (response.status !== 200) throw new Error('Something Went Wrong!');
            toast.success('Product Updated Successfully!');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <section className="mt-10">
            <ProductForm control={control} images={images} setImages={setImages} categories={categories} onSubmit={handleSubmit(submitHandler)} edit={true} />
        </section>
    );
};

export default EditProductSection;
