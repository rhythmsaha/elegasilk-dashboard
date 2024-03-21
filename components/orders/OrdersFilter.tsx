import React from 'react';
import OrderStatusFilter from './OrderStatusFilter';
import { OrderStatusType } from '@/sections/orders/OrdersSection';
import TableSearch from '../ui/table/TableSearch';
import DatePicker from '../ui/table/DatePicker';

interface Props {
    selectedStatus: OrderStatusType | undefined | null;
    onSelectedStatusChange: (status: OrderStatusType) => void;

    searchState: string;
    onSeachChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrdersFilter: React.FC<Props> = ({ selectedStatus, onSelectedStatusChange, onSeachChange, searchState }) => {
    return (
        <div>
            <OrderStatusFilter selectedStatus={selectedStatus} onSelectedStatusChange={onSelectedStatusChange} />
            <div className="mt-4 grid w-full gap-x-4 gap-y-2 lg:grid-cols-12">
                <div className="w-full flex-grow md:w-auto lg:col-span-8">
                    <TableSearch searchState={searchState} onChange={onSeachChange} />
                </div>

                <div className="grid w-full grid-cols-2 items-center justify-between gap-2 lg:col-span-4">
                    <DatePicker />
                    <DatePicker />
                </div>
            </div>
        </div>
    );
};

export default OrdersFilter;
