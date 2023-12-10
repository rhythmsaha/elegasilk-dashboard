import { ImageFileType } from '@/Typings';
import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ISubCategoryFormData } from './CreateSubCategorySection';
import { Card } from '@nextui-org/react';
import UploadImage from '@/components/categories/UploadImage';
import CategoryStatus from '@/components/categories/CategoryStatus';
import CategoryForm from '@/components/categories/CategoryForm';
import toast from 'react-hot-toast';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';

type Props = {
    subCategory: ISubCategory;
};

const EditSubCategorySection = ({ subCategory }: Props) => {
    const [image, setImage] = useState<ImageFileType>();
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm<ISubCategoryFormData>({
        defaultValues: {
            status: subCategory.status,
            name: subCategory.name,
            description: subCategory.description,
        },
    });

    const onSubmit = async (data: ISubCategoryFormData) => {
        if (!isDirty && !image) return;
        if (isSubmitting) return;
        toast.dismiss();

        const payload: any = { ...data };

        try {
            if (image) {
                let imageUrl = await uploadToCloudinary(image);
                if (imageUrl) payload.image = imageUrl;
                else throw new Error('Failed to upload image!');
            }

            const response = await axios.put(API_URLS.updateSubCategory(subCategory._id), payload);

            if (!response.data.success) throw new Error(response.data.message);

            const newData = response.data.data;

            reset((data) => ({
                ...data,
                status: newData.status,
                name: newData.name,
                description: newData.description,
            }));

            toast.success('Category updated successfully!');
        } catch (error: any) {
            toast.error('Failed to update category!');
        }
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5  lg:grid-cols-3">
                <Card shadow="sm" className="lg:col-span-1 ">
                    <UploadImage image={image} setImage={setImage} defaultImage={subCategory.image} />
                    <CategoryStatus control={control} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <CategoryForm control={control} />
                </Card>
            </form>
        </div>
    );
};

export default EditSubCategorySection;
