import { Chip, ChipProps } from '@nextui-org/react';
import React, { FC } from 'react';

const statusColorMap: Record<string, ChipProps['color']> = {
    active: 'success',
    inactive: 'danger',
};

interface Props {
    status: boolean;
}

const StatusCell: FC<Props> = ({ status }) => {
    return (
        <Chip variant="flat" size="sm" color={statusColorMap[status ? 'active' : 'inactive']} className="px-4 text-xs">
            {status ? 'Active' : 'Inactive'}
        </Chip>
    );
};

export default StatusCell;
