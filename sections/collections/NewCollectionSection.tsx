import { ImageFileType } from '@/Typings';
import CategoryForm from '@/components/categories/CategoryForm';
import CategoryStatus from '@/components/categories/CategoryStatus';
import UploadImage from '@/components/categories/UploadImage';
import CollectionsForm from '@/components/collections/CollectionsForm';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import { Card } from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useCreateCollection from '@/hooks/collections/useCreateCollection.';

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

    const { createCollection } = useCreateCollection();

    const submitHandler = async (data: IColletionFormData) => {
        if (isSubmitting) return;

        const payload: IColletionFormData = {
            ...data,
        };

        try {
            let imageUrl = null;

            if (image) {
                imageUrl = await uploadToCloudinary(image);
                if (imageUrl) payload.image = imageUrl;
                else throw new Error('Failed to upload image!');
            }

            createCollection(payload);
        } catch (error: any) {
            return toast.error(error.message);
        }
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form className="grid items-stretch gap-5 lg:grid-cols-3" onSubmit={handleSubmit(submitHandler)}>
                <Card shadow="sm" className=" lg:col-span-1">
                    <UploadImage image={image} setImage={setImage} />

                    <div>
                        <CategoryStatus control={control} />
                    </div>
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <CollectionsForm control={control} />
                </Card>
            </form>
        </div>
    );
};

export default NewCollectionSection;
