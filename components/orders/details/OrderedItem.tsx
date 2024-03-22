import { Item } from '@/pages/orders/[id]';
import Image from 'next/image';
import React from 'react';

const OrderedItem: React.FC<Item> = ({ name, images, MRP, slug, quantity }) => {
    return (
        <div className="flex min-w-max items-center justify-between gap-10">
            <div className="flex flex-grow items-start gap-4">
                <Image src={images} alt="product" width={50} height={75} className="h-16  w-14 rounded-xl object-cover object-top" />

                <div className="min-w-max">
                    <h4 className="min-w-max text-black">{name}</h4>
                    <span className="text-sm text-gray-400">
                        Price:{' '}
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'INR',
                        }).format(MRP)}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between gap-10">
                <span className="w-20 text-center font-medium text-gray-700">x{quantity}</span>
                <span className="w-32 text-end font-medium text-black">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'INR',
                    }).format(MRP * quantity)}
                </span>
            </div>
        </div>
    );
};

export default OrderedItem;
