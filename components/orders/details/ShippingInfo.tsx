import { Address } from '@/pages/orders/[id]';
import { CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

const ShippingInfo: React.FC<Address> = ({ firstName, lastName, mobile, alternativeMobile, houseNo, street, landmark, city, state, pincode }) => {
    return (
        <div>
            <CardHeader className="p-0">
                <h2 className="text-lg font-medium lg:text-xl lg:font-semibold">Shipping</h2>
            </CardHeader>

            <CardBody className="mt-6 space-y-4 p-0 capitalize">
                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Name</h5>
                    <p className="col-span-2">
                        {firstName} {lastName}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Phone</h5>
                    <p className="col-span-2">{mobile}</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Address</h5>
                    <p className="col-span-2">
                        {houseNo}, {street}, {city}, {state}, {pincode}
                        {landmark && <span>, {landmark}</span>}
                    </p>
                </div>
            </CardBody>
        </div>
    );
};

export default ShippingInfo;
