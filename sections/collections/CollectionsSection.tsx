import { ISubCategory } from '@/components/subcategories/SubCategoryCard';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { Selection } from '@nextui-org/react';
import React, { use, useCallback, useEffect, useState } from 'react';

export interface ICollectionTableData {
    _id: string;
    name: string;
    description: string;
    image: string;
    status: boolean;
    slug: string;
    subCategory: ISubCategory;
    createdAt: string;
    updatedAt: string;
}

const CollectionsSection = () => {
    const [selectedSubCategory, setSelectedSubCategory] = useState<Selection>(new Set(['657348b78840612d2a0a8c6a'])); // State for subcategory selection filter
    const [rowsPerPage, setRowsPerPage] = useState(new Set(['5'])); // State for rows per page
    const [maxPage, setmMaxPage] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedCollections, setFetchedCollections] = useState<ICollectionTableData[]>([]);
    const [collections, setCollections] = useState<ICollectionTableData[]>([]);
    const [sortBy, setSortBy] = useState('name'); // State for sorting
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch collections from API
    const fetchCollections = useCallback(async () => {
        const queries = [`populateSubCategory=true`];

        const maxRows = Array.from(rowsPerPage)[0] as string; // Max rows per page
        if (maxRows) queries.push(`rows=${maxRows}`);

        // if (pageNo) queries.push(`page=${pageNo}`);
        // if (sortBy) queries.push(`sortBy=${sortBy}`);
        // if (sortOrder) queries.push(`sortOrder=${sortOrder}`);
        // if (searchQuery) queries.push(`searchQuery=${searchQuery}`);
        if (Array.from(selectedSubCategory).length !== 0) queries.push(`subCategory=${Array.from(selectedSubCategory)[0]}`);

        const response = await axios.get(API_URLS.getCollections + `?${queries.join('&')}`);
        const data = await response.data;
        setIsLoading(false);
    }, [pageNo, searchQuery, selectedSubCategory, sortBy, sortOrder]);

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    return <div>CollectionsSection</div>;
};

export default CollectionsSection;
