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

    const onSubmit = async (data: ISubCategoryFormData) => {};

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
