import { FC } from 'react';
import AvararSettings from '../myaccount/generalSection/AvararSettings';
import { IAvatarType } from '../myaccount/generalSection/GeneralSection';
import { Switch, cn } from '@nextui-org/react';

interface Props {
    defaultAvatarUrl?: string;
    avatar?: IAvatarType;
    setAvatar?: React.Dispatch<React.SetStateAction<IAvatarType | undefined>>;
}

const UserAvatarSettings: FC<Props> = ({ avatar, defaultAvatarUrl, setAvatar }) => {
    return (
        <div>
            <AvararSettings setAvatar={setAvatar} avatar={avatar} defaultAvatarUrl={defaultAvatarUrl} />

            <div className="flex justify-between gap-2 p-4 sm:p-6">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-600">Email Verified</p>
                    <p className="text-xs text-gray-400">Disabling this will automatically send the user a verification email</p>
                </div>

                <Switch size="sm" />
            </div>
        </div>
    );
};

export default UserAvatarSettings;
