import { ImageFileType } from '@/Typings';
import useFetchCategory from '@/hooks/category/useFetchCategory';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProductFormData } from './NewProductSection';
import useSingleProduct from '@/hooks/products/useSingleProduct';
import { useRouter } from 'next/router';

const EditProductSection: FC = () => {
    const [images, setImages] = useState<ImageFileType[]>([]);
    const { getCategories, categories } = useFetchCategory();
    const router = useRouter();

    const { product, productLoading } = useSingleProduct(router.query.id as string);

    console.log(product);

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<IProductFormData>({});

    useEffect(() => {
        getCategories(true);
    }, [getCategories, setValue]);

    return (
        <section className="mt-10 grid grid-cols-2 gap-4">
            <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur eaque nulla aut odit, enim eius eos rerum illum quas laborum, reiciendis consequuntur harum ex quod asperiores
                omnis, similique necessitatibus unde.
            </div>
        </section>
    );
};

export default EditProductSection;
