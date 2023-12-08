import { ImageFileType } from '@/Typings';
import CategoryForm from '@/components/categories/CategoryForm';
import CategoryStatus from '@/components/categories/CategoryStatus';
import UploadImage from '@/components/categories/UploadImage';
import useCreateCategory from '@/hooks/category/useCreateCategory';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import { Card } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export interface IcategoryFormData {
    name: string;
    description?: string;
    image?: string;
    status: boolean;
}

const NewCategorySection = () => {
    const [image, setImage] = useState<ImageFileType>();

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<IcategoryFormData>({ defaultValues: { status: true } });

    const { createCategory } = useCreateCategory();

    const submitHandler = async (data: IcategoryFormData) => {
        if (isSubmitting) return;

        const payload: IcategoryFormData = {
            ...data,
        };

        try {
            let imageUrl = null;

            if (image) {
                imageUrl = await uploadToCloudinary(image);
                if (imageUrl) payload.image = imageUrl;
                else throw new Error('Failed to upload image!');
            }

            createCategory(payload);
        } catch (error: any) {
            return toast.error(error.message);
        }
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form className="grid gap-5  lg:grid-cols-3" onSubmit={handleSubmit(submitHandler)}>
                <Card shadow="sm" className="lg:col-span-1 ">
                    <UploadImage image={image} setImage={setImage} />
                    <CategoryStatus control={control} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <CategoryForm control={control} />
                </Card>
            </form>
        </div>
    );
};

export default NewCategorySection;
