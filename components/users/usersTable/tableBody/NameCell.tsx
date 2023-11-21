import { Avatar } from '@nextui-org/react';
import React from 'react';
import { IUserTableData } from '../UsersTable';

interface Props {
    user: IUserTableData;
}

const NameCell: React.FC<Props> = ({ user }) => {
    return (
        <div className="flex items-start gap-2">
            <Avatar src={user.avatar} size="md" name={user.fullName} />

            <div className="">
                <span className="block font-medium text-gray-800">{user.fullName}</span>
                <span className="block text-gray-400">@{user.username}</span>
            </div>
        </div>
    );
};

export default NameCell;
