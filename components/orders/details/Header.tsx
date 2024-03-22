import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner } from '@nextui-org/react';

import React, { useState } from 'react';
import { BiChevronDown, BiChevronLeft } from 'react-icons/bi';
import StatusCell from '../cells/StatusCell';
import { STATUSES, getOrderStatusText } from '@/utils/order/OrderStatusText';
import { BsFillPrinterFill } from 'react-icons/bs';
import Link from 'next/link';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';
import toast from 'react-hot-toast';
import { Order } from '@/pages/orders/[id]';

export type IOrderStatusTypesAll =
    | 'PENDING'
    | 'PLACED'
    | 'FAILED'
    | 'CANCELLED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'RETURN_REQUESTED'
    | 'RETURNED'
    | 'REFUNDED'
    | 'EXCHANGE_REQUESTED'
    | 'EXCHANGED'
    | undefined;

interface Props {
    _id: string;
    orderId: string;
    status: IOrderStatusTypesAll;
    updatedAt: string;
    setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}

const Header: React.FC<Props> = ({ orderId, status, updatedAt, _id, setOrder }) => {
    const [loading, setLoading] = useState(false);
    const { orderStatusText } = getOrderStatusText(status);

    const onUpdateStatus = async (status: IOrderStatusTypesAll) => {
        setLoading(true);
        try {
            const res = await axios.put(API_URLS.orders.updateStatus(_id), { status });
            if (res.status === 200) {
                toast.success('Order status updated successfully');
            }

            setOrder(res.data.order);

            return res.data;
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-2 ">
                <Link href="/orders" className="flex items-center justify-center p-2">
                    <BiChevronLeft className="text-xl" />
                </Link>

                <div className="flex flex-col gap-2">
                    <h2 className="line-clamp-2 break-all text-xl font-semibold md:text-2xl md:font-bold">Order {orderId}</h2>

                    <div className="flex items-center gap-2">
                        <StatusCell status={status} />

                        <span className="text-sm text-gray-500">
                            {new Date(updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-2">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="solid" color="secondary" size="sm">
                            {orderStatusText}
                            <BiChevronDown className="text-lg" />
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Static Actions">
                        {STATUSES.map((status) => (
                            <DropdownItem onClick={() => onUpdateStatus(status.value as IOrderStatusTypesAll)} key={status.value}>
                                {status.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                <Button size="sm" variant="shadow" color="primary">
                    <BsFillPrinterFill />
                    <span>Print</span>
                </Button>
            </div>

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                    <Spinner color="primary" size="lg" />
                </div>
            )}
        </div>
    );
};

export default Header;
