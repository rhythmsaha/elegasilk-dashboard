import ProductsFilter from '@/components/products/list/ProductsFilter';
import ProductsTable from '@/components/products/list/ProductsTable';
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

export interface IProductTableData {
    _id: string;
    images: string;
    name: string;
    updatedAt: string;
    MRP: number;
    stock: number;
    published: boolean;
    discount: number;
}

const ProductsSection = () => {
    // Filter states
    const [selectedStockFilter, setSelectedStockFilter] = useState<Selection>(new Set([]));
    const [selectedPublishFilter, setSelectedPublishFilter] = useState<Selection>(new Set([]));

    const { searchQuery, debouncedSearchQuery, onSeachChangeHandler, cancel } = useDebouncedSearch();

    // Table States
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<IProductTableData[]>([]);

    // Pagination States
    const { rowsPerPage, currentPage, maxPage, setRowsPerPage, setCurrentPage, setmMaxPage } = usePagination();

    // Sort States
    const { sortBy, sortOrder, changeSortHandler } = useSort('name', 'asc');

    const fetchProducts = useCallback(async () => {
        const _status = Array.from(selectedPublishFilter)[0];
        const _stock = Array.from(selectedStockFilter)[0];
        const _searchQuery = debouncedSearchQuery;
        const _pageSize = Array.from(rowsPerPage)[0] as string;

        setIsLoading(true);

        const queries = [];

        if (_pageSize) queries.push(`pageSize=${_pageSize}`);
        if (currentPage) queries.push(`page=${currentPage}`);

        if (_status) {
            if (_status === 'published') queries.push(`status=true`);
            if (_status === 'draft') queries.push(`status=false`);
        }

        if (_stock) {
            if (_stock === 'IN_STOCK') queries.push(`stock=IN_STOCK`);
            if (_stock === 'LOW_STOCK') queries.push(`stock=LOW_STOCK`);
            if (_stock === 'OUT_OF_STOCK') queries.push(`stock=OUT_OF_STOCK`);
        }

        if (_searchQuery) queries.push(`search=${_searchQuery}`);

        if (sortBy) queries.push(`sortby=${sortBy}`);
        if (sortOrder) queries.push(`sortorder=${sortOrder}`);

        // Fetch products from API
        const response = await axios.get(API_URLS.getProducts + `?${queries.join('&')}`);
        setProducts(response.data.data);
        setmMaxPage(response.data.maxPage);
        setCurrentPage(response.data.currentPage);

        console.log(response.data);

        setIsLoading(false);
    }, [currentPage, debouncedSearchQuery, rowsPerPage, selectedPublishFilter, selectedStockFilter, setCurrentPage, setmMaxPage, sortBy, sortOrder]);

    const deleteProductHandler = async (productId: string) => {
        const _products = [...products];
        const _deletedProducts = _products.filter((product) => product._id !== productId);
        setProducts(_deletedProducts);
        fetchProducts();
    };

    useEffect(() => {
        cancel();
        fetchProducts();
    }, [cancel, fetchProducts]);

    return (
        <Card shadow="sm" className="mt-10">
            <CardBody className="w-full overflow-hidden sm:py-6">
                <ProductsFilter
                    searchState={searchQuery}
                    onSeachChange={onSeachChangeHandler}
                    selectedStock={selectedStockFilter}
                    setSelectedStock={setSelectedStockFilter}
                    selectedStatus={selectedPublishFilter}
                    setSelectedStatus={setSelectedPublishFilter}
                />

                {isLoading && <TableLoading rows={5} />}

                {products.length !== 0 && !isLoading && (
                    <ProductsTable changeSortHandler={changeSortHandler} onDelete={deleteProductHandler} productsData={products} sortBy={sortBy} sortOrder={sortOrder} />
                )}

                {!isLoading && products.length === 0 && <EmptyState message="No Products Found" />}

                {!isLoading && products.length !== 0 && (
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

export default ProductsSection;
