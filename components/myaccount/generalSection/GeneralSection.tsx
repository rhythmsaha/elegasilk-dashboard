import { IUserAccount, IUserRoles } from '@/Typings';
import { Card } from '@nextui-org/react';
import { FC, useState } from 'react';
import GeneralForm from './GeneralForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import AvararSettings from './AvararSettings';
import { useAuthStore } from '@/store/useAuthStore';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';
import toast from 'react-hot-toast';
import uploadToCloudinary from '@/utils/uploadToCloudinary';

interface Props {
    user?: IUserAccount;
}

export interface IMyAccountFormData {
    firstName: string;
    lastName: string;
    username: string;
    email?: string;

    role?: IUserRoles;
}

export type IAvatarType = File & {
    preview: string;
};

const GeneralSection: FC<Props> = ({}) => {
    const [avatar, setAvatar] = useState<IAvatarType>();
    const user = useAuthStore((state) => state.user);
    const updateAccount = useAuthStore((state) => state.updateAccount);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IMyAccountFormData>({
        defaultValues: {
            role: user?.role,
        },
    });

    const submitHandler: SubmitHandler<IMyAccountFormData> = async ({ firstName, lastName, username, email }) => {
        if (isSubmitting) return;
        toast.dismiss();

        const payload: any = { firstName, lastName, username, email };

        try {
            if (avatar) {
                let avatarUrl = await uploadToCloudinary(avatar);

                if (avatarUrl) {
                    payload.avatar = avatarUrl;
                } else {
                    throw new Error('Failed to upload avatar!');
                }
            }

            const response = await axios.put(API_URLS.upadateAccount, payload);
            if (response.statusText !== 'OK') throw new Error(response.statusText);

            if (response?.data?.user) {
                updateAccount(response?.data?.user);
            }

            toast.success(response?.data?.message || 'Account updated successfully!');
        } catch (error: any) {
            toast.error(error?.message || error || 'Something went wrong!');
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid gap-5 lg:grid-cols-3">
                <Card shadow="sm" className="lg:col-span-1">
                    <AvararSettings setAvatar={setAvatar} avatar={avatar} defaultAvatarUrl={user?.avatar} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <GeneralForm register={register} loading={isSubmitting} errors={errors} />
                </Card>
            </div>
        </form>
    );
};

export default GeneralSection;
