import { Image } from '@nextui-org/react';
import React from 'react';

interface Props {
    image: string;
    name: string;
}

const CollectionNameCell: React.FC<Props> = ({ image, name }) => {
    return (
        <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-50">
                <Image src={image} removeWrapper className="h-8 w-8 rounded-full object-cover" alt={name} />
            </span>

            <span className="block space-x-2 text-base  text-gray-800">
                <span>{name}</span>
            </span>
        </div>
    );
};

export default CollectionNameCell;
