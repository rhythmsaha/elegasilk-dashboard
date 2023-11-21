import { Chip, ChipProps } from '@nextui-org/react';
import React, { FC } from 'react';

interface Props {
    role: string;
}

const colorMap: Record<string, ChipProps['color']> = {
    superadmin: 'danger',
    admin: 'secondary',
    moderator: 'primary',
    guest: 'default',
};

const RoleCell: FC<Props> = ({ role }) => {
    return (
        <Chip variant="solid" size="sm" color={colorMap[role && role]} className="leading-none">
            {role}
        </Chip>
    );
};

export default RoleCell;
