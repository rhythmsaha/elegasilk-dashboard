import { IAvatarType } from '@/components/myaccount/generalSection/GeneralSection';
import UserAvatarSettings from '@/components/users/UserAvatarSettings';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '@nextui-org/react';
import React, { useState } from 'react';

const CreateNewUserSection = () => {
    const [avatar, setAvatar] = useState<IAvatarType>();
    const user = useAuthStore((state) => state.user);

    return (
        <div className="mt-10 lg:mt-20">
            <div className="grid gap-5 lg:grid-cols-3">
                <Card shadow="sm" className="lg:col-span-1">
                    <UserAvatarSettings setAvatar={setAvatar} avatar={avatar} defaultAvatarUrl={user?.avatar} />
                </Card>

                <Card shadow="sm" className="lg:col-span-2"></Card>
            </div>
        </div>
    );
};

export default CreateNewUserSection;
