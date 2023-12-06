import { ImageFileType } from '@/Typings';
import React, { FC, useState } from 'react';
import { IcategoryFormData } from './NewCategorySection';
import { useForm } from 'react-hook-form';
import { Card } from '@nextui-org/react';
import UploadImage from '@/components/categories/UploadImage';
import CategoryStatus from '@/components/categories/CategoryStatus';
import CategoryForm from '@/components/categories/CategoryForm';
import { ICategory } from '@/components/categories/CategoryCard';

interface Props {
    category: ICategory;
}

const EditCategorySection: FC<Props> = ({ category }) => {
    const [image, setImage] = useState<ImageFileType>();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<IcategoryFormData>({
        defaultValues: {
            status: category.status,
            name: category.name,
            description: category.description,
        },
    });

    return (
        <div className="mt-10 lg:mt-20">
            <div className="grid gap-5  lg:grid-cols-3">
                <Card shadow="sm" className="lg:col-span-1 ">
                    <UploadImage image={image} setImage={setImage} defaultImage={category.image} />
                    <CategoryStatus control={control} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <CategoryForm control={control} />
                </Card>
            </div>
        </div>
    );
};

export default EditCategorySection;
