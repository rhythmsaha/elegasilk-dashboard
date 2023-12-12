import CollectionsFilter from '@/components/collections/CollectionsFilter';
import CollectionsTable from '@/components/collections/collectionstable/CollectionsTable';
import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import EmptyState from '@/components/ui/table/EmptyState';
import TableLoading from '@/components/ui/table/TableLoading';
import TableRowsControl from '@/components/ui/table/TableRowsControl';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { faker } from '@faker-js/faker';
import { Card, CardBody, Pagination, Selection } from '@nextui-org/react';
import React, { use, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

export interface ICollectionTableData {
    _id: string;
    image: string;
    name: string;
    slug: string;
    status: boolean;
    subcategory: {
        _id: string;
        name: string;
        slug: string;
    };
    createdAt: string;
    updatedAt: string;
}

const createFakeCollection = (): ICollectionTableData => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.commerce.department(),
        slug: faker.lorem.slug(),
        image: faker.image.imageUrl(),
        status: faker.datatype.boolean(),
        subcategory: {
            _id: faker.database.mongodbObjectId(),
            name: faker.commerce.department(),
            slug: faker.lorem.slug(),
        },
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString(),
    };
};

const createFakeCollections = (count: number): ICollectionTableData[] => {
    const collections: ICollectionTableData[] = [];
    for (let i = 0; i < count; i++) {
        collections.push(createFakeCollection());
    }
    return collections;
};

const CollectionsSection = () => {
    const [selectedSubCategory, setSelectedSubCategory] = useState<Selection>(new Set([])); // State for subcategory selection filter
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query filter
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(); // State for debounced search query filter
    const [statusFilter, setStatusFilter] = useState<Selection>(new Set([]));

    const [rowsPerPage, setRowsPerPage] = useState(new Set(['5'])); // State for rows per page
    const [maxPage, setmMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [sortBy, setSortBy] = useState('name'); // State for sorting
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [collections, setCollections] = useState<ICollectionTableData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const changeSortHandler = (key: string) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    // Fetch collections from API
    const fetchCollections = useCallback(async () => {
        const _status = Array.from(statusFilter)[0];
        const _subCategory = Array.from(selectedSubCategory)[0];
        const _searchQuery = debouncedSearchQuery;
        const _pageSize = Array.from(rowsPerPage)[0] as string;

        setIsLoading(true);

        const queries = [];

        if (_pageSize) queries.push(`pageSize=${_pageSize}`);
        if (currentPage) queries.push(`page=${currentPage}`);
        if (_status) {
            if (_status === 'active') queries.push(`status=true`);
            if (_status === 'inactive') queries.push(`status=false`);
        }

        if (_subCategory) queries.push(`subcategory=${_subCategory}`);
        queries.push(`populateSubCategory=true`);

        if (_searchQuery) queries.push(`search=${_searchQuery}`);

        if (sortBy) queries.push(`sortby=${sortBy}`);
        if (sortOrder) queries.push(`sortorder=${sortOrder}`);

        const response = await axios.get(API_URLS.getCollections + `?${queries.join('&')}`);
        console.log(response.data);
        setCollections(response.data.data);
        setmMaxPage(response.data.maxPage);
        setCurrentPage(response.data.currentPage);

        setIsLoading(false);
    }, [currentPage, debouncedSearchQuery, rowsPerPage, selectedSubCategory, sortBy, sortOrder, statusFilter]);

    const [, cancel] = useDebounce(() => setDebouncedSearchQuery(searchQuery), 500, [searchQuery]);

    const onSeachChangeHandler = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(currentTarget.value);
    };

    useEffect(() => {
        cancel();
        fetchCollections();
    }, [cancel, fetchCollections]);

    return (
        <Card shadow="sm" className="mt-10">
            <CardBody className="w-full overflow-hidden sm:py-6">
                <CollectionsFilter
                    searchState={searchQuery}
                    selectedStatus={statusFilter}
                    selectedSubCategories={selectedSubCategory}
                    onSeachChange={onSeachChangeHandler}
                    setSelectedStatus={setStatusFilter}
                    setSelectedSubCategories={setSelectedSubCategory}
                />

                {isLoading && <TableLoading rows={5} />}

                {collections.length !== 0 && !isLoading && <CollectionsTable collectionsData={collections} changeSortHandler={changeSortHandler} sortBy={sortBy} sortOrder={sortOrder} />}

                {collections.length === 0 && !isLoading && <EmptyState message="No Collections Found" />}

                {!isLoading && collections.length !== 0 && (
                    <div className="flex flex-col items-center justify-between gap-4 px-4 pt-4 sm:flex-row">
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

export default CollectionsSection;