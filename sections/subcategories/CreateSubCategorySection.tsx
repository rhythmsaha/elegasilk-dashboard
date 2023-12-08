import { ImageFileType } from '@/Typings';
import CategoryForm from '@/components/categories/CategoryForm';
import CategoryStatus from '@/components/categories/CategoryStatus';
import UploadImage from '@/components/categories/UploadImage';
import useCreateSubCategory from '@/hooks/subcategory/useCreateSubCategory';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import { Card } from '@nextui-org/react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export interface ISubCategoryFormData {
    name: string;
    description?: string;
    image?: string;
    status: boolean;
    category: string;
}

interface Props {
    categoryId: string;
}

const CreateSubCategorySection: FC<Props> = ({ categoryId }) => {
    const [image, setImage] = useState<ImageFileType>();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ISubCategoryFormData>({ defaultValues: { status: true } });

    const { createSubCategory } = useCreateSubCategory();

    const submitHandler = async (data: ISubCategoryFormData) => {
        if (isSubmitting) return;

        const payload: ISubCategoryFormData = {
            ...data,
        };

        if (!categoryId) throw new Error('Category is required!');

        payload.category = categoryId;

        try {
            let imageUrl = null;

            if (image) {
                imageUrl = await uploadToCloudinary(image);
                if (imageUrl) payload.image = imageUrl;
                else throw new Error('Failed to upload image!');
            }

            createSubCategory(payload);
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

export default CreateSubCategorySection;
