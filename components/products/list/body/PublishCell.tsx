import { Chip } from '@nextui-org/react';
import React from 'react';

interface Props {
    published: boolean;
}

const formatCell = (published: boolean) => {
    return published ? { text: 'Published', color: 'success' } : { text: 'Draft', color: 'danger' };
};

const PublishCell = (props: Props) => {
    const color = formatCell(props.published).color as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined;

    return (
        <div>
            <Chip color={color} size="sm" variant="flat" className="px-4 py-2 text-xs font-semibold">
                {formatCell(props.published).text}
            </Chip>
        </div>
    );
};

export default PublishCell;
