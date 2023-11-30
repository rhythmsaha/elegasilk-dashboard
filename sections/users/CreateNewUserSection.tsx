import { IUserRoles } from '@/Typings';
import { IAvatarType } from '@/components/myaccount/generalSection/GeneralSection';
import UserAvatarSettings from '@/components/users/UserAvatarSettings';
import UserForm from '@/components/users/UserForm';
import { Card } from '@nextui-org/react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface ICreateNewUserFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: IUserRoles;
    avatar?: string;
    status?: boolean;
}

const CreateNewUserSection = () => {
    const [avatar, setAvatar] = useState<IAvatarType>();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<ICreateNewUserFormData>();

    const submitHandler: SubmitHandler<ICreateNewUserFormData> = (data) => {
        try {
            console.log({ ...data });
        } catch (error: any) {}
    };

    return (
        <div className="mt-10 lg:mt-20">
            <form className="grid gap-5 lg:grid-cols-3" onSubmit={handleSubmit(submitHandler)}>
                <Card shadow="sm" className="lg:col-span-1">
                    <UserAvatarSettings setAvatar={setAvatar} avatar={avatar} register={register} loading={isSubmitting} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <UserForm register={register} loading={isSubmitting} errors={errors} getValues={getValues} />
                </Card>
            </form>
        </div>
    );
};

export default CreateNewUserSection;
