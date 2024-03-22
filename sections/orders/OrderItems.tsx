import OrderedItem from '@/components/orders/details/OrderedItem';
import { Item } from '@/pages/orders/[id]';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

import React from 'react';

interface Props {
    items: Item[];
    total: number;
}

const OrderItems: React.FC<Props> = ({ items, total }) => {
    return (
        <Card shadow="sm" className="lg:col-span-2">
            <CardHeader className="p-4 lg:p-6">
                <h2 className="text-lg font-medium lg:text-xl lg:font-semibold">Details</h2>
            </CardHeader>

            <hr className="mx-6 border-dashed border-gray-200" />

            <CardBody className="p-4 lg:p-6">
                <div className="flex flex-col gap-6 overflow-y-auto whitespace-nowrap pb-6 pr-6">
                    {items.map((item) => (
                        <OrderedItem key={item._id} {...item} />
                    ))}
                </div>

                <hr className="mb-5 border-dashed border-gray-200" />

                <CardFooter className="py-0">
                    <div className="flex w-full justify-between">
                        <span className="text-lg font-semibold text-black lg:text-xl">Total</span>
                        <span className="text-lg font-semibold text-black lg:text-xl">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'INR',
                            }).format(total)}
                        </span>
                    </div>
                </CardFooter>
            </CardBody>
        </Card>
    );
};

export default OrderItems;
