import { Chip, Image } from '@nextui-org/react';
import React from 'react';

interface Props {
    image: string;
    name: string;
    discount?: number;
}

const ProductNameCell: React.FC<Props> = ({ image, name, discount }) => {
    return (
        <div className="mr-10 flex items-center gap-2 whitespace-nowrap">
            <span className="aspect-square min-w-fit rounded-full bg-primary-50">
                <Image src={image} removeWrapper className="h-10 w-10 rounded-lg object-cover object-top" alt={name} />
            </span>

            <span className="block space-x-2 text-base  text-gray-800 ">
                <p>{name}</p>
            </span>

            {discount && (
                <Chip variant="shadow" color="danger" className="px-2 text-xs" size="sm">
                    {discount}% OFF
                </Chip>
            )}
        </div>
    );
};

export default ProductNameCell;
