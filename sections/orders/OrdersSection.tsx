import OrdersFilter from '@/components/orders/OrdersFilter';
import useDebouncedSearch from '@/hooks/browsing/useDebouncedSearch';
import usePagination from '@/hooks/browsing/usePagination';
import useSort from '@/hooks/browsing/useSort';
import { Card, CardBody } from '@nextui-org/react';
import React, { useState } from 'react';

export type OrderStatusType = undefined | 'PLACED' | 'CANCELLED' | 'DELIVERED' | 'REFUNDED';

interface Props {}

const OrdersSection: React.FC<Props> = (props) => {
    const [selectedOrderStatus, setSelectedOrderStatus] = useState<OrderStatusType>();
    const { searchQuery, debouncedSearchQuery, onSeachChangeHandler, cancel } = useDebouncedSearch();
    const { sortBy, sortOrder, changeSortHandler } = useSort('name', 'asc');
    const { rowsPerPage, currentPage, maxPage, setRowsPerPage, setCurrentPage, setmMaxPage } = usePagination();

    const changeSelectedOrderStatusHandler = (status: OrderStatusType) => {
        setSelectedOrderStatus(status);
    };

    return (
        <Card shadow="sm" className="mt-10">
            <CardBody className="w-full overflow-hidden sm:py-6">
                <OrdersFilter selectedStatus={selectedOrderStatus} onSelectedStatusChange={changeSelectedOrderStatusHandler} searchState={searchQuery} onSeachChange={onSeachChangeHandler} />
            </CardBody>
        </Card>
    );
};

export default OrdersSection;
