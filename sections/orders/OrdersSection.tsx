import OrdersFilter from '@/components/orders/OrdersFilter';
import OrdersTable from '@/components/orders/OrdersTable';
import EmptyState from '@/components/ui/table/EmptyState';
import TableLoading from '@/components/ui/table/TableLoading';
import TableRowsControl from '@/components/ui/table/TableRowsControl';
import useDebouncedSearch from '@/hooks/browsing/useDebouncedSearch';
import usePagination from '@/hooks/browsing/usePagination';
import useSort from '@/hooks/browsing/useSort';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { Card, CardBody, Pagination } from '@nextui-org/react';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';

export type OrderStatusType = undefined | 'PLACED' | 'CANCELLED' | 'DELIVERED' | 'REFUNDED';

interface Props {}

const OrdersSection: React.FC<Props> = (props) => {
    const [selectedOrderStatus, setSelectedOrderStatus] = useState<OrderStatusType>();
    const { searchQuery, debouncedSearchQuery, onSeachChangeHandler, cancel } = useDebouncedSearch();
    const { sortBy, sortOrder, changeSortHandler } = useSort('', 'desc');
    const { rowsPerPage, currentPage, maxPage, setRowsPerPage, setCurrentPage, setmMaxPage } = usePagination();

    const [startDateFilter, setStartDateFilter] = useState<Date>();
    const [endDateFilter, setEndDateFilter] = useState<Date>();

    // Table States
    const [orders, setOrders] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const changeSelectedOrderStatusHandler = (status: OrderStatusType) => {
        setSelectedOrderStatus(status);
    };

    const fetchOrders = useCallback(async () => {
        cancel();
        setIsLoading(true);

        const _status = selectedOrderStatus;
        const _searchQuery = debouncedSearchQuery;
        const _pageSize = Array.from(rowsPerPage)[0] as string;
        const _selectedStartDate = startDateFilter;
        const _selectedEndDate = endDateFilter;

        const queries = [];

        if (_pageSize) queries.push(`pageSize=${_pageSize}`);
        if (currentPage) queries.push(`page=${currentPage}`);
        if (_status) queries.push(`status=${_status}`);
        if (_selectedStartDate) queries.push(`startDate=${format(_selectedStartDate, 'yyyy-MM-dd')}`);
        if (_selectedEndDate) queries.push(`endDate=${format(_selectedEndDate, 'yyyy-MM-dd')}`);
        if (_searchQuery) queries.push(`search=${_searchQuery}`);

        if (sortBy) queries.push(`sortBy=${sortBy}`);
        if (sortOrder) queries.push(`sortOrder=${sortOrder}`);

        const url = `${API_URLS.orders.get}?${queries.join('&')}`;

        try {
            const response = await axios.get(url);
            setError('');

            setOrders(response.data.orders);
            setmMaxPage(response.data.maxPage);
            setCurrentPage(response.data.page);
        } catch (error: any) {
            setError(error.message || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, [cancel, currentPage, debouncedSearchQuery, endDateFilter, rowsPerPage, selectedOrderStatus, setCurrentPage, setmMaxPage, sortBy, sortOrder, startDateFilter]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <Card shadow="sm" className="mt-10 overflow-visible">
            <CardBody className="w-full overflow-visible sm:py-6">
                <OrdersFilter
                    // Status Filter Props
                    selectedStatus={selectedOrderStatus}
                    onSelectedStatusChange={changeSelectedOrderStatusHandler}
                    // Search Filter Props
                    searchState={searchQuery}
                    onSeachChange={onSeachChangeHandler}
                    // Date Filter Props
                    startDateFilter={startDateFilter}
                    setStartDateFilter={setStartDateFilter}
                    endDateFilter={endDateFilter}
                    setEndDateFilter={setEndDateFilter}
                />

                {isLoading && <TableLoading rows={5} />}

                {!isLoading && error && <EmptyState message={error} />}

                {!error && orders.length !== 0 && !isLoading && <OrdersTable changeSortHandler={changeSortHandler} onDelete={() => {}} sortBy={sortBy} sortOrder={sortOrder} orders={orders} />}

                {!isLoading && !error && orders.length === 0 && <EmptyState message="No Orders Found" />}

                {!isLoading && !error && orders.length !== 0 && (
                    <div className="table-pagination-container">
                        <Pagination
                            total={maxPage}
                            initialPage={1}
                            showControls
                            size="sm"
                            page={currentPage || 1}
                            onChange={setCurrentPage}
                            radius="full"
                            className="order-1 sm:order-none"
                            siblings={0}
                            boundaries={0}
                        />

                        <TableRowsControl rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default OrdersSection;
