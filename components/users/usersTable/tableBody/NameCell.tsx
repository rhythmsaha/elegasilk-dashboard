import { Avatar, Chip } from '@nextui-org/react';
import React from 'react';
import { IUserTableData } from '../UsersTable';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
    user: IUserTableData;
}

const NameCell: React.FC<Props> = ({ user }) => {
    const currentUserId = useAuthStore((state) => state.user?._id);
    let isYou = user._id === currentUserId;

    return (
        <div className="flex items-start gap-2">
            <Avatar src={user.avatar} size="md" name={user.fullName} />

            <div className="">
                <span className="block space-x-2 font-medium text-gray-800">
                    <span>{user.fullName}</span>
                    {isYou && (
                        <Chip color="danger" radius="full" className="px-3 text-xs" size="sm">
                            You
                        </Chip>
                    )}
                </span>
                <span className="block text-gray-400">@{user.username}</span>
            </div>
        </div>
    );
};

export default NameCell;
