import React, { FC, useState } from 'react';
import { ICreateNewUserFormData } from './CreateNewUserSection';
import { IAvatarType } from '@/components/myaccount/generalSection/GeneralSection';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { Card } from '@nextui-org/react';
import UserAvatarSettings from '@/components/users/UserAvatarSettings';
import UserForm from '@/components/users/UserForm';
import toast from 'react-hot-toast';
import uploadToCloudinary from '@/utils/uploadToCloudinary';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';

type IEditUserSectionData = ICreateNewUserFormData & {
    password?: string;
    confirmPassword?: string;
};

interface Props {
    user: IEditUserSectionData & { avatar?: string; _id: string };
}

const EditUserSection: FC<Props> = ({ user }) => {
    const [avatar, setAvatar] = useState<IAvatarType>();

    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors, isSubmitting },
        setError,
        setValue,
    } = useForm<IEditUserSectionData>({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
        },
    });

    const submitHandler: SubmitHandler<IEditUserSectionData> = async ({ confirmPassword, password, email, firstName, lastName, status, username, role }) => {
        if (isSubmitting) return;
        toast.dismiss();

        const payload: any = { firstName, lastName, username, email, role, status };

        try {
            if (password) {
                if (password !== confirmPassword) return setError('confirmPassword', { message: 'Password does not match!' });
                payload.password = password;
            }

            if (avatar) {
                let avatarUrl = await uploadToCloudinary(avatar);
                if (avatarUrl) payload.avatar = avatarUrl;
                else throw new Error('Failed to upload avatar!');
            }

            const response = await axios.put(`${API_URLS.updateUser}/${user._id}`, payload);

            if (response.status !== 200) {
                throw new Error('Failed to update user!');
            }

            toast.success('User updated successfully!');
        } catch (error: any) {
            toast.error(error?.message || error || 'Something went wrong!');
        }
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form className="grid gap-5 lg:grid-cols-3" onSubmit={handleSubmit(submitHandler)}>
                <Card shadow="sm" className="lg:col-span-1">
                    <UserAvatarSettings setAvatar={setAvatar} avatar={avatar} control={control} defaultAvatarUrl={user?.avatar} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <UserForm register={register} loading={isSubmitting} errors={errors} getValues={getValues} control={control} editMode />
                </Card>
            </form>
        </div>
    );
};

export default EditUserSection;
