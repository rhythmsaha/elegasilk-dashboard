import CustomerProfile from '@/components/orders/details/CustomerProfile';
import OrderInfo from '@/components/orders/details/OrderInfo';
import ShippingInfo from '@/components/orders/details/ShippingInfo';
import { Address, Customer } from '@/pages/orders/[id]';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

interface Props {
    // Customer Info Props
    customer: Customer;
    // Shipping Info Props
    address: Address;
    orderId: string;
    orderDate: string;
    totalAmount: number;
    totalQuantity: number;
    paymentMethod: 'CASH_ON_DELIVERY' | 'STRIPE';
    transactionId?: string;
}

const CustomerInfo: React.FC<Props> = ({ customer, address, orderId, orderDate, totalAmount, totalQuantity, paymentMethod, transactionId }) => {
    return (
        <Card shadow="sm" className="p-4 lg:p-6">
            <CustomerProfile {...customer} />

            <hr className="my-4 border-dashed border-gray-200 lg:my-6" />

            <ShippingInfo {...address} />

            <hr className="my-4 border-dashed border-gray-200 lg:my-6" />

            <OrderInfo orderId={orderId} orderDate={orderDate} totalAmount={totalAmount} totalQuantity={totalQuantity} paymentMethod={paymentMethod} transactionId={transactionId} />
        </Card>
    );
};

export default CustomerInfo;
