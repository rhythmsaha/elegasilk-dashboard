import { Customer } from '@/pages/orders/[id]';
import { CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

const CustomerProfile: React.FC<Customer> = ({ firstName, lastName, email }) => {
    return (
        <div>
            <CardHeader className="p-0">
                <h2 className="text-lg font-medium lg:text-xl lg:font-semibold">Customer Info</h2>
            </CardHeader>

            <CardBody className="mt-6 p-0">
                <div>
                    <h5 className="capitalize">
                        {firstName} {lastName}
                    </h5>
                    <p className="">{email}</p>
                </div>
            </CardBody>
        </div>
    );
};

export default CustomerProfile;
