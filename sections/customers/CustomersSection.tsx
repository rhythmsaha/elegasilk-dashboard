import CustomersFilters from '@/components/customers/CustomersFilters';
import CustomersTable from '@/components/customers/list/CustomersTable';
import EmptyState from '@/components/ui/table/EmptyState';
import TableLoading from '@/components/ui/table/TableLoading';
import TableRowsControl from '@/components/ui/table/TableRowsControl';
import useDebouncedSearch from '@/hooks/browsing/useDebouncedSearch';
import usePagination from '@/hooks/browsing/usePagination';
import useSort from '@/hooks/browsing/useSort';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { Card, CardBody, Pagination, Selection } from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';

export interface ICustomerTableData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: boolean;
    verified: boolean;
    createdAt?: string;
}

const CustomersSection: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<Selection>(new Set([]));
    const { searchQuery, debouncedSearchQuery, onSeachChangeHandler, cancel } = useDebouncedSearch();

    // Table States
    const [isLoading, setIsLoading] = useState(false);
    const [customers, setCustomers] = useState<ICustomerTableData[]>([]);

    // Pagination States
    const { rowsPerPage, currentPage, maxPage, setRowsPerPage, setCurrentPage, setmMaxPage } = usePagination();

    // Sort States
    const { sortBy, sortOrder, changeSortHandler } = useSort('firstName', 'asc');

    const fetchCustomers = useCallback(async () => {
        const _status = Array.from(selectedStatus)[0];
        const _searchQuery = debouncedSearchQuery;
        const _pageSize = Array.from(rowsPerPage)[0] as string;

        setIsLoading(true);

        const queries = [];

        if (_pageSize) queries.push(`pageSize=${_pageSize}`);
        if (currentPage) queries.push(`page=${currentPage}`);

        if (sortBy) queries.push(`sortBy=${sortBy}`);

        if (_status) {
            if (_status === 'active') queries.push(`status=true`);
            if (_status === 'inactive') queries.push(`status=false`);
        }

        if (_searchQuery) queries.push(`search=${_searchQuery}`);

        const queryString = queries.join('&');

        try {
            const { data: response } = await axios.get(`${API_URLS.customers.getCustomers}?${queryString}`);
            console.log(response.data.customers);

            setCustomers(response.data.customers);
            setCurrentPage(response.data.currentPage);
            setmMaxPage(response.data.totalPages);
        } catch (error) {
            // console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, debouncedSearchQuery, rowsPerPage, selectedStatus, setCurrentPage, setmMaxPage, sortBy]);

    const deleteCustomerHandler = async (customerId: string) => {
        const _customers = [...customers];
        const _deletedCustomers = _customers.filter((customer) => customer._id !== customerId);
        setCustomers(_deletedCustomers);
        fetchCustomers();
    };

    useEffect(() => {
        cancel();
        fetchCustomers();
    }, [cancel, fetchCustomers]);

    return (
        <Card shadow="sm" className="mt-10">
            <CardBody className="w-full overflow-hidden sm:py-6">
                <CustomersFilters searchState={searchQuery} onChange={onSeachChangeHandler} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

                {isLoading && <TableLoading rows={5} />}

                {!isLoading && customers.length !== 0 && (
                    <CustomersTable customersData={customers} sortBy={sortBy} sortOrder={sortOrder} changeSortHandler={changeSortHandler} onDelete={deleteCustomerHandler} />
                )}

                {!isLoading && customers.length === 0 && <EmptyState message="No Customers Found" />}

                {!isLoading && customers.length !== 0 && (
                    <div className="table-pagination-container">
                        <Pagination
                            total={maxPage}
                            initialPage={1}
                            showControls
                            size="sm"
                            page={currentPage}
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

export default CustomersSection;
