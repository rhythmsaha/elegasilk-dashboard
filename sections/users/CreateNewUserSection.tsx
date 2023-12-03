import { IUserRoles } from '@/Typings';
import { IAvatarType } from '@/components/myaccount/generalSection/GeneralSection';
import UserAvatarSettings from '@/components/users/UserAvatarSettings';
import UserForm from '@/components/users/UserForm';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import { Card } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export interface ICreateNewUserFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: IUserRoles;
    status: boolean;
}

const CreateNewUserSection = () => {
    const [avatar, setAvatar] = useState<IAvatarType>();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ICreateNewUserFormData>({ defaultValues: { status: true } });

    const submitHandler: SubmitHandler<ICreateNewUserFormData> = async ({ firstName, lastName, username, email, password, role, status }) => {
        if (isSubmitting) return;
        toast.dismiss();

        const payload: any = { firstName, lastName, username, email, password, role, status };

        try {
            if (avatar) {
                let avatarUrl = await uploadToCloudinary(avatar);

                if (avatarUrl) {
                    payload.avatar = avatarUrl;
                } else {
                    throw new Error('Failed to upload avatar!');
                }
            }

            const response = await axios.post(API_URLS.createNewAdmin, payload);

            toast.success(response?.data?.message || 'Account updated successfully!');
        } catch (error: any) {
            toast.error(error?.message || error || 'Something went wrong!');
        }
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form className="grid gap-5 lg:grid-cols-3" onSubmit={handleSubmit(submitHandler)}>
                <Card shadow="sm" className="lg:col-span-1">
                    <UserAvatarSettings setAvatar={setAvatar} avatar={avatar} control={control} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <UserForm register={register} loading={isSubmitting} errors={errors} getValues={getValues} control={control} />
                </Card>
            </form>
        </div>
    );
};

export default CreateNewUserSection;
