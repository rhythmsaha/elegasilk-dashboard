import { ImageFileType } from '@/Typings';
import React, { FC, useState } from 'react';
import { IcategoryFormData } from './NewCategorySection';
import { useForm } from 'react-hook-form';
import { Card } from '@nextui-org/react';
import UploadImage from '@/components/categories/UploadImage';
import CategoryStatus from '@/components/categories/CategoryStatus';
import CategoryForm from '@/components/categories/CategoryForm';
import { ICategory } from '@/components/categories/CategoryCard';
import toast from 'react-hot-toast';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';
import { useRouter } from 'next/router';

interface Props {
    category: ICategory;
}

const EditCategorySection: FC<Props> = ({ category }) => {
    const [image, setImage] = useState<ImageFileType>();

    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm<IcategoryFormData>({
        defaultValues: {
            status: category.status,
            name: category.name,
            description: category.description,
        },
    });

    const onSubmit = async (data: IcategoryFormData) => {
        if (!isDirty) return;
        if (isSubmitting) return;
        toast.dismiss();

        const payload: any = { ...data };

        try {
            if (image) {
                let imageUrl = await uploadToCloudinary(image);
                if (imageUrl) payload.image = imageUrl;
                else throw new Error('Failed to upload image!');
            }

            const response = await axios.put(API_URLS.updateCategory(category._id), payload);

            if (!response.data.success) throw new Error(response.data.message);

            reset((data) => ({
                ...data,
                status: payload.status,
                name: payload.name,
                description: payload.description,
            }));

            toast.success('Category updated successfully!');
            router.push(`/categories/edit/${response.data.data.slug}`);
        } catch (error: any) {
            toast.error('Failed to update category!');
        }
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5  lg:grid-cols-3">
                <Card shadow="sm" className="lg:col-span-1 ">
                    <UploadImage image={image} setImage={setImage} defaultImage={category.image} />
                    <CategoryStatus control={control} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <CategoryForm control={control} />
                </Card>
            </form>
        </div>
    );
};

export default EditCategorySection;
