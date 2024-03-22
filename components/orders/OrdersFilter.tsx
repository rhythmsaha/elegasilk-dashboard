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
    startDateFilter: Date | undefined;
    setStartDateFilter: React.Dispatch<React.SetStateAction<Date | undefined>>;
    endDateFilter: Date | undefined;
    setEndDateFilter: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const OrdersFilter: React.FC<Props> = ({ selectedStatus, onSelectedStatusChange, onSeachChange, searchState, endDateFilter, setEndDateFilter, setStartDateFilter, startDateFilter }) => {
    return (
        <div>
            <OrderStatusFilter selectedStatus={selectedStatus} onSelectedStatusChange={onSelectedStatusChange} />
            <div className="mt-4 grid w-full gap-x-4 gap-y-2 lg:grid-cols-12">
                <div className="grid w-full grid-cols-2 items-center justify-between gap-2 lg:col-span-4">
                    <DatePicker placeHolder="Start Date" selectedDate={startDateFilter} setSelectedDate={setStartDateFilter} />
                    <DatePicker alignRight placeHolder="End Date" selectedDate={endDateFilter} setSelectedDate={setEndDateFilter} />
                </div>

                <div className="w-full flex-grow md:w-auto lg:col-span-8">
                    <TableSearch searchState={searchState} onChange={onSeachChange} />
                </div>
            </div>
        </div>
    );
};

export default OrdersFilter;
