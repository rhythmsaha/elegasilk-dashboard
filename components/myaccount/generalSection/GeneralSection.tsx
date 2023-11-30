import { IUserAccount, IUserRoles } from '@/Typings';
import { Card } from '@nextui-org/react';
import { FC, useState } from 'react';
import GeneralForm from './GeneralForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import AvararSettings from './AvararSettings';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
    user?: IUserAccount;
}

export interface IMyAccountFormData {
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    phone?: number;
    role?: IUserRoles;
    avatar?: string;
}

export type IAvatarType = File & {
    preview: string;
};

const GeneralSection: FC<Props> = ({}) => {
    const [avatar, setAvatar] = useState<IAvatarType>();

    const user = useAuthStore((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IMyAccountFormData>({
        defaultValues: {
            role: user?.role,
        },
    });

    const submitHandler: SubmitHandler<IMyAccountFormData> = (data) => {
        try {
            console.log({ ...data, avatar: avatar?.preview || user?.avatar });
        } catch (error: any) {}
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
