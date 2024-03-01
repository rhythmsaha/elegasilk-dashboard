import { ImageFileType } from '@/Typings';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IColletionFormData } from './NewCollectionSection';
import { ICollection } from '@/hooks/collections/useCollection';
import { Card } from '@nextui-org/react';
import UploadImage from '@/components/categories/UploadImage';
import CategoryStatus from '@/components/categories/CategoryStatus';
import CollectionsForm from '@/components/collections/CollectionsForm';
import toast from 'react-hot-toast';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';

interface Props {
    collection: ICollection;
}

const EditCollectionsSection: React.FC<Props> = ({ collection }) => {
    const [image, setImage] = useState<ImageFileType>();
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm<IColletionFormData>({
        defaultValues: {
            status: collection.status,
            name: collection.name,
            description: collection.description,
        },
    });

    const onSubmit = async (data: IColletionFormData) => {
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

            const response = await axios.put(API_URLS.updateCollection(collection._id), payload);
            if (!response.data.success) throw new Error(response.data.message);

            const newData = response.data.data;

            reset((data) => ({
                ...data,
                status: newData.status,
                name: newData.name,
                description: newData.description,
            }));

            toast.success('Category updated successfully!');
        } catch (error) {
            toast.error('Failed to update category!');
        }
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form className="grid items-stretch gap-5 lg:grid-cols-3" onSubmit={handleSubmit(onSubmit)}>
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

export default EditCollectionsSection;
