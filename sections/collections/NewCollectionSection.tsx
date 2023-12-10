import { ImageFileType } from '@/Typings';
import CategoryForm from '@/components/categories/CategoryForm';
import CategoryStatus from '@/components/categories/CategoryStatus';
import UploadImage from '@/components/categories/UploadImage';
import CollectionsForm from '@/components/collections/CollectionsForm';
import { Card } from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface IColletionFormData {
    name: string;
    description?: string;
    image?: string;
    status: boolean;
    subcategory: string;
}

const NewCollectionSection: React.FC = () => {
    const [image, setImage] = useState<ImageFileType>();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<IColletionFormData>({ defaultValues: { status: true } });

    const submitHandler = async (data: IColletionFormData) => {
        if (isSubmitting) return;
        console.log(data, image);
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form className="grid gap-5  lg:grid-cols-3" onSubmit={handleSubmit(submitHandler)}>
                <Card shadow="sm" className="lg:col-span-1 ">
                    <UploadImage image={image} setImage={setImage} />
                    <CategoryStatus control={control} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <CollectionsForm control={control} />
                </Card>
            </form>
        </div>
    );
};

export default NewCollectionSection;
