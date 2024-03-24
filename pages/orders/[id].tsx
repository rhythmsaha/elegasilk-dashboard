import DashboardLayout from '@/components/layouts/DashboardLayout';
import React, { useCallback, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import Header, { IOrderStatusTypesAll } from '@/components/orders/details/Header';
import CustomerInfo from '@/sections/orders/CustomerInfo';
import OrderItems from '@/sections/orders/OrderItems';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';
import LoadingScreen from '@/components/ui/LoadingScreen';

export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Address {
    firstName: string;
    lastName: string;
    mobile: string;
    alternativeMobile: string;
    houseNo: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Item {
    _id: string;
    name: string;
    images: string;
    MRP: number;
    slug: string;
    quantity: number;
}

export interface Order {
    _id: string;
    orderId: string;
    customer: Customer;
    address: Address;
    items: Item[];
    total: number;
    paymentMethod: string;
    status: IOrderStatusTypesAll;
    createdAt: string;
    totalQuantity: number;
    sessionId: string;
    updatedAt: string;
}

interface OrderState {
    success: boolean;
    order: Order;
}

const ViewOrderDetailsPage: NextPageWithLayout = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<Order>();

    const [error, setError] = useState();

    const router = useRouter();

    const orderId = router.query.id as string;

    const fetchOrder = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URLS.orders.getSingle(orderId));
            const data = response.data as OrderState;
            if (!data.success) {
                throw new Error('Something Went Wrong');
            }
            setOrder(data.order);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        if (!router.isReady) return;
        fetchOrder();
    }, [fetchOrder, orderId, router.isReady]);

    if (loading) return <LoadingScreen />;

    if (error) {
        router.replace('/404');
        return <div>{error}</div>;
    }

    return (
        <div>
            {order && <Header setOrder={setOrder} _id={order?._id} orderId={order?.orderId} updatedAt={order?.updatedAt} status={order?.status as IOrderStatusTypesAll} />}

            <section className="mt-10 grid items-start gap-4 lg:grid-cols-3">
                {order && <OrderItems items={order?.items} total={order?.total} />}

                {order && (
                    <CustomerInfo
                        customer={order?.customer}
                        address={order?.address}
                        orderId={order?.orderId}
                        orderDate={order?.createdAt}
                        totalAmount={order?.total}
                        totalQuantity={order?.items.length}
                        paymentMethod={order?.paymentMethod as 'CASH_ON_DELIVERY' | 'STRIPE'}
                        transactionId={order?.sessionId}
                    />
                )}
            </section>
        </div>
    );
};

export default ViewOrderDetailsPage;

ViewOrderDetailsPage.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            <div className="dashboard-xl">{page}</div>
        </DashboardLayout>
    );
};
