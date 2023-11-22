import React, { FC } from 'react';

interface Props {
    label: string;
    Icon?: React.ElementType<any>;
}

const TabButton: FC<Props> = ({ label, Icon }) => {
    return (
        <div className="flex items-center justify-between gap-2.5">
            {Icon && <Icon className="text-lg text-inherit" />}
            <span className="font-medium">{label}</span>
        </div>
    );
};

export default TabButton;
