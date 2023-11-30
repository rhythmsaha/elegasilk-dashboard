import { FC } from 'react';
import AvararSettings from '../myaccount/generalSection/AvararSettings';
import { IAvatarType } from '../myaccount/generalSection/GeneralSection';
import { Switch, cn } from '@nextui-org/react';
import { UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { ICreateNewUserFormData } from '@/sections/users/CreateNewUserSection';

interface Props {
    defaultAvatarUrl?: string;
    avatar?: IAvatarType;
    setAvatar?: React.Dispatch<React.SetStateAction<IAvatarType | undefined>>;

    register: UseFormRegister<ICreateNewUserFormData>;
    loading?: boolean;
}

const UserAvatarSettings: FC<Props> = ({ avatar, defaultAvatarUrl, setAvatar, register, loading }) => {
    return (
        <div className="flex h-full flex-col justify-around">
            <AvararSettings setAvatar={setAvatar} avatar={avatar} defaultAvatarUrl={defaultAvatarUrl} />

            <div className="flex justify-between gap-2 p-4 sm:p-6">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="text-xs text-gray-400">Toggle account active status</p>
                </div>

                <Switch size="sm" {...register('status')} isDisabled={loading} />
            </div>
        </div>
    );
};

export default UserAvatarSettings;
