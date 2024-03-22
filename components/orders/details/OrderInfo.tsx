import { CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

interface Props {
    orderId: string;
    orderDate: string;
    totalAmount: number;
    totalQuantity: number;
    paymentMethod: 'CASH_ON_DELIVERY' | 'STRIPE';
    transactionId?: string;
}

const OrderInfo: React.FC<Props> = ({ orderId, orderDate, totalAmount, totalQuantity, paymentMethod, transactionId }) => {
    return (
        <div>
            <CardHeader className="p-0">
                <h2 className="text-lg font-medium lg:text-xl lg:font-semibold">Order Info</h2>
            </CardHeader>

            <CardBody className="mt-6 space-y-4 p-0">
                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Order Id</h5>
                    <p className="col-span-2">{orderId}</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Date</h5>
                    <p className="col-span-2">
                        {new Date(orderDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Amount</h5>
                    <p className="col-span-2">
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'INR',
                        }).format(totalAmount)}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Total Quantity</h5>
                    <p className="col-span-2">{totalQuantity}</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <h5 className="col-span-1">Payment</h5>
                    <p className="col-span-2">{paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash on Delivery' : 'Stripe'}</p>
                </div>

                {transactionId && (
                    <div className="grid grid-cols-3 gap-6">
                        <h5 className="col-span-1">Transaction ID</h5>
                        <p className="col-span-2">{transactionId}</p>
                    </div>
                )}
            </CardBody>
        </div>
    );
};

export default OrderInfo;
